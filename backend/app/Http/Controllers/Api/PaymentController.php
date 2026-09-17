<?php

namespace App\Http\Controllers\Api;

use App\Enums\ApplicationStatus;
use App\Enums\PaymentStatus;
use App\Events\PaymentStatusChanged;
use App\Http\Controllers\Controller;
use App\Http\Requests\InitiatePaymentRequest;
use App\Http\Resources\PaymentResource;
use App\Models\Application;
use App\Models\Payment;
use App\Models\PaymentWebhookLog;
use App\Services\AuditLogService;
use App\Services\MelapaysService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;

class PaymentController extends Controller
{
    public function __construct(
        private readonly MelapaysService $melapaysService,
        private readonly AuditLogService $auditLogService
    ) {}

    /**
     * Initiate payment with Melapays gateway.
     */
    public function initiate(InitiatePaymentRequest $request): JsonResponse
    {
        $application = Application::query()
            ->with(['program'])
            ->findOrFail($request->validated('application_id'));

        // Authorize student ownership or permission
        Gate::authorize('view', $application);

        if (in_array($application->status, [
            ApplicationStatus::Paid,
            ApplicationStatus::UnderReview,
            ApplicationStatus::Approved,
            ApplicationStatus::Enrolled,
            ApplicationStatus::Rejected,
        ])) {
            return response()->json([
                'status' => 'error',
                'message' => 'Application has already been paid or processed (current status: ' . $application->status->value . ').',
            ], 422);
        }

        if ($application->status === ApplicationStatus::Draft) {
            return response()->json([
                'status' => 'error',
                'message' => 'Application must be submitted before initiating payment.',
            ], 422);
        }

        $amount = (float) ($application->program->tuition_fee ?? $application->program->price ?? 100.00);
        $currency = 'ETB';

        $txRef = 'PAY-APP-' . $application->id . '-' . time() . '-' . Str::upper(Str::random(6));
        $callbackUrl = $request->validated('callback_url') ?? url('/api/payments/webhook');
        $returnUrl = $request->validated('return_url') ?? config('app.frontend_url', 'http://localhost:5173') . '/applications/' . $application->id . '/payment-status';

        $payment = DB::transaction(function () use ($application, $amount, $currency, $txRef, $request) {
            $beforeApp = $application->toArray();

            // Transition application to Payment Pending if submitted
            if ($application->status === ApplicationStatus::Submitted) {
                $application->forceFill(['status' => ApplicationStatus::PaymentPending])->save();

                $this->auditLogService->log(
                    'application_status_updated',
                    $application,
                    ['status' => ApplicationStatus::Submitted->value],
                    ['status' => ApplicationStatus::PaymentPending->value],
                    $request->user()?->id
                );
            }

            // Create new payment record
            $payment = Payment::create([
                'application_id' => $application->id,
                'amount' => $amount,
                'currency' => $currency,
                'status' => PaymentStatus::Pending,
                'gateway_name' => 'melapays',
                'gateway_transaction_id' => $txRef,
            ]);

            $this->auditLogService->log(
                'payment_initiated',
                $payment,
                null,
                [
                    'payment_id' => $payment->id,
                    'application_id' => $application->id,
                    'amount' => $amount,
                    'currency' => $currency,
                    'tx_ref' => $txRef,
                ],
                $request->user()?->id
            );

            return $payment;
        });

        // Initialize payment with Melapays gateway
        $gatewayResult = $this->melapaysService->initializePayment([
            'amount' => $amount,
            'currency' => $currency,
            'tx_ref' => $txRef,
            'callback_url' => $callbackUrl,
            'return_url' => $returnUrl,
        ]);

        if (! $gatewayResult['success']) {
            return response()->json([
                'status' => 'error',
                'message' => $gatewayResult['message'] ?? 'Failed to initialize payment with Melapays gateway.',
                'tx_ref' => $txRef,
            ], 502);
        }

        // Store checkout URL and raw response
        $payment->update([
            'checkout_url' => $gatewayResult['checkout_url'],
            'metadata' => [
                'initiate_response' => $gatewayResult['raw'],
                'return_url' => $returnUrl,
            ],
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Payment initiated successfully.',
            'data' => [
                'payment_id' => $payment->id,
                'application_id' => $application->id,
                'reference_number' => $application->reference_number,
                'amount' => (string) $payment->amount,
                'currency' => $payment->currency,
                'tx_ref' => $payment->gateway_transaction_id,
                'checkout_url' => $payment->checkout_url,
                'gateway_name' => $payment->gateway_name,
                'publishable_key' => $this->melapaysService->getPublishableKey(),
                'mode' => $this->melapaysService->getMode(),
            ],
        ], 201);
    }

    /**
     * Webhook endpoint called by payment gateway after payment events.
     */
    public function webhook(Request $request): JsonResponse
    {
        $payload = $request->all();
        $headers = $request->headers->all();

        // 1. Authenticity check
        $isAuthentic = $this->melapaysService->verifyWebhookAuthenticity($request);

        if (! $isAuthentic) {
            PaymentWebhookLog::create([
                'event_id' => $payload['event_id'] ?? $payload['id'] ?? null,
                'gateway_name' => 'melapays',
                'tx_ref' => $payload['tx_ref'] ?? $payload['data']['tx_ref'] ?? null,
                'event_type' => $payload['event'] ?? $payload['type'] ?? 'unknown',
                'payload' => $payload,
                'headers' => $headers,
                'status' => 'invalid_signature',
                'processed_at' => now(),
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Invalid webhook signature or secret verification failed.',
            ], 401);
        }

        // Parse payload values
        $eventId = $payload['event_id'] ?? $payload['id'] ?? $request->header('X-Event-ID');
        $txRef = $payload['tx_ref'] ?? $payload['data']['tx_ref'] ?? $payload['transaction_id'] ?? $payload['data']['id'] ?? null;
        $eventType = strtolower((string) ($payload['event'] ?? $payload['type'] ?? $payload['status'] ?? $payload['data']['status'] ?? 'successful'));

        // 2. Idempotency Check
        if ($eventId) {
            $alreadyProcessed = PaymentWebhookLog::query()
                ->where('event_id', $eventId)
                ->where('status', 'processed')
                ->exists();

            if ($alreadyProcessed) {
                PaymentWebhookLog::create([
                    'event_id' => $eventId,
                    'gateway_name' => 'melapays',
                    'tx_ref' => $txRef,
                    'event_type' => $eventType,
                    'payload' => $payload,
                    'headers' => $headers,
                    'status' => 'duplicate',
                    'processed_at' => now(),
                ]);

                return response()->json([
                    'status' => 'ignored',
                    'message' => 'Duplicate event delivery ignored.',
                    'event_id' => $eventId,
                    'tx_ref' => $txRef,
                ], 200);
            }
        }

        // 3. Process payment update inside DB transaction
        $result = DB::transaction(function () use ($payload, $headers, $eventId, $txRef, $eventType) {
            $payment = null;
            if ($txRef) {
                $payment = Payment::query()
                    ->where('gateway_transaction_id', $txRef)
                    ->orWhere('id', is_numeric($txRef) ? (int) $txRef : 0)
                    ->lockForUpdate()
                    ->first();
            }

            if (! $payment) {
                PaymentWebhookLog::create([
                    'event_id' => $eventId,
                    'gateway_name' => 'melapays',
                    'tx_ref' => $txRef,
                    'event_type' => $eventType,
                    'payload' => $payload,
                    'headers' => $headers,
                    'status' => 'payment_not_found',
                    'processed_at' => now(),
                ]);

                return [
                    'status' => 'error',
                    'message' => 'Payment record not found for reference: ' . $txRef,
                    'code' => 404,
                ];
            }

            // Check if payment is already in terminal state for idempotency
            $isSuccessEvent = in_array($eventType, ['payment.success', 'successful', 'success', 'paid', 'completed']);
            $isFailedEvent = in_array($eventType, ['payment.failed', 'failed', 'cancelled', 'expired']);

            if ($payment->status === PaymentStatus::Successful && $isSuccessEvent) {
                PaymentWebhookLog::create([
                    'event_id' => $eventId,
                    'gateway_name' => 'melapays',
                    'tx_ref' => $txRef,
                    'event_type' => $eventType,
                    'payload' => $payload,
                    'headers' => $headers,
                    'status' => 'duplicate',
                    'processed_at' => now(),
                ]);

                return [
                    'status' => 'ignored',
                    'message' => 'Payment was already processed as successful.',
                    'code' => 200,
                ];
            }

            $beforePayment = $payment->toArray();

            if ($isSuccessEvent) {
                $payment->update([
                    'status' => PaymentStatus::Successful,
                    'paid_at' => now(),
                    'metadata' => array_merge($payment->metadata ?? [], ['webhook_payload' => $payload]),
                ]);

                $this->auditLogService->log(
                    'payment_successful',
                    $payment,
                    $beforePayment,
                    $payment->refresh()->toArray(),
                    null
                );

                // Update application status
                $application = $payment->application;
                if ($application && in_array($application->status, [ApplicationStatus::Submitted, ApplicationStatus::PaymentPending])) {
                    $beforeApp = $application->toArray();
                    $application->forceFill(['status' => ApplicationStatus::Paid])->save();

                    $this->auditLogService->log(
                        'application_paid',
                        $application,
                        $beforeApp,
                        $application->refresh()->toArray(),
                        null
                    );
                }

                // Generate receipt document confirmation record
                if ($application && ! \App\Models\Document::query()->where('application_id', $application->id)->where('type', \App\Enums\DocumentType::Receipt->value)->exists()) {
                    \App\Models\Document::create([
                        'application_id' => $application->id,
                        'student_id' => $payment->student_id,
                        'type' => \App\Enums\DocumentType::Receipt->value,
                        'file_path' => 'receipts/receipt_app_' . $application->id . '_pay_' . $payment->id . '.pdf',
                        'uploaded_at' => now(),
                    ]);
                }

                event(new PaymentStatusChanged($payment, $payment->status));

                $logStatus = 'processed';
            } elseif ($isFailedEvent) {
                $payment->update([
                    'status' => $eventType === 'cancelled' ? PaymentStatus::Cancelled : PaymentStatus::Failed,
                    'metadata' => array_merge($payment->metadata ?? [], ['webhook_payload' => $payload]),
                ]);

                $this->auditLogService->log(
                    'payment_failed',
                    $payment,
                    $beforePayment,
                    $payment->refresh()->toArray(),
                    null
                );

                event(new PaymentStatusChanged($payment, $payment->status));

                $logStatus = 'processed';
            } else {
                $logStatus = 'unhandled_event';
            }

            PaymentWebhookLog::create([
                'event_id' => $eventId,
                'gateway_name' => 'melapays',
                'tx_ref' => $txRef,
                'event_type' => $eventType,
                'payload' => $payload,
                'headers' => $headers,
                'status' => $logStatus,
                'processed_at' => now(),
            ]);

            return [
                'status' => 'success',
                'message' => 'Webhook processed successfully.',
                'code' => 200,
            ];
        });

        return response()->json([
            'status' => $result['status'],
            'message' => $result['message'],
            'tx_ref' => $txRef,
        ], $result['code'] ?? 200);
    }
}

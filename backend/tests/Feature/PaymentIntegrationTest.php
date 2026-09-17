<?php

namespace Tests\Feature;

use App\Enums\ApplicationStatus;
use App\Enums\PaymentStatus;
use App\Enums\ProgramStatus;
use App\Enums\UserRole;
use App\Events\PaymentStatusChanged;
use App\Models\Application;
use App\Models\AuditLog;
use App\Models\Document;
use App\Models\Payment;
use App\Models\PaymentWebhookLog;
use App\Models\Program;
use App\Models\User;
use App\Services\MelapaysService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Client\Request as ClientRequest;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class PaymentIntegrationTest extends TestCase
{
    use RefreshDatabase;

    private User $studentUser;
    private User $registrarUser;
    private Application $application;

    protected function setUp(): void
    {
        parent::setUp();

        $this->studentUser = User::factory()->create([
            'role' => UserRole::STUDENT->value,
            'email' => 'applicant@example.com',
        ]);

        $this->registrarUser = User::factory()->create([
            'role' => UserRole::REGISTRAR->value,
            'email' => 'registrar@example.com',
        ]);

        $program = Program::create([
            'name' => 'Professional Makeup Artistry',
            'slug' => 'professional-makeup-artistry',
            'description' => 'Comprehensive course',
            'category' => 'Artistry',
            'level' => 'Beginner',
            'status' => ProgramStatus::Open,
            'tuition_fee' => 1500.00,
            'fee_currency' => 'ETB',
            'duration_weeks' => 12,
        ]);

        $this->application = Application::create([
            'reference_number' => 'APP-2026-000001',
            'program_id' => $program->id,
            'applicant_name' => 'John Doe',
            'applicant_email' => 'applicant@example.com',
            'applicant_phone' => '+251911223344',
            'status' => ApplicationStatus::Submitted,
            'submitted_at' => now(),
        ]);
    }

    public function test_student_can_initiate_payment_for_submitted_application(): void
    {
        Http::fake([
            'https://84.247.186.98.nip.io/api/v1/payment/initialize' => Http::response([
                'success' => true,
                'checkout_url' => 'https://84.247.186.98.nip.io/checkout/test12345',
                'message' => 'Payment initialized',
            ], 200),
        ]);

        $response = $this->actingAs($this->studentUser)
            ->postJson('/api/payments/initiate', [
                'application_id' => $this->application->id,
            ]);

        $response->assertStatus(201)
            ->assertJsonPath('status', 'success')
            ->assertJsonPath('data.application_id', $this->application->id)
            ->assertJsonPath('data.amount', '1500.00')
            ->assertJsonPath('data.currency', 'ETB')
            ->assertJsonPath('data.checkout_url', 'https://84.247.186.98.nip.io/checkout/test12345')
            ->assertJsonPath('data.gateway_name', 'melapays');

        // Assert exact HTTP call sent to Melapays gateway
        Http::assertSent(function (ClientRequest $request) {
            return $request->url() === 'https://84.247.186.98.nip.io/api/v1/payment/initialize' &&
                $request->hasHeader('Authorization', 'Bearer sk_test_FIIA6jEIBvkR9TlEmtwnIvIugv7EGwGZo8eUxhqIY') &&
                $request['amount'] == 1500 &&
                $request['currency'] === 'ETB' &&
                str_starts_with($request['tx_ref'], 'PAY-APP-' . $this->application->id);
        });

        $this->assertDatabaseHas('applications', [
            'id' => $this->application->id,
            'status' => ApplicationStatus::PaymentPending->value,
        ]);

        $this->assertDatabaseHas('payments', [
            'application_id' => $this->application->id,
            'amount' => 1500.00,
            'currency' => 'ETB',
            'status' => PaymentStatus::Pending->value,
            'gateway_name' => 'melapays',
            'checkout_url' => 'https://84.247.186.98.nip.io/checkout/test12345',
        ]);

        $this->assertDatabaseHas('audit_logs', [
            'action' => 'payment_initiated',
            'target_type' => Payment::class,
        ]);
    }

    public function test_payment_initiation_fails_for_draft_or_already_paid_application(): void
    {
        $this->application->update(['status' => ApplicationStatus::Paid]);

        $response = $this->actingAs($this->studentUser)
            ->postJson('/api/payments/initiate', [
                'application_id' => $this->application->id,
            ]);

        $response->assertStatus(422)
            ->assertJsonPath('status', 'error');
    }

    public function test_authentic_webhook_updates_payment_and_application_status(): void
    {
        Event::fake([PaymentStatusChanged::class]);

        $payment = Payment::create([
            'application_id' => $this->application->id,
            'amount' => 1500.00,
            'currency' => 'ETB',
            'status' => PaymentStatus::Pending,
            'gateway_name' => 'melapays',
            'gateway_transaction_id' => 'TX-TEST-1001',
        ]);

        $this->application->update(['status' => ApplicationStatus::PaymentPending]);

        $secret = config('services.melapays.webhook_secret');
        $payload = [
            'event_id' => 'evt_1001',
            'event' => 'payment.success',
            'tx_ref' => 'TX-TEST-1001',
            'amount' => 1500,
            'status' => 'successful',
        ];

        $jsonPayload = json_encode($payload);
        $signature = hash_hmac('sha256', $jsonPayload, $secret);

        $response = $this->call(
            'POST',
            '/api/payments/webhook',
            [],
            [],
            [],
            [
                'HTTP_X-Melapays-Signature' => $signature,
                'CONTENT_TYPE' => 'application/json',
            ],
            $jsonPayload
        );

        $response->assertStatus(200)
            ->assertJsonPath('status', 'success')
            ->assertJsonPath('tx_ref', 'TX-TEST-1001');

        $this->assertDatabaseHas('payments', [
            'id' => $payment->id,
            'status' => PaymentStatus::Successful->value,
        ]);

        $this->assertDatabaseHas('applications', [
            'id' => $this->application->id,
            'status' => ApplicationStatus::Paid->value,
        ]);

        $this->assertDatabaseHas('payment_webhook_logs', [
            'event_id' => 'evt_1001',
            'tx_ref' => 'TX-TEST-1001',
            'status' => 'processed',
        ]);

        $this->assertDatabaseHas('documents', [
            'application_id' => $this->application->id,
            'type' => \App\Enums\DocumentType::Receipt->value,
        ]);

        $this->assertDatabaseHas('audit_logs', [
            'action' => 'payment_successful',
            'target_type' => Payment::class,
        ]);

        $this->assertDatabaseHas('audit_logs', [
            'action' => 'application_paid',
            'target_type' => Application::class,
        ]);

        Event::assertDispatched(PaymentStatusChanged::class);
    }

    public function test_webhook_verification_with_bearer_token_or_secret_header(): void
    {
        $payment = Payment::create([
            'application_id' => $this->application->id,
            'amount' => 1500.00,
            'currency' => 'ETB',
            'status' => PaymentStatus::Pending,
            'gateway_name' => 'melapays',
            'gateway_transaction_id' => 'TX-TEST-BEARER-1',
        ]);

        $secretKey = config('services.melapays.secret_key');
        $payload = [
            'event_id' => 'evt_bearer_1',
            'event' => 'payment.success',
            'tx_ref' => 'TX-TEST-BEARER-1',
            'status' => 'successful',
        ];

        // Test with Authorization Bearer header matching secret key
        $response = $this->postJson('/api/payments/webhook', $payload, [
            'Authorization' => 'Bearer ' . $secretKey,
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('status', 'success');

        $this->assertDatabaseHas('payments', [
            'id' => $payment->id,
            'status' => PaymentStatus::Successful->value,
        ]);
    }

    public function test_duplicate_webhook_delivery_is_idempotent(): void
    {
        $payment = Payment::create([
            'application_id' => $this->application->id,
            'amount' => 1500.00,
            'currency' => 'ETB',
            'status' => PaymentStatus::Pending,
            'gateway_name' => 'melapays',
            'gateway_transaction_id' => 'TX-TEST-1002',
        ]);

        $secret = config('services.melapays.webhook_secret');
        $payload = [
            'event_id' => 'evt_1002',
            'event' => 'payment.success',
            'tx_ref' => 'TX-TEST-1002',
            'amount' => 1500,
            'status' => 'successful',
        ];

        $jsonPayload = json_encode($payload);
        $signature = hash_hmac('sha256', $jsonPayload, $secret);

        // First delivery
        $response1 = $this->call('POST', '/api/payments/webhook', [], [], [], [
            'HTTP_X-Melapays-Signature' => $signature,
            'CONTENT_TYPE' => 'application/json',
        ], $jsonPayload);

        $response1->assertStatus(200)->assertJsonPath('status', 'success');

        // Second duplicate delivery
        $response2 = $this->call('POST', '/api/payments/webhook', [], [], [], [
            'HTTP_X-Melapays-Signature' => $signature,
            'CONTENT_TYPE' => 'application/json',
        ], $jsonPayload);

        $response2->assertStatus(200)->assertJsonPath('status', 'ignored');

        // Verify only 1 audit log for payment_successful
        $this->assertEquals(1, AuditLog::query()->where('action', 'payment_successful')->where('target_id', $payment->id)->count());

        // Verify duplicate log recorded
        $this->assertDatabaseHas('payment_webhook_logs', [
            'event_id' => 'evt_1002',
            'status' => 'duplicate',
        ]);
    }

    public function test_webhook_with_invalid_signature_is_rejected(): void
    {
        $payload = [
            'event_id' => 'evt_9999',
            'event' => 'payment.success',
            'tx_ref' => 'TX-INVALID',
        ];

        $response = $this->postJson('/api/payments/webhook', $payload, [
            'X-Melapays-Signature' => 'invalid_signature_hash',
        ]);

        $response->assertStatus(401)
            ->assertJsonPath('status', 'error');

        $this->assertDatabaseHas('payment_webhook_logs', [
            'event_id' => 'evt_9999',
            'status' => 'invalid_signature',
        ]);
    }

    public function test_webhook_with_failed_status_updates_payment_to_failed(): void
    {
        $payment = Payment::create([
            'application_id' => $this->application->id,
            'amount' => 1500.00,
            'currency' => 'ETB',
            'status' => PaymentStatus::Pending,
            'gateway_name' => 'melapays',
            'gateway_transaction_id' => 'TX-TEST-1003',
        ]);

        $secret = config('services.melapays.webhook_secret');
        $payload = [
            'event_id' => 'evt_1003',
            'event' => 'payment.failed',
            'tx_ref' => 'TX-TEST-1003',
            'status' => 'failed',
        ];

        $jsonPayload = json_encode($payload);
        $signature = hash_hmac('sha256', $jsonPayload, $secret);

        $response = $this->call('POST', '/api/payments/webhook', [], [], [], [
            'HTTP_X-Melapays-Signature' => $signature,
            'CONTENT_TYPE' => 'application/json',
        ], $jsonPayload);

        $response->assertStatus(200)->assertJsonPath('status', 'success');

        $this->assertDatabaseHas('payments', [
            'id' => $payment->id,
            'status' => PaymentStatus::Failed->value,
        ]);

        $this->assertDatabaseHas('audit_logs', [
            'action' => 'payment_failed',
            'target_type' => Payment::class,
        ]);
    }

    public function test_registrar_can_manually_verify_pending_payment(): void
    {
        $payment = Payment::create([
            'application_id' => $this->application->id,
            'amount' => 1500.00,
            'currency' => 'ETB',
            'status' => PaymentStatus::Pending,
            'gateway_name' => 'melapays',
            'gateway_transaction_id' => 'TX-TEST-MANUAL-VERIFY',
        ]);

        $response = $this->actingAs($this->registrarUser)
            ->postJson("/api/registrar/payments/{$payment->id}/verify");

        $response->assertStatus(200);

        $this->assertDatabaseHas('payments', [
            'id' => $payment->id,
            'status' => PaymentStatus::Successful->value,
        ]);

        $this->assertDatabaseHas('applications', [
            'id' => $this->application->id,
            'status' => ApplicationStatus::Paid->value,
        ]);

        $this->assertDatabaseHas('documents', [
            'application_id' => $this->application->id,
            'type' => \App\Enums\DocumentType::Receipt->value,
        ]);
    }
}

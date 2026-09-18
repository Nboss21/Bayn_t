<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class MelapaysService
{
    private string $baseUrl;

    private string $secretKey;

    private string $publishableKey;

    private string $webhookSecret;

    private string $mode;

    public function __construct()
    {
        $config = config('services.melapays', []);
        $this->mode = $config['mode'] ?? 'sandbox';
        $this->baseUrl = rtrim($config['base_url'] ?? 'https://84.247.186.98.nip.io', '/');
        $this->secretKey = $config['secret_key'] ?? '';
        $this->publishableKey = $config['publishable_key'] ?? '';
        $this->webhookSecret = $config['webhook_secret'] ?: $this->secretKey;
    }

    /**
     * Initialize payment with Melapays gateway.
     *
     * @param  array{amount: float|int, currency: string, tx_ref: string, callback_url: string, return_url?: string}  $data
     * @return array{success: bool, checkout_url: ?string, tx_ref: string, message: ?string, raw: array}
     */
    public function initializePayment(array $data): array
    {
        $endpoint = $this->baseUrl.'/api/v1/payment/initialize';

        $payload = [
            'amount' => (float) $data['amount'],
            'currency' => $data['currency'] ?? 'ETB',
            'tx_ref' => $data['tx_ref'],
            'callback_url' => $data['callback_url'],
        ];

        if (isset($data['return_url'])) {
            $payload['return_url'] = $data['return_url'];
        }

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer '.$this->secretKey,
                'Content-Type' => 'application/json',
                'Accept' => 'application/json',
            ])->timeout(15)->post($endpoint, $payload);

            $responseData = $response->json() ?? [];

            if ($response->successful()) {
                $checkoutUrl = $responseData['checkout_url']
                    ?? $responseData['payment_url']
                    ?? $responseData['redirect_url']
                    ?? $responseData['data']['checkout_url']
                    ?? $responseData['data']['payment_url']
                    ?? null;

                return [
                    'success' => true,
                    'checkout_url' => $checkoutUrl,
                    'tx_ref' => $data['tx_ref'],
                    'message' => $responseData['message'] ?? 'Payment initialized',
                    'raw' => $responseData,
                ];
            }

            Log::error('Melapays initialization failed', [
                'status' => $response->status(),
                'response' => $responseData,
                'tx_ref' => $data['tx_ref'],
            ]);

            return [
                'success' => false,
                'checkout_url' => null,
                'tx_ref' => $data['tx_ref'],
                'message' => $responseData['message'] ?? 'Gateway request failed with HTTP '.$response->status(),
                'raw' => $responseData,
            ];
        } catch (\Throwable $e) {
            Log::error('Melapays initialization exception', [
                'error' => $e->getMessage(),
                'tx_ref' => $data['tx_ref'],
            ]);

            return [
                'success' => false,
                'checkout_url' => null,
                'tx_ref' => $data['tx_ref'],
                'message' => 'Failed to connect to payment gateway: '.$e->getMessage(),
                'raw' => [],
            ];
        }
    }

    /**
     * Verify webhook authenticity using signature header, secret header, or token parameter.
     */
    public function verifyWebhookAuthenticity(Request $request): bool
    {
        // 1. Signature Header verification (X-Melapays-Signature)
        $signature = $request->header('X-Melapays-Signature') ?? $request->header('X-Signature');
        if (! empty($signature) && ! empty($this->webhookSecret)) {
            $computedSignature = hash_hmac('sha256', $request->getContent(), $this->webhookSecret);
            if (hash_equals($computedSignature, $signature)) {
                return true;
            }
        }

        // 2. Secret Header verification (X-Webhook-Secret or Authorization header match)
        $secretHeader = $request->header('X-Webhook-Secret') ?? $request->header('X-Api-Key');
        if (! empty($secretHeader) && ! empty($this->webhookSecret)) {
            if (hash_equals($this->webhookSecret, $secretHeader)) {
                return true;
            }
        }

        $authHeader = $request->header('Authorization');
        if (! empty($authHeader)) {
            $token = str_replace('Bearer ', '', $authHeader);
            if (! empty($token) && (hash_equals($this->secretKey, $token) || hash_equals($this->webhookSecret, $token))) {
                return true;
            }
        }

        // 3. Secret in payload verification (if provided in payload)
        $payloadSecret = $request->input('secret') ?? $request->input('webhook_secret');
        if (! empty($payloadSecret) && ! empty($this->webhookSecret)) {
            if (hash_equals($this->webhookSecret, $payloadSecret)) {
                return true;
            }
        }

        // 4. In sandbox / testing mode without explicit signature, allow if configured secret is set or matching secret key in query/header
        if ($this->mode === 'sandbox' && app()->environment(['local', 'testing'])) {
            $sandboxToken = $request->query('secret') ?? $request->header('X-Sandbox-Token');
            if ($sandboxToken === $this->webhookSecret || $sandboxToken === 'test_token') {
                return true;
            }
        }

        return false;
    }

    public function getPublishableKey(): string
    {
        return $this->publishableKey;
    }

    public function getMode(): string
    {
        return $this->mode;
    }
}

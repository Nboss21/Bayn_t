# Melapays Payment Gateway Integration Guide

This document provides the complete integration specification, API reference, configuration details, idempotency strategy, and frontend integration steps for the backend **Melapays** payment gateway integration.

---

## 1. Environment Configuration

### Sandbox vs. Production Configuration
The gateway configuration is specified in `config/services.php` and loaded from environment variables in `.env`.

```env
# Sandbox Mode
MELAPAYS_MODE=sandbox
MELAPAYS_BASE_URL=https://84.247.186.98.nip.io
MELAPAYS_PUBLISHABLE_KEY=pk_test_ngKXPJGySrXlpidcKXeYwP9w54wJI7XUCut5PEs1
MELAPAYS_SECRET_KEY=sk_test_FIIA6jEIBvkR9TlEmtwnIvIugv7EGwGZo8eUxhqIY
MELAPAYS_WEBHOOK_SECRET=sk_test_FIIA6jEIBvkR9TlEmtwnIvIugv7EGwGZo8eUxhqIY
```

```env
# Production Mode
MELAPAYS_MODE=production
MELAPAYS_BASE_URL=https://api.melapays.com
MELAPAYS_PUBLISHABLE_KEY=pk_live_your_live_publishable_key
MELAPAYS_SECRET_KEY=sk_live_your_live_secret_key
MELAPAYS_WEBHOOK_SECRET=whsec_your_live_webhook_secret
```

> **Security Note**: Never expose `MELAPAYS_SECRET_KEY` or `MELAPAYS_WEBHOOK_SECRET` on client applications or frontend repositories. Only `MELAPAYS_PUBLISHABLE_KEY` is safe for browser usage.

---

## 2. Backend API Reference for Payment Integration

### A. Initiate Payment
**Endpoint**: `POST /api/payments/initiate`  
**Authentication**: Required (`Bearer <sanctum_token>`)  

#### Request Body
```json
{
  "application_id": 12,
  "callback_url": "https://yourdomain.com/api/payments/webhook",
  "return_url": "https://yourdomain.com/applications/12/status"
}
```

#### Successful Response (`201 Created`)
```json
{
  "status": "success",
  "message": "Payment initiated successfully.",
  "data": {
    "payment_id": 45,
    "application_id": 12,
    "reference_number": "APP-2026-000012",
    "amount": "1500.00",
    "currency": "ETB",
    "tx_ref": "PAY-APP-12-1726242948-AB1234",
    "checkout_url": "https://84.247.186.98.nip.io/checkout/...",
    "gateway_name": "melapays",
    "publishable_key": "pk_test_ngKXPJGySrXlpidcKXeYwP9w54wJI7XUCut5PEs1",
    "mode": "sandbox"
  }
}
```

#### Application & Payment State Changes
1. Application status transitions from `submitted` to `payment_pending`.
2. A Payment record is created with `status = pending` and unique `tx_ref`.
3. Action is audited in `audit_logs`.

---

### B. Payment Webhook Handler
**Endpoint**: `POST /api/payments/webhook`  
**Authentication**: Public / Gateway Signature Verified  

#### Security & Authenticity Verification
The webhook handler verifies authenticity using one of the following methods:
1. `X-Melapays-Signature` header containing HMAC SHA-256 signature calculated over raw body using `MELAPAYS_WEBHOOK_SECRET`.
2. `X-Webhook-Secret` or `Authorization: Bearer <secret>` header matching `MELAPAYS_WEBHOOK_SECRET`.

#### Sample Webhook Payload
```json
{
  "event_id": "evt_987654321",
  "event": "payment.success",
  "tx_ref": "PAY-APP-12-1726242948-AB1234",
  "amount": 1500,
  "currency": "ETB",
  "status": "successful"
}
```

---

## 3. Idempotency & Security Strategy

To guarantee that duplicate gateway event retries do not trigger double-updates or inconsistent application states:

1. **Transaction & Event Deduplication**:
   - Each incoming webhook logs to `payment_webhook_logs`.
   - If an `event_id` or `tx_ref` has already been processed, the handler logs status `duplicate` and returns `HTTP 200 OK` with `{"status": "ignored"}`.
2. **Database Row Locks**:
   - Updates run within a database transaction using `lockForUpdate()` on the target `Payment` record.
3. **Audit Trail**:
   - Every status transition (e.g. `payment_successful`, `application_paid`, `payment_failed`) writes a immutable record into `audit_logs`.
4. **No Raw Card Storage**:
   - No raw card or bank account credentials are ingested or stored. Payments are tokenized and processed on hosted fields/checkout pages provided by Melapays.

---

## 4. Frontend Integration Workflow

Step-by-step instructions for frontend developers:

1. **Step 1: User Submits Application**
   - The user completes the application form and calls `POST /api/applications/{id}/submit`.

2. **Step 2: Initiate Payment Request**
   - When the user clicks **"Proceed to Payment"**, send a request to the backend:
     ```javascript
     const res = await fetch('/api/payments/initiate', {
       method: 'POST',
       headers: {
         'Authorization': `Bearer ${userToken}`,
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         application_id: applicationId,
         return_url: `${window.location.origin}/applications/${applicationId}/status`
       })
     });
     const data = await res.json();
     ```

3. **Step 3: Redirect to Checkout URL**
   - If `data.status === 'success'`, redirect the user to `data.data.checkout_url`:
     ```javascript
     window.location.href = data.data.checkout_url;
     ```

4. **Step 4: Status Polling / Redirect Handling**
   - After checkout completes, Melapays redirects the user back to your `return_url`.
   - Frontend polls or checks status at `GET /api/applications/{id}` (or `GET /api/applications/{id}/status`).
   - Payment status will be confirmed asynchronously server-to-server via the webhook handler (`POST /api/payments/webhook`).

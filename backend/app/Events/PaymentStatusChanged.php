<?php

namespace App\Events;

use App\Enums\PaymentStatus;
use App\Models\Payment;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PaymentStatusChanged
{
    use Dispatchable, SerializesModels;

    public function __construct(
        public Payment $payment,
        public PaymentStatus|string $status,
    ) {}
}

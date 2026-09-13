<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'application_id' => $this->application_id,
            'student_id' => $this->student_id,
            'amount' => $this->amount,
            'currency' => $this->currency,
            'status' => $this->status?->value,
            'gateway_name' => $this->gateway_name,
            'gateway_transaction_id' => $this->gateway_transaction_id,
            'paid_at' => $this->paid_at,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}

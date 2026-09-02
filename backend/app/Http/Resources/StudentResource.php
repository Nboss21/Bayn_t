<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'application_id' => $this->application_id,
            'user' => new UserResource($this->whenLoaded('user')),
            'status' => $this->status?->value,
            'enrolled_at' => $this->enrolled_at,
            'class' => new ClassResource($this->whenLoaded('schoolClass')),
            'application' => new ApplicationResource($this->whenLoaded('application')),
            'payments' => PaymentResource::collection($this->whenLoaded('payments')),
            'documents' => DocumentResource::collection($this->whenLoaded('documents')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ApplicationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'reference_number' => $this->reference_number,
            'applicant_name' => $this->applicant_name,
            'applicant_email' => $this->applicant_email,
            'applicant_phone' => $this->applicant_phone,
            'status' => $this->status?->value,
            'rejection_reason' => $this->rejection_reason,
            'reviewed_by' => new UserResource($this->whenLoaded('reviewedBy')),
            'submitted_at' => $this->submitted_at,
            'program' => new ProgramResource($this->whenLoaded('program')),
            'intake' => new IntakeResource($this->whenLoaded('intake')),
            'payments' => PaymentResource::collection($this->whenLoaded('payments')),
            'documents' => DocumentResource::collection($this->whenLoaded('documents')),
            'student' => new StudentResource($this->whenLoaded('student')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}

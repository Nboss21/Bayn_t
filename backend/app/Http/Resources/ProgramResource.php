<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProgramResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'category' => $this->category,
            'level' => $this->level,
            'status' => $this->status?->value,
            'tuition_fee' => $this->tuition_fee,
            'fee_currency' => $this->fee_currency,
            'duration_weeks' => $this->duration_weeks,
            'intakes' => IntakeResource::collection($this->whenLoaded('intakes')),
            'classes' => ClassResource::collection($this->whenLoaded('classes')),
            'teachers' => UserResource::collection($this->whenLoaded('teachers')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}

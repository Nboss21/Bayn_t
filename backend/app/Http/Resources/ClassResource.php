<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClassResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'program_id' => $this->program_id,
            'intake_id' => $this->intake_id,
            'teacher_id' => $this->teacher_id,
            'name' => $this->name,
            'capacity' => $this->capacity,
            'schedule' => $this->schedule,
            'program' => new ProgramResource($this->whenLoaded('program')),
            'intake' => new IntakeResource($this->whenLoaded('intake')),
            'teacher' => new UserResource($this->whenLoaded('teacher')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}

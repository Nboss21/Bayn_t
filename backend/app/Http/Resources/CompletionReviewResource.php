<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CompletionReviewResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'student_id' => $this->student_id,
            'student' => $this->whenLoaded('student', fn () => [
                'id' => $this->student->id,
                'name' => $this->student->user?->name,
                'email' => $this->student->user?->email,
            ]),
            'class' => $this->whenLoaded('schoolClass', fn () => [
                'id' => $this->schoolClass->id,
                'name' => $this->schoolClass->name,
                'program' => $this->schoolClass->program?->name,
                'schedule' => $this->schoolClass->schedule,
            ]),
            'teacher' => $this->whenLoaded('teacher', fn () => ['id' => $this->teacher->id, 'name' => $this->teacher->name]),
            'reviewer' => $this->whenLoaded('reviewer', fn () => ['id' => $this->reviewer->id, 'name' => $this->reviewer->name]),
            'status' => $this->status?->value,
            'review_comment' => $this->review_comment,
            'snapshot' => $this->snapshot,
            'submitted_at' => $this->submitted_at,
            'reviewed_at' => $this->reviewed_at,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}

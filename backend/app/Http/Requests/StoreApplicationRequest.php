<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreApplicationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->isStudent() === true;
    }

    public function rules(): array
    {
        return [
            'program_id' => ['nullable', 'integer', 'exists:programs,id'],
            'intake_id' => ['nullable', 'integer', 'exists:intakes,id'],
            'applicant_name' => ['nullable', 'string', 'max:255'],
            'applicant_phone' => ['nullable', 'string', 'max:50'],
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator): void {
            if ($this->filled('program_id') && $this->filled('intake_id') &&
                ! \App\Models\Intake::query()->whereKey($this->integer('intake_id'))
                    ->where('program_id', $this->integer('program_id'))->exists()) {
                $validator->errors()->add('intake_id', 'The intake must belong to the selected program.');
            }
        });
    }
}

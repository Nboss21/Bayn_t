<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateApplicationStepRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('update', $this->route('application')) === true;
    }

    public function rules(): array
    {
        return [
            'program_id' => ['sometimes', 'nullable', 'integer', 'exists:programs,id'],
            'intake_id' => ['sometimes', 'nullable', 'integer', 'exists:intakes,id'],
            'applicant_name' => ['sometimes', 'nullable', 'string', 'max:255'],
            'applicant_phone' => ['sometimes', 'nullable', 'string', 'max:50'],
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator): void {
            $programId = $this->input('program_id', $this->route('application')->program_id);
            $intakeId = $this->input('intake_id', $this->route('application')->intake_id);
            if ($programId && $intakeId && ! \App\Models\Intake::query()->whereKey($intakeId)->where('program_id', $programId)->exists()) {
                $validator->errors()->add('intake_id', 'The intake must belong to the selected program.');
            }
        });
    }
}

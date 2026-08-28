<?php

namespace App\Http\Requests;

use App\Enums\IntakeStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class UpdateIntakeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'program_id' => ['sometimes', 'required', 'integer', 'exists:programs,id'],
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'start_date' => ['sometimes', 'required', 'date'],
            'end_date' => ['sometimes', 'required', 'date', 'after_or_equal:start_date'],
            'status' => ['sometimes', 'required', Rule::enum(IntakeStatus::class)],
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator): void {
            $startDate = $this->input('start_date', $this->route('intake')?->start_date?->toDateString());
            $endDate = $this->input('end_date', $this->route('intake')?->end_date?->toDateString());

            if ($startDate && $endDate && strtotime($endDate) < strtotime($startDate)) {
                $validator->errors()->add('end_date', 'The end date must be on or after the start date.');
            }
        });
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateClassRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'program_id' => ['sometimes', 'required', 'integer', 'exists:programs,id'],
            'intake_id' => ['sometimes', 'required', 'integer', 'exists:intakes,id'],
            'teacher_id' => ['sometimes', 'nullable', 'integer', 'exists:users,id'],
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'capacity' => ['sometimes', 'required', 'integer', 'min:1'],
            'schedule' => ['sometimes', 'required', 'array'],
        ];
    }
}

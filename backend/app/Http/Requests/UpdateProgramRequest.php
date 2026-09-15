<?php

namespace App\Http\Requests;

use App\Enums\ProgramStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProgramRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $program = $this->route('program');

        return [
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'slug' => ['sometimes', 'required', 'string', 'max:255', Rule::unique('programs', 'slug')->ignore($program)],
            'description' => ['sometimes', 'nullable', 'string'],
            'category' => ['sometimes', 'required', 'string', 'max:255'],
            'level' => ['sometimes', 'required', 'string', 'max:255'],
            'status' => ['sometimes', 'required', Rule::enum(ProgramStatus::class)],
            'tuition_fee' => ['sometimes', 'required', 'numeric', 'min:0'],
            'fee_currency' => ['sometimes', 'required', 'string', 'max:10'],
            'duration_weeks' => ['sometimes', 'required', 'integer', 'min:1'],
        ];
    }
}

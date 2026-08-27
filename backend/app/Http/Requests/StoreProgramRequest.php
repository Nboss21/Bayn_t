<?php

namespace App\Http\Requests;

use App\Enums\ProgramStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProgramRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:programs,slug'],
            'description' => ['nullable', 'string'],
            'category' => ['required', 'string', 'max:255'],
            'level' => ['required', 'string', 'max:255'],
            'status' => ['required', Rule::enum(ProgramStatus::class)],
            'tuition_fee' => ['required', 'numeric', 'min:0'],
            'fee_currency' => ['required', 'string', 'max:10'],
            'duration_weeks' => ['required', 'integer', 'min:1'],
        ];
    }
}

<?php

namespace App\Http\Requests;

use App\Enums\StudentStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateStudentStatusRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return ['status' => ['required', Rule::enum(StudentStatus::class)]];
    }
}

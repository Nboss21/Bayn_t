<?php

namespace App\Http\Requests;

use App\Enums\ApplicationStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ReviewApplicationRequest extends FormRequest
{
    public function authorize(): bool { return $this->user()?->can('approve', $this->route('application')) === true; }

    public function rules(): array
    {
        return [
            'status' => ['required', Rule::enum(ApplicationStatus::class)],
            'rejection_reason' => ['nullable', 'string', 'max:5000', 'required_if:status,rejected'],
        ];
    }
}

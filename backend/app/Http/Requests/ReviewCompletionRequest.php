<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ReviewCompletionRequest extends FormRequest
{
    public function authorize(): bool { return $this->user()?->isRegistrar() || $this->user()?->isSuperAdmin(); }

    public function rules(): array
    {
        return [
            'status' => ['required', Rule::in(['approved', 'needs_correction'])],
            'review_comment' => ['nullable', 'string', 'max:5000', Rule::requiredIf(fn () => $this->input('status') === 'needs_correction')],
        ];
    }
}

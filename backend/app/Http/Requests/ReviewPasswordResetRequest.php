<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReviewPasswordResetRequest extends FormRequest
{
    public function authorize(): bool { return $this->user()?->isSuperAdmin() === true; }

    public function rules(): array
    {
        return [
            'admin_comment' => ['nullable', 'string', 'max:5000'],
            'temporary_password' => ['nullable', 'string', 'min:8'],
        ];
    }
}

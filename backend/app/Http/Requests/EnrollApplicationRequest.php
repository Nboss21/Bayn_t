<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EnrollApplicationRequest extends FormRequest
{
    public function authorize(): bool { return $this->user()?->can('assignClass', $this->route('application')) === true; }

    public function rules(): array
    {
        return ['class_id' => ['required', 'integer', Rule::exists('classes', 'id')]];
    }
}

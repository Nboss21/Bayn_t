<?php

namespace App\Http\Requests;

use App\Enums\AttendanceStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAttendanceRequest extends FormRequest
{
    public function authorize(): bool { return $this->user()?->can('update', $this->route('attendance')) === true; }

    public function rules(): array
    {
        return ['status' => ['required', Rule::enum(AttendanceStatus::class)], 'note' => ['nullable', 'string', 'max:5000']];
    }
}

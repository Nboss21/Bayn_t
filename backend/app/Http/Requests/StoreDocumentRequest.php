<?php

namespace App\Http\Requests;

use App\Enums\DocumentType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class StoreDocumentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'application_id' => ['nullable', 'required_without:student_id', 'exists:applications,id'],
            'student_id' => ['nullable', 'required_without:application_id', 'exists:students,id'],
            'type' => ['required', Rule::enum(DocumentType::class)],
            'file' => [
                'required',
                'file',
                'max:10240',
                'mimes:pdf,jpg,jpeg,png,doc,docx',
                'mimetypes:application/pdf,image/jpeg,image/png,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            ],
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator): void {
            if ($this->filled('application_id') && $this->filled('student_id')) {
                $validator->errors()->add('application_id', 'Provide either application_id or student_id, not both.');
            }
        });
    }
}

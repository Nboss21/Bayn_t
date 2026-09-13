<?php

namespace App\Services;

use App\Enums\{DocumentType, StudentStatus};
use App\Models\{Document, SiteSetting, Student};
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class DocumentGenerationService
{
    public function certificate(Student $student, int $actorId): Document
    {
        abort_unless(in_array($student->status?->value, [StudentStatus::Completed->value, StudentStatus::Graduated->value], true), 422, 'A certificate is only available for completed or graduated students.');
        return DB::transaction(function () use ($student, $actorId) {
            $previous = $student->documents()->where('type', DocumentType::Certificate->value)->get();
            foreach ($previous as $document) { Storage::disk('private_documents')->delete($document->file_path); $document->delete(); }
            $student->loadMissing(['user','application.program','application.intake','schoolClass.program','schoolClass.intake']);
            $number = 'CERT-'.now()->format('Y').'-'.strtoupper(Str::random(10));
            $settings = SiteSetting::query()->first();
            $html = view('documents.certificate', compact('student','settings','number'))->render();
            $path = "students/{$student->id}/certificates/{$number}.html";
            Storage::disk('private_documents')->put($path, $html);
            $document = Document::create(['student_id' => $student->id, 'type' => DocumentType::Certificate, 'file_path' => $path, 'uploaded_at' => now()]);
            app(AuditLogService::class)->log($previous->isEmpty() ? 'certificate.generated' : 'certificate.regenerated', $document, null, app(AuditLogService::class)->snapshot($document), $actorId);
            return $document;
        });
    }
}

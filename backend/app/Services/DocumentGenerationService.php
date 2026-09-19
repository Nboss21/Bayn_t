<?php

namespace App\Services;

use App\Enums\{DocumentType, StudentStatus};
use App\Models\{CompletionReview, Document, SiteSetting, Student};
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
            $review = CompletionReview::query()->where('student_id', $student->id)->where('status', 'approved')->latest()->first();
            $snapshot = $review?->snapshot ?? [];
            $path = "students/{$student->id}/certificates/{$number}.pdf";
            Storage::disk('private_documents')->put($path, $this->pdf($student, $settings?->institution_name ?? config('app.name'), $number, $snapshot));
            $document = Document::create(['student_id' => $student->id, 'type' => DocumentType::Certificate, 'file_path' => $path, 'uploaded_at' => now()]);
            app(AuditLogService::class)->log($previous->isEmpty() ? 'certificate.generated' : 'certificate.regenerated', $document, null, app(AuditLogService::class)->snapshot($document), $actorId);
            return $document;
        });
    }

    private function pdf(Student $student, string $institution, string $number, array $snapshot): string
    {
        $lines = [
            ['size' => 12, 'x' => 205, 'y' => 650, 'text' => strtoupper($institution)],
            ['size' => 27, 'x' => 150, 'y' => 585, 'text' => 'CERTIFICATE OF COMPLETION'],
            ['size' => 13, 'x' => 226, 'y' => 535, 'text' => 'This certifies that'],
            ['size' => 23, 'x' => 170, 'y' => 485, 'text' => $student->user?->name ?? 'Student'],
            ['size' => 13, 'x' => 150, 'y' => 435, 'text' => 'has successfully completed the'],
            ['size' => 16, 'x' => 145, 'y' => 400, 'text' => $student->schoolClass?->program?->name ?? $student->application?->program?->name ?? 'Academy program'],
            ['size' => 12, 'x' => 210, 'y' => 350, 'text' => 'Official course result'],
            ['size' => 11, 'x' => 95, 'y' => 295, 'text' => 'Final mark: '.($snapshot['marks']['total_weighted_score'] ?? '—').'%'],
            ['size' => 11, 'x' => 315, 'y' => 295, 'text' => 'Attendance: '.($snapshot['attendance']['attendance_percentage'] ?? '—').'%'],
            ['size' => 10, 'x' => 95, 'y' => 245, 'text' => 'Issued: '.now()->toFormattedDateString()],
            ['size' => 10, 'x' => 315, 'y' => 245, 'text' => 'Reference: '.$number],
        ];
        $content = "q 0.96 0.97 0.94 rg 0 0 612 792 re f Q\nq 0.10 0.23 0.18 RG 8 w 28 28 556 736 re S Q\nq 0.73 0.55 0.20 RG 2 w 42 42 528 708 re S Q\n";
        foreach ($lines as $line) {
            $content .= "BT\n/F1 {$line['size']} Tf\n{$line['x']} {$line['y']} Td\n(".$this->escape((string) $line['text']).") Tj\nET\n";
        }
        $content .= "q 0.10 0.23 0.18 RG 1 w 220 185 m 392 185 l S Q\nBT\n/F1 9 Tf\n266 168 Td\n(Registrar approval) Tj\nET\n";
        $objects = [
            '<< /Type /Catalog /Pages 2 0 R >>',
            '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
            '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
            '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
            "<< /Length ".strlen($content)." >>\nstream\n{$content}endstream",
        ];
        $pdf = "%PDF-1.4\n";
        $offsets = [0];
        foreach ($objects as $index => $object) {
            $offsets[] = strlen($pdf);
            $pdf .= ($index + 1)." 0 obj\n{$object}\nendobj\n";
        }
        $xref = strlen($pdf);
        $pdf .= "xref\n0 ".(count($objects) + 1)."\n0000000000 65535 f \n";
        for ($index = 1; $index < count($offsets); $index++) $pdf .= sprintf("%010d 00000 n \n", $offsets[$index]);
        return $pdf."trailer\n<< /Size ".(count($objects) + 1)." /Root 1 0 R >>\nstartxref\n{$xref}\n%%EOF";
    }

    private function escape(string $value): string
    {
        return str_replace(['\\', '(', ')'], ['\\\\', '\\(', '\\)'], $value);
    }
}

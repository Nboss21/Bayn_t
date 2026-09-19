<?php

namespace App\Services;

use App\Enums\DocumentType;
use App\Models\CompletionReview;
use App\Models\Document;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CompletionResultService
{
    public function generate(CompletionReview $review, int $actorId): Document
    {
        $review->loadMissing(['student.user', 'schoolClass.program']);
        $student = $review->student;
        $snapshot = $review->snapshot ?? [];
        $number = 'RESULT-'.now()->format('Y').'-'.strtoupper(Str::random(10));
        $path = "students/{$student->id}/results/{$number}.pdf";
        Storage::disk('private_documents')->put($path, $this->pdf([
            'Makeup School - Official Course Result',
            'Result reference: '.$number,
            'Student: '.($student->user?->name ?? 'Student'),
            'Program: '.($review->schoolClass?->program?->name ?? 'Program'),
            'Class: '.($review->schoolClass?->name ?? 'Class'),
            'Status: Course completed',
            'Final mark: '.($snapshot['marks']['total_weighted_score'] ?? '0').'% ',
            'Attendance: '.($snapshot['attendance']['attendance_percentage'] ?? '0').'%',
            'Approved: '.now()->toFormattedDateString(),
        ]));

        $document = Document::create([
            'student_id' => $student->id,
            'type' => DocumentType::Certificate,
            'file_path' => $path,
            'uploaded_at' => now(),
        ]);
        app(AuditLogService::class)->log('course_result.generated', $document, null, app(AuditLogService::class)->snapshot($document), $actorId);
        return $document;
    }

    private function pdf(array $lines): string
    {
        $content = "BT\n/F1 16 Tf\n72 760 Td\n";
        foreach ($lines as $index => $line) {
            if ($index > 0) $content .= "0 -28 Td\n";
            $content .= '('.$this->escape($line).") Tj\n";
        }
        $content .= "ET\n";
        $objects = [
            "<< /Type /Catalog /Pages 2 0 R >>",
            "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
            "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
            "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
            "<< /Length ".strlen($content)." >>\nstream\n{$content}endstream",
        ];
        $pdf = "%PDF-1.4\n";
        $offsets = [0];
        foreach ($objects as $number => $object) {
            $offsets[] = strlen($pdf);
            $pdf .= ($number + 1)." 0 obj\n{$object}\nendobj\n";
        }
        $xref = strlen($pdf);
        $pdf .= "xref\n0 ".(count($objects) + 1)."\n0000000000 65535 f \n";
        for ($i = 1; $i < count($offsets); $i++) $pdf .= sprintf("%010d 00000 n \n", $offsets[$i]);
        return $pdf."trailer\n<< /Size ".(count($objects) + 1)." /Root 1 0 R >>\nstartxref\n{$xref}\n%%EOF";
    }

    private function escape(string $value): string
    {
        return str_replace(['\\', '(', ')'], ['\\\\', '\\(', '\\)'], $value);
    }
}

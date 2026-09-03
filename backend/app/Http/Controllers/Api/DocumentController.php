<?php

namespace App\Http\Controllers\Api;

use App\Enums\DocumentType;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDocumentRequest;
use App\Http\Resources\DocumentResource;
use App\Models\Application;
use App\Models\Document;
use App\Models\Student;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class DocumentController extends Controller
{
    public function store(StoreDocumentRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $application = null;
        $student = null;

        if (! empty($validated['application_id'])) {
            $application = Application::query()->findOrFail($validated['application_id']);
            Gate::authorize('uploadDocument', $application);
        } else {
            $student = Student::query()->findOrFail($validated['student_id']);
            Gate::authorize('uploadDocument', $student);
        }

        $file = $request->file('file');
        $directory = $application
            ? "applications/{$application->id}"
            : "students/{$student->id}";

        $fileName = Str::uuid()->toString().'.'.$file->extension();
        $filePath = $file->storeAs($directory, $fileName, 'private_documents');

        $document = Document::create([
            'application_id' => $application?->id,
            'student_id' => $student?->id,
            'type' => DocumentType::from($validated['type']),
            'file_path' => $filePath,
            'uploaded_at' => now(),
        ]);

        return (new DocumentResource($document))->response()->setStatusCode(201);
    }

    public function temporaryUrl(Document $document): JsonResponse
    {
        $this->authorizeDocumentAccess($document, 'viewDocument');

        $expiresAt = now()->addMinutes(15);
        $temporaryUrl = Storage::disk('private_documents')->temporaryUrl($document->file_path, $expiresAt);

        return response()->json([
            'temporary_url' => $temporaryUrl,
            'expires_at' => $expiresAt->toIso8601String(),
        ]);
    }

    public function download(Request $request, Document $document): BinaryFileResponse
    {
        $path = Storage::disk('private_documents')->path($document->file_path);

        abort_unless(is_file($path), 404);

        return Storage::disk('private_documents')->download(
            $document->file_path,
            basename($document->file_path)
        );
    }

    private function authorizeDocumentAccess(Document $document, string $ability): void
    {
        if ($document->application_id) {
            Gate::authorize($ability, $document->application);

            return;
        }

        Gate::authorize($ability, $document->student);
    }
}

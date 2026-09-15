<?php

namespace Tests\Feature;

use App\Enums\DocumentType;
use App\Enums\UserRole;
use App\Models\Application;
use App\Models\Document;
use App\Models\Intake;
use App\Models\Program;
use App\Models\SchoolClass;
use App\Models\Student;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class DocumentTest extends TestCase
{
    use RefreshDatabase;

    public function test_student_can_upload_document_for_own_application(): void
    {
        Storage::fake('private_documents');

        $user = User::factory()->create([
            'email' => 'student@example.com',
            'role' => UserRole::STUDENT,
            'is_active' => true,
        ]);
        $application = $this->makeApplication($user->email);

        $response = $this->actingAs($user, 'sanctum')->postJson('/api/documents', [
            'application_id' => $application->id,
            'type' => DocumentType::IdPhoto->value,
            'file' => UploadedFile::fake()->image('id-photo.jpg'),
        ]);

        $response->assertCreated()
            ->assertJsonPath('data.application_id', $application->id)
            ->assertJsonPath('data.type', DocumentType::IdPhoto->value);

        $document = Document::query()->firstOrFail();

        $this->assertSame($application->id, $document->application_id);
        $this->assertNull($document->student_id);
        $this->assertNotEmpty($document->file_path);
        Storage::disk('private_documents')->assertExists($document->file_path);
    }

    public function test_student_can_upload_document_for_own_student_record(): void
    {
        Storage::fake('private_documents');

        $user = User::factory()->create([
            'email' => 'active-student@example.com',
            'role' => UserRole::STUDENT,
            'is_active' => true,
        ]);
        $student = $this->createStudent($user);

        $response = $this->actingAs($user, 'sanctum')->postJson('/api/documents', [
            'student_id' => $student->id,
            'type' => DocumentType::RegistrationDoc->value,
            'file' => UploadedFile::fake()->create('registration.pdf', 500, 'application/pdf'),
        ]);

        $response->assertCreated()
            ->assertJsonPath('data.student_id', $student->id)
            ->assertJsonPath('data.type', DocumentType::RegistrationDoc->value);

        $document = Document::query()->firstOrFail();
        $this->assertSame($student->id, $document->student_id);
        Storage::disk('private_documents')->assertExists($document->file_path);
    }

    public function test_document_upload_rejects_invalid_file_types_and_oversized_files(): void
    {
        Storage::fake('private_documents');

        $user = User::factory()->create([
            'email' => 'student@example.com',
            'role' => UserRole::STUDENT,
            'is_active' => true,
        ]);
        $application = $this->makeApplication($user->email);

        $this->actingAs($user, 'sanctum')->postJson('/api/documents', [
            'application_id' => $application->id,
            'type' => DocumentType::IdPhoto->value,
            'file' => UploadedFile::fake()->create('malware.exe', 10, 'application/x-msdownload'),
        ])->assertUnprocessable()->assertJsonValidationErrors(['file']);

        $this->actingAs($user, 'sanctum')->postJson('/api/documents', [
            'application_id' => $application->id,
            'type' => DocumentType::IdPhoto->value,
            'file' => UploadedFile::fake()->create('too-large.pdf', 11000, 'application/pdf'),
        ])->assertUnprocessable()->assertJsonValidationErrors(['file']);
    }

    public function test_user_cannot_upload_document_for_another_students_record(): void
    {
        Storage::fake('private_documents');

        $owner = User::factory()->create([
            'email' => 'owner@example.com',
            'role' => UserRole::STUDENT,
            'is_active' => true,
        ]);
        $otherUser = User::factory()->create([
            'email' => 'other@example.com',
            'role' => UserRole::STUDENT,
            'is_active' => true,
        ]);
        $student = $this->createStudent($owner);

        $this->actingAs($otherUser, 'sanctum')->postJson('/api/documents', [
            'student_id' => $student->id,
            'type' => DocumentType::Other->value,
            'file' => UploadedFile::fake()->image('other.jpg'),
        ])->assertForbidden();
    }

    public function test_authorized_user_can_get_temporary_url_for_private_document(): void
    {
        $user = User::factory()->create([
            'email' => 'student@example.com',
            'role' => UserRole::STUDENT,
            'is_active' => true,
        ]);
        $student = $this->createStudent($user);
        $document = $this->createStoredDocument(student: $student);

        $response = $this->actingAs($user, 'sanctum')
            ->getJson('/api/documents/'.$document->id.'/temporary-url');

        $response->assertOk()
            ->assertJsonStructure(['temporary_url', 'expires_at']);

        $temporaryUrl = $response->json('temporary_url');
        $parts = parse_url($temporaryUrl);
        $this->assertNotEmpty($parts['path'] ?? null);

        $downloadResponse = $this->get($parts['path'].(isset($parts['query']) ? '?'.$parts['query'] : ''));
        $downloadResponse->assertOk();
    }

    public function test_temporary_url_expiry_is_enforced(): void
    {
        $user = User::factory()->create([
            'email' => 'student@example.com',
            'role' => UserRole::STUDENT,
            'is_active' => true,
        ]);
        $student = $this->createStudent($user);
        $document = $this->createStoredDocument(student: $student);

        $temporaryUrl = $this->actingAs($user, 'sanctum')
            ->getJson('/api/documents/'.$document->id.'/temporary-url')
            ->json('temporary_url');

        $parts = parse_url($temporaryUrl);

        $this->travel(16)->minutes();

        $this->get($parts['path'].(isset($parts['query']) ? '?'.$parts['query'] : ''))
            ->assertForbidden();
    }

    public function test_user_cannot_get_temporary_url_for_unauthorized_document(): void
    {
        $owner = User::factory()->create([
            'email' => 'owner@example.com',
            'role' => UserRole::STUDENT,
            'is_active' => true,
        ]);
        $otherUser = User::factory()->create([
            'email' => 'other@example.com',
            'role' => UserRole::STUDENT,
            'is_active' => true,
        ]);
        $student = $this->createStudent($owner);
        $document = $this->createStoredDocument(student: $student);

        $this->actingAs($otherUser, 'sanctum')
            ->getJson('/api/documents/'.$document->id.'/temporary-url')
            ->assertForbidden();
    }

    private function makeApplication(string $email): Application
    {
        $program = Program::create($this->programPayload());
        $intake = Intake::create([
            'program_id' => $program->id,
            'name' => 'September Intake',
            'start_date' => '2026-09-01',
            'end_date' => '2026-11-30',
            'status' => 'upcoming',
        ]);

        return Application::create([
            'reference_number' => 'APP-'.uniqid(),
            'program_id' => $program->id,
            'intake_id' => $intake->id,
            'applicant_name' => 'Applicant',
            'applicant_email' => $email,
            'applicant_phone' => '+251900000000',
            'status' => 'submitted',
            'submitted_at' => now(),
        ]);
    }

    private function createStudent(User $user): Student
    {
        $program = Program::create($this->programPayload());
        $intake = Intake::create([
            'program_id' => $program->id,
            'name' => 'September Intake',
            'start_date' => '2026-09-01',
            'end_date' => '2026-11-30',
            'status' => 'upcoming',
        ]);
        $class = SchoolClass::create([
            'program_id' => $program->id,
            'intake_id' => $intake->id,
            'teacher_id' => null,
            'name' => 'Section A',
            'capacity' => 20,
            'schedule' => ['monday' => [['start' => '09:00', 'end' => '12:00']]],
        ]);

        return Student::create([
            'application_id' => null,
            'user_id' => $user->id,
            'class_id' => $class->id,
            'status' => 'active',
            'enrolled_at' => now(),
        ]);
    }

    private function createStoredDocument(?Application $application = null, ?Student $student = null): Document
    {
        $path = $application
            ? 'applications/'.$application->id.'/private-'.uniqid().'.pdf'
            : 'students/'.$student->id.'/private-'.uniqid().'.pdf';

        Storage::disk('private_documents')->put($path, 'private-content');

        return Document::create([
            'application_id' => $application?->id,
            'student_id' => $student?->id,
            'type' => DocumentType::Other,
            'file_path' => $path,
            'uploaded_at' => now(),
        ]);
    }

    private function programPayload(): array
    {
        return [
            'name' => 'Professional Makeup Artistry',
            'slug' => 'professional-makeup-artistry-'.uniqid(),
            'description' => 'Professional makeup training program',
            'category' => 'Makeup',
            'level' => 'Professional',
            'status' => 'draft',
            'tuition_fee' => 1500,
            'fee_currency' => 'USD',
            'duration_weeks' => 12,
        ];
    }
}

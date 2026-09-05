<?php

namespace Tests\Feature;

use App\Enums\DocumentType;
use App\Enums\UserRole;
use App\Models\Application;
use App\Models\Document;
use App\Models\Intake;
use App\Models\Program;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ApplicationSubmissionTest extends TestCase
{
    use RefreshDatabase;

    public function test_student_can_create_resume_and_update_a_partial_draft(): void
    {
        $user = User::factory()->create(['role' => UserRole::STUDENT]);

        $create = $this->actingAs($user, 'sanctum')->postJson('/api/applications', [
            'applicant_name' => 'A Student',
        ])->assertCreated();

        $id = $create->json('data.id');
        $this->actingAs($user, 'sanctum')->patchJson("/api/applications/{$id}/steps/1", [
            'applicant_phone' => '+251900000000',
        ])->assertOk();

        $this->actingAs($user, 'sanctum')->getJson("/api/applications/{$id}")
            ->assertOk()
            ->assertJsonPath('data.applicant_name', 'A Student')
            ->assertJsonPath('data.applicant_phone', '+251900000000')
            ->assertJsonPath('data.status', 'draft');

        $this->assertDatabaseCount('applications', 1);
    }

    public function test_student_can_list_owned_applications_for_cross_device_resumption(): void
    {
        $user = User::factory()->create(['role' => UserRole::STUDENT]);
        $other = User::factory()->create(['role' => UserRole::STUDENT]);
        Application::create(['reference_number' => 'APP-2026-000001', 'applicant_email' => $user->email, 'status' => 'draft']);
        Application::create(['reference_number' => 'APP-2026-000002', 'applicant_email' => $other->email, 'status' => 'draft']);

        $this->actingAs($user, 'sanctum')->getJson('/api/applications')
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.reference_number', 'APP-2026-000001');
    }

    public function test_application_cannot_be_submitted_until_fields_and_id_photo_exist(): void
    {
        Storage::fake('private_documents');
        $user = User::factory()->create(['role' => UserRole::STUDENT]);
        $application = Application::create([
            'reference_number' => 'APP-2026-000001',
            'applicant_email' => $user->email,
            'status' => 'draft',
        ]);

        $this->actingAs($user, 'sanctum')->postJson("/api/applications/{$application->id}/submit")
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['program_id', 'intake_id', 'applicant_name', 'applicant_phone', 'documents.id_photo']);

        $this->assertDatabaseHas('applications', ['id' => $application->id, 'status' => 'draft']);
    }

    public function test_valid_application_uploads_and_submits_once(): void
    {
        Storage::fake('private_documents');
        $user = User::factory()->create(['role' => UserRole::STUDENT]);
        [$program, $intake] = $this->programAndIntake();
        $application = Application::create([
            'reference_number' => 'APP-2026-000001',
            'program_id' => $program->id,
            'intake_id' => $intake->id,
            'applicant_name' => 'A Student',
            'applicant_email' => $user->email,
            'applicant_phone' => '+251900000000',
            'status' => 'draft',
        ]);

        $this->actingAs($user, 'sanctum')->post("/api/applications/{$application->id}/documents", [
            'type' => DocumentType::IdPhoto->value,
            'file' => UploadedFile::fake()->image('id.jpg'),
        ])->assertCreated();

        $this->actingAs($user, 'sanctum')->postJson("/api/applications/{$application->id}/submit")
            ->assertOk()->assertJsonPath('data.status', 'submitted');

        $this->actingAs($user, 'sanctum')->postJson("/api/applications/{$application->id}/submit")
            ->assertConflict();
        $this->assertDatabaseHas('applications', ['id' => $application->id, 'status' => 'submitted']);
        $this->assertDatabaseHas('audit_logs', ['action' => 'application_submitted', 'target_id' => $application->id]);
        $this->assertDatabaseCount('documents', 1);
    }

    public function test_another_student_cannot_access_or_update_a_draft(): void
    {
        $owner = User::factory()->create(['role' => UserRole::STUDENT]);
        $other = User::factory()->create(['role' => UserRole::STUDENT]);
        $application = Application::create([
            'reference_number' => 'APP-2026-000001',
            'applicant_email' => $owner->email,
            'status' => 'draft',
        ]);

        $this->actingAs($other, 'sanctum')->getJson("/api/applications/{$application->id}")->assertForbidden();
        $this->actingAs($other, 'sanctum')->patchJson("/api/applications/{$application->id}/steps/1", [
            'applicant_name' => 'Intruder',
        ])->assertForbidden();
    }

    private function programAndIntake(): array
    {
        $program = Program::create([
            'name' => 'Program', 'slug' => 'program-'.uniqid(), 'category' => 'General',
            'level' => 'Beginner', 'status' => 'open', 'tuition_fee' => 100,
            'fee_currency' => 'ETB', 'duration_weeks' => 12,
        ]);
        $intake = Intake::create([
            'program_id' => $program->id, 'name' => 'September', 'status' => 'open',
        ]);
        return [$program, $intake];
    }
}

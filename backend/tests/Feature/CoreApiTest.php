<?php

namespace Tests\Feature;

use App\Models\Intake;
use App\Models\Program;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class CoreApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_program_crud_and_slug_validation(): void
    {
        $payload = $this->programPayload();

        $create = $this->postJson('/api/programs', $payload);
        $create->assertCreated()->assertJsonPath('data.slug', $payload['slug']);
        $program = Program::firstOrFail();

        $this->getJson('/api/programs')->assertOk()->assertJsonPath('data.0.id', $program->id);
        $this->getJson('/api/programs/'.$program->id)->assertOk();
        $this->patchJson('/api/programs/'.$program->id, ['status' => 'open'])
            ->assertOk()->assertJsonPath('data.status', 'open');
        $this->postJson('/api/programs', $payload)->assertUnprocessable();
        $this->deleteJson('/api/programs/'.$program->id)->assertNoContent();
    }

    public function test_intake_crud_and_date_validation(): void
    {
        $program = Program::create($this->programPayload());
        $payload = [
            'program_id' => $program->id,
            'name' => 'September Intake',
            'start_date' => '2026-09-01',
            'end_date' => '2026-11-30',
            'status' => 'upcoming',
        ];

        $intake = $this->postJson('/api/intakes', $payload)->assertCreated()->json('data');
        $id = $intake['id'];
        $this->getJson('/api/intakes')->assertOk();
        $this->getJson('/api/intakes/'.$id)->assertOk()->assertJsonPath('data.program.id', $program->id);
        $this->patchJson('/api/intakes/'.$id, ['status' => 'open'])->assertOk();
        $this->postJson('/api/intakes', [...$payload, 'end_date' => '2026-08-01'])->assertUnprocessable();
        $this->deleteJson('/api/intakes/'.$id)->assertNoContent();
    }

    public function test_class_crud_supports_nullable_teacher_and_validates_capacity(): void
    {
        $program = Program::create($this->programPayload());
        $intake = Intake::create([
            'program_id' => $program->id,
            'name' => 'September Intake',
            'start_date' => '2026-09-01',
            'end_date' => '2026-11-30',
            'status' => 'upcoming',
        ]);
        $payload = [
            'program_id' => $program->id,
            'intake_id' => $intake->id,
            'teacher_id' => null,
            'name' => 'Section A',
            'capacity' => 20,
            'schedule' => ['monday' => [['start' => '09:00', 'end' => '12:00']]],
        ];

        $class = $this->postJson('/api/classes', $payload)->assertCreated()->json('data');
        $this->getJson('/api/classes/'.$class['id'])->assertOk()->assertJsonPath('data.teacher_id', null);
        $this->patchJson('/api/classes/'.$class['id'], ['capacity' => 25])->assertOk();
        $this->postJson('/api/classes', [...$payload, 'capacity' => 0])->assertUnprocessable();
        $this->deleteJson('/api/classes/'.$class['id'])->assertNoContent();
    }

    public function test_user_crud_hashes_password_and_never_exposes_it(): void
    {
        $payload = [
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'password' => 'secure-password',
            'role' => 'teacher',
        ];

        $created = $this->postJson('/api/users', $payload)->assertCreated();
        $user = User::firstOrFail();
        $created->assertJsonMissingPath('data.password_hash');
        $this->assertTrue(Hash::check($payload['password'], $user->password_hash));
        $this->patchJson('/api/users/'.$user->id, ['name' => 'Jane Updated'])
            ->assertOk()->assertJsonMissingPath('data.password_hash');
        $this->postJson('/api/users', [...$payload, 'email' => 'jane@example.com'])->assertUnprocessable();
        $this->getJson('/api/users')->assertOk();
        $this->getJson('/api/users/'.$user->id)->assertOk();
        $this->deleteJson('/api/users/'.$user->id)->assertNoContent();
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

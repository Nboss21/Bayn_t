<?php

namespace Tests\Feature;

use App\Enums\UserRole;
use App\Models\SchoolClass;
use App\Models\Student;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Gate;
use Tests\TestCase;

class RbacPolicyTest extends TestCase
{
    use RefreshDatabase;

    public function test_super_admin_can_access_admin_routes(): void
    {
        $admin = User::factory()->create([
            'role' => UserRole::SUPER_ADMIN,
            'is_active' => true,
        ]);

        $token = $admin->createToken('test')->plainTextToken;

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/admin/dashboard');

        $response->assertStatus(200)
            ->assertJson(['message' => 'Welcome Super Admin']);
    }

    public function test_teacher_cannot_access_super_admin_routes(): void
    {
        $teacher = User::factory()->create([
            'role' => UserRole::TEACHER,
            'is_active' => true,
        ]);

        $token = $teacher->createToken('test')->plainTextToken;

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/admin/dashboard');

        $response->assertStatus(403)
            ->assertJson(['message' => 'Unauthorized. You do not have permission to perform this action.']);
    }

    public function test_registrar_can_access_registrar_routes(): void
    {
        $registrar = User::factory()->create([
            'role' => UserRole::REGISTRAR,
            'is_active' => true,
        ]);

        $token = $registrar->createToken('test')->plainTextToken;

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/registrar/dashboard');

        $response->assertStatus(200)
            ->assertJson(['message' => 'Welcome Registrar']);
    }

    public function test_student_cannot_access_registrar_routes(): void
    {
        $student = User::factory()->create([
            'role' => UserRole::STUDENT,
            'is_active' => true,
        ]);

        $token = $student->createToken('test')->plainTextToken;

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/registrar/dashboard');

        $response->assertStatus(403);
    }

    public function test_gates_evaluate_correctly(): void
    {
        $admin = User::factory()->create(['role' => UserRole::SUPER_ADMIN, 'is_active' => true]);
        $teacher = User::factory()->create(['role' => UserRole::TEACHER, 'is_active' => true]);
        $student = User::factory()->create(['role' => UserRole::STUDENT, 'is_active' => true]);

        $this->assertTrue(Gate::forUser($admin)->allows('access-super-admin'));
        $this->assertFalse(Gate::forUser($teacher)->allows('access-super-admin'));
        $this->assertTrue(Gate::forUser($teacher)->allows('access-teacher'));
        $this->assertFalse(Gate::forUser($student)->allows('access-teacher'));
    }
}

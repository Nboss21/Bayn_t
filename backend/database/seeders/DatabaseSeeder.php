<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\StaffProfile;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Super Admin Account
        $superAdmin = User::updateOrCreate(
            ['email' => 'admin@makeupschool.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('password'),
                'role' => UserRole::SUPER_ADMIN,
                'phone' => '+1234567890',
                'is_active' => true,
            ]
        );

        StaffProfile::updateOrCreate(
            ['user_id' => $superAdmin->id],
            [
                'position' => 'Platform Administrator',
                'bio' => 'Main Super Admin account.',
                'hire_date' => '2025-01-01',
            ]
        );

        // 2. Registrar Account
        $registrar = User::updateOrCreate(
            ['email' => 'registrar@makeupschool.com'],
            [
                'name' => 'Lead Registrar',
                'password' => Hash::make('password'),
                'role' => UserRole::REGISTRAR,
                'phone' => '+1234567891',
                'is_active' => true,
            ]
        );

        StaffProfile::updateOrCreate(
            ['user_id' => $registrar->id],
            [
                'position' => 'Senior Admissions Registrar',
                'bio' => 'Manages student admissions and class enrollments.',
                'hire_date' => '2025-02-01',
            ]
        );

        // 3. Teacher Account
        $teacher = User::updateOrCreate(
            ['email' => 'teacher@makeupschool.com'],
            [
                'name' => 'Instructor Jane',
                'password' => Hash::make('password'),
                'role' => UserRole::TEACHER,
                'phone' => '+1234567892',
                'is_active' => true,
            ]
        );

        StaffProfile::updateOrCreate(
            ['user_id' => $teacher->id],
            [
                'position' => 'Lead Makeup Artistry Instructor',
                'bio' => 'Specializes in special effects and beauty makeup.',
                'hire_date' => '2025-03-01',
            ]
        );

        // 4. Student Account
        User::updateOrCreate(
            ['email' => 'student@makeupschool.com'],
            [
                'name' => 'Alice Student',
                'password' => Hash::make('password'),
                'role' => UserRole::STUDENT,
                'phone' => '+1234567893',
                'is_active' => true,
            ]
        );
    }
}

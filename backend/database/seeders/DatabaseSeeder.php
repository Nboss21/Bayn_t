<?php

namespace Database\Seeders;

use App\Enums\ProgramStatus;
use App\Enums\IntakeStatus;
use App\Enums\UserRole;
use App\Models\Intake;
use App\Models\GradingConfig;
use App\Models\Program;
use App\Models\SchoolClass;
use App\Models\StaffProfile;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $programs = [
            ['name' => 'Professional Makeup Artistry', 'slug' => 'professional-makeup-artistry', 'description' => 'Professional training in makeup artistry, beauty techniques, and professional practice.', 'category' => 'Makeup Artistry', 'level' => 'Intermediate', 'status' => ProgramStatus::Open, 'tuition_fee' => 15000, 'fee_currency' => 'ETB', 'duration_weeks' => 12],
            ['name' => 'Bridal Makeup Mastery', 'slug' => 'bridal-makeup-mastery', 'description' => 'Advanced bridal-specific makeup techniques, styling, and client experience.', 'category' => 'Makeup Artistry', 'level' => 'Advanced', 'status' => ProgramStatus::Open, 'tuition_fee' => 15000, 'fee_currency' => 'ETB', 'duration_weeks' => 8],
            ['name' => 'Beauty Foundations', 'slug' => 'beauty-foundations', 'description' => 'Core skincare, hygiene, and essential beauty application fundamentals.', 'category' => 'Skincare', 'level' => 'Beginner', 'status' => ProgramStatus::Draft, 'tuition_fee' => 15000, 'fee_currency' => 'ETB', 'duration_weeks' => 6],
            ['name' => 'Advanced Beauty Techniques', 'slug' => 'advanced-beauty-techniques', 'description' => 'Specialist techniques for editorial, creative, and advanced client work.', 'category' => 'Makeup Artistry', 'level' => 'Advanced', 'status' => ProgramStatus::Closed, 'tuition_fee' => 15000, 'fee_currency' => 'ETB', 'duration_weeks' => 10],
        ];

        foreach ($programs as $program) {
            Program::updateOrCreate(['slug' => $program['slug']], $program);
        }

        foreach (Program::whereIn('slug', ['professional-makeup-artistry', 'bridal-makeup-mastery'])->get() as $program) {
            foreach (['practical' => 30, 'theory' => 50, 'professional' => 20] as $category => $weight) {
                GradingConfig::updateOrCreate(
                    ['program_id' => $program->id, 'category' => $category],
                    ['weight_percentage' => $weight],
                );
            }
        }

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

        // The seeded teacher is eligible for the open programs so registrars
        // can assign them to the corresponding morning/evening classes.
        $teacherProgramIds = Program::whereIn('slug', ['professional-makeup-artistry', 'bridal-makeup-mastery'])->pluck('id');
        DB::table('program_teacher')->where('user_id', $teacher->id)->delete();
        if ($teacherProgramIds->isNotEmpty()) {
            DB::table('program_teacher')->insert($teacherProgramIds->map(fn (int $programId): array => [
                'program_id' => $programId,
                'user_id' => $teacher->id,
                'created_at' => now(),
            ])->all());
        }

        // Seed real class and timetable records for the open programs. The
        // registrar assignment flow reads these records through the API.
        foreach ([
            'professional-makeup-artistry' => [
                ['name' => 'PMA - Morning', 'label' => 'Morning', 'time' => '9:00 AM - 12:00 PM'],
                ['name' => 'PMA - Afternoon', 'label' => 'Afternoon', 'time' => '2:00 PM - 5:00 PM'],
                ['name' => 'PMA - Evening', 'label' => 'Evening', 'time' => '5:30 PM - 8:30 PM'],
            ],
            'bridal-makeup-mastery' => [
                ['name' => 'Bridal Makeup - Morning', 'label' => 'Morning', 'time' => '9:00 AM - 12:00 PM'],
                ['name' => 'Bridal Makeup - Evening', 'label' => 'Evening', 'time' => '5:30 PM - 8:30 PM'],
            ],
        ] as $programSlug => $classDefinitions) {
            $program = Program::where('slug', $programSlug)->first();
            if (! $program) continue;

            $intake = Intake::updateOrCreate(
                ['program_id' => $program->id, 'name' => 'September 2026'],
                [
                    'start_date' => '2026-09-01',
                    'end_date' => '2026-11-30',
                    'status' => IntakeStatus::Open,
                ]
            );

            foreach ($classDefinitions as $class) {
                SchoolClass::updateOrCreate(
                    ['program_id' => $program->id, 'intake_id' => $intake->id, 'name' => $class['name']],
                    [
                        'teacher_id' => $teacher->id,
                        'capacity' => 20,
                        'schedule' => [
                            'days' => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                            'label' => $class['label'],
                            'time' => $class['time'],
                        ],
                    ]
                );
            }
        }

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

        $this->call(CurriculumSeeder::class);
        $this->call(DemoDataSeeder::class);
    }
}

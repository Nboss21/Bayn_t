<?php

namespace Database\Seeders;

use App\Enums\{CompletionReviewStatus, DocumentType, StudentStatus, UserRole};
use App\Models\{Application, AssessmentScore, CompletionReview, CurriculumLesson, Document, Notification, SchoolClass, Student, User};
use App\Services\CompletionResultService;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DemoDataSeeder extends Seeder
{
    public function run(): void
    {
        $programs = DB::table('programs')->whereIn('slug', ['professional-makeup-artistry', 'bridal-makeup-mastery'])->get()->keyBy('slug');
        $teachers = $this->seedTeachers();
        $classes = $this->seedClasses($programs, $teachers);

        $students = [
            $this->seedStudent('student@makeupschool.com', 'Alice Student', 'STU-DEMO-001', $classes['pma_morning'], '2026-09-01', StudentStatus::Active),
            $this->seedStudent('michael.bekele@example.com', 'Michael Bekele', 'STU-DEMO-002', $classes['pma_morning'], '2026-09-01', StudentStatus::Active),
            $this->seedStudent('sara.tadesse@example.com', 'Sara Tadesse', 'STU-DEMO-003', $classes['pma_afternoon'], '2026-08-18', StudentStatus::Active),
            $this->seedStudent('hana.abebe@example.com', 'Hana Abebe', 'STU-DEMO-004', $classes['bridal_morning'], '2026-09-01', StudentStatus::Active),
            $this->seedStudent('lily.mekonnen@example.com', 'Lily Mekonnen', 'STU-DEMO-005', $classes['pma_alumni'], '2026-06-01', StudentStatus::Completed),
        ];

        foreach ([$students[0], $students[1], $students[2], $students[3]] as $student) {
            $this->seedAttendance($student, $student->schoolClass, $student->enrolled_at->toDateString(), now()->subDay()->toDateString());
            $this->seedMarks($student, $student->schoolClass);
            $this->seedCurriculumProgress($student->schoolClass, false);
        }

        $this->seedAttendance($students[4], $students[4]->schoolClass, '2026-06-01', '2026-08-28');
        $this->seedMarks($students[4], $students[4]->schoolClass, ['practical' => 92, 'theory' => 88, 'professional' => 95]);
        $this->seedCurriculumProgress($students[4]->schoolClass, true);

        // A complete active student awaiting registrar review demonstrates the review queue.
        $pendingSnapshot = $this->snapshot($students[1]);
        CompletionReview::updateOrCreate(
            ['student_id' => $students[1]->id],
            ['class_id' => $students[1]->class_id, 'teacher_id' => $students[1]->schoolClass->teacher_id, 'status' => CompletionReviewStatus::ReadyForReview, 'snapshot' => $pendingSnapshot, 'submitted_at' => now()->subDay(), 'reviewed_by' => null, 'reviewed_at' => null, 'review_comment' => null]
        );

        $approved = CompletionReview::updateOrCreate(
            ['student_id' => $students[4]->id],
            ['class_id' => $students[4]->class_id, 'teacher_id' => $students[4]->schoolClass->teacher_id, 'status' => CompletionReviewStatus::Approved, 'snapshot' => $this->snapshot($students[4]), 'submitted_at' => now()->subWeeks(2), 'reviewed_by' => User::where('email', 'registrar@makeupschool.com')->value('id'), 'reviewed_at' => now()->subWeek(), 'review_comment' => null]
        );
        if (!Document::where('student_id', $students[4]->id)->where('type', DocumentType::Certificate->value)->exists()) {
            app(CompletionResultService::class)->generate($approved, User::where('email', 'registrar@makeupschool.com')->value('id'));
        }

        $registrarId = User::where('email', 'registrar@makeupschool.com')->value('id');
        $teacherId = $teachers['jane']->id;
        $this->notification($registrarId, 'course_completion_submitted', 'Michael Bekele has been submitted for course completion review.');
        $this->notification($teacherId, 'attendance_reminder', 'Attendance and marks are ready for review on the PMA morning class.');
        $this->notification($students[0]->user_id, 'class_update', 'Your next practical assessment is scheduled for this week.');
        $this->notification($students[4]->user_id, 'course_completion_approved', 'Your course completion was approved. Your official result document is available.');
    }

    private function seedTeachers(): array
    {
        $definitions = [
            'jane' => ['email' => 'teacher@makeupschool.com', 'name' => 'Instructor Jane', 'phone' => '+1234567892'],
            'david' => ['email' => 'david.gebre@example.com', 'name' => 'David Gebre', 'phone' => '+1234567894'],
            'meron' => ['email' => 'meron.kassa@example.com', 'name' => 'Meron Kassa', 'phone' => '+1234567895'],
        ];
        $teachers = [];
        foreach ($definitions as $key => $definition) {
            $teachers[$key] = User::updateOrCreate(['email' => $definition['email']], [...$definition, 'password' => Hash::make('password'), 'role' => UserRole::TEACHER, 'is_active' => true]);
            DB::table('staff_profiles')->updateOrInsert(['user_id' => $teachers[$key]->id], ['position' => 'Makeup Instructor', 'bio' => 'Demo instructor profile for the academy workspace.', 'hire_date' => '2025-03-01', 'updated_at' => now(), 'created_at' => now()]);
        }
        return $teachers;
    }

    private function seedClasses($programs, array $teachers): array
    {
        $pmaIntake = DB::table('intakes')->where('program_id', $programs['professional-makeup-artistry']->id)->where('name', 'September 2026')->first();
        $bridalIntake = DB::table('intakes')->where('program_id', $programs['bridal-makeup-mastery']->id)->where('name', 'September 2026')->first();
        $alumniIntake = DB::table('intakes')->updateOrInsert(['program_id' => $programs['professional-makeup-artistry']->id, 'name' => 'June 2026'], ['start_date' => '2026-06-01', 'end_date' => '2026-08-28', 'status' => 'closed', 'updated_at' => now(), 'created_at' => now()]);
        $alumniIntake = DB::table('intakes')->where('program_id', $programs['professional-makeup-artistry']->id)->where('name', 'June 2026')->first();

        $find = fn (int $programId, int $intakeId, string $name, int $teacherId) => SchoolClass::updateOrCreate(['program_id' => $programId, 'intake_id' => $intakeId, 'name' => $name], ['teacher_id' => $teacherId, 'capacity' => 20, 'schedule' => ['days' => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], 'label' => str_contains(strtolower($name), 'evening') ? 'Evening' : (str_contains(strtolower($name), 'afternoon') ? 'Afternoon' : 'Morning'), 'time' => str_contains(strtolower($name), 'evening') ? '5:30 PM - 8:30 PM' : (str_contains(strtolower($name), 'afternoon') ? '2:00 PM - 5:00 PM' : '9:00 AM - 12:00 PM')]]);
        DB::table('program_teacher')->insertOrIgnore([
            ['program_id' => $programs['professional-makeup-artistry']->id, 'user_id' => $teachers['jane']->id, 'created_at' => now()],
            ['program_id' => $programs['professional-makeup-artistry']->id, 'user_id' => $teachers['david']->id, 'created_at' => now()],
            ['program_id' => $programs['bridal-makeup-mastery']->id, 'user_id' => $teachers['meron']->id, 'created_at' => now()],
        ]);
        return [
            'pma_morning' => $find($programs['professional-makeup-artistry']->id, $pmaIntake->id, 'PMA - Morning', $teachers['jane']->id),
            'pma_afternoon' => $find($programs['professional-makeup-artistry']->id, $pmaIntake->id, 'PMA - Afternoon', $teachers['david']->id),
            'bridal_morning' => $find($programs['bridal-makeup-mastery']->id, $bridalIntake->id, 'Bridal Makeup - Morning', $teachers['meron']->id),
            'pma_alumni' => $find($programs['professional-makeup-artistry']->id, $alumniIntake->id, 'PMA - June Alumni', $teachers['jane']->id),
        ];
    }

    private function seedStudent(string $email, string $name, string $reference, SchoolClass $class, string $enrolledAt, StudentStatus $status): Student
    {
        $user = User::updateOrCreate(['email' => $email], ['name' => $name, 'password' => Hash::make('password'), 'role' => UserRole::STUDENT, 'phone' => '+251900000000', 'is_active' => true]);
        $application = Application::updateOrCreate(['reference_number' => $reference], ['program_id' => $class->program_id, 'intake_id' => $class->intake_id, 'applicant_name' => $name, 'applicant_email' => $email, 'applicant_phone' => '+251900000000', 'status' => 'enrolled', 'submitted_at' => Carbon::parse($enrolledAt)->subWeeks(2)]);
        return Student::updateOrCreate(['user_id' => $user->id], ['application_id' => $application->id, 'class_id' => $class->id, 'status' => $status, 'enrolled_at' => Carbon::parse($enrolledAt)]);
    }

    private function seedAttendance(Student $student, SchoolClass $class, string $from, string $to): void
    {
        $rows = [];
        foreach (Carbon::parse($from)->toPeriod(Carbon::parse($to)) as $date) {
            if ($date->isWeekend()) continue;
            $day = $date->diffInDays(Carbon::parse($from));
            $status = $day % 13 === 0 ? 'late' : ($day % 17 === 0 ? 'absent' : 'present');
            $rows[] = ['student_id' => $student->id, 'class_id' => $class->id, 'date' => $date->toDateString(), 'status' => $status, 'note' => $status === 'late' ? 'Arrived after the morning briefing.' : null, 'marked_by' => $class->teacher_id, 'created_at' => now(), 'updated_at' => now()];
        }
        if ($rows) DB::table('attendance_records')->upsert($rows, ['student_id', 'class_id', 'date'], ['status', 'note', 'marked_by', 'updated_at']);
    }

    private function seedMarks(Student $student, SchoolClass $class, ?array $values = null): void
    {
        $values ??= ['practical' => 78 + ($student->id % 10), 'theory' => 82 + ($student->id % 7), 'professional' => 88 + ($student->id % 6)];
        $weights = DB::table('grading_configs')->where('program_id', $class->program_id)->pluck('weight_percentage', 'category');
        foreach ($values as $category => $raw) {
            AssessmentScore::updateOrCreate(['student_id' => $student->id, 'class_id' => $class->id, 'category' => $category], ['raw_score' => $raw, 'weighted_score' => round($raw * ((float) ($weights[$category] ?? 0) / 100), 2), 'graded_by' => $class->teacher_id, 'sub_items' => null]);
        }
    }

    private function seedCurriculumProgress(SchoolClass $class, bool $complete): void
    {
        $lessonIds = CurriculumLesson::whereHas('module', fn ($query) => $query->where('program_id', $class->program_id))->pluck('id');
        foreach ($lessonIds as $index => $lessonId) {
            DB::table('curriculum_lesson_progress')->updateOrInsert(['class_id' => $class->id, 'lesson_id' => $lessonId], ['completed' => $complete || $index < 9, 'completed_at' => ($complete || $index < 9) ? now()->subDays(max(1, count($lessonIds) - $index)) : null, 'updated_at' => now(), 'created_at' => now()]);
        }
    }

    private function snapshot(Student $student): array
    {
        $records = $student->attendanceRecords()->get();
        $scores = $student->assessmentScores()->get();
        $total = $records->count();
        $counts = $records->groupBy(fn ($record) => $record->status->value)->map->count();
        $lessons = CurriculumLesson::whereHas('module', fn ($query) => $query->where('program_id', $student->schoolClass->program_id))->count();
        $completed = DB::table('curriculum_lesson_progress')->where('class_id', $student->class_id)->where('completed', true)->count();
        return ['generated_at' => now()->subWeek()->toIso8601String(), 'student' => ['id' => $student->id, 'name' => $student->user?->name], 'class' => ['id' => $student->class_id, 'name' => $student->schoolClass->name], 'attendance' => ['total_days' => $total, 'present' => $counts->get('present', 0), 'absent' => $counts->get('absent', 0), 'late' => $counts->get('late', 0), 'excused' => $counts->get('excused', 0), 'attendance_percentage' => $total ? round(($counts->get('present', 0) + $counts->get('late', 0)) / $total * 100, 2) : 0], 'marks' => ['categories' => $scores->map(fn ($score) => ['category' => $score->category->value, 'raw_score' => (float) $score->raw_score, 'weighted_score' => (float) $score->weighted_score])->values()->all(), 'total_weighted_score' => round((float) $scores->sum('weighted_score'), 2)], 'curriculum' => ['total_lessons' => $lessons, 'completed_lessons' => $completed]];
    }

    private function notification(int $userId, string $type, string $message): void
    {
        Notification::updateOrCreate(['user_id' => $userId, 'type' => $type, 'message' => $message], ['read_at' => null]);
    }
}

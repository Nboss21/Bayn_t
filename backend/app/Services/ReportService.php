<?php

namespace App\Services;

use App\Models\{Application, AssessmentScore, AttendanceRecord, Payment, SchoolClass, Student};
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class ReportService
{
    public function applications(array $filters = []): array
    {
        $q = Application::query(); $this->applicationFilters($q, $filters);
        return ['total' => (clone $q)->count(), 'by_status' => (clone $q)->select('status', DB::raw('count(*) as total'))->groupBy('status')->pluck('total', 'status'), 'by_program' => (clone $q)->join('programs', 'programs.id', '=', 'applications.program_id')->select('programs.id', 'programs.name', DB::raw('count(applications.id) as total'))->groupBy('programs.id', 'programs.name')->get(), 'by_intake' => (clone $q)->join('intakes', 'intakes.id', '=', 'applications.intake_id')->select('intakes.id', 'intakes.name', DB::raw('count(applications.id) as total'))->groupBy('intakes.id', 'intakes.name')->get()];
    }

    public function students(array $filters = [], ?\App\Models\User $user = null): array
    {
        $q = $this->studentQuery($filters, $user); $group = fn (string $column) => (clone $q)->select($column, DB::raw('count(*) as total'))->groupBy($column)->get();
        return ['total' => (clone $q)->count(), 'by_status' => $group('status'), 'by_class' => (clone $q)->join('classes', 'classes.id', '=', 'students.class_id')->select('classes.id', 'classes.name', DB::raw('count(students.id) as total'))->groupBy('classes.id', 'classes.name')->get(), 'by_program' => (clone $q)->join('classes', 'classes.id', '=', 'students.class_id')->join('programs', 'programs.id', '=', 'classes.program_id')->select('programs.id', 'programs.name', DB::raw('count(students.id) as total'))->groupBy('programs.id', 'programs.name')->get()];
    }

    public function attendance(array $filters = [], ?\App\Models\User $user = null): array
    {
        $q = $this->attendanceQuery($filters, $user); $total = (clone $q)->count(); $counts = (clone $q)->select('status', DB::raw('count(*) as total'))->groupBy('status')->pluck('total', 'status');
        return ['total_records' => $total, 'by_status' => $counts, 'present' => (int) ($counts['present'] ?? 0), 'absent' => (int) ($counts['absent'] ?? 0), 'late' => (int) ($counts['late'] ?? 0), 'excused' => (int) ($counts['excused'] ?? 0), 'attendance_percentage' => $total ? round(((int) ($counts['present'] ?? 0) + (int) ($counts['late'] ?? 0)) / $total * 100, 2) : 0, 'by_class' => (clone $q)->join('classes', 'classes.id', '=', 'attendance_records.class_id')->select('classes.id', 'classes.name', DB::raw('count(attendance_records.id) as total'))->groupBy('classes.id', 'classes.name')->get()];
    }

    public function assessments(array $filters = [], ?\App\Models\User $user = null): array
    {
        $q = $this->assessmentQuery($filters, $user); $stats = (clone $q)->selectRaw('count(*) as total, avg(raw_score) as average_score, avg(weighted_score) as average_weighted_score, max(raw_score) as highest_score, min(raw_score) as lowest_score')->first();
        return ['total' => (int) $stats->total, 'average_score' => round((float) $stats->average_score, 2), 'average_weighted_score' => round((float) $stats->average_weighted_score, 2), 'highest_score' => $stats->highest_score === null ? null : (float) $stats->highest_score, 'lowest_score' => $stats->lowest_score === null ? null : (float) $stats->lowest_score, 'by_category' => (clone $q)->select('category', DB::raw('count(*) as total'), DB::raw('avg(raw_score) as average_score'), DB::raw('avg(weighted_score) as average_weighted_score'))->groupBy('category')->get()];
    }

    public function payments(array $filters = []): array
    {
        $q = Payment::query(); $this->dateFilters($q, $filters, 'payments.created_at'); if (!empty($filters['status'])) $q->where('status', $filters['status']); if (!empty($filters['gateway'])) $q->where('gateway_name', $filters['gateway']); if (!empty($filters['student_id'])) $q->where('student_id', $filters['student_id']); if (!empty($filters['application_id'])) $q->where('application_id', $filters['application_id']); if (!empty($filters['program_id'])) $q->whereHas('application', fn ($x) => $x->where('program_id', $filters['program_id'])); if (!empty($filters['intake_id'])) $q->whereHas('application', fn ($x) => $x->where('intake_id', $filters['intake_id']));
        return ['by_currency' => (clone $q)->select('currency', DB::raw('count(*) as count'), DB::raw('sum(amount) as total_amount'))->groupBy('currency')->get(), 'by_status' => (clone $q)->select('status', DB::raw('count(*) as count'), DB::raw('sum(amount) as total_amount'))->groupBy('status')->get()];
    }

    public function dashboard(array $filters = [], ?\App\Models\User $user = null): array
    { return ['applications' => $this->applications($filters), 'students' => $this->students($filters, $user), 'attendance' => $this->attendance($filters, $user), 'assessments' => $this->assessments($filters, $user), 'payments' => $this->payments($filters), 'programs' => \App\Models\Program::count(), 'classes' => SchoolClass::count(), 'intakes' => \App\Models\Intake::count(), 'recent_applications' => Application::with(['program', 'intake'])->latest()->limit(5)->get()]; }

    private function applicationFilters(Builder $q, array $f): void { if (!empty($f['status'])) $q->where('status', $f['status']); if (!empty($f['program_id'])) $q->where('program_id', $f['program_id']); if (!empty($f['intake_id'])) $q->where('intake_id', $f['intake_id']); if (!empty($f['reference_number'])) $q->where('reference_number', $f['reference_number']); if (!empty($f['search'])) $q->where(fn ($x) => $x->where('applicant_name', 'like', '%'.$f['search'].'%')->orWhere('applicant_email', 'like', '%'.$f['search'].'%')->orWhere('reference_number', 'like', '%'.$f['search'].'%')); $this->dateFilters($q, $f, 'applications.created_at'); }
    private function studentQuery(array $f, $user = null): Builder { $q = Student::query(); if ($user?->isTeacher()) $q->whereHas('schoolClass', fn ($x) => $x->where('teacher_id', $user->id)); if ($user?->isStudent()) $q->where('user_id', $user->id); if (!empty($f['status'])) $q->where('status', $f['status']); if (!empty($f['class_id'])) $q->where('class_id', $f['class_id']); if (!empty($f['program_id'])) $q->whereHas('schoolClass', fn ($x) => $x->where('program_id', $f['program_id'])); if (!empty($f['intake_id'])) $q->whereHas('schoolClass', fn ($x) => $x->where('intake_id', $f['intake_id'])); $this->dateFilters($q, $f, 'students.enrolled_at'); return $q; }
    private function attendanceQuery(array $f, $user = null): Builder { $q = app(TeacherScopeService::class)->attendance($user); if (!empty($f['class_id'])) $q->where('class_id', $f['class_id']); if (!empty($f['student_id'])) $q->where('student_id', $f['student_id']); if (!empty($f['program_id'])) $q->whereHas('schoolClass', fn ($x) => $x->where('program_id', $f['program_id'])); if (!empty($f['status'])) $q->where('status', $f['status']); $this->dateFilters($q, $f, 'attendance_records.date'); return $q; }
    private function assessmentQuery(array $f, $user = null): Builder { $q = app(TeacherScopeService::class)->assessments($user); if ($user?->isStudent()) $q->whereHas('student', fn ($x) => $x->where('user_id', $user->id)); if (!empty($f['class_id'])) $q->where('class_id', $f['class_id']); if (!empty($f['student_id'])) $q->where('student_id', $f['student_id']); if (!empty($f['program_id'])) $q->whereHas('schoolClass', fn ($x) => $x->where('program_id', $f['program_id'])); if (!empty($f['category'])) $q->where('category', $f['category']); return $q; }
    private function dateFilters(Builder $q, array $f, string $column): void { if (!empty($f['from'])) $q->whereDate($column, '>=', $f['from']); if (!empty($f['to'])) $q->whereDate($column, '<=', $f['to']); }
}

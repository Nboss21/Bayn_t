<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ApplicationResource;
use App\Http\Resources\StudentResource;
use App\Models\{Application, AssessmentScore, AttendanceRecord, Student};
use App\Services\ReportService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ReportController extends Controller
{
    public function __construct(private readonly ReportService $reports) {}
    public function dashboard(Request $r) { $this->staff($r); $data = $this->reports->dashboard($r->only(['from','to']), $r->user()); if (! $r->user()->isSuperAdmin() && ! $r->user()->isRegistrar()) unset($data['payments']); return response()->json(['data' => $data]); }
    public function applications(Request $r) { abort_unless($r->user()->isSuperAdmin() || $r->user()->isRegistrar(),403); $data = $this->reports->applications($r->all()); $q = Application::query()->with(['program','intake']); $this->applicationFilters($q, $r); return response()->json(['data' => $data, 'records' => ApplicationResource::collection($q->latest()->paginate(min($r->integer('per_page', 20), 100)))]); }
    public function students(Request $r)
    {
        abort_unless($r->user()->isSuperAdmin() || $r->user()->isRegistrar() || $r->user()->isTeacher() || $r->user()->isStudent(), 403);
        $data = $this->reports->students($r->all(), $r->user());
        $query = Student::with(['user', 'schoolClass.program']);
        if ($r->user()->isTeacher()) $query->whereHas('schoolClass', fn ($c) => $c->where('teacher_id', $r->user()->id));
        if ($r->user()->isStudent()) $query->where('user_id', $r->user()->id);
        if ($r->filled('status')) $query->where('status', $r->input('status'));
        if ($r->filled('class_id')) $query->where('class_id', $r->input('class_id'));
        if ($r->filled('program_id')) $query->whereHas('schoolClass', fn ($c) => $c->where('program_id', $r->input('program_id')));
        if ($r->filled('intake_id')) $query->whereHas('schoolClass', fn ($c) => $c->where('intake_id', $r->input('intake_id')));
        if ($r->filled('from')) $query->whereDate('enrolled_at', '>=', $r->input('from'));
        if ($r->filled('to')) $query->whereDate('enrolled_at', '<=', $r->input('to'));
        return response()->json(['data' => $data, 'records' => StudentResource::collection($query->paginate(min($r->integer('per_page', 20), 100)))]);
    }
    public function enrollment(Request $r) { return $this->students($r); }
    public function attendance(Request $r) { Gate::authorize('viewAny', AttendanceRecord::class); return response()->json(['data' => $this->reports->attendance($r->all(), $r->user())]); }
    public function assessments(Request $r) { Gate::authorize('viewAny', AssessmentScore::class); return response()->json(['data' => $this->reports->assessments($r->all(), $r->user())]); }
    public function performance(Request $r) { return $this->assessments($r); }
    public function payments(Request $r) { abort_unless($r->user()->isSuperAdmin() || $r->user()->isRegistrar(), 403); return response()->json(['data' => $this->reports->payments($r->all())]); }
    public function export(Request $r, string $type): StreamedResponse
    {
        $this->staff($r); abort_unless(in_array($type, ['students', 'attendance', 'payments'], true), 404); if ($type === 'payments') abort_unless($r->user()->isSuperAdmin() || $r->user()->isRegistrar(), 403);
        $rows = match ($type) {
            'students' => Student::query()->with(['user','schoolClass'])->when($r->user()->isTeacher(), fn ($q) => $q->whereHas('schoolClass', fn ($c) => $c->where('teacher_id', $r->user()->id)))->when($r->user()->isStudent(), fn ($q) => $q->where('user_id', $r->user()->id))->lazyById(),
            'attendance' => app(\App\Services\TeacherScopeService::class)->attendance($r->user())->lazyById(),
            default => \App\Models\Payment::query()->lazyById(),
        };
        return response()->streamDownload(function () use ($type, $rows) { $out = fopen('php://output', 'w'); $headers = $type === 'students' ? ['id','name','status','class_id'] : ($type === 'attendance' ? ['id','student_id','class_id','date','status'] : ['id','student_id','amount','currency','status','paid_at']); fputcsv($out, $headers); foreach ($rows as $row) fputcsv($out, $type === 'students' ? [$row->id,$row->user?->name,$row->status?->value,$row->class_id] : ($type === 'attendance' ? [$row->id,$row->student_id,$row->class_id,$row->date?->toDateString(),$row->status?->value] : [$row->id,$row->student_id,$row->amount,$row->currency,$row->status?->value,$row->paid_at?->toIso8601String()])); fclose($out); }, $type.'.csv', ['Content-Type' => 'text/csv']);
    }
    private function staff(Request $r): void { abort_unless($r->user()->isSuperAdmin() || $r->user()->isRegistrar() || $r->user()->isTeacher() || $r->user()->isStudent(), 403); }
    private function studentAccess(Request $r): void { Gate::authorize('viewAny', Student::class); }
    private function applicationFilters($q, Request $r): void { foreach (['status','program_id','intake_id','reference_number'] as $f) if ($r->filled($f)) $q->where($f, $r->input($f)); if ($r->filled('search')) $q->where(fn ($x) => $x->where('applicant_name','like','%'.$r->input('search').'%')->orWhere('applicant_email','like','%'.$r->input('search').'%')->orWhere('reference_number','like','%'.$r->input('search').'%')); if ($r->filled('from')) $q->whereDate('created_at','>=',$r->input('from')); if ($r->filled('to')) $q->whereDate('created_at','<=',$r->input('to')); }
}

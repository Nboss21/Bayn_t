<?php

namespace App\Http\Controllers\Api;

use App\Enums\{CompletionReviewStatus, StudentStatus};
use App\Http\Controllers\Controller;
use App\Http\Requests\ReviewCompletionRequest;
use App\Http\Resources\CompletionReviewResource;
use App\Models\{CompletionReview, CurriculumLesson, SchoolClass, Student};
use App\Services\{AuditLogService, CompletionResultService, NotificationService};
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class CompletionReviewController extends Controller
{
    public function __construct(private readonly NotificationService $notifications, private readonly AuditLogService $audit) {}

    public function teacherIndex(Request $request)
    {
        Gate::authorize('viewAny', CompletionReview::class);
        return CompletionReviewResource::collection(CompletionReview::query()->with(['student.user', 'schoolClass.program', 'teacher', 'reviewer'])->where('teacher_id', $request->user()->id)->latest()->paginate(min($request->integer('per_page', 50), 100)));
    }

    public function submit(Request $request, Student $student): CompletionReviewResource|JsonResponse
    {
        abort_unless($request->user()->isTeacher(), 403);
        $student->load(['user', 'schoolClass.program', 'schoolClass.intake']);
        abort_unless($student->schoolClass?->teacher_id === $request->user()->id, 403);
        abort_if($student->status === StudentStatus::Withdrawn, 422, 'Withdrawn students cannot be submitted for completion.');

        $class = $student->schoolClass;
        $check = $this->buildSnapshot($student, $class);
        if ($check['errors']) return response()->json(['message' => 'The course is not ready for review.', 'errors' => $check['errors'], 'checklist' => $check['checklist']], 422);

        $review = CompletionReview::query()->where('student_id', $student->id)->latest()->first();
        abort_if($review?->status === CompletionReviewStatus::Approved, 409, 'This student already has an approved completion result.');
        $before = $review ? $this->audit->snapshot($review) : null;
        $review ??= new CompletionReview(['student_id' => $student->id, 'class_id' => $class->id, 'teacher_id' => $request->user()->id]);
        $review->fill(['class_id' => $class->id, 'teacher_id' => $request->user()->id, 'status' => CompletionReviewStatus::ReadyForReview, 'review_comment' => null, 'snapshot' => $check['snapshot'], 'submitted_at' => now(), 'reviewed_by' => null, 'reviewed_at' => null])->save();
        $this->audit->log('course_completion.submitted', $review, $before, $this->audit->snapshot($review), $request->user()->id);
        foreach ($this->notifications->activeStaff() as $staff) $this->notifications->create($staff, 'course_completion_submitted', "{$student->user?->name} has been submitted for course completion review.");
        return new CompletionReviewResource($review->load(['student.user', 'schoolClass.program', 'teacher']));
    }

    public function registrarIndex(Request $request)
    {
        Gate::authorize('viewAny', CompletionReview::class);
        $reviews = CompletionReview::query()->with(['student.user', 'schoolClass.program', 'teacher', 'reviewer'])->when($request->filled('status'), fn (Builder $q) => $q->where('status', $request->string('status')->value))->latest('submitted_at')->paginate(min($request->integer('per_page', 20), 100));
        return CompletionReviewResource::collection($reviews);
    }

    public function show(CompletionReview $completionReview): CompletionReviewResource
    {
        Gate::authorize('view', $completionReview);
        return new CompletionReviewResource($completionReview->load(['student.user', 'schoolClass.program', 'teacher', 'reviewer']));
    }

    public function review(ReviewCompletionRequest $request, CompletionReview $completionReview, CompletionResultService $results): CompletionReviewResource
    {
        Gate::authorize('review', CompletionReview::class);
        abort_if($completionReview->status === CompletionReviewStatus::Approved, 409, 'This completion review has already been approved.');
        $completionReview->load(['student.user', 'schoolClass.program', 'teacher']);
        $before = $this->audit->snapshot($completionReview);
        $status = CompletionReviewStatus::from($request->validated('status'));
        if ($status === CompletionReviewStatus::Approved) {
            DB::transaction(function () use ($completionReview, $request, $results): void {
                $completionReview->update(['status' => CompletionReviewStatus::Approved, 'review_comment' => null, 'reviewed_by' => $request->user()->id, 'reviewed_at' => now()]);
                $completionReview->student->update(['status' => StudentStatus::Completed]);
                $results->generate($completionReview, $request->user()->id);
            });
            $this->notifications->create($completionReview->student->user_id, 'course_completion_approved', 'Your course completion was approved. Your official result document is now available.');
            $this->notifications->create($completionReview->teacher_id, 'course_completion_approved', "{$completionReview->student->user?->name}'s course completion was approved.");
        } else {
            $completionReview->update(['status' => $status, 'review_comment' => $request->validated('review_comment'), 'reviewed_by' => $request->user()->id, 'reviewed_at' => now()]);
            $this->notifications->create($completionReview->teacher_id, 'course_completion_needs_correction', "{$completionReview->student->user?->name}'s completion needs correction: {$completionReview->review_comment}");
            $this->notifications->create($completionReview->student->user_id, 'course_completion_needs_correction', "Your course completion needs correction: {$completionReview->review_comment}");
        }
        $this->audit->log('course_completion.reviewed', $completionReview, $before, $this->audit->snapshot($completionReview), $request->user()->id);
        return new CompletionReviewResource($completionReview->refresh()->load(['student.user', 'schoolClass.program', 'teacher', 'reviewer']));
    }

    public function student(Request $request): CompletionReviewResource|JsonResponse
    {
        $student = Student::query()->where('user_id', $request->user()->id)->firstOrFail();
        $review = CompletionReview::query()->where('student_id', $student->id)->latest()->first();
        return $review ? new CompletionReviewResource($review->load(['student.user', 'schoolClass.program', 'teacher', 'reviewer'])) : response()->json(['data' => null]);
    }

    private function buildSnapshot(Student $student, SchoolClass $class): array
    {
        $errors = [];
        $records = $student->attendanceRecords()->where('class_id', $class->id)->get();
        $firstDate = $student->enrolled_at?->toDateString();
        if (!$firstDate && $records->isNotEmpty()) $firstDate = Carbon::parse($records->min('date'))->toDateString();
        $days = $this->scheduledDates($class, $firstDate, now()->toDateString());
        $recordDates = $records->pluck('date')->map(fn ($date) => Carbon::parse($date)->toDateString())->all();
        $missingDates = array_values(array_diff($days, $recordDates));
        if ($days && $missingDates) $errors['attendance'] = ['Missing attendance for '.count($missingDates).' scheduled day(s).'];
        if (!$records->count()) $errors['attendance'] = ['No attendance records have been entered.'];

        $configs = DB::table('grading_configs')->where(fn ($q) => $q->where('program_id', $class->program_id)->orWhereNull('program_id'))->orderByRaw('CASE WHEN program_id IS NULL THEN 1 ELSE 0 END')->get()->unique('category');
        $scores = $student->assessmentScores()->where('class_id', $class->id)->get()->keyBy(fn ($score) => $score->category->value);
        $missingMarks = $configs->filter(fn ($config) => !$scores->has($config->category))->pluck('category')->values()->all();
        if ($missingMarks) $errors['marks'] = ['Missing marks for: '.implode(', ', $missingMarks).'.'];

        $lessons = CurriculumLesson::query()->whereHas('module', fn ($q) => $q->where('program_id', $class->program_id))->get();
        $completedLessons = DB::table('curriculum_lesson_progress')->where('class_id', $class->id)->where('completed', true)->whereIn('lesson_id', $lessons->pluck('id'))->pluck('lesson_id');
        if ($lessons->count() && $completedLessons->count() !== $lessons->count()) $errors['curriculum'] = ['All curriculum lessons must be completed.'];

        $total = $records->count();
        $counts = $records->groupBy(fn ($record) => $record->status->value)->map->count();
        $snapshot = ['generated_at' => now()->toIso8601String(), 'student' => ['id' => $student->id, 'name' => $student->user?->name], 'class' => ['id' => $class->id, 'name' => $class->name], 'attendance' => ['total_days' => $total, 'present' => $counts->get('present', 0), 'absent' => $counts->get('absent', 0), 'late' => $counts->get('late', 0), 'excused' => $counts->get('excused', 0), 'attendance_percentage' => $total ? round(($counts->get('present', 0) + $counts->get('late', 0)) / $total * 100, 2) : 0], 'marks' => ['categories' => $scores->map(fn ($score) => ['category' => $score->category->value, 'raw_score' => (float) $score->raw_score, 'weighted_score' => (float) $score->weighted_score])->values()->all(), 'total_weighted_score' => round((float) $scores->sum('weighted_score'), 2)], 'curriculum' => ['total_lessons' => $lessons->count(), 'completed_lessons' => $completedLessons->count()]];
        return ['errors' => $errors, 'checklist' => ['attendance' => !array_key_exists('attendance', $errors), 'marks' => !array_key_exists('marks', $errors), 'curriculum' => !array_key_exists('curriculum', $errors)], 'snapshot' => $snapshot];
    }

    private function scheduledDates(SchoolClass $class, ?string $from, string $to): array
    {
        $days = data_get($class->schedule, 'days', []);
        if (!$from || !$days) return [];
        $map = ['monday' => 1, 'tuesday' => 2, 'wednesday' => 3, 'thursday' => 4, 'friday' => 5, 'saturday' => 6, 'sunday' => 0];
        $wanted = collect($days)->map(fn ($day) => $map[strtolower($day)] ?? null)->filter()->all();
        return collect(CarbonPeriod::create($from, $to))->filter(fn (Carbon $date) => in_array($date->dayOfWeek, $wanted, true))->map->toDateString()->values()->all();
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ClassResource;
use App\Http\Resources\GradingConfigResource;
use App\Http\Resources\TeacherStudentResource;
use App\Models\AssessmentScore;
use App\Models\AttendanceRecord;
use App\Models\CurriculumModule;
use App\Models\GradingConfig;
use App\Services\TeacherScopeService;
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    public function __construct(private readonly TeacherScopeService $scope) {}

    public function dashboard(Request $request)
    {
        $user = $request->user();
        $classes = $this->scope->classes($user);
        $classIds = (clone $classes)->pluck('id');
        return response()->json(['data' => [
            'user' => ['name' => $user->name],
            'classes_count' => $classIds->count(),
            'student_count' => $this->scope->students($user)->distinct('students.id')->count('students.id'),
            'recent_attendance' => $this->scope->attendance($user)->with(['student.user', 'schoolClass'])->latest()->limit(5)->get()->map(fn ($record) => [
                'id' => $record->id, 'student_id' => $record->student_id, 'student_name' => $record->student?->user?->name,
                'class_id' => $record->class_id, 'class_name' => $record->schoolClass?->name, 'date' => $record->date?->toDateString(), 'status' => $record->status?->value,
            ]),
            'recent_assessment_count' => $this->scope->assessments($user)->whereIn('class_id', $classIds)->latest()->count(),
        ]]);
    }

    public function classes(Request $request)
    {
        $classes = $this->scope->classes($request->user())->with(['program', 'intake', 'teacher'])->withCount('students')->latest()->paginate(min($request->integer('per_page', 20), 100));
        return ClassResource::collection($classes);
    }

    public function students(Request $request)
    {
        $students = $this->scope->students($request->user())->with(['user', 'schoolClass'])
            ->when($request->integer('class_id'), fn ($q, $v) => $q->where('class_id', $v))
            ->when($request->integer('program_id'), fn ($q, $v) => $q->whereHas('schoolClass', fn ($class) => $class->where('program_id', $v)))
            ->when($request->integer('intake_id'), fn ($q, $v) => $q->whereHas('schoolClass', fn ($class) => $class->where('intake_id', $v)))
            ->when($request->filled('status'), fn ($q) => $q->where('status', $request->string('status')->value()))
            ->when($request->filled('search'), fn ($q) => $q->whereHas('user', fn ($user) => $user->where('name', 'like', '%'.$request->string('search')->value().'%')))
            ->latest()->paginate(min($request->integer('per_page', 20), 100));
        return TeacherStudentResource::collection($students);
    }

    public function curriculum(Request $request)
    {
        $class = $this->scope->classes($request->user())->with(['program', 'intake'])->when($request->integer('class_id'), fn ($query, $id) => $query->whereKey($id))->first();
        abort_unless($class, 404, 'No assigned class exists for this teacher.');

        $modules = CurriculumModule::query()->where('program_id', $class->program_id)->with('lessons')->orderBy('sort_order')->get();
        $completedLessonIds = \DB::table('curriculum_lesson_progress')->where('class_id', $class->id)->where('completed', true)->pluck('lesson_id')->all();
        $completed = array_fill_keys($completedLessonIds, true);
        $moduleRows = $modules->map(function (CurriculumModule $module) use ($completed) {
            $lessons = $module->lessons->map(fn ($lesson) => ['id' => $lesson->id, 'title' => $lesson->title, 'completed' => isset($completed[$lesson->id])]);
            $completedCount = $lessons->where('completed', true)->count();
            $status = $completedCount === $lessons->count() && $lessons->count() > 0 ? 'completed' : ($completedCount > 0 ? 'in_progress' : 'upcoming');
            return ['id' => (string) $module->number, 'number' => str_pad((string) $module->number, 2, '0', STR_PAD_LEFT), 'type' => $module->type, 'title' => $module->title, 'description' => $module->description, 'status' => $status, 'lessonsCount' => $lessons->count(), 'completedLessonsCount' => $completedCount, 'lessons' => $lessons->values()];
        });
        $active = $moduleRows->firstWhere('status', 'in_progress') ?: $moduleRows->firstWhere('status', 'upcoming');
        $completedModules = $moduleRows->where('status', 'completed')->count();
        $nextLesson = $active ? $active['lessons']->get($active['completedLessonsCount']) : null;

        return response()->json(['data' => [
            'header' => ['title' => 'Curriculum', 'subtitle' => 'View the modules and lessons for '.$class->program->name.'.', 'termBadge' => $class->intake?->name ?? 'Current intake'],
            'banner' => ['className' => $class->name, 'program' => $class->program->name, 'startDate' => $class->intake?->start_date?->format('F Y'), 'schedule' => $this->scheduleLabel($class->schedule), 'studentsCount' => $class->students()->count()],
            'programs' => [['id' => (string) $class->program_id, 'label' => $class->program->name]],
            'activeProgramId' => (string) $class->program_id,
            'filterTabs' => [['id' => 'All', 'label' => 'All'], ['id' => 'module', 'label' => 'Curriculum Modules'], ['id' => 'brief', 'label' => 'Teaching Briefs']],
            'teachingContext' => $active ? ['statusText' => $active['status'] === 'in_progress' ? 'In progress' : 'Up next', 'moduleNumber' => $active['number'], 'moduleTitle' => $active['title'], 'description' => $active['description'], 'lessonCurrent' => $active['completedLessonsCount'], 'lessonTotal' => $active['lessonsCount'], 'lessonStatusText' => $active['status'], 'upNext' => $nextLesson['title'] ?? 'All lessons complete', 'actionText' => 'View Module Lessons', 'actionModuleNumber' => $active['number']] : null,
            'progress' => ['completedModules' => $completedModules, 'totalModules' => $moduleRows->count(), 'completedCount' => $completedModules, 'currentCount' => $moduleRows->where('status', 'in_progress')->count(), 'remainingCount' => $moduleRows->whereIn('status', ['upcoming', 'in_progress'])->count(), 'activeModuleNumber' => $active['number'] ?? null, 'termWeek' => null, 'termWeeks' => null],
            'modules' => $moduleRows->values(),
        ]]);
    }

    public function grading(Request $request)
    {
        $class = $this->scope->classes($request->user())
            ->when($request->integer('class_id'), fn ($query, $id) => $query->whereKey($id))
            ->first();
        abort_unless($class, 404, 'No assigned class exists for this teacher.');

        $configs = GradingConfig::query()
            ->where(fn ($query) => $query->where('program_id', $class->program_id)->orWhereNull('program_id'))
            ->orderByRaw('CASE WHEN program_id IS NULL THEN 1 ELSE 0 END')
            ->orderBy('category')
            ->get()
            ->unique('category')
            ->values();

        return GradingConfigResource::collection($configs);
    }

    private function scheduleLabel($schedule): string
    {
        if (is_string($schedule)) return $schedule;
        if (! is_array($schedule)) return 'Schedule not set';

        $days = is_array($schedule['days'] ?? null) ? implode(' · ', $schedule['days']) : ($schedule['days'] ?? '');
        return implode(' · ', array_filter([$days, $schedule['label'] ?? null, $schedule['time'] ?? null])) ?: 'Schedule not set';
    }
}

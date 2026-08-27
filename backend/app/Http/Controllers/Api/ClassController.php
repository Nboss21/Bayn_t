<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreClassRequest;
use App\Http\Requests\UpdateClassRequest;
use App\Http\Resources\ClassResource;
use App\Models\SchoolClass;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ClassController extends Controller
{
    public function index(Request $request)
    {
        $classes = SchoolClass::query()
            ->with(['program', 'intake', 'teacher'])
            ->when($request->input('program_id'), fn ($query, $value) => $query->where('program_id', $value))
            ->when($request->input('intake_id'), fn ($query, $value) => $query->where('intake_id', $value))
            ->when($request->input('teacher_id'), fn ($query, $value) => $query->where('teacher_id', $value))
            ->orderByDesc('created_at')
            ->paginate(min($request->integer('per_page', 20), 100));

        return ClassResource::collection($classes);
    }

    public function store(StoreClassRequest $request): JsonResponse
    {
        $class = SchoolClass::create($request->validated())->load(['program', 'intake', 'teacher']);

        return (new ClassResource($class))->response()->setStatusCode(201);
    }

    public function show(SchoolClass $class): ClassResource
    {
        return new ClassResource($class->load(['program', 'intake', 'teacher']));
    }

    public function update(UpdateClassRequest $request, SchoolClass $class): ClassResource
    {
        $class->update($request->validated());

        return new ClassResource($class->refresh()->load(['program', 'intake', 'teacher']));
    }

    public function destroy(SchoolClass $class): JsonResponse
    {
        try {
            $class->delete();
        } catch (QueryException) {
            return response()->json(['message' => 'The class cannot be deleted while it has related records.'], 409);
        }

        return response()->json(null, 204);
    }
}

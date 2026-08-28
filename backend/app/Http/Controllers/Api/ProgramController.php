<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProgramRequest;
use App\Http\Requests\UpdateProgramRequest;
use App\Http\Resources\ProgramResource;
use App\Models\Program;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ProgramController extends Controller
{
    public function index(Request $request)
    {
        Gate::authorize('viewAny', Program::class);

        $programs = Program::query()
            ->when($request->input('status'), fn ($query, $value) => $query->where('status', $value))
            ->when($request->input('category'), fn ($query, $value) => $query->where('category', $value))
            ->when($request->input('level'), fn ($query, $value) => $query->where('level', $value))
            ->when($request->input('search'), fn ($query, $value) => $query->where('name', 'like', '%'.$value.'%'))
            ->orderByDesc('created_at')
            ->paginate(min($request->integer('per_page', 20), 100));

        return ProgramResource::collection($programs);
    }

    public function store(StoreProgramRequest $request)
    {
        Gate::authorize('create', Program::class);

        return (new ProgramResource(Program::create($request->validated())))->response()->setStatusCode(201);
    }

    public function show(Program $program): ProgramResource
    {
        Gate::authorize('view', $program);

        return new ProgramResource($program);
    }

    public function update(UpdateProgramRequest $request, Program $program): ProgramResource
    {
        Gate::authorize('update', $program);

        $program->update($request->validated());

        return new ProgramResource($program->refresh());
    }

    public function destroy(Program $program): JsonResponse
    {
        Gate::authorize('delete', $program);

        try {
            $program->delete();
        } catch (QueryException) {
            return response()->json(['message' => 'The program cannot be deleted while it has related records.'], 409);
        }

        return response()->json(null, 204);
    }
}

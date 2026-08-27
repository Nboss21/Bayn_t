<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreIntakeRequest;
use App\Http\Requests\UpdateIntakeRequest;
use App\Http\Resources\IntakeResource;
use App\Models\Intake;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class IntakeController extends Controller
{
    public function index(Request $request)
    {
        $intakes = Intake::query()
            ->with('program')
            ->when($request->input('program_id'), fn ($query, $value) => $query->where('program_id', $value))
            ->when($request->input('status'), fn ($query, $value) => $query->where('status', $value))
            ->orderByDesc('start_date')
            ->paginate(min($request->integer('per_page', 20), 100));

        return IntakeResource::collection($intakes);
    }

    public function store(StoreIntakeRequest $request)
    {
        return (new IntakeResource(Intake::create($request->validated())->load('program')))->response()->setStatusCode(201);
    }

    public function show(Intake $intake): IntakeResource
    {
        return new IntakeResource($intake->load('program'));
    }

    public function update(UpdateIntakeRequest $request, Intake $intake): IntakeResource
    {
        $intake->update($request->validated());

        return new IntakeResource($intake->refresh()->load('program'));
    }

    public function destroy(Intake $intake): JsonResponse
    {
        try {
            $intake->delete();
        } catch (QueryException) {
            return response()->json(['message' => 'The intake cannot be deleted while it has related records.'], 409);
        }

        return response()->json(null, 204);
    }
}

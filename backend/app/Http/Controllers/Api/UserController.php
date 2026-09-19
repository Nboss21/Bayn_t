<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function index(Request $request)
    {
        Gate::authorize('viewAny', User::class);

        $users = User::query()->with('programs')
            ->when($request->input('role'), fn ($query, $value) => $query->where('role', $value))
            ->when($request->has('is_active'), fn ($query) => $query->where('is_active', $request->boolean('is_active')))
            ->when($request->input('search'), fn ($query, $value) => $query->where(function ($query) use ($value) {
                $query->where('name', 'like', '%'.$value.'%')
                    ->orWhere('email', 'like', '%'.$value.'%');
            }))
            ->orderBy('name')
            ->paginate(min($request->integer('per_page', 20), 100));

        return UserResource::collection($users);
    }

    public function store(StoreUserRequest $request): JsonResponse
    {
        Gate::authorize('create', User::class);

        $data = $request->validated();
        $programIds = $data['program_ids'] ?? [];
        unset($data['program_ids']);
        $data['password'] = Hash::make($data['password']);
        $data['is_active'] ??= true;

        $user = DB::transaction(function () use ($data, $programIds): User {
            $user = User::create($data);
            if ($user->isTeacher()) {
                $this->syncTeacherPrograms($user, $programIds);
            }
            return $user->load('programs');
        });

        return (new UserResource($user))->response()->setStatusCode(201);
    }

    public function show(User $user): UserResource
    {
        Gate::authorize('view', $user);

        return new UserResource($user->load('programs'));
    }

    public function update(UpdateUserRequest $request, User $user): UserResource
    {
        Gate::authorize('update', $user);

        $data = $request->validated();
        $programIds = $data['program_ids'] ?? null;
        unset($data['program_ids']);

        if (array_key_exists('password', $data) && $data['password'] !== null) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        DB::transaction(function () use ($user, $data, $programIds): void {
            $user->update($data);
            if ($programIds !== null || $user->isTeacher() === false) {
                $this->syncTeacherPrograms($user, $user->isTeacher() ? ($programIds ?? []) : []);
            }
        });

        return new UserResource($user->refresh()->load('programs'));
    }

    public function destroy(User $user): JsonResponse
    {
        Gate::authorize('delete', $user);

        try {
            $user->delete();
        } catch (QueryException) {
            return response()->json(['message' => 'The user cannot be deleted while historical records require this user.'], 409);
        }

        return response()->json(null, 204);
    }

    /**
     * Keep teacher-program writes compatible with older installations whose
     * pivot table only has the original created_at column.
     */
    private function syncTeacherPrograms(User $user, array $programIds): void
    {
        DB::table('program_teacher')->where('user_id', $user->id)->delete();

        if ($programIds === []) {
            return;
        }

        $now = now();
        DB::table('program_teacher')->insert(array_map(
            fn (int $programId): array => [
                'program_id' => $programId,
                'user_id' => $user->id,
                'created_at' => $now,
            ],
            array_values(array_unique(array_map('intval', $programIds))),
        ));
    }
}

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

class UserController extends Controller
{
    public function index(Request $request)
    {
        Gate::authorize('viewAny', User::class);

        $users = User::query()
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
        $data['password'] = Hash::make($data['password']);
        $data['is_active'] ??= true;
        unset($data['password']);

        return (new UserResource(User::create($data)))->response()->setStatusCode(201);
    }

    public function show(User $user): UserResource
    {
        Gate::authorize('view', $user);

        return new UserResource($user);
    }

    public function update(UpdateUserRequest $request, User $user): UserResource
    {
        Gate::authorize('update', $user);

        $data = $request->validated();

        if (array_key_exists('password', $data)) {
            $data['password'] = Hash::make($data['password']);
            unset($data['password']);
        }

        $user->update($data);

        return new UserResource($user->refresh());
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
}

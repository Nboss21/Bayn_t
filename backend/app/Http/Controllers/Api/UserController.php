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
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index(Request $request)
    {
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
        $data = $request->validated();
        $data['password_hash'] = Hash::make($data['password']);
        $data['is_active'] ??= true;
        unset($data['password']);

        return (new UserResource(User::create($data)))->response()->setStatusCode(201);
    }

    public function show(User $user): UserResource
    {
        return new UserResource($user);
    }

    public function update(UpdateUserRequest $request, User $user): UserResource
    {
        $data = $request->validated();

        if (array_key_exists('password', $data)) {
            $data['password_hash'] = Hash::make($data['password']);
            unset($data['password']);
        }

        $user->update($data);

        return new UserResource($user->refresh());
    }

    public function destroy(User $user): JsonResponse
    {
        try {
            $user->delete();
        } catch (QueryException) {
            return response()->json(['message' => 'The user cannot be deleted while historical records require this user.'], 409);
        }

        return response()->json(null, 204);
    }
}

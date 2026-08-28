<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    /**
     * Authenticate user and issue Sanctum token.
     *
     * POST /api/auth/login
     */
    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
            'device_name' => ['nullable', 'string'],
        ]);

        $user = User::where('email', $credentials['email'])->first();

        if (! $user || ! Hash::check($credentials['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials do not match our records.'],
            ]);
        }

        if (! $user->is_active) {
            return response()->json([
                'message' => 'Your account has been deactivated. Please contact administrator.',
            ], Response::HTTP_FORBIDDEN);
        }

        $deviceName = $credentials['device_name'] ?? $request->userAgent() ?? 'auth_token';
        $token = $user->createToken($deviceName, [$user->role->value])->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role->value,
                'role_label' => $user->role->label(),
                'phone' => $user->phone,
                'is_active' => $user->is_active,
                'created_at' => $user->created_at,
            ],
        ]);
    }

    /**
     * Log out current user (revoke current token).
     *
     * POST /api/auth/logout
     */
    public function logout(Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user && $user->currentAccessToken()) {
            $user->currentAccessToken()->delete();
        }

        return response()->json([
            'message' => 'Successfully logged out.',
        ]);
    }

    /**
     * Return authenticated user profile.
     *
     * GET /api/auth/me
     */
    public function me(Request $request): JsonResponse
    {
        $user = $request->user()->load('staffProfile');

        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role->value,
                'role_label' => $user->role->label(),
                'phone' => $user->phone,
                'is_active' => $user->is_active,
                'staff_profile' => $user->staffProfile,
                'created_at' => $user->created_at,
            ],
        ]);
    }

    /**
     * Refresh access token (revoke current and issue new).
     *
     * POST /api/auth/refresh
     */
    public function refresh(Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user->currentAccessToken()) {
            $user->currentAccessToken()->delete();
        }

        $deviceName = $request->input('device_name', 'refreshed_token');
        $newToken = $user->createToken($deviceName, [$user->role->value])->plainTextToken;

        return response()->json([
            'message' => 'Token refreshed successfully',
            'access_token' => $newToken,
            'token_type' => 'Bearer',
        ]);
    }
}

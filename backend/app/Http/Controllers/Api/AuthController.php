<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\InvalidStateException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Throwable;

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

    /**
     * Send a password reset link to the given email.
     *
     * POST /api/auth/forgot-password
     */
    public function forgotPassword(ForgotPasswordRequest $request): JsonResponse
    {
        $status = Password::sendResetLink($request->only('email'));

        if ($status !== Password::RESET_LINK_SENT) {
            throw ValidationException::withMessages([
                'email' => [__($status)],
            ]);
        }

        return response()->json([
            'message' => __($status),
        ]);
    }

    /**
     * Reset the user's password using a valid token.
     *
     * POST /api/auth/reset-password
     */
    public function resetPassword(ResetPasswordRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $resetUser = null;

        $status = Password::reset($validated, function (User $user, string $password) use (&$resetUser): void {
            $user->forceFill([
                'password' => $password,
                'remember_token' => Str::random(60),
            ])->save();

            $user->tokens()->delete();
            $resetUser = $user;
        });

        if ($status !== Password::PASSWORD_RESET) {
            throw ValidationException::withMessages([
                'email' => [__($status)],
            ]);
        }

        event(new PasswordReset($resetUser ?? User::where('email', $validated['email'])->firstOrFail()));

        return response()->json([
            'message' => __($status),
        ]);
    }

    /**
     * Redirect the user to Google for authentication.
     *
     * GET /api/auth/google/redirect
     */
    public function googleRedirect(): RedirectResponse
    {
        return Socialite::driver('google')->stateless()->redirect();
    }

    /**
     * Handle Google callback, link/create the user, and issue a Sanctum token.
     *
     * GET /api/auth/google/callback
     */
    public function googleCallback(Request $request): JsonResponse
    {
        if ($request->filled('error')) {
            return response()->json([
                'message' => 'Google authentication was cancelled or denied.',
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        try {
            $googleUser = Socialite::driver('google')->stateless()->user();
        } catch (InvalidStateException|Throwable) {
            return response()->json([
                'message' => 'Unable to complete Google authentication.',
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        if (! $googleUser->getEmail()) {
            return response()->json([
                'message' => 'Google account did not provide an email address.',
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $user = User::query()->where('google_id', $googleUser->getId())->first()
            ?? User::query()->where('email', $googleUser->getEmail())->first();

        if ($user) {
            if (! $user->is_active) {
                return response()->json([
                    'message' => 'Your account has been deactivated. Please contact administrator.',
                ], Response::HTTP_FORBIDDEN);
            }

            $user->forceFill([
                'name' => $googleUser->getName() ?: $user->name,
                'google_id' => $googleUser->getId(),
                'email_verified_at' => $user->email_verified_at ?? now(),
            ])->save();
        } else {
            $user = User::create([
                'name' => $googleUser->getName() ?: 'Google User',
                'email' => $googleUser->getEmail(),
                'google_id' => $googleUser->getId(),
                'password' => Str::random(40),
                'role' => 'student',
                'is_active' => true,
                'email_verified_at' => now(),
            ]);
        }

        $deviceName = $request->input('device_name', 'google_auth');
        $token = $user->createToken($deviceName, [$user->role->value])->plainTextToken;

        return response()->json([
            'message' => 'Google authentication successful',
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
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReviewPasswordResetRequest;
use App\Http\Resources\PasswordResetRequestResource;
use App\Models\PasswordResetRequest;
use App\Services\AuditLogService;
use App\Services\NotificationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PasswordResetRequestController extends Controller
{
    public function index(Request $request)
    {
        $items = PasswordResetRequest::query()
            ->when($request->filled('status'), fn ($q) => $q->where('status', $request->string('status')->value()))
            ->latest()
            ->paginate(min($request->integer('per_page', 20), 100));

        return PasswordResetRequestResource::collection($items);
    }

    public function show(PasswordResetRequest $passwordResetRequest): PasswordResetRequestResource
    {
        return new PasswordResetRequestResource($passwordResetRequest);
    }

    public function approve(
        ReviewPasswordResetRequest $request,
        PasswordResetRequest $passwordResetRequest,
        NotificationService $notifications,
        AuditLogService $audit,
    ): JsonResponse {
        abort_if($passwordResetRequest->status !== 'pending', 409, 'This password reset request has already been reviewed.');
        abort_if(! $passwordResetRequest->user, 404, 'The requested user no longer exists.');

        $temporaryPassword = $request->validated('temporary_password') ?: Str::random(16);
        $user = $passwordResetRequest->user;

        DB::transaction(function () use ($passwordResetRequest, $user, $request, $temporaryPassword): void {
            $user->forceFill([
                'password' => $temporaryPassword,
                'must_change_password' => true,
                'remember_token' => Str::random(60),
            ])->save();
            $user->tokens()->delete();

            $passwordResetRequest->update([
                'status' => 'approved',
                'reviewed_by' => $request->user()->id,
                'admin_comment' => $request->validated('admin_comment'),
                'reviewed_at' => now(),
            ]);
        });

        $notifications->create($user, 'password_reset_approved', 'Your password reset request was approved. Sign in with the temporary password provided by the administrator.');
        $audit->log('password_reset.approved', $passwordResetRequest, null, [
            'status' => 'approved', 'user_id' => $user->id, 'reviewed_by' => $request->user()->id,
        ], $request->user()->id);

        return response()->json([
            'message' => 'Password reset approved. Give this temporary password to the user securely; it will not be shown again.',
            'temporary_password' => $temporaryPassword,
            'request' => new PasswordResetRequestResource($passwordResetRequest->refresh()),
        ]);
    }

    public function reject(
        ReviewPasswordResetRequest $request,
        PasswordResetRequest $passwordResetRequest,
        NotificationService $notifications,
        AuditLogService $audit,
    ): PasswordResetRequestResource {
        abort_if($passwordResetRequest->status !== 'pending', 409, 'This password reset request has already been reviewed.');

        $passwordResetRequest->update([
            'status' => 'rejected',
            'reviewed_by' => $request->user()->id,
            'admin_comment' => $request->validated('admin_comment'),
            'reviewed_at' => now(),
        ]);

        if ($passwordResetRequest->user) {
            $notifications->create($passwordResetRequest->user, 'password_reset_rejected', 'Your password reset request was not approved. Please contact an administrator.');
        }
        $audit->log('password_reset.rejected', $passwordResetRequest, null, ['status' => 'rejected'], $request->user()->id);

        return new PasswordResetRequestResource($passwordResetRequest->refresh());
    }
}

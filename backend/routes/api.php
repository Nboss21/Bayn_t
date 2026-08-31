<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ClassController;
use App\Http\Controllers\Api\DocumentController;
use App\Http\Controllers\Api\IntakeController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\ProgramController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// --------------------------------------------------------------------------
// Authentication
// --------------------------------------------------------------------------

// Public Auth Endpoints
Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('/reset-password', [AuthController::class, 'resetPassword']);
    Route::get('/google/redirect', [AuthController::class, 'googleRedirect']);
    Route::get('/google/callback', [AuthController::class, 'googleCallback']);
});

// Protected Auth Endpoints (Requires Sanctum Bearer Token)
Route::middleware('auth:sanctum')->prefix('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
});

Route::middleware('auth:sanctum')->prefix('notifications')->group(function () {
    Route::get('/', [NotificationController::class, 'index']);
    Route::get('/unread', [NotificationController::class, 'unread']);
    Route::post('/read-all', [NotificationController::class, 'markAllAsRead']);
    Route::post('/{notification}/read', [NotificationController::class, 'markAsRead']);
});

// --------------------------------------------------------------------------
// Core CRUD APIs
// --------------------------------------------------------------------------

Route::middleware(['auth:sanctum', 'role:super_admin,registrar'])->group(function () {
    Route::apiResources([
        'programs' => ProgramController::class,
        'intakes' => IntakeController::class,
    ]);
});

Route::middleware(['auth:sanctum', 'role:super_admin,registrar,teacher'])
    ->apiResource('classes', ClassController::class);

Route::middleware(['auth:sanctum', 'role:super_admin'])
    ->apiResource('users', UserController::class);

Route::middleware(['auth:sanctum', 'role:super_admin,registrar,teacher,student'])
    ->prefix('documents')
    ->group(function () {
        Route::post('/', [DocumentController::class, 'store']);
        Route::get('/{document}/temporary-url', [DocumentController::class, 'temporaryUrl']);
    });

Route::get('/documents/{document}/download', [DocumentController::class, 'download'])
    ->middleware('signed')
    ->name('documents.download');

// --------------------------------------------------------------------------
// Role-Gated Routes
// --------------------------------------------------------------------------

// Super Admin
Route::middleware(['auth:sanctum', 'role:super_admin'])
    ->prefix('admin')
    ->group(function () {
        Route::get('/dashboard', function () {
            return response()->json([
                'message' => 'Welcome Super Admin',
            ]);
        });
    });

// Super Admin + Registrar
Route::middleware(['auth:sanctum', 'role:super_admin,registrar'])
    ->prefix('registrar')
    ->group(function () {
        Route::get('/dashboard', function () {
            return response()->json([
                'message' => 'Welcome Registrar',
            ]);
        });
    });

// Super Admin + Teacher
Route::middleware(['auth:sanctum', 'role:super_admin,teacher'])
    ->prefix('teacher')
    ->group(function () {
        Route::get('/dashboard', function () {
            return response()->json([
                'message' => 'Welcome Teacher',
            ]);
        });
    });

// Student
Route::middleware(['auth:sanctum', 'role:student'])
    ->prefix('student')
    ->group(function () {
        Route::get('/dashboard', function () {
            return response()->json([
                'message' => 'Welcome Student',
            ]);
        });
    });

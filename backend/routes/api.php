<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes - Auth & RBAC
|--------------------------------------------------------------------------
*/

// Public Auth Endpoints
Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
});

// Protected Auth Endpoints (Requires Sanctum Bearer Token)
Route::middleware('auth:sanctum')->prefix('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
});

// Role-Gated Route Groups (RBAC Verification Routes)
Route::middleware(['auth:sanctum', 'role:super_admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', function () {
        return response()->json(['message' => 'Welcome Super Admin']);
    });
});

Route::middleware(['auth:sanctum', 'role:super_admin,registrar'])->prefix('registrar')->group(function () {
    Route::get('/dashboard', function () {
        return response()->json(['message' => 'Welcome Registrar']);
    });
});

Route::middleware(['auth:sanctum', 'role:super_admin,teacher'])->prefix('teacher')->group(function () {
    Route::get('/dashboard', function () {
        return response()->json(['message' => 'Welcome Teacher']);
    });
});

Route::middleware(['auth:sanctum', 'role:student'])->prefix('student')->group(function () {
    Route::get('/dashboard', function () {
        return response()->json(['message' => 'Welcome Student']);
    });
});

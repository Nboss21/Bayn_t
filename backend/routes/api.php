<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AssessmentScoreController;
use App\Http\Controllers\Api\AttendanceController;
use App\Http\Controllers\Api\ApplicationController;
use App\Http\Controllers\Api\ClassController;
use App\Http\Controllers\Api\DocumentController;
use App\Http\Controllers\Api\IntakeController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\ProgramController;
use App\Http\Controllers\Api\RegistrarController;
use App\Http\Controllers\Api\StudentController;
use App\Http\Controllers\Api\TeacherController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\GradingConfigController;
use App\Http\Controllers\Api\AuditLogController;
use App\Http\Controllers\Api\PaymentController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ReportController;
use App\Http\Controllers\Api\ContentController;
use App\Http\Controllers\Api\BackupController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Payment Gateway Webhook (Public Gateway Callback)
Route::post('/payments/webhook', [PaymentController::class, 'webhook']);


// --------------------------------------------------------------------------
// Authentication
// --------------------------------------------------------------------------

// Public Auth Endpoints
Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:auth');
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword'])->middleware('throttle:auth');
    Route::post('/reset-password', [AuthController::class, 'resetPassword'])->middleware('throttle:auth');
    Route::get('/google/redirect', [AuthController::class, 'googleRedirect'])->middleware('throttle:auth');
    Route::get('/google/callback', [AuthController::class, 'googleCallback'])->middleware('throttle:auth');
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

Route::middleware(['auth:sanctum', 'role:student,super_admin,registrar'])->group(function () {
    Route::post('/payments/initiate', [PaymentController::class, 'initiate']);
});

Route::middleware(['auth:sanctum', 'role:student'])->prefix('applications')->group(function () {
    Route::post('/', [ApplicationController::class, 'store']);
    Route::get('/', [ApplicationController::class, 'index']);
    Route::get('/{application}', [ApplicationController::class, 'show']);
    Route::patch('/{application}/steps/{step}', [ApplicationController::class, 'updateStep'])
        ->where('step', '[A-Za-z0-9_-]+');
    Route::post('/{application}/documents', [DocumentController::class, 'storeForApplication'])->middleware('throttle:public-write');
    Route::get('/{application}/documents', [ApplicationController::class, 'documents']);
    Route::post('/{application}/submit', [ApplicationController::class, 'submit']);
});

Route::middleware(['auth:sanctum', 'role:student'])->prefix('student')->group(function () {
    Route::get('/me', [StudentController::class, 'me']);
});

// --------------------------------------------------------------------------
// Core CRUD APIs
// --------------------------------------------------------------------------

Route::middleware(['auth:sanctum', 'role:super_admin,registrar,student'])->group(function () {
    Route::apiResources(['programs' => ProgramController::class, 'intakes' => IntakeController::class], ['only' => ['index', 'show']]);
});
Route::middleware(['auth:sanctum', 'role:super_admin,registrar'])->group(function () {
    Route::apiResources(['programs' => ProgramController::class, 'intakes' => IntakeController::class], ['except' => ['index', 'show']]);
});


Route::middleware(['auth:sanctum', 'role:super_admin,registrar,teacher'])
    ->apiResource('classes', ClassController::class);

Route::middleware(['auth:sanctum', 'role:super_admin,registrar,teacher,student'])
    ->group(function () {
        Route::get('/students/{student}', [StudentController::class, 'show']);
        Route::get('/students/{student}/attendance', [AttendanceController::class, 'studentAttendance']);
        Route::get('/students/{student}/attendance/summary', [AttendanceController::class, 'studentSummary']);
        Route::get('/classes/{class}/attendance', [AttendanceController::class, 'classAttendance']);
        Route::post('/classes/{class}/attendance', [AttendanceController::class, 'bulk']);
    });

Route::middleware(['auth:sanctum', 'role:super_admin,registrar,teacher,student'])
    ->prefix('attendance')->group(function () {
        Route::get('/', [AttendanceController::class, 'index']);
        Route::post('/', [AttendanceController::class, 'store'])->middleware('role:super_admin,registrar,teacher');
        Route::get('/{attendance}', [AttendanceController::class, 'show']);
        Route::match(['put', 'patch'], '/{attendance}', [AttendanceController::class, 'update'])->middleware('role:super_admin,registrar,teacher');
        Route::delete('/{attendance}', [AttendanceController::class, 'destroy'])->middleware('role:super_admin,registrar,teacher');
    });

Route::middleware(['auth:sanctum', 'role:super_admin'])
    ->apiResource('users', UserController::class);

Route::middleware(['auth:sanctum', 'role:super_admin,registrar,teacher,student'])
    ->prefix('documents')
    ->group(function () {
    Route::post('/', [DocumentController::class, 'store'])->middleware('throttle:public-write');
        Route::get('/{document}/temporary-url', [DocumentController::class, 'temporaryUrl']);
    });

Route::middleware(['auth:sanctum', 'role:super_admin,registrar'])->group(function () {
    Route::apiResource('grading-configs', GradingConfigController::class);
    Route::get('/audit-logs', [AuditLogController::class, 'index']);
    Route::get('/audit-logs/{auditLog}', [AuditLogController::class, 'show']);
});

Route::middleware(['auth:sanctum', 'role:super_admin,registrar,teacher,student'])
    ->prefix('assessments')
    ->group(function () {
        Route::get('/', [AssessmentScoreController::class, 'index']);
        Route::post('/', [AssessmentScoreController::class, 'store'])->middleware('role:super_admin,registrar,teacher');
        Route::get('/{assessment}', [AssessmentScoreController::class, 'show']);
        Route::match(['put', 'patch'], '/{assessment}', [AssessmentScoreController::class, 'update'])->middleware('role:super_admin,registrar,teacher');
        Route::delete('/{assessment}', [AssessmentScoreController::class, 'destroy'])->middleware('role:super_admin,registrar,teacher');
    });

Route::middleware(['auth:sanctum', 'role:super_admin,registrar,teacher,student'])->group(function () {
    Route::get('/classes/{class}/assessments', [AssessmentScoreController::class, 'classAssessments']);
    Route::get('/students/{student}/assessments', [AssessmentScoreController::class, 'studentAssessments']);
});

Route::get('/documents/{document}/download', [DocumentController::class, 'download'])
    ->middleware('signed')
    ->name('documents.download');

Route::middleware(['auth:sanctum', 'role:super_admin,registrar,teacher,student'])->prefix('reports')->group(function () {
    Route::get('/dashboard', [ReportController::class, 'dashboard']);
    Route::get('/applications', [ReportController::class, 'applications']);
    Route::get('/students', [ReportController::class, 'students']);
    Route::get('/enrollment', [ReportController::class, 'enrollment']);
    Route::get('/attendance', [ReportController::class, 'attendance']);
    Route::get('/assessments', [ReportController::class, 'assessments']);
    Route::get('/performance', [ReportController::class, 'performance']);
    Route::get('/payments', [ReportController::class, 'payments']);
    Route::get('/{type}/export', [ReportController::class, 'export'])->where('type', 'students|attendance|payments');
});

Route::middleware(['auth:sanctum', 'role:super_admin,registrar'])->prefix('backups')->group(function () {
    Route::post('/', [BackupController::class, 'store'])->middleware('throttle:expensive-admin');
    Route::get('/', [BackupController::class, 'index']);
    Route::get('/{backup}', [BackupController::class, 'show']);
    Route::delete('/{backup}', [BackupController::class, 'destroy']);
});
Route::middleware(['auth:sanctum', 'role:super_admin', 'throttle:expensive-admin'])->post('/backups/{backup}/restore', [BackupController::class, 'restore']);
Route::get('/backups/{backup}/download', [BackupController::class, 'download'])->middleware(['auth:sanctum', 'role:super_admin,registrar', 'signed'])->name('backups.download');

Route::get('/site/settings', [ContentController::class, 'settings']);
Route::get('/public/gallery', [ContentController::class, 'gallery']);
Route::post('/newsletter/subscribe', [ContentController::class, 'subscribe'])->middleware('throttle:public-write');
Route::middleware(['auth:sanctum', 'role:super_admin,registrar'])->group(function () {
    Route::put('/site/settings', [ContentController::class, 'updateSettings']);
    Route::get('/gallery', [ContentController::class, 'galleryAdmin']);
    Route::get('/gallery/{galleryImage}', [ContentController::class, 'showGallery']);
    Route::post('/gallery', [ContentController::class, 'storeGallery']);
    Route::match(['put','patch'], '/gallery/{galleryImage}', [ContentController::class, 'updateGallery']);
    Route::delete('/gallery/{galleryImage}', [ContentController::class, 'deleteGallery']);
});

Route::middleware(['auth:sanctum', 'role:super_admin,registrar', 'throttle:expensive-admin'])->post('/students/{student}/certificate', [DocumentController::class, 'certificate']);
Route::middleware(['auth:sanctum', 'role:super_admin,registrar,student'])->get('/students/{student}/certificate', [DocumentController::class, 'certificateView']);

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
        Route::get('/dashboard', [RegistrarController::class, 'dashboard']);
        Route::get('/applications', [RegistrarController::class, 'applications']);
        Route::get('/applications/{application}', [RegistrarController::class, 'showApplication']);
        Route::patch('/applications/{application}', [RegistrarController::class, 'review']);
        Route::get('/applications/{application}/documents', [RegistrarController::class, 'documents']);
        Route::post('/applications/{application}/enroll', [RegistrarController::class, 'enroll']);
        Route::get('/documents/{document}/temporary-url', [RegistrarController::class, 'documentUrl']);
        Route::get('/payments', [RegistrarController::class, 'payments']);
        Route::get('/payments/{payment}', [RegistrarController::class, 'showPayment']);
        Route::post('/payments/{payment}/verify', [RegistrarController::class, 'verifyPayment']);
        Route::get('/students', [RegistrarController::class, 'students']);
        Route::get('/students/{student}', [RegistrarController::class, 'showStudent']);
        Route::patch('/students/{student}/status', [RegistrarController::class, 'updateStudentStatus']);
        Route::get('/classes', [RegistrarController::class, 'classes']);
        Route::get('/search', [RegistrarController::class, 'search']);
    });

// Super Admin + Teacher
Route::middleware(['auth:sanctum', 'role:super_admin,teacher'])
    ->prefix('teacher')
    ->group(function () {
        Route::get('/dashboard', [TeacherController::class, 'dashboard']);
        Route::get('/classes', [TeacherController::class, 'classes']);
        Route::get('/students', [TeacherController::class, 'students']);
        Route::get('/attendance', [AttendanceController::class, 'index']);
        Route::get('/assessments', [AssessmentScoreController::class, 'index']);
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

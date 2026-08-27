<?php

use App\Http\Controllers\Api\ClassController;
use App\Http\Controllers\Api\IntakeController;
use App\Http\Controllers\Api\ProgramController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::apiResources([
    'programs' => ProgramController::class,
    'classes' => ClassController::class,
    'intakes' => IntakeController::class,
    'users' => UserController::class,
]);

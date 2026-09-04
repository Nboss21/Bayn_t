<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\StudentResource;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function me(Request $request): StudentResource
    {
        return new StudentResource($request->user()->student?->load([
            'user', 'application.program', 'application.intake', 'schoolClass.program', 'schoolClass.intake',
            'documents', 'payments',
        ]) ?? abort(404, 'No student record exists for this account.'));
    }
}

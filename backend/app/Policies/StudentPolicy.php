<?php

namespace App\Policies;

use App\Models\Student;
use App\Models\User;

class StudentPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->isSuperAdmin() || $user->isRegistrar();
    }

    public function view(User $user, Student $student): bool
    {
        if ($user->isSuperAdmin() || $user->isRegistrar()) {
            return true;
        }

        if ($user->isTeacher()) {
            return $student->schoolClass?->teacher_id === $user->id;
        }

        return $user->id === $student->user_id;
    }

    public function updateStatus(User $user, Student $student): bool
    {
        return $user->isSuperAdmin() || $user->isRegistrar();
    }

    public function updateAssessment(User $user, Student $student): bool
    {
        if ($user->isSuperAdmin()) {
            return true;
        }

        return $user->isTeacher() && $student->schoolClass?->teacher_id === $user->id;
    }

    public function uploadDocument(User $user, Student $student): bool
    {
        if ($user->isSuperAdmin() || $user->isRegistrar()) {
            return true;
        }

        if ($user->id === $student->user_id) {
            return true;
        }

        return $student->application?->applicant_email === $user->email;
    }

    public function viewDocument(User $user, Student $student): bool
    {
        if ($user->isSuperAdmin() || $user->isRegistrar()) {
            return true;
        }

        if ($user->isTeacher()) {
            return $student->schoolClass?->teacher_id === $user->id;
        }

        if ($user->id === $student->user_id) {
            return true;
        }

        return $student->application?->applicant_email === $user->email;
    }
}

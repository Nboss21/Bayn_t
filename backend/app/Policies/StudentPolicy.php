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

    public function updateAssessment(User $user, Student $student): bool
    {
        if ($user->isSuperAdmin()) {
            return true;
        }

        return $user->isTeacher() && $student->schoolClass?->teacher_id === $user->id;
    }
}

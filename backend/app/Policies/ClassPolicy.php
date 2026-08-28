<?php

namespace App\Policies;

use App\Models\SchoolClass;
use App\Models\User;

class ClassPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->isSuperAdmin() || $user->isRegistrar() || $user->isTeacher();
    }

    public function view(User $user, SchoolClass $class): bool
    {
        if ($user->isSuperAdmin() || $user->isRegistrar()) {
            return true;
        }

        if ($user->isTeacher()) {
            return $class->teacher_id === $user->id;
        }

        return false;
    }

    public function create(User $user): bool
    {
        return $user->isSuperAdmin() || $user->isRegistrar();
    }

    public function update(User $user, SchoolClass $class): bool
    {
        return $user->isSuperAdmin() || $user->isRegistrar();
    }

    public function delete(User $user, SchoolClass $class): bool
    {
        return $user->isSuperAdmin() || $user->isRegistrar();
    }

    public function manageAttendance(User $user, SchoolClass $class): bool
    {
        if ($user->isSuperAdmin()) {
            return true;
        }

        return $user->isTeacher() && $class->teacher_id === $user->id;
    }

    public function manageAssessments(User $user, SchoolClass $class): bool
    {
        if ($user->isSuperAdmin()) {
            return true;
        }

        return $user->isTeacher() && $class->teacher_id === $user->id;
    }
}

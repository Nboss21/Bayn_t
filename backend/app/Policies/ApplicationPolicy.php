<?php

namespace App\Policies;

use App\Models\Application;
use App\Models\User;

class ApplicationPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->isSuperAdmin() || $user->isRegistrar();
    }

    public function view(User $user, Application $application): bool
    {
        if ($user->isSuperAdmin() || $user->isRegistrar()) {
            return true;
        }

        return $user->email === $application->applicant_email;
    }

    public function approve(User $user, Application $application): bool
    {
        return $user->isSuperAdmin() || $user->isRegistrar();
    }

    public function reject(User $user, Application $application): bool
    {
        return $user->isSuperAdmin() || $user->isRegistrar();
    }

    public function assignClass(User $user, Application $application): bool
    {
        return $user->isSuperAdmin() || $user->isRegistrar();
    }
}

<?php

namespace App\Policies;

use App\Models\Intake;
use App\Models\User;

class IntakePolicy
{
    public function viewAny(User $user): bool
    {
        return $user->isSuperAdmin() || $user->isRegistrar() || $user->isStudent();
    }

    public function view(User $user, Intake $intake): bool
    {
        return $this->viewAny($user);
    }

    public function create(User $user): bool
    {
        return $this->viewAny($user);
    }

    public function update(User $user, Intake $intake): bool
    {
        return $this->viewAny($user);
    }

    public function delete(User $user, Intake $intake): bool
    {
        return $user->isSuperAdmin();
    }
}

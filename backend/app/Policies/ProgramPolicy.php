<?php

namespace App\Policies;

use App\Models\Program;
use App\Models\User;

class ProgramPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->isSuperAdmin() || $user->isRegistrar();
    }

    public function view(User $user, Program $program): bool
    {
        return $this->viewAny($user);
    }

    public function create(User $user): bool
    {
        return $this->viewAny($user);
    }

    public function update(User $user, Program $program): bool
    {
        return $this->viewAny($user);
    }

    public function delete(User $user, Program $program): bool
    {
        return $this->isSuperAdmin($user);
    }

    private function isSuperAdmin(User $user): bool
    {
        return $user->isSuperAdmin();
    }
}

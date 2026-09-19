<?php

namespace App\Policies;

use App\Models\CompletionReview;
use App\Models\User;

class CompletionReviewPolicy
{
    public function viewAny(User $user): bool { return $user->isSuperAdmin() || $user->isRegistrar() || $user->isTeacher(); }

    public function view(User $user, CompletionReview $review): bool
    {
        return $user->isSuperAdmin() || $user->isRegistrar()
            || ($user->isTeacher() && $review->teacher_id === $user->id)
            || ($user->isStudent() && $review->student?->user_id === $user->id);
    }

    public function submit(User $user, CompletionReview $review): bool
    {
        return $user->isTeacher() && $review->teacher_id === $user->id;
    }

    public function review(User $user): bool { return $user->isSuperAdmin() || $user->isRegistrar(); }
}

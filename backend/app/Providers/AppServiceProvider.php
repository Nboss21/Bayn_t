<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Gate definitions for RBAC
        Gate::define('access-super-admin', function (User $user) {
            return $user->isSuperAdmin() && $user->is_active;
        });

        Gate::define('access-registrar', function (User $user) {
            return ($user->isRegistrar() || $user->isSuperAdmin()) && $user->is_active;
        });

        Gate::define('access-teacher', function (User $user) {
            return ($user->isTeacher() || $user->isSuperAdmin()) && $user->is_active;
        });

        Gate::define('access-student', function (User $user) {
            return ($user->isStudent() || $user->isSuperAdmin()) && $user->is_active;
        });
    }
}

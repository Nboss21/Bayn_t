<?php

namespace App\Providers;

use App\Models\Document;
use App\Models\SchoolClass;
use App\Models\User;
use App\Policies\ClassPolicy;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
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
        Gate::policy(SchoolClass::class, ClassPolicy::class);
        RateLimiter::for('auth', fn (Request $request) => Limit::perMinute(10)->by($request->ip()));
        RateLimiter::for('public-write', fn (Request $request) => Limit::perMinute(10)->by($request->ip()));
        RateLimiter::for('expensive-admin', fn (Request $request) => Limit::perMinute(3)->by($request->user()?->id ?: $request->ip()));
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

        Storage::disk('private_documents')->buildTemporaryUrlsUsing(
            function (string $path, \DateTimeInterface $expiration, array $options = []): string {
                $document = Document::query()->where('file_path', $path)->firstOrFail();

                return URL::temporarySignedRoute(
                    'documents.download',
                    Carbon::instance($expiration),
                    ['document' => $document->id]
                );
            }
        );
    }
}

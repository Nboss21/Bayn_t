<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserHasRole
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $user = $request->user();

        if (! $user) {
            return response()->json([
                'message' => 'Unauthenticated.',
            ], Response::HTTP_UNAUTHORIZED);
        }

        if (! $user->is_active) {
            return response()->json([
                'message' => 'Your account has been deactivated.',
            ], Response::HTTP_FORBIDDEN);
        }

        if (! empty($roles) && ! $user->hasRole($roles)) {
            return response()->json([
                'message' => 'Unauthorized. You do not have permission to perform this action.',
            ], Response::HTTP_FORBIDDEN);
        }

        return $next($request);
    }
}

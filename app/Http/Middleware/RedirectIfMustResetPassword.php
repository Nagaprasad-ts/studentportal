<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class RedirectIfMustResetPassword
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check() && Auth::user()->must_reset_password) {
            $passwordResetRoute = route('password.force-reset');
            $logoutRoute = route('logout'); // Assuming a 'logout' route exists

            if (! $request->fullUrlIs($passwordResetRoute) && ! $request->fullUrlIs($logoutRoute)) {
                return redirect($passwordResetRoute);
            }
        }

        return $next($request);
    }
}

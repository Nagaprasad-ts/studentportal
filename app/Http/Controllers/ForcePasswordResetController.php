<?php

namespace App\Http\Controllers;

use App\Concerns\PasswordValidationRules;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class ForcePasswordResetController extends Controller
{
    use PasswordValidationRules;

    /**
     * Show the form for forcing a password reset.
     */
    public function showForceResetForm(Request $request)
    {
        if (! Auth::user()->must_reset_password) {
            return redirect()->route('dashboard');
        }

        return Inertia::render('Auth/ForceResetPassword');
    }

    /**
     * Update the user's password and reset the must_reset_password flag.
     */
    public function updatePassword(Request $request)
    {
        $request->validate([
            'password' => $this->passwordRules(),
            'password_confirmation' => ['required', 'same:password'],
        ]);

        Auth::user()->forceFill([
            'password' => Hash::make($request->password),
            'must_reset_password' => false,
        ])->save();

        Auth::guard('web')->login(Auth::user());

        return redirect()->route('dashboard')->with('status', 'Password updated successfully.');
    }
}

<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Middleware\VerifyCsrfToken;

uses(RefreshDatabase::class); // Only RefreshDatabase here

test('user with must_reset_password true is redirected to force reset password page after login', function () {
    $user = User::factory()->create([
        'usn' => 'testuser',
        'password' => Hash::make('password'),
        'must_reset_password' => true,
    ]);

    // Perform login, bypassing CSRF
    $this->post('/login', [
        'usn' => 'testuser',
        'password' => 'password',
    ]);
    
    // Now, attempt to access a protected route (e.g., dashboard)
    // The middleware should intercept this and redirect to force-reset-password
    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertRedirect(route('password.force-reset'));

    $this->assertAuthenticatedAs($user);
});

test('user can successfully reset password and flag is set to false', function () {
    $user = User::factory()->create([
        'usn' => 'testuser',
        'password' => Hash::make('old-password'),
        'must_reset_password' => true,
    ]);

    $this->actingAs($user)
        ->get(route('dashboard')) // This should redirect to force-reset-password
        ->assertRedirect(route('password.force-reset'));

    $this->actingAs($user)
        ->post(route('password.force-reset.update'), [
            'password' => 'new-password',
            'password_confirmation' => 'new-password',
        ])
        ->assertRedirect(route('dashboard')); // After successful reset, should redirect to dashboard

    $user->refresh();
    $this->assertFalse($user->must_reset_password);
    $this->assertTrue(Hash::check('new-password', $user->password));

    // Test if user can log in with new password
    Auth::logout();
    $this->post('/login', [
        'usn' => 'testuser',
        'password' => 'new-password',
    ])
        ->assertRedirect(route('dashboard'));
});

test('user without must_reset_password true is not redirected', function () {
    $user = User::factory()->create([
        'usn' => 'normaluser',
        'password' => Hash::make('password'),
        'must_reset_password' => false,
    ]);

    $this->post('/login', [
        'usn' => 'normaluser',
        'password' => 'password',
    ])
        ->assertRedirect(route('dashboard'));

    $this->assertAuthenticatedAs($user);
});

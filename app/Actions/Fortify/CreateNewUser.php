<?php

namespace App\Actions\Fortify;

use App\Concerns\PasswordValidationRules;
use App\Concerns\ProfileValidationRules;
use App\Concerns\UsnValidationRules;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\CreatesNewUsers;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules, ProfileValidationRules, UsnValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            ...$this->nameRules(),
            ...$this->usnRules(),
            'password' => $this->passwordRules(), // This will be used only if password is provided
        ])->validate();

        $password = $input['password'] ?? Str::random(10); // Generate if not provided

        return User::create([
            'name' => $input['name'],
            'usn' => $input['usn'],
            'password' => Hash::make($password),
            'must_reset_password' => true,
            'role' => 'student', // Assign default role
        ]);
    }
}

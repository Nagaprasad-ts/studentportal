<?php

namespace App\Concerns;

use App\Models\User;
use Illuminate\Validation\Rule;

trait UsnValidationRules
{
    /**
     * Get the validation rules used to validate USNs.
     *
     * @return array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>
     */
    protected function usnRules(?int $userId = null): array
    {
        return [
            'required',
            'string',
            'max:255',
            $userId === null
                ? Rule::unique(User::class, 'usn')
                : Rule::unique(User::class, 'usn')->ignore($userId),
        ];
    }
}

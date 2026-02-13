<?php

namespace App\Policies;

use App\Models\StudentForm;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class StudentFormPolicy
{
    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, StudentForm $studentForm): bool
    {
        return $user->id === $studentForm->user_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return ! $user->studentForm()->exists();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, StudentForm $studentForm): bool
    {
        return $user->id === $studentForm->user_id;
    }
}

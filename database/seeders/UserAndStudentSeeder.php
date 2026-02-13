<?php

namespace Database\Seeders;

use App\Models\StudentForm;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserAndStudentSeeder extends Seeder
{
    /**
     * Seed users for admin/accounts/student roles and one student form.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@studentportal.test'],
            [
                'name' => 'Admin User',
                'usn' => 'ADM0001',
                'password' => Hash::make('password'),
                'must_reset_password' => false,
                'role' => 'admin',
                'email_verified_at' => now(),
            ],
        );

        User::updateOrCreate(
            ['email' => 'accounts@studentportal.test'],
            [
                'name' => 'Accounts User',
                'usn' => 'ACC0001',
                'password' => Hash::make('password'),
                'must_reset_password' => false,
                'role' => 'accounts',
                'email_verified_at' => now(),
            ],
        );

        $student = User::updateOrCreate(
            ['email' => 'student@studentportal.test'],
            [
                'name' => 'Student User',
                'usn' => 'STU0001',
                'password' => Hash::make('password'),
                'must_reset_password' => true,
                'role' => 'student',
                'email_verified_at' => now(),
            ],
        );

        StudentForm::updateOrCreate(
            ['user_id' => $student->id],
            [
                'address' => '123 College Road, Bengaluru',
                'phone_number' => '9876543210',
                'date_of_birth' => '2003-01-15',
            ],
        );
    }
}

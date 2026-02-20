<?php

namespace App\Imports;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\SkipsFailures;
use Maatwebsite\Excel\Concerns\SkipsOnFailure;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class StudentsImport implements SkipsOnFailure, ToModel, WithHeadingRow, WithValidation
{
    use Importable, SkipsFailures;

    /**
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        $email = $row['usn'].'@test.com';

        return new User([
            'usn' => $row['usn'],
            'name' => $row['name'],
            'email' => $email, // Add email field
            'password' => Hash::make('password'),
            'must_reset_password' => true,
        ]);
    }

    public function rules(): array
    {
        return [
            'usn' => 'required|unique:users,usn',
            'name' => 'required',
            'email' => 'email|unique:users,email', // Add email validation
        ];
    }
}

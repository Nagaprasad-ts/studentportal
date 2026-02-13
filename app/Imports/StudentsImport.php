<?php

namespace App\Imports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class StudentsImport implements ToModel, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        // Skip if USN or Name is missing
        if (!isset($row['usn']) || !isset($row['name'])) {
            return null;
        }

        // Generate a random password for new users
        $password = Str::random(10);

        return new User([
            'usn' => $row['usn'],
            'name' => $row['name'],
            'password' => Hash::make($password),
            'must_reset_password' => true,
        ]);
    }
}
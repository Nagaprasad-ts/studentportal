<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\assertDatabaseMissing;

uses(RefreshDatabase::class);

test('excel import validation catches missing names', function () {
    $this->withoutMiddleware(\App\Http\Middleware\VerifyCsrfToken::class);

    // 1. Authenticate as an admin user.
    $admin = User::factory()->create(['role' => 'admin']);
    actingAs($admin);

    // 2. Create a temporary xlsx file.
    $filename = storage_path('framework/testing/test.xlsx');
    $file = fopen($filename, 'w');
    // We are creating a CSV file but giving it an .xlsx extension.
    // This is enough to pass the initial validation, and Maatwebsite/Excel is smart enough to parse it.
    fputcsv($file, ['usn', 'name']);
    fputcsv($file, ['1nh20cs002', 'Test User']);
    fputcsv($file, ['1nh20cs001', '']); // This row is invalid because the name is empty.
    fclose($file);

    $uploadedFile = new UploadedFile(
        $filename,
        'test.xlsx',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        null,
        true
    );

    // 3. Post the file to the endpoint.
    $response = $this->post('/import/students', [
        'file' => $uploadedFile,
    ]);

    // 4. Assertions
    $response->assertRedirect();
    $response->assertSessionHas('error');

    // Assert that the valid user was created
    assertDatabaseHas('users', [
        'usn' => '1nh20cs002',
    ]);

    // Assert that the invalid user was NOT created
    assertDatabaseMissing('users', [
        'usn' => '1nh20cs001',
    ]);

    // 5. Clean up the temporary file.
    unlink($filename);
});

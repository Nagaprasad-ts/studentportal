<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware(['auth'])->group(function () {
    Route::get('/force-reset-password', [App\Http\Controllers\ForcePasswordResetController::class, 'showForceResetForm'])->name('password.force-reset');
    Route::post('/force-reset-password', [App\Http\Controllers\ForcePasswordResetController::class, 'updatePassword'])->name('password.force-reset.update');

    // Excel Import Routes
    Route::middleware(['check.role:admin,accounts'])->group(function () {
        Route::get('/import/students', [App\Http\Controllers\ExcelImportController::class, 'showImportForm'])->name('students.import.form');
        Route::post('/import/students', [App\Http\Controllers\ExcelImportController::class, 'importStudents'])->name('students.import');
    });

    // Student Form Routes
    Route::get('/student-form', [App\Http\Controllers\StudentFormController::class, 'show'])->name('student-form.show');
    Route::post('/student-form', [App\Http\Controllers\StudentFormController::class, 'store'])->name('student-form.store');
    Route::put('/student-form', [App\Http\Controllers\StudentFormController::class, 'update'])->name('student-form.update');
    Route::get('/student-form/download', [App\Http\Controllers\StudentFormController::class, 'downloadPdf'])->name('student-form.download');
});

require __DIR__.'/settings.php';

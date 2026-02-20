<?php

namespace App\Http\Controllers;

use App\Imports\StudentsImport;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Validators\ValidationException;
use Throwable;

class ExcelImportController extends Controller
{
    /**
     * Show the form for importing students.
     */
    public function showImportForm()
    {
        return Inertia::render('Admin/ImportStudents');
    }

    /**
     * Import students from an Excel file.
     */
    public function importStudents(Request $request)
    {
        try {
            $request->validate([
                'file' => ['required', 'file', 'mimes:xlsx,xls'],
            ]);

            $import = new StudentsImport;
            $import->import($request->file('file'));

            if ($import->failures()->isNotEmpty()) {
                $error = 'The following rows failed to import: ';
                foreach ($import->failures() as $failure) {
                    $error .= 'Row '.$failure->row().': '.rtrim(implode(', ', $failure->errors()), '.').'. ';
                }

                return redirect()->back()->with('error', $error);
            }

            return redirect()->back()->with('success', 'Students imported successfully.');
        } catch (ValidationException $e) {
            $failures = $e->failures();
            $error = 'Error importing students: ';
            foreach ($failures as $failure) {
                $error .= 'Row '.$failure->row().': '.implode(', ', $failure->errors()).' ';
            }

            return redirect()->back()->with('error', $error);
        } catch (Throwable $th) {
            return redirect()->back()->with('error', 'An unexpected error occurred: '.$th->getMessage());
        }
    }
}

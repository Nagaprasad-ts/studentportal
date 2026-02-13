<?php

namespace App\Http\Controllers;

use App\Models\StudentForm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Dompdf\Dompdf;
use Dompdf\Options;

class StudentFormController extends Controller
{
    /**
     * Display the student form.
     */
    public function show()
    {
        $user = Auth::user()->load('studentForm');

        return Inertia::render('Student/StudentForm', [
            'studentForm' => $user->studentForm,
            'userName' => $user->name,
            'userUsn' => $user->usn,
        ]);
    }

    /**
     * Store a newly created student form in storage.
     */
    public function store(Request $request)
    {
        $this->authorize('create', StudentForm::class);

        $validated = $request->validate([
            'address' => ['required', 'string', 'max:255'],
            'phone_number' => ['required', 'string', 'max:20'],
            'date_of_birth' => ['required', 'date'],
        ]);

        Auth::user()->studentForm()->create($validated);

        return redirect()->route('student-form.show')->with('success', 'Form submitted successfully.');
    }

    /**
     * Update the specified student form in storage.
     */
    public function update(Request $request)
    {
        $studentForm = Auth::user()->studentForm;

        if (! $studentForm) {
            return redirect()->back()->with('error', 'Student form not found.');
        }

        $this->authorize('update', $studentForm);

        $validated = $request->validate([
            'address' => ['required', 'string', 'max:255'],
            'phone_number' => ['required', 'string', 'max:20'],
            'date_of_birth' => ['required', 'date'],
        ]);

        $studentForm->update($validated);

        return redirect()->route('student-form.show')->with('success', 'Form updated successfully.');
    }

    /**
     * Download the student form as a PDF.
     */
    public function downloadPdf()
    {
        $user = Auth::user()->load('studentForm');
        $studentForm = $user->studentForm;

        if (! $studentForm) {
            return redirect()->back()->with('error', 'Student form not found.');
        }

        $this->authorize('view', $studentForm);

        $data = [
            'userName' => $user->name,
            'userUsn' => $user->usn,
            'studentForm' => $studentForm,
        ];

        $options = new Options();
        $options->set('isHtml5ParserEnabled', true);
        $options->set('isRemoteEnabled', true);

        $dompdf = new Dompdf($options);
        $html = view('pdf.student-form', $data)->render();
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'portrait');
        $dompdf->render();

        return $dompdf->stream('student_form_' . $user->usn . '.pdf');
    }
}

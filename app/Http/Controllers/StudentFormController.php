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

        $validated = $request->validate(
            [
                'branch' => ['required', 'string', 'max:255'],
                'semester' => ['required', 'integer', 'between:1,6'],
                'gender' => ['required', 'in:male,female'],
                'emailID' => ['required', 'email', 'max:255'],
                'mobileNumber' => ['required', 'digits:10'],
                'CourseType' => ['required', 'in:global,professional,executive'],
            ],
            [
                // Branch
                'branch.required' => 'Branch is required.',
                'branch.max' => 'Branch cannot exceed 255 characters.',

                // Semester
                'semester.required' => 'Semester is required.',
                'semester.integer' => 'Semester must be a number.',
                'semester.between' => 'Semester must be between 1 and 6.',

                // Gender
                'gender.required' => 'Please select your gender.',
                'gender.in' => 'Invalid gender selected.',

                // Email
                'emailID.required' => 'Email address is required.',
                'emailID.email' => 'Please enter a valid email address.',

                // Mobile
                'mobileNumber.required' => 'Mobile number is required.',
                'mobileNumber.digits' => 'Mobile number must be exactly 10 digits.',

                // Course Type
                'CourseType.required' => 'Please select a course type.',
                'CourseType.in' => 'Invalid course type selected.',
            ]
        );

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

        $validated = $request->validate(
            [
                'branch' => ['required', 'string', 'max:255'],
                'semester' => ['required', 'integer', 'between:1,6'],
                'gender' => ['required', 'in:male,female'],
                'emailID' => ['required', 'email', 'max:255'],
                'mobileNumber' => ['required', 'digits:10'],
                'CourseType' => ['required', 'in:global,professional,executive'],
            ],
            [
                // Branch
                'branch.required' => 'Branch is required.',
                'branch.max' => 'Branch cannot exceed 255 characters.',

                // Semester
                'semester.required' => 'Semester is required.',
                'semester.integer' => 'Semester must be a number.',
                'semester.between' => 'Semester must be between 1 and 6.',

                // Gender
                'gender.required' => 'Please select your gender.',
                'gender.in' => 'Invalid gender selected.',

                // Email
                'emailID.required' => 'Email address is required.',
                'emailID.email' => 'Please enter a valid email address.',

                // Mobile
                'mobileNumber.required' => 'Mobile number is required.',
                'mobileNumber.digits' => 'Mobile number must be exactly 10 digits.',

                // Course Type
                'CourseType.required' => 'Please select a course type.',
                'CourseType.in' => 'Invalid course type selected.',
            ]
        );

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
    
        if (!$studentForm) {
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

        return response(
            $dompdf->output(),
            200,
            [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => 'attachment; filename="student_form_' . $user->usn . '.pdf"',
            ]
        );
    }
}

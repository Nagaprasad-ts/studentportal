<!DOCTYPE html>
<html>
<head>
    <title>Student Form</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        h1 {
            color: #333;
            text-align: center;
        }
        .container {
            width: 80%;
            margin: 0 auto;
            border: 1px solid #ccc;
            padding: 20px;
            box-shadow: 2px 2px 10px rgba(0,0,0,0.1);
        }
        .field {
            margin-bottom: 10px;
        }
        .field label {
            font-weight: bold;
            display: inline-block;
            width: 150px;
        }
        .field span {
            display: inline-block;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Student Form Details</h1>

        <div class="field">
            <label>Name:</label>
            <span>{{ $userName }}</span>
        </div>

        <div class="field">
            <label>USN:</label>
            <span>{{ $userUsn }}</span>
        </div>

        @if ($studentForm)
            <div class="field">
                <label>Branch:</label>
                <span>{{ $studentForm->branch }}</span>
            </div>

            <div class="field">
                <label>Semester:</label>
                <span>{{ $studentForm->semester }}</span>
            </div>

            <div class="field">
                <label>Gender:</label>
                <span>{{ ucfirst($studentForm->gender) }}</span>
            </div>

            <div class="field">
                <label>Email:</label>
                <span>{{ $studentForm->emailID }}</span>
            </div>

            <div class="field">
                <label>Mobile Number:</label>
                <span>{{ $studentForm->mobileNumber }}</span>
            </div>

            <div class="field">
                <label>Course Type:</label>
                <span>{{ ucfirst($studentForm->CourseType) }}</span>
            </div>
        @else
            <p>No form data submitted yet.</p>
        @endif

    </div>
</body>
</html>

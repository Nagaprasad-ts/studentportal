import { Form, Head, usePage } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AppLayout from '@/layouts/app-layout';
import { store, update, download } from '@/routes/student-form';
import type { PageProps } from '@/types';
import type { BreadcrumbItem } from '@/types';
import type { StudentForm } from '@/types/models'; //Imported twice, fix this

// Define the type for the StudentForm props
type StudentFormProps = PageProps & {
    studentForm: StudentForm | null;
    userName: string;
    userUsn: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Student Form',
        href: '/student-form',
    },
];

export default function StudentForm() {
    const { studentForm, userName, userUsn } =
        usePage<StudentFormProps>().props;

    const initialData: StudentForm = {
        branch: studentForm?.branch ?? '',
        semester: studentForm?.semester ?? '',
        gender: studentForm?.gender ?? '',
        emailID: studentForm?.emailID ?? '',
        mobileNumber: studentForm?.mobileNumber ?? '',
        CourseType: studentForm?.CourseType ?? '',
    };

    const formAction = studentForm ? update : store;

    return (
        <AppLayout
            title="Student Form"
            description="Fill or edit your student details."
            breadcrumbs={breadcrumbs}
        >
            <Head title="Student Form" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-5">
                <Form {...formAction.form()} className="flex flex-col gap-6">
                    {({ processing, errors }) => (
                        <>
                            {studentForm && (
                                <input type="hidden" name="_method" value="put" />
                            )}
                            <div className="grid md:grid-cols-2 gap-6 items-start">
                                <div className="grid gap-2">
                                    <Label htmlFor="usn">USN</Label>
                                    <Input
                                        id="usn"
                                        type="text"
                                        name="usn"
                                        value={userUsn}
                                        disabled
                                        aria-label="Enter your USN"
                                    />
                                    <InputError message={errors.usn} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={userName}
                                        disabled
                                        aria-label="Enter your name"
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="branch">Branch</Label>
                                    <Input
                                        id="branch"
                                        type="text"
                                        name="branch"
                                        defaultValue={initialData.branch}
                                        required
                                        aria-label="Enter your branch"
                                    />
                                    <InputError
                                        message={errors.branch}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="semester">Semester</Label>
                                    <Input
                                        id="semester"
                                        type="number"
                                        name="semester"
                                        defaultValue={initialData.semester}
                                        required
                                        aria-label="Enter your semester"
                                    />
                                    <InputError
                                        message={errors.semester}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="gender">Gender</Label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        defaultValue={initialData.gender}
                                        className="rounded-md border px-3 py-2"
                                        required
                                        aria-label="Select your gender"
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                    <InputError
                                        message={errors.gender}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="emailID">Email</Label>
                                    <Input
                                        id="emailID"
                                        type="email"
                                        name="emailID"
                                        defaultValue={initialData.emailID}
                                        required
                                        aria-label="Enter your email"
                                    />
                                    <InputError
                                        message={errors.emailID}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="mobileNumber">
                                        Mobile Number
                                    </Label>
                                    <Input
                                        id="mobileNumber"
                                        type="tel"
                                        name="mobileNumber"
                                        defaultValue={initialData.mobileNumber}
                                        required
                                        aria-label="Enter your mobile number"
                                    />
                                    <InputError
                                        message={errors.mobileNumber}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="CourseType">
                                        Course Type
                                    </Label>
                                    <select
                                        id="CourseType"
                                        name="CourseType"
                                        defaultValue={initialData.CourseType}
                                        className="rounded-md border px-3 py-2"
                                        required
                                        aria-label="Select course type"
                                    >
                                        <option value="">Select Course Type</option>
                                        <option value="global">Global</option>
                                        <option value="professional">
                                            Professional
                                        </option>
                                        <option value="executive">
                                            Executive
                                        </option>
                                    </select>
                                    <InputError
                                        message={errors.CourseType}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={processing}
                                >
                                    {processing && <Spinner />}
                                    {studentForm
                                        ? 'Update Form'
                                        : 'Submit Form'}
                                </Button>
                                {studentForm && (
                                <Button
                                    asChild
                                    variant="outline"
                                    className="w-full"
                                >
                                    <a href={download().url} target="_blank">
                                        Download Form as PDF
                                    </a>
                                </Button>
                            )}
                            </div>
                            
                        </>
                    )}
                </Form>
            </div>
        </AppLayout>
    );
}

import { Form, Head, usePage } from '@inertiajs/react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AppLayout from '@/layouts/app-layout';
import { store, update, download } from '@/routes/student-form';
import type { PageProps } from '@/types';
import type { StudentForm as StudentFormType } from '@/types/models'; // Assuming you'll create a types/models.ts

// Define the type for the StudentForm props
type StudentFormProps = PageProps & {
    studentForm: StudentFormType | null;
    userName: string;
    userUsn: string;
};

export default function StudentForm() {
    const { studentForm, userName, userUsn } = usePage<StudentFormProps>().props;

    const initialData = {
        address: studentForm?.address || '',
        phone_number: studentForm?.phone_number || '',
        date_of_birth: studentForm?.date_of_birth || '',
    };

    const formAction = studentForm ? update : store;

    return (
        <AppLayout
            title="Student Form"
            description="Fill or edit your student details."
        >
            <Head title="Student Form" />

            <Form
                {...formAction.form()}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        {studentForm && (
                            <input type="hidden" name="_method" value="put" />
                        )}
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="usn">USN</Label>
                                <Input
                                    id="usn"
                                    type="text"
                                    name="usn"
                                    value={userUsn}
                                    disabled
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={userName}
                                    disabled
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    id="address"
                                    type="text"
                                    name="address"
                                    defaultValue={initialData.address}
                                    required
                                />
                                <InputError message={errors.address} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="phone_number">
                                    Phone Number
                                </Label>
                                <Input
                                    id="phone_number"
                                    type="text"
                                    name="phone_number"
                                    defaultValue={initialData.phone_number}
                                    required
                                />
                                <InputError message={errors.phone_number} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="date_of_birth">
                                    Date of Birth
                                </Label>
                                <Input
                                    id="date_of_birth"
                                    type="date"
                                    name="date_of_birth"
                                    defaultValue={initialData.date_of_birth}
                                    required
                                />
                                <InputError message={errors.date_of_birth} />
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 w-full"
                                disabled={processing}
                            >
                                {processing && <Spinner />}
                                {studentForm ? 'Update Form' : 'Submit Form'}
                            </Button>
                        </div>
                        {studentForm && (
                            <TextLink href={download()} className="mt-4 w-full text-center">
                                Download Form as PDF
                            </TextLink>
                        )}
                    </>
                )}
            </Form>
        </AppLayout>
    );
}

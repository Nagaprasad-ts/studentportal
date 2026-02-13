import type { Method } from '@inertiajs/core';
import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import * as studentImportRoutes from '@/routes/students/import';

type ImportRouteLike = {
    form: () => {
        action: string;
        method: Method | Uppercase<Method>;
    };
};
    
const importStudentsRoute =
    ((studentImportRoutes as Record<string, unknown>).importStudents ??
        (studentImportRoutes as Record<string, unknown>).store) as ImportRouteLike;

export default function ImportStudents() {
    return (
        <AuthLayout
            title="Import Students"
            description="Upload an Excel file to import student USNs and names."
        >
            <Head title="Import Students" />

            <Form
                {...importStudentsRoute.form()}
                resetOnSuccess={['file']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="file">Excel File</Label>
                            <Input
                                id="file"
                                type="file"
                                name="file"
                                required
                                tabIndex={1}
                                accept=".xlsx, .xls"
                            />
                            <InputError message={errors.file} />
                        </div>

                        <Button
                            type="submit"
                            className="mt-4 w-full"
                            tabIndex={2}
                            disabled={processing}
                        >
                            {processing && <Spinner />}
                            Import Students
                        </Button>
                    </div>
                )}
            </Form>
        </AuthLayout>
    );
}

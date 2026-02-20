import { Form, Head, usePage } from '@inertiajs/react';
import AlertError from '@/components/alert-error';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AppLayout from '@/layouts/app-layout';
import type { PageProps } from '@/types';

const importStudentsForm = {
    action: '/import/students',
    method: 'post' as const,
};

export default function ImportStudents() {
    const { props } = usePage<PageProps>();
    const flash = props.flash ?? {};


    return (
        <AppLayout
            title="Import Students"
            description="Upload an Excel file to import student USNs and names."
        >
            <Head title="Import Students" />

            <div className="flex flex-col items-center justify-center shadow-md shadow-muted m-auto p-5 rounded-xl">
                
                <Form
                    {...importStudentsForm}
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

                            {flash.success && (
                                <div className="text-sm font-medium text-green-600 text-center">
                                    {flash.success}
                                </div>
                            )}

                            {flash.error && (
                                <AlertError
                                    errors={flash.error.split(/(?=Row \d+:)/g).filter(Boolean)}
                                />
                            )}

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
            </div>
        </AppLayout>
    );
}

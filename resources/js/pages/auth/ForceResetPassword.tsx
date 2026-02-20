import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';

const forceResetPasswordForm = {
    action: '/force-reset-password',
    method: 'post' as const,
};

export default function ForceResetPassword() {
    return (
        <AuthLayout
            title="Force Password Reset"
            description="You must reset your password before continuing."
        >
            <Head title="Force Password Reset" />

            <Form
                {...forceResetPasswordForm}
                resetOnSuccess={['password', 'password_confirmation']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="password">New Password</Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                required
                                tabIndex={1}
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">Confirm Password</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                required
                                tabIndex={2}
                            />
                            <InputError message={errors.password_confirmation} />
                        </div>

                        <Button
                            type="submit"
                            className="mt-4 w-full"
                            tabIndex={3}
                            disabled={processing}
                        >
                            {processing && <Spinner />}
                            Reset Password
                        </Button>
                    </div>
                )}
            </Form>
        </AuthLayout>
    );
}

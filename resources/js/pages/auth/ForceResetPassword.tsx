import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
// import { update } from '@/routes/password.force-reset';
import { update } from '@/routes/password/force-reset';

export default function ForceResetPassword() {
    return (
        <AuthLayout
            title="Force Password Reset"
            description="Your password must be reset before you can continue."
        >
            <Head title="Force Reset Password" />

            <Form
                {...update.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="password">New Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="new-password"
                                    placeholder="New Password"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">
                                    Confirm New Password
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    required
                                    tabIndex={2}
                                    autoComplete="new-password"
                                    placeholder="Confirm New Password"
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                />
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
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}

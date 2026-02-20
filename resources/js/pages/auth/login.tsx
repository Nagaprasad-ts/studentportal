import { Form, Head } from '@inertiajs/react';
import { GraduationCap } from 'lucide-react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/login';

// Color constants based on user request
const COLORS = {
    primary: '#2060D7',
    secondary: '#C6D9FD',
    danger: '#D43939',
    white: '#FFFFFF',
    textMain: '#1b1b18',
    textLight: '#6B7280',
};

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({ status }: Props) {
    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="min-h-screen bg-white font-sans text-[#1b1b18]">
                {/* Navigation Bar */}
                <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-sm">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            {/* Logo */}
                            <div className="flex items-center gap-2">
                                <div
                                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                                    style={{ backgroundColor: COLORS.primary }}
                                >
                                    <GraduationCap className="h-6 w-6 text-white" />
                                </div>
                                <span className="text-xl font-bold tracking-tight text-gray-900">
                                    NH
                                    <span style={{ color: COLORS.primary }}>
                                        CM
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="relative overflow-hidden py-9 md:py-32">
                    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
                            <div className="flex flex-col justify-center text-center lg:col-span-7 lg:text-left">
                                <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl md:leading-18">
                                    Design Your Success With
                                    <span style={{ color: COLORS.primary }}>
                                        {' '}
                                        Dedication and Excellence
                                    </span>
                                </h1>
                                <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 lg:mx-0">
                                    Access your courses, check results, and
                                    manage your academic journey seamlessly. The
                                    new student portal is designed for your
                                    success.
                                </p>
                            </div>

                            {/* Hero Image / Illustration Placeholder */}
                            <div className="relative mt-12 lg:col-span-5 lg:mt-0 py-5">
                                <div className="relative rounded-2xl border border-gray-100 bg-white p-6 shadow-2xl">

                                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center pb-8">Login</h2>

                                    {/* Fake UI Card */}
                                    <Form
                                        {...store.form()}
                                        resetOnSuccess={['password']}
                                        className="flex flex-col gap-6"
                                    >
                                        {({ processing, errors }) => (
                                            <>
                                                <div className="grid gap-6">
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="usn">
                                                            USN
                                                        </Label>
                                                        <Input
                                                            id="usn"
                                                            type="text"
                                                            name="usn"
                                                            required
                                                            autoFocus
                                                            tabIndex={1}
                                                            autoComplete="username"
                                                            placeholder="Enter your USN"
                                                        />
                                                        <InputError
                                                            message={errors.usn}
                                                        />
                                                    </div>

                                                    <div className="grid gap-2">
                                                        <div className="flex items-center">
                                                            <Label htmlFor="password">
                                                                Password
                                                            </Label>
                                                        </div>
                                                        <Input
                                                            id="password"
                                                            type="password"
                                                            name="password"
                                                            required
                                                            tabIndex={2}
                                                            autoComplete="current-password"
                                                            placeholder="Password"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.password
                                                            }
                                                        />
                                                    </div>

                                                    <div className="flex items-center space-x-3">
                                                        <Checkbox
                                                            id="remember"
                                                            name="remember"
                                                            tabIndex={3}
                                                        />
                                                        <Label htmlFor="remember">
                                                            Remember me
                                                        </Label>
                                                    </div>

                                                    <Button
                                                        type="submit"
                                                        className="h-10 w-full rounded-md text-white flex items-center justify-center text-md font-semibold" style={{ backgroundColor: COLORS.primary }}
                                                        tabIndex={4}
                                                        disabled={processing}
                                                        data-test="login-button"
                                                    >
                                                        {processing && (
                                                            <Spinner />
                                                        )}
                                                        Log in
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="sticky bottom-0 bg-white">
                    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col items-center justify-between md:flex-row">
                            <div className="mb-4 flex items-center gap-2 md:mb-0">
                                <GraduationCap className="h-6 w-6 text-gray-400" />
                                <span className="text-lg font-bold text-gray-900">
                                    EduPortal
                                </span>
                            </div>
                            <p className="text-center text-sm leading-5 text-gray-500">
                                &copy; 2024 University Student Portal. All
                                rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
        </>
    );
}

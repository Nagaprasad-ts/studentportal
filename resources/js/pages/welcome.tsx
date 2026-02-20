import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login } from '@/routes';
import type { SharedData } from '@/types';

// Color constants based on user request
const COLORS = {
  primary: '#2060D7',
  secondary: '#C6D9FD',
  danger: '#D43939',
  white: '#FFFFFF',
  textMain: '#1b1b18',
  textLight: '#6B7280'
};

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

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
                    <div className="flex h-16 justify-between items-center">
                        
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                        <img src="images/logo.png" alt="NHCM" width={50} height={50} />
                        <span className="text-xl font-bold tracking-wide text-gray-900">
                            New Horizon<span style={{ color: COLORS.primary }}> College</span>
                        </span>
                        </div>

                        {/* Auth Buttons (User's Logic Implemented Here) */}
                        <div className="md:flex items-center gap-4">
                        {auth.user ? (
                            <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600">Hi, <span className="font-semibold">{auth.user.name}</span></span>
                            <Link
                                href={dashboard()}
                                className="inline-flex items-center justify-center rounded-md px-5 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                                style={{ backgroundColor: COLORS.primary }} // Using Primary Blue
                            >
                                Dashboard
                            </Link>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link
                                    href={login()}
                                    className="inline-flex items-center justify-center rounded-md px-8 py-3 text-base font-medium text-white shadow-lg transition-transform hover:-translate-y-0.5"
                                    style={{ backgroundColor: COLORS.primary }}
                                >
                                    Log in
                                </Link>
                            </div>
                        )}
                        </div>
                    </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="relative overflow-hidden py-9 md:py-32">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
                        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
                            <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
                                <h1 className="text-4xl font-extrabold tracking-tight md:leading-18 text-gray-900 sm:text-5xl md:text-6xl mb-6">
                                    Design Your Success With
                                    <span style={{ color: COLORS.primary }}> Dedication and Excellence</span>
                                </h1>
                                <p className="mx-auto lg:mx-0 max-w-2xl text-lg text-gray-600 mb-8">
                                    Access your courses, check results, and manage your academic journey seamlessly. 
                                    The new student portal is designed for your success.
                                </p>
                            </div>

                            {/* Hero Image / Illustration Placeholder */}
                            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
                                <div className="relative rounded-2xl p-6 md:shadow-2xl bg-white border border-gray-100">
                                    {/* <div className="absolute -top-4 -right-4 h-20 w-20 rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{ backgroundColor: COLORS.white }}>
                                        <div className="h-14 w-14 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFF0F0' }}>
                                            <Bell className="h-6 w-6" style={{ color: COLORS.danger }} />
                                        </div>
                                    </div> */}
                                    
                                    {/* Fake UI Card */}
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-4 mb-6">
                                            <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                                            <div>
                                            <div className="h-4 w-32 bg-gray-200 rounded"></div>
                                            <div className="h-3 w-20 bg-gray-100 rounded mt-2"></div>
                                            </div>
                                        </div>
                                        <div className="h-32 rounded-xl w-full opacity-30" style={{ backgroundColor: COLORS.secondary }}></div>
                                        <div className="space-y-2">
                                            <div className="h-4 w-full bg-gray-100 rounded"></div>
                                            <div className="h-4 w-5/6 bg-gray-100 rounded"></div>
                                        </div>
                                        <div className="pt-4">
                                            {auth.user ? (
                                                <Link href={dashboard()} className="h-10 w-full rounded-md text-white flex items-center justify-center text-md font-semibold" style={{ backgroundColor: COLORS.primary }}>
                                                    View Student Profile
                                                </Link>
                                            ) : (
                                                <Link href={login()} className="h-10 w-full rounded-md text-white flex items-center justify-center text-md font-semibold" style={{ backgroundColor: COLORS.primary }}>
                                                    Login
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="sticky bottom-0 bg-white">
                    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="flex items-center gap-2 mb-4 md:mb-0">
                                <img src="images/logo.png" alt="NHCM" width={50} height={50} />
                                <span className="text-lg font-bold text-gray-900">New Horizon College</span>
                            </div>
                            <p className="hidden md:block text-center text-base leading-5 text-gray-500">
                                &copy; {new Date().getFullYear()} | New Horizon Educational Institution. All rights reserved.
                            </p>
                            <p className="block md:hidden text-center text-base leading-5 text-gray-500">
                                &copy; {new Date().getFullYear()} | New Horizon Educational Institution. <br /> All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

import { Head, usePage } from '@inertiajs/react';
import { useTypewriter } from "@/hooks/useTypewriter";
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import type { SharedData } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;
    const message = `Welcome, ${auth.user.name}!`
    const typedText = useTypewriter(message, 70)

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-5 items-center justify-center mb-16">
                {auth.user ? (
                    <>
                        <h1 className="text-2xl font-semibold text-center">
                            {typedText}
                            <span className="animate-pulse">|</span>
                        </h1>
                    </>
                ) : (
                    <h1>Welcome!</h1>
                )}
            </div>
        </AppLayout>
    );
}

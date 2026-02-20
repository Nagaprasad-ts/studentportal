import { Link, usePage } from '@inertiajs/react';
import { FormInput, Import, LayoutGrid } from 'lucide-react';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem, SharedData } from '@/types';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Registration Form',
        href: '/student-form',
        icon: FormInput,
    },
    {
        title: 'Import Students',
        href: '/import/students',
        icon: Import,
    }
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const userRole = auth.user?.role;

    const filteredNavItems = mainNavItems.filter(item => {
        if (item.title === 'Dashboard') {
            return true; // Dashboard is always visible
        }
        if (userRole === 'student' && item.title === 'Registration Form') {
            return true;
        }
        if (userRole === 'accounts' && item.title === 'Import Students') {
            return true;
        }
        return false;
    });

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={filteredNavItems} label="Forms"/>
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

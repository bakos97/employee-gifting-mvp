'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    Gift,
    Truck,
    CreditCard,
    FileText,
    Settings,
    LogOut
} from 'lucide-react';
import { cn } from '@/app/lib/utils';
import Image from 'next/image';

const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Employees', href: '/dashboard/employees', icon: Users },
    { name: 'Gifts', href: '/dashboard/gifts', icon: Gift },
    { name: 'Logistics', href: '/dashboard/logistics', icon: Truck },
    { name: 'Budget', href: '/dashboard/budget', icon: CreditCard },
    { name: 'Reports', href: '/dashboard/reports', icon: FileText },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden h-screen w-64 flex-col border-r border-border bg-card md:flex">
            {/* Logo Area */}
            <div className="flex h-16 items-center border-b border-border px-6">
                <Link href="/dashboard" className="flex items-center gap-2 font-serif text-2xl font-bold text-primary">
                    <Gift className="h-6 w-6 text-primary" />
                    <span>Giftly</span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 px-3 py-6">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                isActive
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                            )}
                        >
                            <item.icon
                                className={cn(
                                    'mr-3 h-5 w-5 flex-shrink-0',
                                    isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                                )}
                            />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Area */}
            <div className="border-t border-border p-4">
                <Link
                    href="/settings"
                    className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                    <Settings className="mr-3 h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                    Settings
                </Link>
                <button className="mt-1 w-full text-left group flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-900">
                    <LogOut className="mr-3 h-5 w-5 text-muted-foreground group-hover:text-red-900" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}

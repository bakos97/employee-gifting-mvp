'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, LayoutDashboard, Users, PartyPopper, ChevronRight, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { ThemeToggle } from './ThemeToggle';
import { AnimatePresence, motion } from 'framer-motion';

const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/employees', label: 'Ansatte', icon: Users },
    { href: '/celebrations/new', label: 'Ny feiring', icon: PartyPopper },
];

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    // Close drawer on route change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const sidebarContent = (
        <>
            {/* Brand */}
            <div className="px-6 py-8">
                <Link href="/dashboard" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg glow-amber">
                        <Heart className="w-5 h-5 text-[hsl(220_16%_8%)]" />
                    </div>
                    <div>
                        <span className="text-lg font-semibold tracking-tight text-[hsl(var(--sidebar-text))]" style={{ fontFamily: 'var(--font-playfair)' }}>
                            Tribute<span className="text-amber-400">Page</span>
                        </span>
                    </div>
                </Link>
            </div>

            {/* Divider */}
            <div className="h-px mx-6 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                                isActive
                                    ? "bg-amber-500/15 text-amber-400"
                                    : "text-[hsl(var(--sidebar-muted))] hover:text-[hsl(var(--sidebar-text))] hover:bg-white/5"
                            )}
                        >
                            <item.icon className={cn(
                                "w-4.5 h-4.5 transition-colors",
                                isActive ? "text-amber-400" : "text-[hsl(var(--sidebar-muted))] group-hover:text-[hsl(var(--sidebar-text)/0.7)]"
                            )} />
                            <span className="flex-1">{item.label}</span>
                            {isActive && (
                                <ChevronRight className="w-3.5 h-3.5 text-amber-400/60" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer with theme toggle */}
            <div className="px-5 py-5 border-t border-[hsl(var(--sidebar-border))]">
                <div className="flex items-center justify-between">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--sidebar-muted))] font-medium">
                        TributePage
                    </p>
                    <ThemeToggle variant="sidebar" />
                </div>
            </div>
        </>
    );

    return (
        <>
            {/* Desktop sidebar — unchanged */}
            <aside className="sidebar fixed left-0 top-0 bottom-0 w-64 z-50 hidden lg:flex flex-col">
                {sidebarContent}
            </aside>

            {/* Mobile hamburger button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed top-4 left-4 z-50 lg:hidden w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center shadow-lg"
                aria-label="Åpne meny"
            >
                <Menu className="w-5 h-5 text-foreground" />
            </button>

            {/* Mobile drawer + overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm lg:hidden"
                        />

                        {/* Slide-in sidebar */}
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="sidebar fixed left-0 top-0 bottom-0 w-64 z-[70] flex flex-col lg:hidden"
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-[hsl(var(--sidebar-muted))] hover:text-[hsl(var(--sidebar-text))] transition-colors"
                                aria-label="Lukk meny"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            {sidebarContent}
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

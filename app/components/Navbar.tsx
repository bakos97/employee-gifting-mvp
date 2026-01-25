import Link from 'next/link';
import { Gift } from 'lucide-react';

export function Navbar() {
    return (
        <nav className="border-b border-white/20 bg-white/60 backdrop-blur-md sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">
                    <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                        <Gift className="w-5 h-5 text-white" />
                    </div>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700 font-extrabold">
                        GiftAuto
                    </span>
                </Link>
                <div className="flex items-center gap-6 text-sm font-bold text-gray-600">
                    <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
                    <Link href="/employees" className="hover:text-primary transition-colors">Employees</Link>
                </div>
            </div>
        </nav>
    );
}

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Gift } from 'lucide-react';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Gifting Automation',
  description: 'Automate employee gifting for birthdays and anniversaries.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        <nav className="border-b border-white/20 bg-white/60 backdrop-blur-md sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                <Gift className="w-5 h-5 text-white" />
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700 font-extrabold">
                GiftAuto
              </span>
            </Link>
            <div className="flex items-center gap-6 text-sm font-bold text-gray-600">
              <Link href="/" className="hover:text-primary transition-colors">Dashboard</Link>
              <Link href="/employees" className="hover:text-primary transition-colors">Employees</Link>
              <Link href="/settings" className="hover:text-primary transition-colors">Settings</Link>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}

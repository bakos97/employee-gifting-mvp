import type { Metadata } from 'next';
import { Inter, DM_Serif_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400'],
});

export const metadata: Metadata = {
  title: 'Giftly - La alle føle seg sett',
  description: 'Automatiser gaveprosessen og skap minnerike øyeblikk for teamet ditt. Perfekt for fjernansatte.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no" className={`${inter.variable} ${dmSerif.variable}`}>
      <body className="min-h-screen antialiased bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}

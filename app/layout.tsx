import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'GiftAuto - La alle føle seg sett',
  description: 'Automatiser gaveprosessen og skap minnerike øyeblikk for teamet ditt. Perfekt for fjernansatte.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no" className={`${inter.variable} ${outfit.variable}`}>
      <body className="min-h-screen antialiased" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Sora, Playfair_Display } from 'next/font/google';
import { ThemeProvider } from './components/ThemeProvider';
import './globals.css';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'Hyllest - Sørg for at ingen kollegaer blir glemt',
  description: 'Samle personlige hilsener fra hele teamet. Bursdager, jubileer og avskjeder — uten ekstra arbeid for HR.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no" className={`${sora.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="min-h-screen antialiased grain">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

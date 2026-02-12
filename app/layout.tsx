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
  title: 'TributePage - Lag personlige tribute-sider for kollegaer',
  description: 'Samle hilsener, minner og bilder fra teamet og skap vakre tribute-sider som gaver til kollegaer.',
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

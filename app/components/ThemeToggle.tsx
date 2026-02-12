'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '../lib/utils';

export function ThemeToggle({ variant = 'default' }: { variant?: 'default' | 'sidebar' }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className={cn(
        "w-9 h-9 rounded-xl",
        variant === 'sidebar' ? "bg-white/5" : "bg-surface"
      )} />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        "relative w-9 h-9 rounded-xl flex items-center justify-center transition-all",
        variant === 'sidebar'
          ? "bg-white/5 hover:bg-white/10 text-[hsl(var(--sidebar-muted))] hover:text-[hsl(var(--sidebar-text))]"
          : "bg-surface border border-border text-muted-foreground hover:text-foreground hover:border-[hsl(var(--ring)/0.3)]"
      )}
      title={isDark ? 'Bytt til lyst modus' : 'Bytt til mørkt modus'}
    >
      <Sun className={cn(
        "w-4 h-4 absolute transition-all duration-300",
        isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
      )} />
      <Moon className={cn(
        "w-4 h-4 absolute transition-all duration-300",
        isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
      )} />
    </button>
  );
}

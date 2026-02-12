'use client';

import { cn } from '../lib/utils';

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
}

export function ProgressBar({ value, max, className }: ProgressBarProps) {
  const percent = max > 0 ? Math.min((value / max) * 100, 100) : 0;

  return (
    <div className={cn("h-1.5 bg-border rounded-full overflow-hidden", className)}>
      <div
        className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

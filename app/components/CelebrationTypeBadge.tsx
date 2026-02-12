'use client';

import { Cake, Award, LogOut, Sparkles } from 'lucide-react';
import { CelebrationType } from '../lib/types';
import { cn } from '../lib/utils';

const config: Record<CelebrationType, { label: string; icon: typeof Cake; color: string }> = {
  birthday: { label: 'Bursdag', icon: Cake, color: 'text-violet-400 bg-violet-500/10 border-violet-500/15' },
  anniversary: { label: 'Jubileum', icon: Award, color: 'text-amber-400 bg-amber-500/10 border-amber-500/15' },
  farewell: { label: 'Avskjed', icon: LogOut, color: 'text-blue-400 bg-blue-500/10 border-blue-500/15' },
  custom: { label: 'Egendefinert', icon: Sparkles, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/15' },
};

interface CelebrationTypeBadgeProps {
  type: CelebrationType;
  customLabel?: string | null;
  size?: 'sm' | 'md';
}

export function CelebrationTypeBadge({ type, customLabel, size = 'sm' }: CelebrationTypeBadgeProps) {
  const { label, icon: Icon, color } = config[type];
  const displayLabel = type === 'custom' && customLabel ? customLabel : label;

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded-full border font-medium",
      color,
      size === 'sm' ? "px-2.5 py-1 text-[10px] uppercase tracking-wider" : "px-3 py-1.5 text-xs"
    )}>
      <Icon className={cn(size === 'sm' ? "w-3 h-3" : "w-3.5 h-3.5")} />
      {displayLabel}
    </span>
  );
}

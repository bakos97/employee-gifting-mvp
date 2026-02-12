'use client';

import { CelebrationStatus } from '../lib/types';
import { cn } from '../lib/utils';

const config: Record<CelebrationStatus, { label: string; color: string }> = {
  draft: { label: 'Utkast', color: 'text-muted-foreground bg-surface border-border' },
  collecting: { label: 'Samler inn', color: 'text-amber-400 bg-amber-500/10 border-amber-500/15' },
  published: { label: 'Publisert', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/15' },
  archived: { label: 'Arkivert', color: 'text-muted-foreground bg-surface border-border' },
};

interface CelebrationStatusBadgeProps {
  status: CelebrationStatus;
}

export function CelebrationStatusBadge({ status }: CelebrationStatusBadgeProps) {
  const { label, color } = config[status];

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-1 rounded-full border text-[10px] uppercase tracking-wider font-medium",
      color
    )}>
      {label}
    </span>
  );
}

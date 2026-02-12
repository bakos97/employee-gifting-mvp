'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateCelebrationStatus, deleteCelebration } from '../actions/celebrations';
import { CelebrationWithDetails, CelebrationStatus } from '../lib/types';
import { Play, Eye, Archive, Trash2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface Props {
  celebration: CelebrationWithDetails;
}

const statusActions: { from: CelebrationStatus; to: CelebrationStatus; label: string; icon: typeof Play; color: string }[] = [
  { from: 'draft', to: 'collecting', label: 'Start innsamling', icon: Play, color: 'bg-amber-500 hover:bg-amber-400 text-white' },
  { from: 'collecting', to: 'published', label: 'Publiser tribute', icon: Eye, color: 'bg-emerald-500 hover:bg-emerald-400 text-white' },
  { from: 'published', to: 'archived', label: 'Arkiver', icon: Archive, color: 'bg-surface hover:bg-[hsl(220_12%_14%)] text-muted-foreground border border-border' },
];

export function CelebrationAdminActions({ celebration }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const availableActions = statusActions.filter(a => a.from === celebration.status);

  async function handleStatusChange(newStatus: CelebrationStatus) {
    setLoading(true);
    await updateCelebrationStatus(celebration.id, newStatus);
    setLoading(false);
    router.refresh();
  }

  async function handleDelete() {
    if (!confirm('Er du sikker på at du vil slette denne feiringen? Dette kan ikke angres.')) return;
    setLoading(true);
    await deleteCelebration(celebration.id);
    router.push('/dashboard');
  }

  return (
    <div className="flex items-center gap-3">
      {availableActions.map(action => (
        <button
          key={action.to}
          disabled={loading}
          onClick={() => handleStatusChange(action.to)}
          className={cn(
            "flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all disabled:opacity-50",
            action.color
          )}
        >
          <action.icon className="w-4 h-4" />
          {action.label}
        </button>
      ))}

      <button
        disabled={loading}
        onClick={handleDelete}
        className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-xl transition-all disabled:opacity-50 ml-auto"
      >
        <Trash2 className="w-4 h-4" />
        Slett
      </button>
    </div>
  );
}

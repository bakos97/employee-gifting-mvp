'use client';

import Link from 'next/link';
import { CelebrationWithDetails } from '../lib/types';
import { CelebrationTypeBadge } from './CelebrationTypeBadge';
import { CelebrationStatusBadge } from './CelebrationStatusBadge';
import { ProgressBar } from './ProgressBar';
import { MessageSquare, Users, ArrowRight } from 'lucide-react';

interface CelebrationCardProps {
  celebration: CelebrationWithDetails;
}

export function CelebrationCard({ celebration }: CelebrationCardProps) {
  const questionCount = celebration.questions.length;

  return (
    <Link href={`/celebrations/${celebration.id}`} className="block">
      <div className="nord-card rounded-2xl p-6 group cursor-pointer">
        <div className="flex items-start justify-between mb-4">
          <CelebrationTypeBadge type={celebration.type} customLabel={celebration.custom_type_label} />
          <CelebrationStatusBadge status={celebration.status} />
        </div>

        <h3 className="text-lg font-semibold text-foreground group-hover:text-amber-400 transition-colors mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>
          {celebration.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {celebration.employee.name} {celebration.event_date ? `\u00b7 ${celebration.event_date}` : ''}
        </p>

        <div className="space-y-3">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              {celebration.response_count} svar
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {celebration.contributor_count} bidragsytere
            </span>
          </div>

          {questionCount > 0 && (
            <ProgressBar value={celebration.response_count} max={questionCount * Math.max(celebration.contributor_count, 1)} />
          )}
        </div>

        <div className="mt-4 flex items-center gap-1 text-xs font-medium text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
          Åpne
          <ArrowRight className="w-3 h-3" />
        </div>
      </div>
    </Link>
  );
}

'use client';

import { TributeRevealWrapper } from './TributeRevealWrapper';

interface TributeQuoteCardProps {
  text: string;
  contributorName: string;
  index: number;
}

export function TributeQuoteCard({ text, contributorName, index }: TributeQuoteCardProps) {
  const rotation = index % 3 === 0 ? '-0.5deg' : index % 3 === 1 ? '0.5deg' : '0deg';

  return (
    <TributeRevealWrapper delay={index * 0.08}>
      <div
        className="nord-card rounded-2xl p-7 relative transition-all hover:border-amber-500/20 hover:-translate-y-1"
        style={{ transform: `rotate(${rotation})` }}
      >
        <p
          className="text-lg leading-relaxed text-foreground italic mb-5"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          &ldquo;{text}&rdquo;
        </p>
        <div className="editorial-line mb-3" />
        <p className="text-sm font-medium text-amber-400 text-right">
          &mdash; {contributorName}
        </p>
      </div>
    </TributeRevealWrapper>
  );
}

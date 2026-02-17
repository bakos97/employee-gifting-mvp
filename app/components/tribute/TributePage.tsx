'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { TributePageData } from '../../lib/types';
import { TributeGiftArrival } from './TributeGiftArrival';
import { TributeContent } from './TributeContent';

type Phase = 'gift' | 'expanding' | 'content';

interface TributePageProps {
  data: TributePageData;
}

export function TributePage({ data }: TributePageProps) {
  const { celebration, employee, contributors } = data;
  const [phase, setPhase] = useState<Phase>('gift');
  const [boxRect, setBoxRect] = useState<DOMRect | null>(null);

  const handleGiftComplete = useCallback((rect?: DOMRect) => {
    if (rect) setBoxRect(rect);
    setPhase('expanding');
  }, []);

  // Compute expander starting clip-path from box rect
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 1;

  return (
    <div className="text-foreground min-h-screen relative overflow-hidden gift-box-wrap">
      {/* Permanent gift-wrap ribbons — always behind everything */}
      <GiftWrapRibbons />

      {/* Gift arrival phase — stays visible during expanding so there's no empty gap */}
      {(phase === 'gift' || phase === 'expanding') && (
        <div className={`relative z-10 ${phase === 'expanding' ? 'pointer-events-none' : ''}`}>
          <TributeGiftArrival
            employeeName={employee.name}
            celebrationType={celebration.type}
            customTypeLabel={celebration.custom_type_label}
            contributorCount={contributors.length}
            onComplete={handleGiftComplete}
          />
        </div>
      )}

      {/* Expanding gift-wrap overlay — expands from box to fill screen */}
      {phase === 'expanding' && (
        <motion.div
          className="fixed inset-0 z-20 gift-box-wrap"
          initial={{
            clipPath: boxRect
              ? `inset(${boxRect.top}px ${vw - boxRect.right}px ${vh - boxRect.bottom}px ${boxRect.left}px round 16px)`
              : 'inset(30% 20% 30% 20% round 16px)',
          }}
          animate={{
            clipPath: 'inset(0px 0px 0px 0px round 0px)',
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          onAnimationComplete={() => {
            setPhase('content');
          }}
        >
          <GiftWrapRibbons />
        </motion.div>
      )}

      {/* Content phase */}
      {phase === 'content' && (
        <TributeContent data={data} />
      )}
    </div>
  );
}

/* Full-screen gift-wrap ribbons — horizontal + vertical with sheen */
export function GiftWrapRibbons() {
  return (
    <div className="absolute inset-0 h-full w-full pointer-events-none z-[1] overflow-hidden">
      {/* Vertical ribbon — runs full height of page */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-10 sm:w-12">
        <div className="absolute inset-0 bg-gradient-to-r from-red-700/80 via-red-500/90 to-red-700/80" />
        <div className="absolute inset-y-0 left-1.5 w-[1px] bg-white/20" />
        <div className="absolute inset-y-0 right-1.5 w-[1px] bg-white/20" />
      </div>
      {/* Horizontal ribbon — near the top (like where the paper folds) */}
      <div className="absolute left-0 right-0 top-[50vh] h-10 sm:h-12">
        <div className="absolute inset-0 bg-gradient-to-b from-red-700/80 via-red-500/90 to-red-700/80" />
        <div className="absolute inset-x-0 top-1.5 h-[1px] bg-white/20" />
        <div className="absolute inset-x-0 bottom-1.5 h-[1px] bg-white/20" />
      </div>
    </div>
  );
}

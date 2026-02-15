'use client';

import { motion } from 'framer-motion';
import { TributeRevealWrapper } from './TributeRevealWrapper';
import { Heart } from 'lucide-react';

interface TributeContributorListProps {
  contributors: string[];
}

export function TributeContributorList({ contributors }: TributeContributorListProps) {
  if (contributors.length === 0) return null;

  return (
    <TributeRevealWrapper>
      <section className="text-center py-12 space-y-6 relative">
        {/* Ambient glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-amber-500/8 rounded-full blur-[80px]" />
        </div>

        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-400 font-semibold">
            Med kjærlighet fra
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-2xl mx-auto">
            {contributors.map((name, i) => (
              <motion.span
                key={name}
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, type: 'spring', stiffness: 300, damping: 20 }}
                className="px-4 py-2 rounded-full text-sm text-foreground font-medium border border-amber-400/30 bg-amber-200/35 dark:bg-amber-800/20"
                style={{
                  boxShadow: '0 1px 4px hsl(36 50% 40% / 0.12), inset 0 1px 0 hsl(45 60% 85% / 0.3)',
                }}
              >
                {name}
              </motion.span>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, type: 'spring' }}
        >
          <Heart className="w-6 h-6 text-amber-400 mx-auto" />
        </motion.div>
      </section>
    </TributeRevealWrapper>
  );
}

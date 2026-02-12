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
      <section className="text-center py-16 space-y-8">
        <div className="editorial-line max-w-xs mx-auto" />

        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-400 font-semibold">
            Med kjærlighet fra
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 max-w-2xl mx-auto">
            {contributors.map((name, i) => (
              <motion.span
                key={name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="px-4 py-2 rounded-full bg-surface border border-border text-sm text-foreground font-medium"
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

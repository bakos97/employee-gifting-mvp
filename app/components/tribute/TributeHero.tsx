'use client';

import { motion } from 'framer-motion';
import { CelebrationType } from '../../lib/types';
import { Cake, Award, LogOut, Sparkles } from 'lucide-react';

const typeConfig: Record<CelebrationType, { label: string; icon: typeof Cake; gradient: string }> = {
  birthday: { label: 'Bursdagstribut', icon: Cake, gradient: 'from-violet-500/20 via-amber-500/10 to-transparent' },
  anniversary: { label: 'Jubileumstribut', icon: Award, gradient: 'from-amber-500/20 via-amber-600/10 to-transparent' },
  farewell: { label: 'Avskjedstribut', icon: LogOut, gradient: 'from-blue-500/20 via-amber-500/10 to-transparent' },
  custom: { label: 'Tribut', icon: Sparkles, gradient: 'from-emerald-500/20 via-amber-500/10 to-transparent' },
};

interface TributeHeroProps {
  employeeName: string;
  title: string;
  type: CelebrationType;
  customTypeLabel?: string | null;
  contributorCount: number;
}

export function TributeHero({ employeeName, title, type, customTypeLabel, contributorCount }: TributeHeroProps) {
  const config = typeConfig[type];
  const displayType = type === 'custom' && customTypeLabel ? customTypeLabel : config.label;
  const Icon = config.icon;

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden px-6">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className={`absolute inset-0 bg-gradient-to-b ${config.gradient}`} />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Icon className="w-3.5 h-3.5" />
            {displayType}
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[0.95] mb-6"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg text-muted-foreground"
        >
          En hyllest til <span className="text-amber-400 font-semibold">{employeeName}</span> fra {contributorCount} kollega{contributorCount !== 1 ? 'er' : ''}
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="h-[2px] w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-10 origin-center"
        />
      </div>
    </section>
  );
}

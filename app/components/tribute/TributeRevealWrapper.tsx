'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type RevealVariant = 'default' | 'lift' | 'gift';

const variants: Record<RevealVariant, { initial: Record<string, number>; whileInView: Record<string, number> }> = {
  default: {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
  },
  lift: {
    initial: { opacity: 0, y: 30, scale: 0.97 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
  },
  gift: {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
  },
};

interface TributeRevealWrapperProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: RevealVariant;
}

export function TributeRevealWrapper({ children, delay = 0, className, variant = 'default' }: TributeRevealWrapperProps) {
  const v = variants[variant];
  return (
    <motion.div
      initial={v.initial}
      whileInView={v.whileInView}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

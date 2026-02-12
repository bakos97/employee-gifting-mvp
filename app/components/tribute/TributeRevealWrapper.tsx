'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TributeRevealWrapperProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function TributeRevealWrapper({ children, delay = 0, className }: TributeRevealWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

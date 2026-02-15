'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TributePageData } from '../../lib/types';
import { TributeGiftArrival } from './TributeGiftArrival';
import { TributeContent } from './TributeContent';

interface TributePageProps {
  data: TributePageData;
}

export function TributePage({ data }: TributePageProps) {
  const { celebration, employee, contributors } = data;
  const [showContent, setShowContent] = useState(false);

  const handleGiftComplete = useCallback(() => setShowContent(true), []);

  return (
    <div className="text-foreground min-h-screen">
      <AnimatePresence mode="wait">
        {!showContent ? (
          <motion.div
            key="gift"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <TributeGiftArrival
              employeeName={employee.name}
              celebrationType={celebration.type}
              customTypeLabel={celebration.custom_type_label}
              contributorCount={contributors.length}
              onComplete={handleGiftComplete}
            />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <TributeContent data={data} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

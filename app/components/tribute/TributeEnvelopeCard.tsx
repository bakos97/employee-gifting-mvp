'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ContributorCard } from './TributeContributorCarousel';

interface TributeEnvelopeCardProps {
  card: ContributorCard;
  isOpen: boolean;
  onToggle: () => void;
  rotation?: string;
}

export function TributeEnvelopeCard({ card, isOpen, onToggle, rotation = '0deg' }: TributeEnvelopeCardProps) {
  return (
    <motion.div
      className="relative snap-center shrink-0 w-[85vw] max-w-[30rem]"
      style={{ rotate: rotation }}
      onClick={onToggle}
    >
      {/* Envelope body */}
      <div className="envelope-card rounded-xl overflow-hidden cursor-pointer select-none">
        {/* Paper grain overlay */}
        <div className="absolute inset-0 pointer-events-none rounded-xl opacity-[0.04]"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundRepeat: 'repeat',
            backgroundSize: '200px 200px',
          }}
        />

        {/* Flap */}
        <motion.div
          className="envelope-flap relative z-20 overflow-hidden"
          style={{
            transformOrigin: 'bottom center',
            perspective: '600px',
          }}
          animate={{
            rotateX: isOpen ? -160 : 0,
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Triangular flap shape via clip-path */}
          <div
            className="h-16 sm:h-20 relative"
            style={{
              clipPath: 'polygon(0% 0%, 50% 100%, 100% 0%)',
            }}
          >
            <div className="absolute inset-0 envelope-flap" />
            {/* Flap inner shadow */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5" />
          </div>
        </motion.div>

        {/* Envelope contents area */}
        <div className="relative px-6 sm:px-8 pb-6 pt-2" style={{ marginTop: '-2px' }}>
          {/* Name section (always visible) */}
          <div className="py-4">
            <p className="text-[10px] uppercase tracking-[0.25em] text-amber-400 font-semibold leading-none mb-1">Fra</p>
            <h3
              className="text-xl font-bold text-foreground leading-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              {card.contributorName}
            </h3>
          </div>

          {/* Hint text when closed */}
          <AnimatePresence>
            {!isOpen && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-xs text-muted-foreground/50 text-center pb-2 italic"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Trykk for å åpne
              </motion.p>
            )}
          </AnimatePresence>

          {/* Letter sliding up from inside */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ y: 40, opacity: 0, scaleY: 0.8 }}
                animate={{ y: 0, opacity: 1, scaleY: 1 }}
                exit={{ y: 40, opacity: 0, scaleY: 0.8 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                className="envelope-letter rounded-lg p-5 sm:p-6 mt-2 mb-1 relative overflow-hidden"
                style={{ transformOrigin: 'bottom center' }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Ruled lines background */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 27px, hsl(220 15% 60% / 0.04) 27px, hsl(220 15% 60% / 0.04) 28px)',
                    backgroundPosition: '0 12px',
                  }}
                />

                {/* Q&A pairs */}
                <div className="relative space-y-5">
                  {card.answers.map((a, j) => (
                    <div key={j}>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-2">
                        {a.questionText}
                      </p>
                      {a.textResponse && (
                        <div className="relative pl-5">
                          <span
                            className="absolute -top-1 left-0 text-2xl text-amber-400/30 leading-none select-none"
                            style={{ fontFamily: 'var(--font-playfair)' }}
                            aria-hidden="true"
                          >
                            &ldquo;
                          </span>
                          <p
                            className="text-[0.95rem] leading-[1.7] tracking-[0.01em] text-foreground/90 italic"
                            style={{ fontFamily: 'var(--font-playfair)' }}
                          >
                            {a.textResponse}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Inline images with polaroid-style framing */}
                {card.answers.some(a => a.imageUrl) && (
                  <div className="relative mt-6 space-y-3">
                    {card.answers
                      .filter(a => a.imageUrl)
                      .map((a, j) => (
                        <div
                          key={j}
                          className="rounded-lg overflow-hidden"
                          style={{
                            padding: '6px 6px 18px 6px',
                            background: 'linear-gradient(180deg, hsl(38 40% 86%), hsl(36 35% 82%))',
                            boxShadow: '0 3px 10px hsl(0 0% 0% / 0.15), 0 1px 3px hsl(0 0% 0% / 0.1)',
                            rotate: j % 2 === 0 ? '0.5deg' : '-0.5deg',
                          }}
                        >
                          <img
                            src={a.imageUrl!}
                            alt={`Bilde fra ${card.contributorName}`}
                            className="w-full h-44 object-cover rounded-sm"
                            loading="lazy"
                          />
                          <p
                            className="text-center text-xs text-muted-foreground/60 mt-1.5 italic"
                            style={{ fontFamily: 'var(--font-playfair)' }}
                          >
                            {card.contributorName}
                          </p>
                        </div>
                      ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

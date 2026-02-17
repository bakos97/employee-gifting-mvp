'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TributeEnvelopeCard } from './TributeEnvelopeCard';

export interface ContributorCard {
  contributorName: string;
  answers: {
    questionText: string;
    textResponse: string | null;
    imageUrl: string | null;
  }[];
}

interface TributeContributorCarouselProps {
  cards: ContributorCard[];
}

export function TributeContributorCarousel({ cards }: TributeContributorCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const updateActiveIndex = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const children = Array.from(container.children) as HTMLElement[];
    const containerCenter = container.scrollLeft + container.offsetWidth / 2;

    let closest = 0;
    let closestDist = Infinity;
    children.forEach((child, i) => {
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const dist = Math.abs(containerCenter - childCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setActiveIndex(closest);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.addEventListener('scroll', updateActiveIndex, { passive: true });
    return () => container.removeEventListener('scroll', updateActiveIndex);
  }, [updateActiveIndex]);

  // Auto-close envelopes when scrolling away
  useEffect(() => {
    if (openIndex !== null && openIndex !== activeIndex) {
      setOpenIndex(null);
    }
  }, [activeIndex, openIndex]);

  const scrollTo = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const children = Array.from(container.children) as HTMLElement[];
    if (!children[index]) return;
    const childCenter = children[index].offsetLeft + children[index].offsetWidth / 2;
    const scrollTarget = childCenter - container.offsetWidth / 2;
    container.scrollTo({ left: scrollTarget, behavior: 'smooth' });
  };

  const prev = () => scrollTo(Math.max(0, activeIndex - 1));
  const next = () => scrollTo(Math.min(cards.length - 1, activeIndex + 1));

  if (cards.length === 0) return null;

  const rotations = ['-0.8deg', '0.5deg', '-0.3deg', '0.7deg', '-0.5deg'];

  return (
    <div className="relative">
      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-[calc(50%-min(42.5vw,15rem))] py-4"
        style={{ scrollPaddingInline: 'calc(50% - min(42.5vw, 15rem))', marginTop: '-1rem', marginBottom: '-1rem' }}
      >
        {cards.map((card, i) => (
          <motion.div
            key={card.contributorName}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <TributeEnvelopeCard
              card={card}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              rotation={rotations[i % rotations.length]}
            />
          </motion.div>
        ))}
      </div>

      {/* Desktop arrow buttons */}
      {cards.length > 1 && (
        <>
          <button
            onClick={prev}
            disabled={activeIndex === 0}
            aria-label="Forrige"
            className="hidden md:flex absolute -left-2 top-1/2 -translate-y-1/2 w-11 h-11 items-center justify-center rounded-full bg-amber-200/60 dark:bg-amber-900/30 backdrop-blur border border-amber-300/50 dark:border-amber-600/30 text-amber-700 dark:text-amber-300 hover:bg-amber-200/80 dark:hover:bg-amber-900/50 transition-all disabled:opacity-25 disabled:cursor-default shadow-md"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            disabled={activeIndex === cards.length - 1}
            aria-label="Neste"
            className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 w-11 h-11 items-center justify-center rounded-full bg-amber-200/60 dark:bg-amber-900/30 backdrop-blur border border-amber-300/50 dark:border-amber-600/30 text-amber-700 dark:text-amber-300 hover:bg-amber-200/80 dark:hover:bg-amber-900/50 transition-all disabled:opacity-25 disabled:cursor-default shadow-md"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dot navigation + counter */}
      {cards.length > 1 && (
        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            {cards.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`Gå til kort ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? 'w-7 bg-amber-500 shadow-sm shadow-amber-500/30'
                    : 'w-2.5 bg-amber-300/30 dark:bg-amber-600/20 hover:bg-amber-400/40'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground font-medium">
            {activeIndex + 1} av {cards.length}
          </p>
        </div>
      )}
    </div>
  );
}

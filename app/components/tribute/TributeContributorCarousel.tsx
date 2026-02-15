'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

/* Realistic scotch-tape strip */
function TapeStrip({ rotation }: { rotation: number }) {
  return (
    <div
      className="absolute -top-3.5 left-1/2 z-10"
      style={{
        transform: `translateX(-50%) rotate(${rotation}deg)`,
      }}
    >
      <div
        className="w-20 h-7 rounded-[2px]"
        style={{
          background: 'linear-gradient(180deg, hsl(45 45% 82% / 0.7), hsl(42 38% 76% / 0.55))',
          boxShadow: '0 1px 4px hsl(0 0% 0% / 0.08), inset 0 1px 0 hsl(60 30% 97% / 0.5)',
          backdropFilter: 'blur(1px)',
        }}
      />
    </div>
  );
}

/* Dog-ear corner fold */
function DogEar() {
  return (
    <div
      className="absolute top-0 right-0 w-6 h-6 z-10"
      style={{
        background: 'linear-gradient(225deg, hsl(34 40% 72%) 50%, transparent 50%)',
        boxShadow: '-1px 1px 2px hsl(0 0% 0% / 0.06)',
        borderBottomLeftRadius: '2px',
      }}
    />
  );
}

/* Initials avatar circle */
function InitialsBadge({ name }: { name: string }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div
      className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-amber-900 shrink-0"
      style={{
        background: 'linear-gradient(135deg, #fcd34d, #f59e0b)',
        boxShadow: '0 2px 8px hsl(36 80% 50% / 0.3), inset 0 1px 0 hsl(45 80% 75% / 0.5)',
      }}
    >
      {initials}
    </div>
  );
}

export function TributeContributorCarousel({ cards }: TributeContributorCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

  // Slight random rotations to feel handmade
  const rotations = ['-0.8deg', '0.5deg', '-0.3deg', '0.7deg', '-0.5deg'];

  return (
    <div className="relative">
      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-[calc(50%-min(42.5vw,15rem))]"
        style={{ scrollPaddingInline: 'calc(50% - min(42.5vw, 15rem))' }}
      >
        {cards.map((card, i) => (
          <motion.div
            key={card.contributorName}
            initial={{ opacity: 0, y: 30, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="tribute-card pt-8 pb-7 px-7 sm:px-8 snap-center shrink-0 w-[85vw] max-w-[30rem] relative overflow-hidden"
            style={{ rotate: rotations[i % rotations.length] }}
          >
            {/* Tape strip on top */}
            <TapeStrip rotation={i % 2 === 0 ? -2 : 3} />

            {/* Dog-ear fold */}
            <DogEar />

            {/* Ruled lines background */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 31px, hsl(220 15% 60% / 0.03) 31px, hsl(220 15% 60% / 0.03) 32px)',
                backgroundPosition: '0 56px',
              }}
            />

            {/* Contributor header with initials badge */}
            <div className="relative flex items-center gap-3.5 mb-5">
              <InitialsBadge name={card.contributorName} />
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-amber-400 font-semibold leading-none mb-1">Fra</p>
                <h3
                  className="text-xl font-bold text-foreground leading-tight"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  {card.contributorName}
                </h3>
              </div>
            </div>

            {/* Gold line under header */}
            <div className="relative h-[2px] bg-gradient-to-r from-amber-400/50 via-amber-500/30 to-transparent mb-5 rounded-full" />

            {/* Q&A pairs */}
            <div className="relative space-y-5">
              {card.answers.map((a, j) => (
                <div key={j}>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-2">
                    {a.questionText}
                  </p>
                  {a.textResponse && (
                    <div className="relative pl-5">
                      {/* Decorative opening quote */}
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
                      {/* Handwritten-style caption */}
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
        ))}
      </div>

      {/* Desktop arrow buttons — warm themed */}
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

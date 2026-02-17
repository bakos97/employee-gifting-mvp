'use client';

import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { TributePageData, CelebrationType } from '../../lib/types';
import { TributeContributorCarousel, ContributorCard } from './TributeContributorCarousel';
import { TributeContributorList } from './TributeContributorList';
import { TributeScratchCard } from './TributeScratchCard';
import { TributeRevealWrapper } from './TributeRevealWrapper';
import { Heart, ChevronDown } from 'lucide-react';
import { GiftWrapRibbons } from './TributePage';

const closingMessages: Record<CelebrationType, (name: string) => string> = {
  birthday: (name) => `Gratulerer med dagen, ${name}. Vi er heldige som har deg.`,
  anniversary: (name) => `Gratulerer med jubileet, ${name}. Takk for alt du gjør.`,
  farewell: (name) => `Vi kommer til å savne deg, ${name}. Lykke til videre.`,
  custom: (name) => `Vi er stolte av å ha deg på laget, ${name}.`,
};

/* Decorative corner flourish SVG */
function CornerFlourish({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 76C4 76 4 40 4 24C4 12 12 4 24 4C40 4 76 4 76 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 76C12 76 12 44 12 32C12 22 20 14 30 14C44 14 76 14 76 14"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
      <circle cx="4" cy="76" r="2.5" fill="currentColor" opacity="0.8" />
      <circle cx="76" cy="4" r="2" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

// Deterministic pseudo-random to avoid hydration mismatch
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/* Floating gold sparkles in the background */
function FloatingSparkles() {
  const sparkles = useMemo(() => {
    const rand = seededRandom(137);
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: rand() * 100,
      y: rand() * 100,
      size: 2 + rand() * 4,
      duration: 6 + rand() * 8,
      delay: rand() * 5,
      baseOpacity: 0.15 + rand() * 0.3,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {sparkles.map(s => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-amber-400"
          style={{
            width: s.size,
            height: s.size,
            left: `${s.x}%`,
            top: `${s.y}%`,
            filter: `blur(${s.size > 4 ? 1 : 0}px)`,
          }}
          animate={{
            opacity: [0, s.baseOpacity, s.baseOpacity, 0],
            scale: [0.3, 1, 1, 0.3],
            y: [0, -20, -40, -60],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* Ornamental divider with rosette */
function OrnamentalDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-4">
      <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent to-amber-500/40" />
      <div className="relative">
        <div className="w-3 h-3 rotate-45 border border-amber-500/50 bg-amber-500/10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
        </div>
      </div>
      <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-l from-transparent to-amber-500/40" />
    </div>
  );
}

/* Ribbon bow — decorative section divider */
function RibbonBow() {
  return (
    <div className="flex items-center justify-center py-6">
      <svg width="48" height="32" viewBox="0 0 48 32" fill="none" className="text-amber-500/50 dark:text-amber-400/30">
        {/* Left loop */}
        <ellipse cx="14" cy="12" rx="10" ry="8" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" transform="rotate(-10 14 12)" />
        {/* Right loop */}
        <ellipse cx="34" cy="12" rx="10" ry="8" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" transform="rotate(10 34 12)" />
        {/* Center knot */}
        <circle cx="24" cy="14" r="4" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" />
        {/* Left tail */}
        <path d="M20 18 Q16 26 10 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        {/* Right tail */}
        <path d="M28 18 Q32 26 38 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
}

interface TributeContentProps {
  data: TributePageData;
}

export function TributeContent({ data }: TributeContentProps) {
  const { celebration, employee, questions, contributors } = data;
  const closingMessage = closingMessages[celebration.type](employee.name);

  useEffect(() => {
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      confetti({
        particleCount: 60,
        spread: 160,
        origin: { x: 0.5, y: 0 },
        colors: ['#f59e0b', '#fbbf24', '#fcd34d', '#d97706'],
        startVelocity: 15,
        gravity: 0.4,
        ticks: 300,
        scalar: 0.8,
        drift: 0,
        disableForReducedMotion: true,
      });
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  // Pivot responses by contributor
  const contributorCards: ContributorCard[] = useMemo(() => {
    const cardMap = new Map<string, ContributorCard>();

    for (const name of contributors) {
      cardMap.set(name, { contributorName: name, answers: [] });
    }

    for (const question of questions) {
      for (const response of question.responses) {
        let card = cardMap.get(response.contributor_name);
        if (!card) {
          card = { contributorName: response.contributor_name, answers: [] };
          cardMap.set(response.contributor_name, card);
        }
        card.answers.push({
          questionText: question.text,
          textResponse: response.text_response ?? null,
          imageUrl: response.image_url ?? null,
        });
      }
    }

    return Array.from(cardMap.values()).filter(c => c.answers.length > 0);
  }, [questions, contributors]);

  return (
    <div className="relative min-h-screen gift-box-wrap">
      {/* Fold crease lines */}
      <div className="fixed inset-0 gift-wrap-creases pointer-events-none" />
      {/* Vignette — dark edges */}
      <div className="fixed inset-0 gift-box-vignette pointer-events-none z-[1]" />

      {/* Gift-wrap ribbons behind content */}
      <GiftWrapRibbons />

      {/* Floating gold sparkles */}
      <FloatingSparkles />

      {/* Hero — greeting card style */}
      <section className="relative z-[2] min-h-[50vh] flex items-center justify-center overflow-hidden px-6 pt-8">
        <div className="relative text-center max-w-3xl mx-auto">
          {/* Corner flourishes */}
          <CornerFlourish className="absolute -top-8 -left-8 w-16 h-16 text-amber-500/30 -scale-x-100" />
          <CornerFlourish className="absolute -top-8 -right-8 w-16 h-16 text-amber-500/30" />
          <CornerFlourish className="absolute -bottom-8 -left-8 w-16 h-16 text-amber-500/30 -scale-x-100 -scale-y-100" />
          <CornerFlourish className="absolute -bottom-8 -right-8 w-16 h-16 text-amber-500/30 -scale-y-100" />

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[0.95] mb-5"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            {celebration.title}
          </motion.h1>

          {/* Ribbon divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="mt-8 origin-center max-w-xs mx-auto"
          >
            <div className="ribbon-divider" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{ opacity: { delay: 1.2, duration: 0.5 }, y: { duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 } }}
            className="mt-8"
          >
            <ChevronDown className="w-5 h-5 text-amber-400/50 mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <div className="relative z-[2] max-w-5xl mx-auto px-4 sm:px-6 pb-20">

        {/* "Hilsener" section in a greeting-card frame */}
        <TributeRevealWrapper variant="lift">
          <div className="greeting-card-frame rounded-3xl p-8 sm:p-12 relative overflow-hidden">
            {/* Subtle inner corner ornaments */}
            <CornerFlourish className="absolute top-3 left-3 w-10 h-10 text-amber-500/20 -scale-x-100" />
            <CornerFlourish className="absolute top-3 right-3 w-10 h-10 text-amber-500/20" />
            <CornerFlourish className="absolute bottom-3 left-3 w-10 h-10 text-amber-500/20 -scale-x-100 -scale-y-100" />
            <CornerFlourish className="absolute bottom-3 right-3 w-10 h-10 text-amber-500/20 -scale-y-100" />

            {/* Section heading */}
            <div className="text-center mb-10 space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-amber-400 font-semibold">Hilsener</p>
              <h2
                className="text-2xl md:text-3xl font-bold text-foreground"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Fra {employee.department || 'dine kollegaer'}
              </h2>
              <OrnamentalDivider />
            </div>

            {/* Contributor carousel */}
            <TributeContributorCarousel cards={contributorCards} />
          </div>
        </TributeRevealWrapper>

        <RibbonBow />

        {/* Gift card with scratch-to-reveal — after letters */}
        {data.giftCard && (
          <TributeRevealWrapper variant="gift">
            <TributeScratchCard
              brand={data.giftCard.brand}
              value={data.giftCard.value}
              recipientName={employee.name}
              message={data.giftCard.message}
            />
          </TributeRevealWrapper>
        )}

        <RibbonBow />

        {/* Closing message — with wax seal */}
        <TributeRevealWrapper>
          <div className="relative text-center py-12">
            {/* Warm glow behind message */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-amber-500/10 rounded-full blur-[100px]" />
            </div>

            <OrnamentalDivider />

            <p
              className="text-xl sm:text-2xl text-foreground italic max-w-lg mx-auto leading-relaxed mt-6 mb-8"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              {closingMessage}
            </p>

            {/* Wax seal */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="wax-seal w-14 h-14 rounded-full mx-auto flex items-center justify-center"
            >
              <Heart className="w-6 h-6 text-red-100/80" />
            </motion.div>

            <OrnamentalDivider />
          </div>
        </TributeRevealWrapper>

        <RibbonBow />

        {/* Contributors */}
        <TributeContributorList contributors={contributors} />

        {/* Footer */}
        <div className="text-center py-10 mt-8">
          <div className="ribbon-divider max-w-xs mx-auto mb-8" />
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
            <span>Laget med</span>
            <Heart className="w-3.5 h-3.5 text-amber-400" />
            <span>av</span>
            <span className="font-semibold" style={{ fontFamily: 'var(--font-playfair)' }}>
              Hylles<span className="text-amber-400">t</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

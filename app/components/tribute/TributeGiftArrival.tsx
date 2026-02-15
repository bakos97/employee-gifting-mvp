'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CelebrationType } from '../../lib/types';
import { Cake, Award, LogOut, Sparkles } from 'lucide-react';

const typeConfig: Record<CelebrationType, {
  label: string;
  icon: typeof Cake;
  gradient: string;
  headline: (name: string) => string;
  subtitle: string;
}> = {
  birthday: {
    label: 'Bursdagshyllest',
    icon: Cake,
    gradient: 'from-violet-500/20 via-amber-500/10 to-transparent',
    headline: (name) => `Gratulerer med dagen, ${name}!`,
    subtitle: 'Kollegaene dine har noe spesielt til deg',
  },
  anniversary: {
    label: 'Jubileumshyllest',
    icon: Award,
    gradient: 'from-amber-500/20 via-amber-600/10 to-transparent',
    headline: (name) => `Gratulerer med jubileet, ${name}!`,
    subtitle: 'Teamet ditt har samlet noen varme ord til deg',
  },
  farewell: {
    label: 'Avskjedshyllest',
    icon: LogOut,
    gradient: 'from-blue-500/20 via-amber-500/10 to-transparent',
    headline: (name) => `Kjære ${name}`,
    subtitle: 'Kollegaene dine ønsker å si noen ord før du går',
  },
  custom: {
    label: 'Hyllest',
    icon: Sparkles,
    gradient: 'from-emerald-500/20 via-amber-500/10 to-transparent',
    headline: (name) => `Kjære ${name}`,
    subtitle: 'Kollegaene dine har en overraskelse til deg',
  },
};

// Deterministic pseudo-random to avoid hydration mismatch
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function FloatingParticles() {
  const particles = useMemo(() => {
    const rand = seededRandom(42);
    return Array.from({ length: 28 }).map((_, i) => {
      const warmColors = ['bg-amber-400', 'bg-amber-400', 'bg-amber-400', 'bg-rose-400', 'bg-orange-300'];
      return {
        id: i,
        x: rand() * 100,
        y: rand() * 100,
        size: 1.5 + rand() * 3,
        duration: 8 + rand() * 12,
        delay: rand() * 6,
        baseOpacity: 0.08 + rand() * 0.25,
        drift: (rand() - 0.5) * 30,
        color: warmColors[Math.floor(rand() * warmColors.length)],
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${p.color}`}
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, p.drift, 0],
            opacity: [p.baseOpacity, p.baseOpacity * 2, p.baseOpacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* Small sparkle burst — 30 particles flying outward */
function SparkBurst({ active }: { active: boolean }) {
  const sparks = useMemo(() => {
    const rand = seededRandom(99);
    return Array.from({ length: 30 }).map((_, i) => {
      const angle = (i / 30) * Math.PI * 2 + (rand() - 0.5) * 0.4;
      const dist = 40 + rand() * 60;
      return {
        id: i,
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        size: 2 + rand() * 3,
        delay: rand() * 0.15,
      };
    });
  }, []);

  if (!active) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-30">
      {sparks.map(s => (
        <motion.div
          key={s.id}
          className="absolute left-1/2 top-1/2 rounded-full bg-amber-300"
          style={{ width: s.size, height: s.size }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: s.x, y: s.y, opacity: 0, scale: 0.3 }}
          transition={{ duration: 0.5, delay: s.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

type Stage = 'idle' | 'pulling' | 'untied' | 'revealing';

interface TributeGiftArrivalProps {
  employeeName: string;
  celebrationType: CelebrationType;
  customTypeLabel?: string | null;
  contributorCount: number;
  onComplete: () => void;
}

export function TributeGiftArrival({
  employeeName,
  celebrationType,
  customTypeLabel,
  contributorCount,
  onComplete,
}: TributeGiftArrivalProps) {
  const [stage, setStage] = useState<Stage>('idle');
  const [pullProgress, setPullProgress] = useState(0);
  const onCompleteRef = useRef(onComplete);
  useEffect(() => { onCompleteRef.current = onComplete; });

  const config = typeConfig[celebrationType];
  const displayType = celebrationType === 'custom' && customTypeLabel ? customTypeLabel : config.label;
  const Icon = config.icon;

  const dragY = useMotionValue(0);
  const THRESHOLD = 120;

  // Derived motion transforms for progressive animations
  const bowScaleY = useTransform(dragY, [0, THRESHOLD], [1, 1.4]);
  const knotScale = useTransform(dragY, [0, THRESHOLD], [1, 1.15]);
  const lidRotateX = useTransform(dragY, [0, THRESHOLD], [0, -5]);
  const hRibbonOpacity = useTransform(dragY, [0, THRESHOLD], [1, 0.7]);

  // Auto-play entire sequence (tap fallback)
  const autoPlay = useCallback(() => {
    if (stage !== 'idle') return;
    setStage('pulling');
    setPullProgress(0);

    // Animate pull progress over 600ms
    const start = Date.now();
    const dur = 600;
    const frame = () => {
      const t = Math.min(1, (Date.now() - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setPullProgress(eased);
      dragY.set(eased * THRESHOLD);
      if (t < 1) requestAnimationFrame(frame);
      else setStage('untied');
    };
    requestAnimationFrame(frame);
  }, [stage, dragY, THRESHOLD]);

  // untied → revealing transition
  useEffect(() => {
    if (stage === 'untied') {
      const timer = setTimeout(() => setStage('revealing'), 600);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  // revealing → confetti + complete
  useEffect(() => {
    if (stage === 'revealing') {
      const confettiTimer = setTimeout(() => {
        const colors = ['#f59e0b', '#d97706', '#fbbf24', '#b45309', '#fcd34d', '#ef4444', '#dc2626'];

        confetti({
          particleCount: 120,
          spread: 80,
          origin: { x: 0.5, y: 0.5 },
          colors,
          startVelocity: 45,
          gravity: 1.2,
          ticks: 200,
          disableForReducedMotion: true,
        });

        confetti({
          particleCount: 40,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
          colors,
          startVelocity: 40,
          gravity: 1,
          ticks: 180,
          disableForReducedMotion: true,
        });

        confetti({
          particleCount: 40,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
          colors,
          startVelocity: 40,
          gravity: 1,
          ticks: 180,
          disableForReducedMotion: true,
        });
      }, 500);

      const completeTimer = setTimeout(() => onCompleteRef.current(), 1500);
      return () => {
        clearTimeout(confettiTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [stage]);

  const isRevealing = stage === 'revealing';
  const isGone = stage === 'untied' || stage === 'revealing';

  return (
    <div className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden px-6 bg-gift-arrival">
      {/* Diamond lattice pattern overlay */}
      <div className="absolute inset-0 gift-wrap-pattern pointer-events-none" />

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute inset-0 bg-gradient-to-b ${config.gradient}`} />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[150px]" />
      </div>

      <FloatingParticles />

      {/* Text content */}
      <motion.div
        className="text-center mb-8 sm:mb-10 relative z-10"
        animate={isGone ? { opacity: 0, y: -30 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Icon className="w-3.5 h-3.5" />
            {displayType}
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1] mb-4"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          {config.headline(employeeName)}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-base sm:text-lg text-muted-foreground italic"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          {config.subtitle}
        </motion.p>
      </motion.div>

      {/* Gift box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative mb-8 sm:mb-10 z-10"
        style={{ perspective: '600px' }}
      >
        {/* Ambient glow */}
        <motion.div
          className="absolute -inset-16 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.2) 0%, transparent 70%)' }}
          animate={isRevealing
            ? { opacity: [0.5, 0.9, 0], scale: [1, 2, 3.5] }
            : { opacity: [0.3, 0.6, 0.3] }
          }
          transition={isRevealing
            ? { duration: 2.2, ease: 'easeOut' }
            : { duration: 3, ease: 'easeInOut', repeat: Infinity }
          }
        />

        {/* Floating sparkle emoji */}
        {isRevealing && (
          <motion.span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 text-2xl pointer-events-none z-40"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 1, 1, 0], y: -120, scale: [0.5, 1.2, 1, 0.8] }}
            transition={{ duration: 1.4, delay: 0.3, ease: 'easeOut' }}
          >
            ✨
          </motion.span>
        )}

        {/* Spark burst when untied */}
        <SparkBurst active={stage === 'untied' || stage === 'revealing'} />

        {/* Box container with pulse */}
        <motion.div
          className="relative"
          animate={isRevealing
            ? { scale: [1, 1.03, 1, 1.03, 1, 1.02, 1] }
            : stage === 'idle'
              ? { scale: [1, 1.02, 1] }
              : {}
          }
          transition={isRevealing
            ? { duration: 0.8, ease: 'easeInOut' }
            : { duration: 3, ease: 'easeInOut', repeat: Infinity }
          }
        >
          {/* Box body — tappable for auto-play fallback */}
          <motion.div
            className="w-48 h-40 sm:w-60 sm:h-48 md:w-72 md:h-56 rounded-2xl relative overflow-hidden cursor-pointer"
            style={{
              background: 'linear-gradient(155deg, #fbbf24 0%, #f59e0b 30%, #d97706 70%, #b45309 100%)',
              boxShadow: '0 25px 60px rgba(180, 83, 9, 0.4), 0 8px 20px rgba(245, 158, 11, 0.2), inset 0 1px 0 rgba(255,255,255,0.3)',
            }}
            animate={isRevealing ? { opacity: 0, scale: 0.7 } : { opacity: 1, scale: 1 }}
            transition={isRevealing ? { delay: 0.6, duration: 0.4, ease: 'easeIn' } : { duration: 0.3 }}
            onClick={autoPlay}
          >
            {/* Diagonal stripe texture */}
            <div className="absolute inset-0 opacity-[0.07]" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 8px, white 8px, white 9px)',
            }} />
            {/* Inner shadow for depth */}
            <div className="absolute inset-0 rounded-2xl" style={{
              boxShadow: 'inset 0 -8px 20px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.2)',
            }} />

            {/* Vertical ribbon */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-8 sm:w-10"
              style={{ opacity: hRibbonOpacity }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/80 via-red-500/90 to-red-600/80" />
              <div className="absolute inset-y-0 left-1 w-[1px] bg-white/20" />
              <div className="absolute inset-y-0 right-1 w-[1px] bg-white/20" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/10" />
            </motion.div>
            {/* Horizontal ribbon */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-8 sm:h-10"
              style={{ opacity: hRibbonOpacity }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-red-600/80 via-red-500/90 to-red-600/80" />
              <div className="absolute inset-x-0 top-1 h-[1px] bg-white/20" />
              <div className="absolute inset-x-0 bottom-1 h-[1px] bg-white/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-black/10" />
            </motion.div>

            {/* Corner highlight */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-white/15 to-transparent rounded-tl-2xl" />
            {/* Bottom shadow */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/10 to-transparent" />
          </motion.div>

          {/* Lid */}
          <motion.div
            className="absolute -top-5 sm:-top-6 -left-4 sm:-left-5 -right-4 sm:-right-5 h-14 sm:h-16 rounded-2xl origin-bottom"
            style={{
              background: 'linear-gradient(155deg, #fcd34d 0%, #fbbf24 30%, #f59e0b 70%, #d97706 100%)',
              boxShadow: '0 -6px 25px rgba(245, 158, 11, 0.25), 0 4px 12px rgba(0,0,0,0.1), inset 0 2px 0 rgba(255,255,255,0.3)',
              rotateX: lidRotateX,
            }}
            animate={isRevealing
              ? { rotateX: -110, y: -80, opacity: 0 }
              : isGone
                ? { rotateX: -15, y: -10 }
                : {}
            }
            transition={isRevealing
              ? { delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }
              : { duration: 0.3 }
            }
          >
            {/* Lid texture */}
            <div className="absolute inset-0 rounded-2xl opacity-[0.07]" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 8px, white 8px, white 9px)',
            }} />
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-b from-transparent to-black/15 rounded-b-2xl" />
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-b from-white/25 to-transparent rounded-t-2xl" />
            {/* Ribbon on lid */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-8 sm:w-10"
              style={{ opacity: hRibbonOpacity }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/80 via-red-500/90 to-red-600/80" />
              <div className="absolute inset-y-0 left-1 w-[1px] bg-white/20" />
              <div className="absolute inset-y-0 right-1 w-[1px] bg-white/20" />
            </motion.div>

            {/* Bow — draggable */}
            <motion.div
              className="absolute -top-8 sm:-top-9 left-1/2 -translate-x-1/2 flex items-end gap-0 z-20"
              style={{
                touchAction: 'none',
                cursor: stage === 'idle' ? 'grab' : stage === 'pulling' ? 'grabbing' : 'default',
              }}
              drag={stage === 'idle' || stage === 'pulling' ? 'y' : false}
              dragConstraints={{ top: 0, bottom: THRESHOLD + 20 }}
              dragElastic={0.3}
              dragMomentum={false}
              onDrag={(_, info) => {
                const progress = Math.min(1, Math.max(0, info.offset.y / THRESHOLD));
                setPullProgress(progress);
                dragY.set(info.offset.y);
                if (stage === 'idle' && info.offset.y > 5) setStage('pulling');
              }}
              onDragEnd={(_, info) => {
                if (info.offset.y >= THRESHOLD) {
                  setStage('untied');
                } else {
                  setStage('idle');
                  setPullProgress(0);
                  dragY.set(0);
                }
              }}
              animate={isGone ? { y: 60, opacity: 0 } : {}}
              transition={isGone ? { duration: 0.3 } : {}}
            >
              {/* Left loop */}
              <motion.div
                className="w-9 h-8 sm:w-10 sm:h-9 rounded-full border-[2.5px] border-red-500 bg-red-400/20 -rotate-[25deg] translate-x-1"
                style={{
                  boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.1), 0 2px 6px rgba(220,38,38,0.2)',
                  scaleY: bowScaleY,
                }}
              />
              {/* Center knot */}
              <motion.div
                className="w-5 h-5 rounded-full bg-gradient-to-br from-red-400 to-red-600 z-10 -mb-0.5 shadow-md"
                style={{ scale: knotScale }}
              />
              {/* Right loop */}
              <motion.div
                className="w-9 h-8 sm:w-10 sm:h-9 rounded-full border-[2.5px] border-red-500 bg-red-400/20 rotate-[25deg] -translate-x-1"
                style={{
                  boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.1), 0 2px 6px rgba(220,38,38,0.2)',
                  scaleY: bowScaleY,
                }}
              />
              {/* Tails */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-[12px] w-3.5 h-5 bg-gradient-to-b from-red-500 to-red-600 rounded-b-full -rotate-12 opacity-80" />
              <div className="absolute -bottom-3 left-1/2 translate-x-[2px] w-3.5 h-5 bg-gradient-to-b from-red-500 to-red-600 rounded-b-full rotate-12 opacity-80" />

              {/* Glow ring on hover when idle */}
              {stage === 'idle' && (
                <motion.div
                  className="absolute -inset-3 rounded-full pointer-events-none"
                  style={{ boxShadow: '0 0 20px rgba(220,38,38,0.3), 0 0 40px rgba(245,158,11,0.15)' }}
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
            </motion.div>
          </motion.div>

          {/* Ribbon pieces sliding away */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 left-0 w-1/2 h-8 sm:h-10"
            animate={isGone ? { x: -90, opacity: 0 } : { x: 0, opacity: 1 }}
            transition={isGone ? { duration: 0.35 } : { duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-red-600/80 via-red-500/90 to-red-600/80" />
          </motion.div>
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 right-0 w-1/2 h-8 sm:h-10"
            animate={isGone ? { x: 90, opacity: 0 } : { x: 0, opacity: 1 }}
            transition={isGone ? { duration: 0.35 } : { duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-red-600/80 via-red-500/90 to-red-600/80" />
          </motion.div>

          {/* Sparkle hints */}
          {([
            { top: '10%', left: '15%', delay: 0.3, size: 3.5 },
            { top: '60%', right: '12%', delay: 0.6, size: 4.5 },
            { top: '25%', right: '25%', delay: 0.9, size: 3 },
          ] as const).map((s, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{ width: s.size, height: s.size, top: s.top, left: 'left' in s ? s.left : undefined, right: 'right' in s ? s.right : undefined }}
              animate={isGone
                ? { opacity: 0 }
                : { opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }
              }
              transition={isGone
                ? { duration: 0.3 }
                : { delay: s.delay, duration: 0.8, repeat: Infinity, repeatDelay: 2 }
              }
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Hint text — replaces CTA button */}
      <motion.div
        className="relative z-10"
        animate={isGone ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [0, 6, 0] }}
          transition={{
            opacity: { duration: 0.6, delay: 1.1 },
            y: { duration: 1.5, delay: 1.4, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="text-sm text-amber-400/70 font-medium text-center"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Dra i sløyfen ↓
        </motion.p>
      </motion.div>

      {/* Contributor hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isGone ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.5, delay: isGone ? 0 : 1.4 }}
        className="mt-4 text-xs text-muted-foreground/60 relative z-10"
      >
        Fra {contributorCount} kollega{contributorCount !== 1 ? 'er' : ''} med kjærlighet
      </motion.p>
    </div>
  );
}

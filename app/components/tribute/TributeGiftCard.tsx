'use client';

import { motion } from 'framer-motion';
import { Ticket, Star } from 'lucide-react';

interface TributeGiftCardProps {
  brand: string;
  value: string;
  recipientName: string;
  message?: string;
}

export function TributeGiftCard({ brand, value, recipientName }: TributeGiftCardProps) {
  const isOdeon = brand.toLowerCase().includes('odeon');

  return (
    <motion.div
      initial={{ rotateY: -8, scale: 0.95 }}
      whileInView={{ rotateY: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-md mx-auto"
      style={{ perspective: '800px' }}
    >
      {/* Envelope body */}
      <div className="relative">
        {/* Envelope flap (open, angled back) */}
        <div
          className="relative mx-auto"
          style={{ width: '85%', maxWidth: '340px' }}
        >
          <div
            className="h-12 mx-4"
            style={{
              background: 'linear-gradient(180deg, hsl(34 42% 70%) 0%, hsl(34 38% 74%) 100%)',
              clipPath: 'polygon(0 100%, 50% 15%, 100% 100%)',
              borderRadius: '2px 2px 0 0',
            }}
          />
        </div>

        {/* Envelope main body */}
        <div
          className="relative rounded-xl overflow-hidden -mt-1 pt-4 pb-5 px-4 sm:px-6"
          style={{
            background: 'linear-gradient(180deg, hsl(34 42% 74%) 0%, hsl(34 38% 70%) 50%, hsl(34 32% 68%) 100%)',
            boxShadow: '0 8px 30px hsl(30 40% 30% / 0.2), 0 2px 8px hsl(30 40% 30% / 0.1), inset 0 1px 0 hsl(36 45% 78%)',
          }}
        >
          {/* The physical gift card inside */}
          <div
            className="relative rounded-xl overflow-hidden aspect-[1.6/1]"
            style={{
              background: isOdeon
                ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)'
                : 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.25), 0 4px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1)',
            }}
          >
            {/* Star field / cinema ambiance */}
            {isOdeon && (
              <div className="absolute inset-0 overflow-hidden">
                <div
                  className="absolute -top-10 right-8 w-40 h-40 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(239,68,68,0.2) 0%, transparent 70%)',
                  }}
                />
                <div
                  className="absolute bottom-0 left-0 w-60 h-32 rounded-full"
                  style={{
                    background: 'radial-gradient(circle at bottom left, rgba(59,130,246,0.15) 0%, transparent 70%)',
                  }}
                />
                {/* Film strip decoration */}
                <div className="absolute left-0 top-0 bottom-0 w-6 opacity-[0.08]">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-3 bg-white rounded-sm mx-auto"
                      style={{ marginTop: i === 0 ? '8px' : '6px' }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Card content */}
            <div className="relative z-10 h-full flex flex-col justify-between p-6 sm:p-7">
              {/* Top row — brand + icon */}
              <div className="flex items-start justify-between">
                <div>
                  {isOdeon ? (
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                          boxShadow: '0 2px 8px rgba(220,38,38,0.4)',
                        }}
                      >
                        <span className="text-white font-black text-xs">O</span>
                      </div>
                      <div>
                        <p className="text-white font-bold text-lg tracking-wide leading-none">ODEON</p>
                        <p className="text-blue-300/60 text-[10px] uppercase tracking-[0.2em]">Kino</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-white font-bold text-lg">{brand}</p>
                  )}
                </div>
                <Ticket className="w-5 h-5 text-white/20" />
              </div>

              {/* Center — value */}
              <div className="text-center -mt-2">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-1">Gavekort</p>
                <p
                  className="text-4xl sm:text-5xl font-bold text-white tracking-tight"
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    textShadow: '0 2px 20px rgba(255,255,255,0.15)',
                  }}
                >
                  {value}
                </p>
              </div>

              {/* Bottom row — recipient + stars */}
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-white/30 mb-0.5">Til</p>
                  <p className="text-white/90 font-semibold text-sm">{recipientName}</p>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-amber-400/50 fill-amber-400/50" />
                  ))}
                </div>
              </div>
            </div>

            {/* Animated holographic shine sweep */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                backgroundPosition: ['-200% 0', '200% 0'],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'linear',
                repeatDelay: 2,
              }}
              style={{
                backgroundImage: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.08) 42%, rgba(255,255,255,0.14) 50%, rgba(255,255,255,0.08) 58%, transparent 70%)',
                backgroundSize: '200% 100%',
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

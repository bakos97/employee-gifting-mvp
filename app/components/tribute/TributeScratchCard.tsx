'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { TributeGiftCard } from './TributeGiftCard';
import { Gift } from 'lucide-react';

interface TributeScratchCardProps {
  brand: string;
  value: string;
  recipientName: string;
  message?: string;
}

export function TributeScratchCard({ brand, value, recipientName, message }: TributeScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const checkIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Initialize the gold foil canvas
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    // Gold gradient background
    const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    grad.addColorStop(0, '#d4a847');
    grad.addColorStop(0.3, '#e6c461');
    grad.addColorStop(0.6, '#c9993a');
    grad.addColorStop(1, '#b8892e');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Metallic noise texture
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let seed = 12345;
    for (let i = 0; i < pixels.length; i += 4) {
      seed = (seed * 16807 + 0) % 2147483647;
      const noise = ((seed / 2147483646) - 0.5) * 30;
      pixels[i] = Math.max(0, Math.min(255, pixels[i] + noise));
      pixels[i + 1] = Math.max(0, Math.min(255, pixels[i + 1] + noise));
      pixels[i + 2] = Math.max(0, Math.min(255, pixels[i + 2] + noise));
    }
    ctx.putImageData(imageData, 0, 0);

    // Decorative diamonds scattered via seeded PRNG
    let dseed = 777;
    const prand = () => {
      dseed = (dseed * 16807 + 0) % 2147483647;
      return (dseed - 1) / 2147483646;
    };
    ctx.save();
    for (let i = 0; i < 12; i++) {
      const dx = prand() * rect.width;
      const dy = prand() * rect.height;
      const ds = 3 + prand() * 5;
      ctx.save();
      ctx.translate(dx, dy);
      ctx.rotate(Math.PI / 4);
      ctx.fillStyle = `rgba(255, 255, 220, ${0.15 + prand() * 0.15})`;
      ctx.fillRect(-ds / 2, -ds / 2, ds, ds);
      ctx.restore();
    }
    ctx.restore();

    // "Skrap her!" text
    const fontSize = Math.max(16, Math.min(24, rect.width / 14));
    ctx.font = `${fontSize}px var(--font-playfair), Georgia, serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fillText('Skrap her! ✨', rect.width / 2, rect.height / 2);
  }, []);

  useEffect(() => {
    if (isRevealed) return;
    initCanvas();

    const handleResize = () => initCanvas();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initCanvas, isRevealed]);

  // Check scratch percentage
  const checkReveal = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    let total = 0;

    // Sample every 16th pixel for performance
    for (let i = 3; i < pixels.length; i += 4 * 16) {
      total++;
      if (pixels[i] < 128) transparent++;
    }

    if (total > 0 && transparent / total >= 0.55) {
      setIsFadingOut(true);

      // Confetti burst
      confetti({
        particleCount: 40,
        spread: 90,
        origin: { x: 0.5, y: 0.55 },
        colors: ['#f59e0b', '#fbbf24', '#fcd34d', '#d97706', '#e6c461'],
        startVelocity: 20,
        gravity: 0.8,
        ticks: 200,
        scalar: 0.8,
        disableForReducedMotion: true,
      });

      setTimeout(() => setIsRevealed(true), 600);
    }
  }, [isRevealed]);

  // Start checking when scratching
  const startChecking = useCallback(() => {
    if (checkIntervalRef.current) return;
    checkIntervalRef.current = setInterval(checkReveal, 50);
  }, [checkReveal]);

  const stopChecking = useCallback(() => {
    if (checkIntervalRef.current) {
      clearInterval(checkIntervalRef.current);
      checkIntervalRef.current = null;
    }
    // One final check
    checkReveal();
  }, [checkReveal]);

  useEffect(() => {
    return () => {
      if (checkIntervalRef.current) clearInterval(checkIntervalRef.current);
    };
  }, []);

  // Scratch drawing logic
  const getPos = (e: React.MouseEvent | React.TouchEvent): { x: number; y: number } | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e) {
      const touch = e.touches[0] || e.changedTouches[0];
      if (!touch) return null;
      return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const scratch = (pos: { x: number; y: number }) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    ctx.save();
    ctx.scale(1 / dpr, 1 / dpr);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 28 * 2 * dpr;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const scaledPos = { x: pos.x * dpr, y: pos.y * dpr };

    if (lastPosRef.current) {
      const scaledLast = { x: lastPosRef.current.x * dpr, y: lastPosRef.current.y * dpr };
      ctx.beginPath();
      ctx.moveTo(scaledLast.x, scaledLast.y);
      ctx.lineTo(scaledPos.x, scaledPos.y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(scaledPos.x, scaledPos.y, 28 * dpr, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
    lastPosRef.current = pos;
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (isRevealed || isFadingOut) return;
    isDrawingRef.current = true;
    lastPosRef.current = null;
    const pos = getPos(e);
    if (pos) scratch(pos);
    startChecking();
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawingRef.current || isRevealed || isFadingOut) return;
    const pos = getPos(e);
    if (pos) scratch(pos);
  };

  const handleEnd = () => {
    isDrawingRef.current = false;
    lastPosRef.current = null;
    stopChecking();
  };

  return (
    <div className="flex flex-col items-center gap-6 py-12 mb-8">
      {/* Ribbon divider above */}
      <div className="ribbon-divider w-full max-w-xs mb-4" />

      {/* Section heading */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Gift className="w-5 h-5 text-amber-400" />
          <p
            className="text-lg sm:text-xl font-bold text-foreground"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Et gavekort til deg!
          </p>
          <Gift className="w-5 h-5 text-amber-400" />
        </div>
        <div className="flex items-center justify-center gap-3">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-amber-500/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500/40" />
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-amber-500/40" />
        </div>
      </div>

      {/* Card + scratch overlay */}
      <div ref={containerRef} className="relative w-full max-w-md">
        {/* The actual gift card underneath */}
        <TributeGiftCard
          brand={brand}
          value={value}
          recipientName={recipientName}
        />

        {/* Scratch canvas overlay */}
        {!isRevealed && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-10 rounded-xl"
            style={{
              touchAction: 'none',
              cursor: 'crosshair',
              opacity: isFadingOut ? 0 : 1,
              transition: isFadingOut ? 'opacity 0.6s ease-out' : undefined,
            }}
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={(e) => {
              e.preventDefault();
              handleStart(e);
            }}
            onTouchMove={(e) => {
              e.preventDefault();
              handleMove(e);
            }}
            onTouchEnd={handleEnd}
          />
        )}
      </div>

      {/* Message below card */}
      {message && (
        <p
          className="text-sm text-muted-foreground italic text-center"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          &ldquo;{message}&rdquo;
        </p>
      )}

      {/* Ribbon divider below */}
      <div className="ribbon-divider w-full max-w-xs mt-4" />
    </div>
  );
}

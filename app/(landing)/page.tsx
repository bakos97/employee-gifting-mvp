'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ArrowRight, FileSpreadsheet, Share2, Eye, Gift, CalendarCheck, Clock } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';

function ConfettiParticle({ delay, x, y }: { delay: number; x: number; y: number }) {
    const size = 4 + Math.random() * 6;
    const colors = ['#f59e0b', '#d97706', '#fbbf24', '#b45309', '#fcd34d', '#fff7ed'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const endX = x + (Math.random() - 0.5) * 320;
    const endY = y + (Math.random() - 0.5) * 320 - 120;
    const rotation = Math.random() * 720 - 360;

    return (
        <motion.div
            initial={{ opacity: 1, x, y, scale: 1, rotate: 0 }}
            animate={{ opacity: 0, x: endX, y: endY, scale: 0.2, rotate: rotation }}
            transition={{ duration: 1.4 + Math.random() * 0.5, delay, ease: 'easeOut' }}
            className="absolute pointer-events-none"
            style={{
                width: size,
                height: size,
                borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                backgroundColor: color,
                left: '50%',
                top: '50%',
            }}
        />
    );
}

function GiftBoxAnimation({ onComplete }: { onComplete: () => void }) {
    useEffect(() => {
        const timer = setTimeout(onComplete, 1700);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="absolute inset-0 z-20 flex items-center justify-center" style={{ perspective: '600px' }}>
            <motion.div
                className="relative"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.015, 1, 1.015, 1, 1.01, 1] }}
                transition={{ duration: 1.0, ease: 'easeInOut' }}
            >
                {/* Ambient glow behind box */}
                <motion.div
                    className="absolute -inset-8 rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.25) 0%, transparent 70%)' }}
                    animate={{ opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 1.0, ease: 'easeInOut' }}
                />

                {/* Box body */}
                <motion.div
                    className="w-44 h-36 sm:w-56 sm:h-44 rounded-2xl relative overflow-hidden"
                    style={{
                        background: 'linear-gradient(155deg, #fbbf24 0%, #f59e0b 30%, #d97706 70%, #b45309 100%)',
                        boxShadow: '0 25px 60px rgba(180, 83, 9, 0.4), 0 8px 20px rgba(245, 158, 11, 0.2), inset 0 1px 0 rgba(255,255,255,0.3)',
                    }}
                    animate={{ opacity: 0, scale: 0.7 }}
                    transition={{ delay: 1.6, duration: 0.4, ease: 'easeIn' }}
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
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-8">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-600/80 via-red-500/90 to-red-600/80" />
                        <div className="absolute inset-y-0 left-1 w-[1px] bg-white/20" />
                        <div className="absolute inset-y-0 right-1 w-[1px] bg-white/20" />
                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/10" />
                    </div>
                    {/* Horizontal ribbon */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-8">
                        <div className="absolute inset-0 bg-gradient-to-b from-red-600/80 via-red-500/90 to-red-600/80" />
                        <div className="absolute inset-x-0 top-1 h-[1px] bg-white/20" />
                        <div className="absolute inset-x-0 bottom-1 h-[1px] bg-white/20" />
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-black/10" />
                    </div>

                    {/* Corner highlight */}
                    <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-white/15 to-transparent rounded-tl-2xl" />
                    {/* Bottom shadow */}
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/10 to-transparent" />
                </motion.div>

                {/* Lid */}
                <motion.div
                    className="absolute -top-5 -left-4 -right-4 h-14 rounded-2xl origin-bottom"
                    style={{
                        background: 'linear-gradient(155deg, #fcd34d 0%, #fbbf24 30%, #f59e0b 70%, #d97706 100%)',
                        boxShadow: '0 -6px 25px rgba(245, 158, 11, 0.25), 0 4px 12px rgba(0,0,0,0.1), inset 0 2px 0 rgba(255,255,255,0.3)',
                    }}
                    initial={{ rotateX: 0, y: 0 }}
                    animate={{ rotateX: -45, y: -80, opacity: 0 }}
                    transition={{ delay: 1.0, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                    {/* Lid diagonal texture */}
                    <div className="absolute inset-0 rounded-2xl opacity-[0.07]" style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 8px, white 8px, white 9px)',
                    }} />
                    {/* Lid edge bevel */}
                    <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-b from-transparent to-black/15 rounded-b-2xl" />
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-b from-white/25 to-transparent rounded-t-2xl" />
                    {/* Ribbon on lid */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-8">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-600/80 via-red-500/90 to-red-600/80" />
                        <div className="absolute inset-y-0 left-1 w-[1px] bg-white/20" />
                        <div className="absolute inset-y-0 right-1 w-[1px] bg-white/20" />
                    </div>

                    {/* Bow */}
                    <motion.div
                        className="absolute -top-7 left-1/2 -translate-x-1/2 flex items-end gap-0"
                        animate={{ y: -70, opacity: 0 }}
                        transition={{ delay: 1.0, duration: 0.4 }}
                    >
                        {/* Left loop */}
                        <div className="w-8 h-7 rounded-full border-[2.5px] border-red-500 bg-red-400/20 -rotate-[25deg] translate-x-1" style={{
                            boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.1), 0 2px 6px rgba(220,38,38,0.2)',
                        }} />
                        {/* Center knot */}
                        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-red-400 to-red-600 z-10 -mb-0.5 shadow-md" />
                        {/* Right loop */}
                        <div className="w-8 h-7 rounded-full border-[2.5px] border-red-500 bg-red-400/20 rotate-[25deg] -translate-x-1" style={{
                            boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.1), 0 2px 6px rgba(220,38,38,0.2)',
                        }} />
                        {/* Tails */}
                        <div className="absolute -bottom-3 left-1/2 -translate-x-[10px] w-3 h-4 bg-gradient-to-b from-red-500 to-red-600 rounded-b-full -rotate-12 opacity-80" />
                        <div className="absolute -bottom-3 left-1/2 translate-x-[2px] w-3 h-4 bg-gradient-to-b from-red-500 to-red-600 rounded-b-full rotate-12 opacity-80" />
                    </motion.div>
                </motion.div>

                {/* Ribbon pieces sliding away */}
                <motion.div
                    className="absolute top-1/2 -translate-y-1/2 left-0 w-1/2 h-8"
                    animate={{ x: -90, opacity: 0 }}
                    transition={{ delay: 1.4, duration: 0.35 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-red-600/80 via-red-500/90 to-red-600/80" />
                </motion.div>
                <motion.div
                    className="absolute top-1/2 -translate-y-1/2 right-0 w-1/2 h-8"
                    animate={{ x: 90, opacity: 0 }}
                    transition={{ delay: 1.4, duration: 0.35 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-red-600/80 via-red-500/90 to-red-600/80" />
                </motion.div>

                {/* Sparkle hints on box */}
                {[
                    { top: '10%', left: '15%', delay: 0.3, size: 3 },
                    { top: '60%', right: '12%', delay: 0.6, size: 4 },
                    { top: '25%', right: '25%', delay: 0.9, size: 2.5 },
                ].map((s, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-white"
                        style={{ width: s.size, height: s.size, top: s.top, left: s.left, right: s.right }}
                        animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                        transition={{ delay: s.delay, duration: 0.8, repeat: 1, repeatDelay: 0.4 }}
                    />
                ))}
            </motion.div>
        </div>
    );
}

export default function LandingPage() {
    const [giftOpened, setGiftOpened] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const confettiParticles = useMemo(() =>
        Array.from({ length: 22 }).map((_, i) => ({
            id: i,
            delay: Math.random() * 0.4,
            x: (Math.random() - 0.5) * 50,
            y: (Math.random() - 0.5) * 50,
        })), []);

    useEffect(() => {
        const timer = setTimeout(() => setShowConfetti(true), 1600);
        return () => clearTimeout(timer);
    }, []);

    const fadeUp = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    };

    const stagger = {
        animate: {
            transition: {
                staggerChildren: 0.12
            }
        }
    };

    return (
        <div className="bg-background text-foreground overflow-hidden">
            {/* Navigation */}
            <motion.nav
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="fixed top-0 w-full z-50 px-6 py-4 bg-background/80 backdrop-blur-xl border-b border-border/50"
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Heart className="w-4.5 h-4.5 text-background" />
                        </div>
                        <span className="text-xl font-semibold tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
                            Hylles<span className="text-amber-400">t</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
                            Logg inn
                        </Link>
                        <Link href="/dashboard" className="px-5 py-2 bg-amber-500 text-white text-sm font-semibold rounded-xl hover:bg-amber-400 transition-all hover:shadow-lg hover:shadow-amber-500/20">
                            Kom i gang
                        </Link>
                    </div>
                </div>
            </motion.nav>

            {/* Hero Section */}
            <section className="relative min-h-[calc(100dvh-4rem)] lg:min-h-screen flex items-start lg:items-center pt-24 pb-12 lg:pt-20 lg:pb-0 overflow-hidden">
                {/* Background elements */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-amber-600/3 rounded-full blur-[100px]" />
                    <div className="absolute inset-0 opacity-[0.03]" style={{
                        backgroundImage: 'linear-gradient(hsl(38 92% 58% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(38 92% 58% / 0.3) 1px, transparent 1px)',
                        backgroundSize: '80px 80px'
                    }} />
                </div>

                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="grid lg:grid-cols-[1.3fr_1fr] gap-8 md:gap-12 lg:gap-20 items-center">
                        {/* Left — Editorial text */}
                        <motion.div
                            initial="initial"
                            animate="animate"
                            variants={stagger}
                            className="space-y-6 sm:space-y-10"
                        >
                            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-bold leading-[0.95] tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
                                Ingen blir{' '}
                                <br className="hidden md:block" />
                                <span className="relative inline-block">
                                    <span className="text-amber-400 italic">glemt</span>
                                    <motion.span
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                        className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 to-transparent origin-left"
                                    />
                                </span>
                            </motion.h1>

                            <motion.p variants={fadeUp} className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg" style={{ fontFamily: 'var(--font-sora)' }}>
                                Bursdager, jubileer og avskjeder &mdash; vi holder styr p&aring; alt.
                                Samle personlige hilsener fra hele teamet p&aring; bare noen minutter, helt uten ekstra arbeid for HR.
                            </motion.p>

                            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
                                <span className="flex items-center gap-2">
                                    <CalendarCheck className="w-4 h-4 text-amber-400" />
                                    Automatiske p&aring;minnelser
                                </span>
                                <span className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-amber-400" />
                                    Ferdig p&aring; 2 min
                                </span>
                                <span className="flex items-center gap-2">
                                    <Heart className="w-4 h-4 text-amber-400" />
                                    Personlig hver gang
                                </span>
                            </motion.div>

                            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
                                <Link
                                    href="/dashboard"
                                    className="group inline-flex items-center gap-3 px-8 py-4 bg-amber-500 text-white font-semibold rounded-2xl hover:bg-amber-400 transition-all hover:shadow-xl hover:shadow-amber-500/20 transform hover:-translate-y-0.5"
                                >
                                    Kom i gang gratis
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    href="/tribute/demo"
                                    className="group inline-flex items-center gap-3 px-8 py-4 border border-amber-500/30 text-amber-400 font-semibold rounded-2xl hover:bg-amber-500/10 hover:border-amber-500/50 transition-all"
                                >
                                    <Eye className="w-4 h-4" />
                                    Se demo
                                </Link>
                                <Link
                                    href="#how-it-works"
                                    className="inline-flex items-center gap-3 px-8 py-4 border border-border text-muted-foreground font-semibold rounded-2xl hover:border-amber-500/30 hover:text-foreground transition-all"
                                >
                                    Se hvordan
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* Right — Mini celebration page preview with gift animation */}
                        <motion.div
                            initial={{ opacity: 0, y: 40, rotateY: -5 }}
                            animate={{ opacity: 1, y: 0, rotateY: 0 }}
                            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="relative"
                        >
                            {/* Gift box animation overlay */}
                            <AnimatePresence>
                                {!giftOpened && (
                                    <GiftBoxAnimation onComplete={() => setGiftOpened(true)} />
                                )}
                            </AnimatePresence>

                            {/* Confetti */}
                            {showConfetti && (
                                <div className="absolute inset-0 z-30 pointer-events-none overflow-visible">
                                    {confettiParticles.map((p) => (
                                        <ConfettiParticle key={p.id} delay={p.delay} x={p.x} y={p.y} />
                                    ))}
                                </div>
                            )}

                            {/* Browser frame — fades in as gift opens */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={giftOpened ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <div className="nord-card rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
                                    {/* Title bar */}
                                    <div className="flex items-center gap-2 px-4 py-2.5 bg-surface/80 border-b border-border">
                                        <div className="flex gap-1.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
                                        </div>
                                        <div className="flex-1 mx-4">
                                            <div className="bg-background/60 border border-border rounded-lg px-3 py-1 text-[10px] text-muted-foreground text-center truncate">
                                                hyllest.no/feiring/ingrids-bursdag
                                            </div>
                                        </div>
                                    </div>

                                    {/* Mini celebration page */}
                                    <div className="gift-box-wrap relative overflow-hidden max-h-[420px] sm:max-h-[520px]">

                                        {/* Decorative ribbons */}
                                        <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
                                            {/* Vertical ribbon */}
                                            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-5">
                                                <div className="absolute inset-0 bg-gradient-to-r from-red-700/80 via-red-500/90 to-red-700/80" />
                                                <div className="absolute inset-y-0 left-0.5 w-[1px] bg-white/20" />
                                                <div className="absolute inset-y-0 right-0.5 w-[1px] bg-white/20" />
                                            </div>
                                            {/* Horizontal ribbon */}
                                            <div className="absolute left-0 right-0 top-[35%] h-5">
                                                <div className="absolute inset-0 bg-gradient-to-b from-red-700/80 via-red-500/90 to-red-700/80" />
                                                <div className="absolute inset-x-0 top-0.5 h-[1px] bg-white/20" />
                                                <div className="absolute inset-x-0 bottom-0.5 h-[1px] bg-white/20" />
                                            </div>
                                        </div>

                                        {/* Title on gift-wrap */}
                                        <div className="relative pt-6 px-6 pb-4 text-center z-10">
                                            <motion.h3
                                                initial={{ opacity: 0, y: 12 }}
                                                animate={giftOpened ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                                                transition={{ delay: 0.2, duration: 0.5 }}
                                                className="text-lg font-bold text-foreground tracking-tight"
                                                style={{ fontFamily: 'var(--font-playfair)' }}
                                            >
                                                Gratulerer med dagen, Ingrid!
                                            </motion.h3>
                                        </div>

                                        {/* Greeting card frame — like the real tribute */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={giftOpened ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                                            transition={{ delay: 0.35, duration: 0.5 }}
                                            className="relative z-10 mx-4 mb-4"
                                        >
                                            <div className="greeting-card-frame rounded-2xl px-4 py-5 relative overflow-hidden">
                                                {/* Section heading */}
                                                <div className="text-center mb-4 space-y-1">
                                                    <p className="text-[8px] uppercase tracking-[0.25em] text-amber-600 dark:text-amber-400 font-semibold">Hilsener</p>
                                                    <p
                                                        className="text-sm font-bold text-foreground"
                                                        style={{ fontFamily: 'var(--font-playfair)' }}
                                                    >
                                                        Fra markedsavdelingen
                                                    </p>
                                                    {/* Ornamental divider */}
                                                    <div className="flex items-center justify-center gap-2 pt-1">
                                                        <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-amber-500/40" />
                                                        <div className="w-1.5 h-1.5 rotate-45 border border-amber-500/40 bg-amber-500/10" />
                                                        <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-amber-500/40" />
                                                    </div>
                                                </div>

                                                {/* Envelope cards — horizontal row like carousel */}
                                                <div className="flex gap-2.5 overflow-hidden">
                                                    {[
                                                        { name: "Thomas", rot: '-0.5deg' },
                                                        { name: "Camilla", rot: '0.4deg' },
                                                    ].map((q, idx) => (
                                                        <motion.div
                                                            key={idx}
                                                            initial={{ opacity: 0, y: 12 }}
                                                            animate={giftOpened ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                                                            transition={{ delay: 0.5 + idx * 0.12 }}
                                                            className="envelope-card rounded-xl flex-1 min-w-0 overflow-hidden"
                                                            style={{ transform: `rotate(${q.rot})` }}
                                                        >
                                                            {/* Flap */}
                                                            <div className="envelope-flap relative">
                                                                <div
                                                                    className="h-8"
                                                                    style={{ clipPath: 'polygon(0% 0%, 50% 100%, 100% 0%)' }}
                                                                >
                                                                    <div className="absolute inset-0 envelope-flap" />
                                                                </div>
                                                            </div>
                                                            {/* Name */}
                                                            <div className="px-3 pb-3 pt-1" style={{ marginTop: '-1px' }}>
                                                                <p className="text-[8px] uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400 font-semibold leading-none mb-0.5">Fra</p>
                                                                <p className="text-xs font-bold text-foreground" style={{ fontFamily: 'var(--font-playfair)' }}>{q.name}</p>
                                                                <p className="text-[8px] text-muted-foreground/50 italic mt-1" style={{ fontFamily: 'var(--font-playfair)' }}>Trykk for å åpne</p>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>

                                                {/* Carousel dots */}
                                                <div className="flex justify-center gap-1 mt-3">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
                                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500/20" />
                                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500/20" />
                                                </div>
                                            </div>
                                        </motion.div>

                                        {/* Gift card section on wrap */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={giftOpened ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                                            transition={{ delay: 0.8, duration: 0.5 }}
                                            className="relative z-10 mx-4 pb-4"
                                        >
                                            <div className="text-center mb-2">
                                                <p className="text-[9px] text-amber-200 dark:text-amber-400/70 font-semibold">
                                                    <Sparkles className="w-3 h-3 inline-block mr-1 -mt-0.5" />
                                                    Et gavekort til deg!
                                                </p>
                                            </div>
                                            <div className="relative rounded-xl overflow-hidden aspect-[1.6/1]" style={{
                                                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 40%, #d97706 70%, #b45309 100%)',
                                                boxShadow: '0 6px 20px rgba(180, 83, 9, 0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
                                            }}>
                                                {/* Card shimmer texture */}
                                                <div className="absolute inset-0 opacity-30" style={{
                                                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                                                    backgroundRepeat: 'repeat',
                                                    backgroundSize: '200px 200px',
                                                }} />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="text-center">
                                                        <p className="text-[9px] uppercase tracking-[0.15em] text-amber-900/60 font-semibold">Skrape for å avsløre</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>

                                        {/* Fade at bottom */}
                                        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-amber-800/60 to-transparent pointer-events-none z-[2]" />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Floating badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={giftOpened ? { opacity: 1, scale: 1, y: [-4, 4, -4] } : { opacity: 0, scale: 0.5 }}
                                transition={giftOpened ? { y: { duration: 4, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 0.4 }, scale: { duration: 0.4 } } : { duration: 0.3 }}
                                className="absolute -top-3 right-1 sm:-right-3 bg-amber-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg shadow-amber-500/30 text-xs sm:text-sm font-semibold z-10 flex items-center gap-1.5"
                            >
                                <Gift className="w-3.5 h-3.5" />
                                Gave
                            </motion.div>

                            {/* Decorative glow behind the card */}
                            <div className="absolute -inset-4 -z-10 bg-amber-500/5 rounded-3xl blur-2xl" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Metrics strip */}
            <section className="border-y border-border bg-surface/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-3 divide-x divide-border">
                        {[
                            { value: "0", label: "Glemte anledninger" },
                            { value: "2 min", label: "For HR å sette opp" },
                            { value: "\u221e", label: "Varme minner" }
                        ].map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="py-6 sm:py-10 text-center"
                            >
                                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-400 mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>
                                    {stat.value}
                                </div>
                                <div className="text-[10px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.2em] text-muted-foreground font-medium">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-16 md:py-24 lg:py-32">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-10 md:mb-20">
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-xs uppercase tracking-[0.3em] text-amber-400 font-semibold mb-4"
                        >
                            Prosessen
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight"
                            style={{ fontFamily: 'var(--font-playfair)' }}
                        >
                            Fire enkle steg
                        </motion.h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                step: "01",
                                icon: <FileSpreadsheet className="w-6 h-6" />,
                                title: "Importer teamet",
                                desc: "Legg til ansatte manuelt eller importer fra Excel. Alle viktige datoer lagres automatisk."
                            },
                            {
                                step: "02",
                                icon: <Sparkles className="w-6 h-6" />,
                                title: "Opprett feiring",
                                desc: "Velg anledning og tilpass spørsmålene kollegaer skal svare på."
                            },
                            {
                                step: "03",
                                icon: <Share2 className="w-6 h-6" />,
                                title: "Del lenken",
                                desc: "Kollegaer svarer på spørsmål og laster opp bilder via en enkel lenke."
                            },
                            {
                                step: "04",
                                icon: <Eye className="w-6 h-6" />,
                                title: "Publiser hyllesten",
                                desc: "En vakker, personlig hyllestside genereres automatisk som gave."
                            }
                        ].map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.6 }}
                                className="nord-card rounded-2xl p-6 sm:p-8 relative group"
                            >
                                <div className="text-[5rem] font-bold text-border/50 absolute top-4 right-6 leading-none select-none" style={{ fontFamily: 'var(--font-playfair)' }}>
                                    {step.step}
                                </div>

                                <div className="relative z-10">
                                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6">
                                        {step.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold text-foreground mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 md:py-24 lg:py-32">
                <div className="max-w-5xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative nord-card rounded-2xl sm:rounded-3xl px-6 py-12 sm:p-16 lg:p-24 text-center overflow-hidden"
                    >
                        <div className="absolute inset-0 -z-0">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-amber-500/8 rounded-full blur-[100px]" />
                        </div>

                        <div className="relative z-10">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
                                Klar til å skape{' '}
                                <span className="text-amber-400 italic">minner</span>?
                            </h2>
                            <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed">
                                Start gratis i dag. La teamet dele varme ord og minner &mdash; uten at noen blir glemt.
                            </p>
                            <Link
                                href="/dashboard"
                                className="group inline-flex items-center gap-3 px-8 sm:px-10 py-4 bg-amber-500 text-white font-semibold rounded-2xl hover:bg-amber-400 transition-all hover:shadow-xl hover:shadow-amber-500/20 text-base sm:text-lg"
                            >
                                Lag din første hyllest
                                <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </Link>
                            <p className="mt-4 text-sm text-muted-foreground">
                                <Link href="/tribute/demo" className="text-amber-400 hover:text-amber-300 transition-colors">
                                    Eller se en demo først &rarr;
                                </Link>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border">
                <div className="max-w-7xl mx-auto px-6 py-10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                                <Heart className="w-4 h-4 text-background" />
                            </div>
                            <span className="font-semibold tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
                                Hylles<span className="text-amber-400">t</span>
                            </span>
                        </div>
                        <div className="text-muted-foreground text-sm">
                            &copy; {new Date().getFullYear()} Hyllest. Alle rettigheter reservert.
                        </div>
                        <div className="flex gap-6 text-sm font-medium text-muted-foreground">
                            <a href="#" className="hover:text-amber-400 transition-colors">Personvern</a>
                            <a href="#" className="hover:text-amber-400 transition-colors">Vilkår</a>
                            <a href="#" className="hover:text-amber-400 transition-colors">Kontakt</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

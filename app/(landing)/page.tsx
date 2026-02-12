'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ArrowRight, Star, FileSpreadsheet, Share2, Eye, Award, Gift, Film } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';

export default function LandingPage() {
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
                            Tribute<span className="text-amber-400">Page</span>
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
            <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
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
                    <div className="grid lg:grid-cols-[1.3fr_1fr] gap-20 items-center">
                        {/* Left — Editorial text */}
                        <motion.div
                            initial="initial"
                            animate="animate"
                            variants={stagger}
                            className="space-y-10"
                        >
                            <motion.div variants={fadeUp}>
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold tracking-wider uppercase border border-amber-500/20">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    Personlige tribute-sider
                                </span>
                            </motion.div>

                            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-[5.5rem] font-bold leading-[0.95] tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
                                Skap minner{' '}
                                <br className="hidden md:block" />
                                som{' '}
                                <span className="relative inline-block">
                                    <span className="text-amber-400 italic">varmer</span>
                                    <motion.span
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                        className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 to-transparent origin-left"
                                    />
                                </span>
                            </motion.h1>

                            <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed max-w-lg" style={{ fontFamily: 'var(--font-sora)' }}>
                                Samle hilsener, minner og bilder fra hele teamet.
                                Skap en vakker tribute-side som gir kollegaen din en gave de aldri glemmer.
                            </motion.p>

                            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
                                <Link
                                    href="/dashboard"
                                    className="group inline-flex items-center gap-3 px-8 py-4 bg-amber-500 text-white font-semibold rounded-2xl hover:bg-amber-400 transition-all hover:shadow-xl hover:shadow-amber-500/20 transform hover:-translate-y-0.5"
                                >
                                    Kom i gang gratis
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    href="#how-it-works"
                                    className="inline-flex items-center gap-3 px-8 py-4 border border-border text-muted-foreground font-semibold rounded-2xl hover:border-amber-500/30 hover:text-foreground transition-all"
                                >
                                    Se hvordan
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* Right — Mini tribute page preview */}
                        <motion.div
                            initial={{ opacity: 0, y: 40, rotateY: -5 }}
                            animate={{ opacity: 1, y: 0, rotateY: 0 }}
                            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="relative hidden lg:block"
                        >
                            {/* Browser frame */}
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
                                            tributepage.no/tribute/maria-jubileum
                                        </div>
                                    </div>
                                </div>

                                {/* Mini tribute page */}
                                <div className="bg-background relative overflow-hidden" style={{ maxHeight: '520px' }}>

                                    {/* Hero with warm photo area */}
                                    <div className="relative">
                                        {/* Abstract warm "photo" — team moment */}
                                        <div className="h-36 relative overflow-hidden">
                                            <div className="absolute inset-0" style={{
                                                background: 'linear-gradient(135deg, hsl(25 60% 72%) 0%, hsl(35 70% 68%) 25%, hsl(340 40% 72%) 50%, hsl(30 65% 65%) 75%, hsl(45 55% 70%) 100%)'
                                            }} />
                                            <div className="absolute inset-0" style={{
                                                background: 'radial-gradient(ellipse at 30% 50%, hsl(35 80% 80% / 0.6) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, hsl(350 50% 78% / 0.4) 0%, transparent 50%)'
                                            }} />
                                            {/* Silhouette shapes suggesting people */}
                                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-end gap-1">
                                                {[28, 34, 30, 26, 32].map((h, i) => (
                                                    <div key={i} className="rounded-t-full bg-black/10" style={{ width: '18px', height: `${h}px` }} />
                                                ))}
                                            </div>
                                            {/* Warm overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                                        </div>

                                        {/* Title overlapping the photo */}
                                        <div className="relative -mt-10 px-6 pb-5 text-center z-10">
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.7, duration: 0.6 }}
                                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-semibold uppercase tracking-wider mb-3 backdrop-blur-sm"
                                            >
                                                <Award className="w-3 h-3" />
                                                Jubileumstribut
                                            </motion.div>
                                            <motion.h3
                                                initial={{ opacity: 0, y: 12 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.85, duration: 0.6 }}
                                                className="text-xl font-bold text-foreground tracking-tight mb-1"
                                                style={{ fontFamily: 'var(--font-playfair)' }}
                                            >
                                                Kjære Maria
                                            </motion.h3>
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 1.0 }}
                                                className="text-[11px] text-muted-foreground italic"
                                                style={{ fontFamily: 'var(--font-playfair)' }}
                                            >
                                                Takk for 10 fantastiske år sammen med oss
                                            </motion.p>
                                            <motion.div
                                                initial={{ scaleX: 0 }}
                                                animate={{ scaleX: 1 }}
                                                transition={{ delay: 1.1, duration: 0.8 }}
                                                className="h-[1.5px] w-16 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-4 origin-center"
                                            />
                                        </div>
                                    </div>

                                    {/* Appreciation quotes — flowing naturally */}
                                    <div className="px-5 pb-4 space-y-2.5">
                                        {[
                                            { name: "Erik", msg: "Du er hjertet i teamet. Varmen din lyser opp selv de tyngste dagene.", rot: '-0.4deg' },
                                            { name: "Lisa", msg: "10 år med inspirasjon. Du har formet oss alle til bedre mennesker.", rot: '0.6deg' },
                                            { name: "Jonas", msg: "Ingen møter er det samme uten latteren din. Takk for alt.", rot: '-0.3deg' },
                                        ].map((q, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, y: 12 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 1.2 + idx * 0.1 }}
                                                className="nord-card rounded-xl p-3.5"
                                                style={{ transform: `rotate(${q.rot})` }}
                                            >
                                                <p className="text-[11px] italic text-foreground leading-relaxed mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
                                                    &ldquo;{q.msg}&rdquo;
                                                </p>
                                                <div className="editorial-line mb-1.5" />
                                                <p className="text-[10px] font-medium text-amber-400 text-right">&mdash; {q.name}</p>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Gift card to kino */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.55, duration: 0.6 }}
                                        className="px-5 pb-4"
                                    >
                                        <div className="relative rounded-xl overflow-hidden" style={{
                                            background: 'linear-gradient(135deg, hsl(220 20% 18%) 0%, hsl(220 25% 12%) 100%)'
                                        }}>
                                            {/* Decorative film strip pattern */}
                                            <div className="absolute top-0 left-0 right-0 flex justify-between px-2 py-1">
                                                {Array.from({ length: 8 }).map((_, i) => (
                                                    <div key={i} className="w-2 h-1.5 rounded-sm bg-white/8" />
                                                ))}
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 py-1">
                                                {Array.from({ length: 8 }).map((_, i) => (
                                                    <div key={i} className="w-2 h-1.5 rounded-sm bg-white/8" />
                                                ))}
                                            </div>

                                            <div className="p-4 flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                                                    <Film className="w-5 h-5 text-amber-400" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[10px] uppercase tracking-[0.15em] text-amber-400/80 font-semibold mb-0.5">Gave fra teamet</p>
                                                    <p className="text-sm font-bold text-white" style={{ fontFamily: 'var(--font-playfair)' }}>
                                                        Kinogavekort
                                                    </p>
                                                    <p className="text-[10px] text-white/50 mt-0.5">2 billetter + snacks</p>
                                                </div>
                                                <div className="text-right flex-shrink-0">
                                                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/20 border border-amber-500/30">
                                                        <Gift className="w-3 h-3 text-amber-400" />
                                                        <span className="text-[10px] font-bold text-amber-400">500 kr</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Contributors */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1.7 }}
                                        className="px-5 pb-5 text-center"
                                    >
                                        <div className="editorial-line max-w-[60px] mx-auto mb-3" />
                                        <p className="text-[9px] uppercase tracking-[0.25em] text-amber-400 font-semibold mb-2">Med kjærlighet fra</p>
                                        <div className="flex flex-wrap justify-center gap-1">
                                            {['Erik', 'Lisa', 'Jonas', 'Kari', 'Ole', '+11'].map((name, i) => (
                                                <span key={i} className="px-2 py-0.5 rounded-full bg-surface border border-border text-[9px] text-foreground font-medium">
                                                    {name}
                                                </span>
                                            ))}
                                        </div>
                                        <Heart className="w-3 h-3 text-amber-400 mx-auto mt-2.5" />
                                    </motion.div>

                                    {/* Fade at bottom */}
                                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent pointer-events-none" />
                                </div>
                            </div>

                            {/* Floating badge */}
                            <motion.div
                                animate={{ y: [-4, 4, -4] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-3 -right-3 bg-amber-500 text-white px-4 py-2 rounded-full shadow-lg shadow-amber-500/30 text-sm font-semibold z-10 flex items-center gap-1.5"
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
                            { value: "100%", label: "Personlig" },
                            { value: "0", label: "Glemte anledninger" },
                            { value: "\u221e", label: "Varme minner" }
                        ].map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="py-10 text-center"
                            >
                                <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>
                                    {stat.value}
                                </div>
                                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-32">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-20">
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
                            className="text-4xl lg:text-6xl font-bold tracking-tight"
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
                                desc: "Legg til ansatte manuelt eller importer fra Excel. Alle viktige datoer lagres."
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
                                title: "Publiser tribute",
                                desc: "En vakker, personlig tribute-side genereres automatisk som gave."
                            }
                        ].map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.6 }}
                                className="nord-card rounded-2xl p-8 relative group"
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
            <section className="py-32">
                <div className="max-w-5xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative nord-card rounded-3xl p-16 lg:p-24 text-center overflow-hidden"
                    >
                        <div className="absolute inset-0 -z-0">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-amber-500/8 rounded-full blur-[100px]" />
                        </div>

                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
                                <Star className="w-6 h-6 text-amber-400" />
                            </div>

                            <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
                                Klar til å skape{' '}
                                <span className="text-amber-400 italic">minner</span>?
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                                Start gratis i dag. Opprett din første tribute og la teamet dele varme ord og minner.
                            </p>
                            <Link
                                href="/dashboard"
                                className="group inline-flex items-center gap-3 px-10 py-4 bg-amber-500 text-white font-semibold rounded-2xl hover:bg-amber-400 transition-all hover:shadow-xl hover:shadow-amber-500/20 text-lg"
                            >
                                Lag din første tribute
                                <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </Link>
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
                                Tribute<span className="text-amber-400">Page</span>
                            </span>
                        </div>
                        <div className="text-muted-foreground text-sm">
                            &copy; {new Date().getFullYear()} TributePage. Alle rettigheter reservert.
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

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Users, MessageCircle, Sparkles, ArrowRight, Star, FileSpreadsheet, Share2, Eye } from 'lucide-react';
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

                        {/* Right — Tribute preview */}
                        <motion.div
                            initial={{ opacity: 0, y: 40, rotateY: -5 }}
                            animate={{ opacity: 1, y: 0, rotateY: 0 }}
                            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="relative hidden lg:block"
                        >
                            <div className="relative">
                                <div className="nord-card rounded-3xl overflow-hidden shadow-2xl shadow-black/30">
                                    <div className="h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600" />

                                    <div className="p-7 border-b border-border">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center">
                                                <Heart className="w-6 h-6 text-amber-400" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-foreground text-lg" style={{ fontFamily: 'var(--font-playfair)' }}>
                                                    Maria sin 5-års jubileum
                                                </h3>
                                                <p className="text-sm text-muted-foreground">12 bidrag fra teamet</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-7 space-y-4">
                                        {[
                                            { name: "Ole", msg: "Maria er selve hjertet i teamet. Alltid positiv!" },
                                            { name: "Lisa", msg: "Takk for at du alltid stiller opp og inspirerer oss." },
                                            { name: "Erik", msg: "5 fantastiske år! Du gjør hverdagen bedre." }
                                        ].map((sig, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 1 + idx * 0.12 }}
                                                className="p-4 rounded-xl bg-surface border border-border"
                                                style={{ transform: `rotate(${idx % 2 === 0 ? '-0.5deg' : '0.5deg'})` }}
                                            >
                                                <p className="text-sm italic text-foreground mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
                                                    &ldquo;{sig.msg}&rdquo;
                                                </p>
                                                <div className="editorial-line mb-2" />
                                                <p className="text-xs font-medium text-amber-400 text-right">&mdash; {sig.name}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                <motion.div
                                    animate={{ y: [-4, 4, -4] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -top-4 -right-4 bg-amber-500 text-white px-4 py-2 rounded-full shadow-lg shadow-amber-500/30 text-sm font-semibold z-10"
                                >
                                    Publisert!
                                </motion.div>
                            </div>
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

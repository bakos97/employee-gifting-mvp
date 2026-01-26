'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Gift, Calendar, MessageCircle, Heart, CheckCircle, Sparkles, Zap, Package } from 'lucide-react';

const ActionButton = ({ href, children, variant = 'primary' }: { href: string; children: React.ReactNode; variant?: 'primary' | 'secondary' }) => (
    <Link
        href={href}
        className={`inline-flex items-center px-8 py-4 rounded-2xl font-bold text-base transition-all transform hover:scale-105 hover:-translate-y-1 ${variant === 'primary'
            ? 'bg-primary text-primary-foreground shadow-xl hover:shadow-2xl hover:shadow-primary/30'
            : 'bg-card text-foreground border border-border hover:border-primary hover:bg-muted shadow-md hover:shadow-lg'
            }`}
    >
        {children}
    </Link>
);

export default function LandingPage() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }
    };

    const staggerChildren = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="bg-background overflow-hidden min-h-screen">
            {/* Refined Navbar */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed top-0 w-full z-50 px-6 py-3 bg-background/95 backdrop-blur-md border-b border-border"
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-primary rounded-xl shadow-md">
                            <Gift className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <span className="text-xl font-black tracking-tight text-foreground font-serif">
                            Gift<span className="text-primary">ly</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/dashboard" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors hidden sm:block">
                            Logg inn
                        </Link>
                        <Link href="/dashboard" className="px-4 sm:px-5 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-xl hover:shadow-lg transition-all">
                            Kom i gang
                        </Link>
                    </div>
                </div>
            </motion.nav>

            {/* Hero Section */}
            <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-secondary/30 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
                        {/* Left: Message */}
                        <motion.div
                            initial="initial"
                            animate="animate"
                            variants={staggerChildren}
                            className="space-y-8"
                        >
                            <motion.div variants={fadeIn}>
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold border border-secondary/50">
                                    <Sparkles className="w-4 h-4" />
                                    Enkelt · Personlig · Effektivt
                                </span>
                            </motion.div>

                            <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl lg:text-7xl font-black font-serif tracking-tight text-foreground leading-[1.1]">
                                La alle føle seg{' '}
                                <span className="relative inline-block text-primary">
                                    sett
                                </span>
                            </motion.h1>

                            <motion.p variants={fadeIn} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
                                Aldri glem en bursdag, jubileum eller avskjed igjen. Vi håndterer alt – fra varsling til levering.
                            </motion.p>

                            <motion.div variants={fadeIn} className="flex flex-wrap gap-4 pt-4">
                                <ActionButton href="/dashboard">
                                    Kom i gang gratis <Heart className="ml-2 w-4 h-4" />
                                </ActionButton>
                                <ActionButton href="#how-it-works" variant="secondary">
                                    Se hvordan
                                </ActionButton>
                            </motion.div>

                            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 sm:gap-8 pt-8 border-t border-border">
                                {[
                                    { icon: <Heart className="w-5 h-5 text-primary" />, text: "Personlige hilsener" },
                                    { icon: <CheckCircle className="w-5 h-5 text-primary" />, text: "Aldri glem noen" },
                                    { icon: <Zap className="w-5 h-5 text-secondary-foreground" />, text: "Spar tid" }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-sm font-semibold text-foreground">
                                        {item.icon}
                                        <span>{item.text}</span>
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Right: The Solution - Digital Page Preview */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative hidden lg:block"
                        >
                            {/* Browser Mockup */}
                            <div className="relative z-10 bg-card rounded-xl shadow-2xl border border-border overflow-hidden max-w-lg mx-auto transform rotate-1 hover:rotate-0 transition-transform duration-500">
                                {/* Browser Toolbar */}
                                <div className="h-8 bg-muted border-b border-border flex items-center px-4 gap-2">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]"></div>
                                    </div>
                                    <div className="flex-1 text-center">
                                        <div className="bg-background text-[10px] text-muted-foreground px-3 py-0.5 rounded-md inline-block font-mono border border-border">
                                            giftly.com/p/maria-anniversary
                                        </div>
                                    </div>
                                </div>

                                {/* Page Content Preview */}
                                <div className="h-[400px] bg-[#FDFBF7] overflow-hidden relative">
                                    {/* Hero Preview */}
                                    <div className="text-center pt-10 px-8 relative z-10">
                                        <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 border-4 border-white shadow-lg overflow-hidden">
                                            <div className="w-full h-full bg-primary/20 flex items-center justify-center text-3xl">👩</div>
                                        </div>
                                        <div className="inline-block bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-full mb-3">
                                            Let's Celebrate!
                                        </div>
                                        <h3 className="text-2xl font-serif font-black text-primary mb-2">Celebrating Maria</h3>
                                        <p className="text-xs text-muted-foreground mb-6">Honoring 5 years of excellence</p>

                                        {/* Timeline Snippet */}
                                        <div className="text-left border-l-2 border-primary/20 pl-4 space-y-4 max-w-xs mx-auto">
                                            <div className="relative">
                                                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-primary rounded-full border-2 border-white"></div>
                                                <div className="text-[10px] font-bold text-primary">2021</div>
                                                <div className="text-sm font-bold text-foreground">Joined the team</div>
                                            </div>
                                            <div className="relative">
                                                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-primary rounded-full border-2 border-white"></div>
                                                <div className="text-[10px] font-bold text-primary">2023</div>
                                                <div className="text-sm font-bold text-foreground">Senior Developer</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Decorative Confetti */}
                                    <div className="absolute top-10 left-10 text-xl opacity-50">🎉</div>
                                    <div className="absolute bottom-20 right-10 text-xl opacity-50">🎈</div>
                                    <div className="absolute top-1/2 left-4 text-xl opacity-50">✨</div>
                                </div>
                            </div>

                            {/* Floating "Live" Badge */}
                            <motion.div
                                animate={{ y: [5, -5, 5] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-6 -right-4 bg-white p-4 rounded-xl shadow-xl border border-border z-20 flex items-center gap-3"
                            >
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                    <CheckCircle className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-xs text-muted-foreground font-bold uppercase">Status</div>
                                    <div className="font-bold text-foreground">Live Page</div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Template Showcase */}
            <section className="py-24 bg-card border-y border-border">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Premium Templates</span>
                        <h2 className="text-3xl lg:text-5xl font-black font-serif text-foreground mb-4">
                            Designet for å feire
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Velg blant våre profesjonelt designede maler for å skape den perfekte hyllesten.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "The Classic",
                                price: "Inkludert",
                                img: "🌿",
                                desc: "Tidløs, elegant og perfekt for jubileer. Fokus på tidslinje og minner.",
                                tag: "Mest Populær"
                            },
                            {
                                title: "Vibrant & Bold",
                                price: "Kommer snart",
                                img: "🎨",
                                desc: "Høy energi, sterke farger og konfetti. Perfekt for bursdager.",
                                tag: "Nyhet"
                            },
                            {
                                title: "Minimalist",
                                price: "Kommer snart",
                                img: "✨",
                                desc: "Ren, enkel og fokusert på budskapet. Passer for alle anledninger.",
                                tag: "Kommer"
                            }
                        ].map((gift, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative bg-background rounded-3xl p-6 border border-border hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/5"
                            >
                                <div className="absolute top-6 right-6 px-3 py-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-full">
                                    {gift.tag}
                                </div>
                                <div className="h-48 rounded-2xl bg-muted/30 flex items-center justify-center text-6xl mb-6 group-hover:scale-105 transition-transform duration-500">
                                    {gift.img}
                                </div>
                                <h3 className="text-xl font-bold font-serif text-foreground mb-1">{gift.title}</h3>
                                <div className="flex justify-between items-center mb-3">
                                    <p className="text-sm text-muted-foreground">{gift.desc}</p>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-border">
                                    <span className="font-bold text-primary">{gift.price}</span>
                                    <Link href="/p/template-demo" className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
                                        Se eksempel →
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ROI Comparison */}
            <section className="py-24 bg-background">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <h2 className="text-3xl lg:text-5xl font-black font-serif text-foreground">
                                Hvorfor velge Giftly?
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Vi erstatter logistikkutfordringer med meningsfulle digitale opplevelser.
                            </p>

                            <div className="space-y-6">
                                {[
                                    { label: "Varig digitalt minne", val: "∞", icon: "💎" },
                                    { label: "Spart admin-tid", val: "100%", icon: "⚡" },
                                    { label: "Bærekraftig", val: "100%", icon: "🌱" }
                                ].map((stat, idx) => (
                                    <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border shadow-sm">
                                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-2xl">
                                            {stat.icon}
                                        </div>
                                        <div>
                                            <div className="text-2xl font-black text-primary">{stat.val}</div>
                                            <div className="text-sm font-semibold text-muted-foreground">{stat.label}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl opacity-50"></div>
                            <div className="relative bg-card rounded-3xl p-8 border border-border shadow-2xl">
                                <h3 className="font-bold text-lg mb-6 text-center">Fysiske gaver vs. Digitale Feiringer</h3>
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <div className="text-center text-sm font-semibold text-red-500 mb-2">Den gamle måten</div>
                                        <ul className="space-y-3 text-sm text-muted-foreground">
                                            <li className="flex gap-2">❌ Kort som kastes i skuffen</li>
                                            <li className="flex gap-2">❌ Produkter som støver ned</li>
                                            <li className="flex gap-2">❌ Dyre fraktkostnader</li>
                                        </ul>
                                    </div>
                                    <div className="space-y-4 border-l border-border pl-8">
                                        <div className="text-center text-sm font-semibold text-primary mb-2">Giftly måten</div>
                                        <ul className="space-y-3 text-sm text-foreground font-medium">
                                            <li className="flex gap-2">✅ En personlig nettside</li>
                                            <li className="flex gap-2">✅ Tidslinje over karrieren</li>
                                            <li className="flex gap-2">✅ Hilsener fra hele teamet</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Proof */}
            <section className="py-20 bg-muted/30 border-y border-border">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div className="flex justify-center mb-8 gap-1">
                        {[1, 2, 3, 4, 5].map(i => <span key={i} className="text-yellow-400 text-2xl">★</span>)}
                    </div>
                    <blockquote className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-8 leading-relaxed">
                        "Vi gikk fra stressende gaveinnkjøp til meningsfulle digitale feiringer. De ansatte elsker å kunne se tilbake på tidslinjen sin."
                    </blockquote>
                    <div className="flex items-center justify-center gap-4">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">KS</div>
                        <div className="text-left">
                            <div className="font-bold text-foreground">Kari Solberg</div>
                            <div className="text-sm text-muted-foreground">HR Director, TechNordic AS</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-24 bg-background">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-black font-serif text-foreground mb-4">
                            Så enkelt fungerer det
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Tre enkle steg til en minnerik feiring
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                step: "1",
                                icon: <Calendar className="w-8 h-8" />,
                                title: "Automatiske varsler",
                                desc: "Vi sier ifra når en jubilant nærmer seg en milepæl. Du trenger ikke huske datoen.",
                                color: "bg-primary text-primary-foreground"
                            },
                            {
                                step: "2",
                                icon: <MessageCircle className="w-8 h-8" />,
                                title: "Inviter teamet",
                                desc: "Kollegaer får en lenke for å legge igjen hilsener, bilder og minner i en felles portal.",
                                color: "bg-secondary text-secondary-foreground"
                            },
                            {
                                step: "3",
                                icon: <Sparkles className="w-8 h-8" />,
                                title: "Publiser siden",
                                desc: "På dagen sendes en vakker, interaktiv feirings-side til jubilanten.",
                                color: "bg-primary text-primary-foreground"
                            }
                        ].map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.15 }}
                                className="relative p-8 rounded-3xl bg-card border border-border shadow-md hover:shadow-lg transition-all"
                            >
                                <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                                    {step.icon}
                                </div>

                                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="relative bg-primary rounded-[2.5rem] p-12 lg:p-24 text-center text-primary-foreground overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

                        <div className="relative z-10">
                            <div className="inline-block mb-6">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto">
                                    <Sparkles className="w-8 h-8 text-primary-foreground" />
                                </div>
                            </div>

                            <h2 className="text-4xl lg:text-5xl font-black font-serif mb-6">
                                Klar til å spre glede?
                            </h2>
                            <p className="text-primary-foreground/90 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                                Start gratis i dag. Ingen kredittkort nødvendig.
                            </p>
                            <Link
                                href="/dashboard"
                                className="inline-flex items-center px-10 py-4 bg-white text-primary rounded-2xl font-black text-lg hover:bg-white/90 transition-all shadow-xl hover:scale-105"
                            >
                                Lag din første side <Sparkles className="ml-2 w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 bg-card border-t border-border">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2.5">
                            <div className="p-2 bg-primary rounded-xl shadow-md">
                                <Gift className="w-5 h-5 text-primary-foreground" />
                            </div>
                            <span className="text-xl font-black text-foreground font-serif">
                                Gift<span className="text-primary">ly</span>
                            </span>
                        </div>
                        <div className="text-muted-foreground text-sm">
                            &copy; {new Date().getFullYear()} Giftly. Alle rettigheter reservert.
                        </div>
                        <div className="flex gap-6 text-sm font-semibold text-muted-foreground">
                            <a href="#" className="hover:text-primary transition-colors">Personvern</a>
                            <a href="#" className="hover:text-primary transition-colors">Vilkår</a>
                            <a href="#" className="hover:text-primary transition-colors">Kontakt</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Gift, Calendar, MessageCircle, Heart, CheckCircle, Sparkles, Users, Zap, Package } from 'lucide-react';

const ActionButton = ({ href, children, variant = 'primary' }: { href: string; children: React.ReactNode; variant?: 'primary' | 'secondary' }) => (
    <Link
        href={href}
        className={`inline-flex items-center px-8 py-4 rounded-2xl font-bold text-base transition-all transform hover:scale-105 hover:-translate-y-1 ${variant === 'primary'
            ? 'bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-xl hover:shadow-2xl hover:shadow-orange-500/30'
            : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50 shadow-md hover:shadow-lg'
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
        <div className="bg-[#FFFBF5] overflow-hidden">
            {/* Refined Navbar */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed top-0 w-full z-50 px-6 py-3 bg-white/95 backdrop-blur-md border-b border-orange-100/50"
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-gradient-to-br from-rose-500 to-orange-500 rounded-xl shadow-md">
                            <Gift className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-black tracking-tight text-gray-800">
                            Gift<span className="text-orange-500">Auto</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/dashboard" className="text-sm font-semibold text-gray-600 hover:text-orange-600 transition-colors hidden sm:block">
                            Logg inn
                        </Link>
                        <Link href="/dashboard" className="px-4 sm:px-5 py-2 bg-gradient-to-r from-rose-500 to-orange-500 text-white text-sm font-bold rounded-xl hover:shadow-lg transition-all">
                            Kom i gang
                        </Link>
                    </div>
                </div>
            </motion.nav>

            {/* Hero Section */}
            <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-orange-200/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-rose-200/20 rounded-full blur-3xl"></div>
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
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold border border-orange-200">
                                    <Sparkles className="w-4 h-4" />
                                    Enkelt · Personlig · Effektivt
                                </span>
                            </motion.div>

                            <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-gray-900 leading-[1.1]">
                                La alle føle seg{' '}
                                <span className="relative inline-block">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500">
                                        sett
                                    </span>
                                    <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none">
                                        <path d="M2 10C50 2, 150 2, 198 10" stroke="url(#gradient)" strokeWidth="3" fill="none" strokeLinecap="round" />
                                        <defs>
                                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.3" />
                                                <stop offset="100%" stopColor="#f97316" stopOpacity="0.3" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </span>
                            </motion.h1>

                            <motion.p variants={fadeIn} className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg">
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

                            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 sm:gap-8 pt-8 border-t border-gray-200">
                                {[
                                    { icon: <Heart className="w-5 h-5 text-rose-500" />, text: "Personlige hilsener" },
                                    { icon: <CheckCircle className="w-5 h-5 text-emerald-500" />, text: "Aldri glem noen" },
                                    { icon: <Zap className="w-5 h-5 text-amber-500" />, text: "Spar tid" }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                        {item.icon}
                                        <span>{item.text}</span>
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Right: Gift In Progress */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative hidden lg:block"
                        >
                            <div className="relative">
                                <div className="relative z-10 bg-white rounded-[2rem] shadow-2xl border-2 border-orange-100/50 overflow-hidden">
                                    {/* Header with progress */}
                                    <div className="bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 p-6 text-white">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
                                                <Gift className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="font-black text-lg">Maria sitt 5-års jubileum</h3>
                                                <p className="text-sm text-white/90">24. januar 2026</p>
                                            </div>
                                        </div>

                                        {/* Progress bar */}
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="font-semibold">9 av 12 kollegaer har bidratt</span>
                                                <span className="font-bold">75%</span>
                                            </div>
                                            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: "75%" }}
                                                    transition={{ duration: 1, delay: 0.5 }}
                                                    className="h-full bg-white rounded-full"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 space-y-6">
                                        {/* Selected Gift */}
                                        <div className="bg-gradient-to-br from-orange-50 to-rose-50 p-5 rounded-2xl border-2 border-orange-200">
                                            <div className="flex items-center gap-4 mb-3">
                                                <div className="text-5xl">☕</div>
                                                <div className="flex-1">
                                                    <h4 className="font-black text-gray-900 text-lg mb-1">Personlig kopp</h4>
                                                    <p className="text-sm text-gray-600">Med 9 hilsener fra teamet</p>
                                                </div>
                                                <div className="px-3 py-1.5 bg-green-500 text-white text-xs font-bold rounded-full">
                                                    ✓ Valgt
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-500 italic">Leveres med trykte hilsener til avdelingen 24. jan</p>
                                        </div>

                                        {/* Recent contributions */}
                                        <div>
                                            <h5 className="text-sm font-bold text-gray-700 mb-3">Siste bidrag:</h5>
                                            <div className="space-y-2.5">
                                                {[
                                                    { name: "Ole", time: "2 min siden", msg: "Gratulerer! 🎊", avatar: "🧑" },
                                                    { name: "Lisa", time: "15 min siden", msg: "Du er fantastisk!", avatar: "👩" },
                                                    { name: "Erik", time: "1t siden", msg: "Tusen takk for alt! 🌟", avatar: "👨" }
                                                ].map((contrib, idx) => (
                                                    <motion.div
                                                        key={idx}
                                                        initial={{ opacity: 0, x: -15 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.4 + idx * 0.1 }}
                                                        className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100"
                                                    >
                                                        <div className="text-2xl">{contrib.avatar}</div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-2 mb-0.5">
                                                                <span className="text-sm font-bold text-gray-900">{contrib.name}</span>
                                                                <span className="text-xs text-gray-400">{contrib.time}</span>
                                                            </div>
                                                            <p className="text-sm text-gray-700 italic truncate">"{contrib.msg}"</p>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Pending colleagues */}
                                        <div className="pt-4 border-t border-gray-100">
                                            <p className="text-xs text-gray-500 mb-2">Venter på:</p>
                                            <div className="flex gap-2">
                                                {['👤', '👤', '👤'].map((icon, idx) => (
                                                    <div key={idx} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm opacity-40">
                                                        {icon}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating countdown */}
                                <motion.div
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -top-4 -right-4 bg-orange-500 text-white px-4 py-2 rounded-full shadow-lg border-2 border-white z-20"
                                >
                                    <span className="text-sm font-bold">⏰ 2 dager igjen</span>
                                </motion.div>

                                <motion.div
                                    animate={{ y: [10, -10, 10], rotate: [0, 10, 0] }}
                                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -bottom-4 -left-4 text-4xl z-20"
                                >
                                    🎈
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-24 bg-white/50">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
                            Så enkelt fungerer det
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Tre enkle steg fra idé til gledestårer
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                step: "1",
                                icon: <Calendar className="w-8 h-8" />,
                                title: "Importer ansatte",
                                desc: "Last opp Excel-fil eller koble til ditt system. Systemet husker alle datoer automatisk.",
                                color: "from-blue-500 to-cyan-500"
                            },
                            {
                                step: "2",
                                icon: <MessageCircle className="w-8 h-8" />,
                                title: "Samle hilsener",
                                desc: "Kollegaer får melding og legger til personlige hilsener – fungerer perfekt selv om teamet er spredt.",
                                color: "from-rose-500 to-orange-500"
                            },
                            {
                                step: "3",
                                icon: <Package className="w-8 h-8" />,
                                title: "Levering med varme",
                                desc: "Digital eller fysisk gave leveres med alle hilsener samlet.",
                                color: "from-amber-500 to-yellow-500"
                            }
                        ].map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.15 }}
                                className="relative p-8 rounded-3xl bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all"
                            >
                                <div className={`w-16 h-16 bg-gradient-to-br ${step.color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                                    {step.icon}
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="relative bg-gradient-to-br from-rose-500 via-orange-500 to-amber-500 rounded-[2.5rem] p-12 lg:p-24 text-center text-white overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50"></div>

                        <div className="relative z-10">
                            <div className="inline-block mb-6">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto">
                                    <Sparkles className="w-8 h-8 text-white" />
                                </div>
                            </div>

                            <h2 className="text-4xl lg:text-5xl font-black mb-6">
                                Klar til å spre glede?
                            </h2>
                            <p className="text-white/95 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                                Start gratis i dag. Ingen kredittkort nødvendig.
                            </p>
                            <Link
                                href="/dashboard"
                                className="inline-flex items-center px-10 py-4 bg-white text-orange-600 rounded-2xl font-black text-lg hover:bg-orange-50 transition-all shadow-xl hover:scale-105"
                            >
                                Lag din første gave <Heart className="ml-2 w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 bg-white/80 border-t border-orange-100">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2.5">
                            <div className="p-2 bg-gradient-to-br from-rose-500 to-orange-500 rounded-xl shadow-md">
                                <Gift className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-black text-gray-800">
                                Gift<span className="text-orange-500">Auto</span>
                            </span>
                        </div>
                        <div className="text-gray-500 text-sm">
                            &copy; {new Date().getFullYear()} GiftAuto. Alle rettigheter reservert.
                        </div>
                        <div className="flex gap-6 text-sm font-semibold text-gray-600">
                            <a href="#" className="hover:text-orange-600 transition-colors">Personvern</a>
                            <a href="#" className="hover:text-orange-600 transition-colors">Vilkår</a>
                            <a href="#" className="hover:text-orange-600 transition-colors">Kontakt</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

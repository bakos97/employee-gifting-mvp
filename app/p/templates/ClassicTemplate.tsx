'use client';

import { CelebrationPage } from '@/app/lib/types';
import { motion } from 'framer-motion';
import { Calendar, Heart, Award, ChevronDown } from 'lucide-react';
import Image from 'next/image';

export default function ClassicTemplate({ content }: { content: CelebrationPage['content'] }) {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] font-sans text-foreground">
            {/* Hero Section */}
            <section className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-primary/10 to-transparent -z-10"></div>

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8 relative"
                >
                    <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border-4 border-white shadow-2xl overflow-hidden mx-auto bg-gray-200">
                        {content.heroImage ? (
                            <img src={content.heroImage} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-primary text-primary-foreground text-4xl">👤</div>
                        )}
                    </div>
                    {/* Badge */}
                    <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-primary text-primary-foreground px-4 py-2 text-sm font-bold rounded-full shadow-lg border-2 border-white">
                        Let's Celebrate!
                    </div>
                </motion.div>

                <motion.h1
                    {...fadeIn}
                    className="text-4xl md:text-6xl lg:text-7xl font-serif font-black text-primary mb-4"
                >
                    {content.heroTitle}
                </motion.h1>

                <motion.p
                    {...fadeIn}
                    transition={{ delay: 0.2 }}
                    className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12"
                >
                    {content.heroSubtitle}
                </motion.p>

                {/* Stats Chips */}
                <div className="flex flex-wrap justify-center gap-4 mb-20">
                    {content.stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + (i * 0.1) }}
                            className="bg-white px-6 py-3 rounded-xl shadow-md border border-border flex items-center gap-3"
                        >
                            <span className="font-serif font-bold text-xl text-primary">{stat.value}</span>
                            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                        </motion.div>
                    ))}
                </div>

                <div className="absolute bottom-10 animate-bounce">
                    <ChevronDown className="w-6 h-6 text-muted-foreground" />
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-24 max-w-4xl mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">The Journey</span>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">Moments that Defined Us</h2>
                </div>

                <div className="relative border-l-2 border-primary/20 ml-6 md:ml-0 space-y-12">
                    {content.timeline.map((item, i) => (
                        <motion.div
                            key={i}
                            {...fadeIn}
                            className="relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-16 items-center"
                        >
                            {/* Marker */}
                            <div className={`absolute left-[-5px] md:left-1/2 md:-ml-[5px] w-3 h-3 rounded-full bg-primary border-4 border-white shadow-sm z-10`} />

                            {/* Content */}
                            <div className={`${i % 2 === 0 ? 'md:text-right' : 'md:col-start-2'} space-y-2`}>
                                <span className="inline-block px-3 py-1 bg-secondary/50 text-foreground text-xs font-bold rounded-full mb-2">
                                    {item.year}
                                </span>
                                <h3 className="text-2xl font-bold font-serif text-foreground">{item.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Gallery Section */}
            {content.gallery.length > 0 && (
                <section className="py-24 bg-card border-y border-border">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">Captured Memories</h2>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {content.gallery.map((img, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -5 }}
                                    className="relative group overflow-hidden rounded-2xl shadow-lg aspect-[4/3] bg-muted"
                                >
                                    <img src={img.src} alt={img.caption} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                        <p className="text-white font-medium">{img.caption}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Messages Section */}
            <section className="py-24 max-w-5xl mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Appreciation</span>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">Words from the Team</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {content.messages.map((msg, i) => (
                        <motion.div
                            key={i}
                            {...fadeIn}
                            className="bg-white p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow relative"
                        >
                            <div className="absolute top-6 right-6 opacity-10">
                                <Heart className="w-8 h-8" />
                            </div>
                            <p className="text-lg text-foreground italic mb-6 leading-relaxed">"{msg.text}"</p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold text-secondary-foreground">
                                    {msg.name[0]}
                                </div>
                                <div>
                                    <div className="font-bold text-foreground">{msg.name}</div>
                                    <div className="text-xs text-muted-foreground uppercase tracking-wider">{msg.title}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 bg-primary text-primary-foreground text-center">
                <div className="max-w-2xl mx-auto px-4 space-y-6">
                    <Award className="w-12 h-12 mx-auto opacity-50" />
                    <h2 className="text-3xl font-serif font-bold">Here's to the next chapter!</h2>
                    <p className="opacity-80">Created with Giftly.</p>
                </div>
            </footer>
        </div>
    );
}

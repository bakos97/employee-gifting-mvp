'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createCelebrationPage } from '@/app/actions';
import { Employee, CelebrationPage } from '@/app/lib/types';
import { Sparkles, Save, Layout, Calendar } from 'lucide-react';
import Image from 'next/image';

interface PageBuilderProps {
    employee: Employee;
    eventId: string;
    eventType: string; // 'BIRTHDAY', 'ANNIVERSARY'
}

export default function PageBuilder({ employee, eventId, eventType }: PageBuilderProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Default Content for Classic Template
    const [content, setContent] = useState<CelebrationPage['content']>({
        heroTitle: `Celebrating ${employee.name.split(' ')[0]}`,
        heroSubtitle: `Honoring your journey with us`,
        stats: [
            { label: "Years with us", value: "5" },
            { label: "Projects Delivered", value: "42" },
            { label: "Coffees Consumed", value: "∞" }
        ],
        timeline: [
            { year: "2021", title: "Joined the Team", description: "Brought fresh energy to the frontend team." },
            { year: "2023", title: "Senior Developer", description: "Led the migration to Next.js." },
            { year: "2026", title: "Team Lead", description: "Now mentoring the next generation." }
        ],
        gallery: [
            { src: "/placeholder-1.jpg", caption: "Team Offsite 2024" },
            { src: "/placeholder-2.jpg", caption: "Hackathon Winner" }
        ],
        messages: [
            { name: "Sarah", title: "CTO", text: "You've been an inspiration to all of us. Happy Birthday!" }
        ]
    });

    const handlePublish = async () => {
        setLoading(true);
        try {
            const res = await createCelebrationPage(employee.id, eventId, 'classic', content);
            if (res.success) {
                router.push(`/p/${res.slug}`);
            }
        } catch (e) {
            console.error(e);
            alert('Failed to publish');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-foreground">Design Celebration Page</h1>
                    <p className="text-muted-foreground">Customize the digital experience for {employee.name}</p>
                </div>
                <button
                    onClick={handlePublish}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50"
                >
                    <Sparkles className="w-5 h-5" />
                    {loading ? 'Publishing...' : 'Publish Page'}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Editor Column */}
                <div className="lg:col-span-1 space-y-6">

                    {/* Hero Options */}
                    <div className="bg-card border border-border rounded-xl p-4 space-y-4">
                        <h3 className="font-bold flex items-center gap-2"><Layout className="w-4 h-4" /> Hero Section</h3>
                        <div>
                            <label className="text-xs font-semibold text-muted-foreground">Title</label>
                            <input
                                className="w-full p-2 rounded-lg border border-border bg-background text-sm"
                                value={content.heroTitle}
                                onChange={e => setContent({ ...content, heroTitle: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-muted-foreground">Subtitle</label>
                            <input
                                className="w-full p-2 rounded-lg border border-border bg-background text-sm"
                                value={content.heroSubtitle}
                                onChange={e => setContent({ ...content, heroSubtitle: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Stats Options */}
                    <div className="bg-card border border-border rounded-xl p-4 space-y-4">
                        <h3 className="font-bold flex items-center gap-2"><Layout className="w-4 h-4" /> Key Stats</h3>
                        {content.stats.map((stat, idx) => (
                            <div key={idx} className="grid grid-cols-2 gap-2">
                                <input
                                    className="p-2 rounded-lg border border-border bg-background text-xs"
                                    value={stat.value}
                                    onChange={e => {
                                        const newStats = [...content.stats];
                                        newStats[idx].value = e.target.value;
                                        setContent({ ...content, stats: newStats });
                                    }}
                                />
                                <input
                                    className="p-2 rounded-lg border border-border bg-background text-xs"
                                    value={stat.label}
                                    onChange={e => {
                                        const newStats = [...content.stats];
                                        newStats[idx].label = e.target.value;
                                        setContent({ ...content, stats: newStats });
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Messages Placeholder */}
                    <div className="bg-card border border-border rounded-xl p-4 space-y-4">
                        <h3 className="font-bold flex items-center gap-2"><Layout className="w-4 h-4" /> Messages</h3>
                        <p className="text-xs text-muted-foreground">Signatures will be collected via the link after publishing.</p>
                    </div>
                </div>

                {/* Live Preview Column */}
                <div className="lg:col-span-2">
                    <div className="border border-border rounded-2xl overflow-hidden shadow-2xl bg-[#FDFBF7] min-h-[600px] relative">
                        <div className="bg-primary/5 text-center py-2 text-xs font-mono text-primary border-b border-primary/10">Live Preview</div>

                        {/* Preview Content */}
                        <div className="p-8 space-y-12">
                            {/* Hero Preview */}
                            <div className="text-center space-y-4 pt-8">
                                <div className="w-24 h-24 bg-secondary/30 rounded-full mx-auto flex items-center justify-center text-4xl border-4 border-white shadow-lg">
                                    {employee.avatarUrl ? <img src={employee.avatarUrl} className="w-full h-full rounded-full object-cover" /> : '👤'}
                                </div>
                                <h1 className="text-4xl font-serif font-black text-foreground">{content.heroTitle}</h1>
                                <p className="text-muted-foreground">{content.heroSubtitle}</p>
                            </div>

                            {/* Stats Preview */}
                            <div className="grid grid-cols-3 gap-4 border-y border-border py-6">
                                {content.stats.map((s, i) => (
                                    <div key={i} className="text-center">
                                        <div className="text-2xl font-black text-primary">{s.value}</div>
                                        <div className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

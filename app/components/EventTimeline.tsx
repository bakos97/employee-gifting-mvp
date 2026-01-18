'use client';

import { Employee, Gift, GiftEvent } from '../lib/types';
import { format, parseISO } from 'date-fns';
import { Cake, Briefcase, LogOut, Gift as GiftIcon, CheckCircle, Snowflake } from 'lucide-react';
import { cn } from '../lib/utils';
import { selectGift, createCard } from '../actions';
import { useState } from 'react';
import Link from 'next/link';

interface EventTimelineProps {
    events: GiftEvent[];
    employees: Employee[];
    gifts: Gift[];
}

export function EventTimeline({ events, employees, gifts }: EventTimelineProps) {
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [creatingCardId, setCreatingCardId] = useState<string | null>(null);

    if (events.length === 0) {
        return (
            <div className="p-8 border border-dashed border-white/10 rounded-xl text-center text-muted-foreground bg-zinc-900/20">
                No upcoming events in the next 30 days.
            </div>
        );
    }

    async function handleGiftSelect(eventId: string, giftId: string) {
        setLoadingId(eventId);
        await selectGift(eventId, giftId);
        setLoadingId(null);
    }

    async function handleCreateCard(eventId: string, recipientName: string) {
        setCreatingCardId(eventId);
        await createCard(eventId, recipientName);
        setCreatingCardId(null);
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => {
                const employee = employees.find((e) => e.id === event.employeeId);
                if (!employee) return null;

                const isBirthday = event.type === 'BIRTHDAY';
                const isAnniversary = event.type === 'ANNIVERSARY';
                const isChristmas = event.type === 'CHRISTMAS';

                const Icon = isBirthday ? Cake : isAnniversary ? Briefcase : isChristmas ? Snowflake : LogOut;

                // Color Logic
                let colorClass = 'text-slate-600 bg-slate-100'; // Default / Leaving
                if (isBirthday) colorClass = 'text-violet-600 bg-violet-100';
                if (isAnniversary) colorClass = 'text-amber-600 bg-amber-100';
                if (isChristmas) colorClass = 'text-emerald-600 bg-emerald-100';

                const label = isBirthday ? 'Birthday' : isAnniversary ? 'Work Anniversary' : isChristmas ? 'Christmas Gift' : 'Leaving';

                const selectedGift = gifts.find(g => g.id === event.selectedGiftId);

                return (
                    <div key={event.id} className="glass-card rounded-2xl p-5 relative overflow-hidden group border border-white/60">
                        <div className="flex justify-between items-start mb-4">
                            <div className={cn("p-2.5 rounded-xl shadow-sm", colorClass)}>
                                <Icon className="w-5 h-5" />
                            </div>
                            <div className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
                                {format(parseISO(event.date), 'MMM d, yyyy')}
                            </div>
                        </div>

                        <div className="space-y-1 mb-6">
                            <h3 className="font-bold text-xl text-gray-900">{employee.name}</h3>
                            <p className="text-sm font-medium text-gray-500">{label} &middot; {employee.department}</p>
                        </div>

                        <div className="space-y-3">
                            {selectedGift ? (
                                <div className="flex items-start gap-3 p-3 rounded-xl border border-blue-100 bg-blue-50/50">
                                    {selectedGift.image ? (
                                        <div className="w-16 h-16 rounded-lg bg-white border border-gray-100 overflow-hidden flex-shrink-0">
                                            <img src={selectedGift.image} alt={selectedGift.name} className="w-full h-full object-cover" />
                                        </div>
                                    ) : (
                                        <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                                            <GiftIcon className="w-8 h-8 text-blue-500" />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 text-sm text-green-700 font-bold mb-1">
                                            <CheckCircle className="w-4 h-4 text-green-600" />
                                            <span>Selected Gift</span>
                                        </div>
                                        <p className="text-gray-900 font-bold text-sm truncate">{selectedGift.name}</p>
                                        <p className="text-gray-500 text-xs line-clamp-2">{selectedGift.description}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative">
                                    <select
                                        disabled={loadingId === event.id}
                                        onChange={(e) => {
                                            if (e.target.value) handleGiftSelect(event.id, e.target.value);
                                        }}
                                        className="w-full bg-gray-50 text-gray-700 border border-gray-200 rounded-xl text-sm font-semibold py-3 pl-3 pr-8 hover:bg-white hover:shadow-md transition-all appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        defaultValue=""
                                    >
                                        <option value="" disabled>Select Gift...</option>
                                        {gifts.map(g => (
                                            <option key={g.id} value={g.id} className="text-black">{g.name}</option>
                                        ))}
                                    </select>
                                    <GiftIcon className="w-4 h-4 text-gray-400 absolute right-3 top-3.5 pointer-events-none" />
                                </div>
                            )}

                            {/* Card Feature */}
                            {event.cardId ? (
                                <Link href={`/card/${event.cardId}`} className="block w-full text-center px-4 py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl transition-all border border-indigo-100 text-sm font-bold shadow-sm hover:shadow-md">
                                    View/Sign Card
                                </Link>
                            ) : (
                                <button
                                    disabled={creatingCardId === event.id}
                                    onClick={() => handleCreateCard(event.id, employee.name)}
                                    className="w-full px-4 py-3 bg-white hover:bg-gray-50 text-gray-600 hover:text-primary rounded-xl transition-all border border-gray-200 hover:border-primary/30 text-sm font-bold shadow-sm"
                                >
                                    {creatingCardId === event.id ? 'Creating...' : 'Create Digital Card'}
                                </button>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

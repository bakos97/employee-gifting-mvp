'use client';

import { Employee, GiftEvent } from '../lib/types';
import { format, parseISO } from 'date-fns';
import { Cake, Briefcase, LogOut, CheckCircle, Snowflake, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import Link from 'next/link';

interface EventTimelineProps {
    events: GiftEvent[];
    employees: Employee[];
}

export function EventTimeline({ events, employees }: EventTimelineProps) {
    if (events.length === 0) {
        return (
            <div className="p-8 border border-dashed border-border rounded-xl text-center text-muted-foreground bg-muted/30">
                No upcoming events in the next 30 days.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => {
                const employee = employees.find((e) => e.id === event.employeeId);
                if (!employee) return null;

                const isBirthday = event.type === 'BIRTHDAY';
                const isAnniversary = event.type === 'ANNIVERSARY';
                const isChristmas = event.type === 'CHRISTMAS';

                const Icon = isBirthday ? Cake : isAnniversary ? Briefcase : isChristmas ? Snowflake : LogOut;

                // Color Logic - using theme variables
                let colorClass = 'text-muted-foreground bg-muted'; // Default / Leaving
                if (isBirthday) colorClass = 'text-primary bg-primary/10';
                if (isAnniversary) colorClass = 'text-primary bg-secondary'; // Updated to use theme secondary
                if (isChristmas) colorClass = 'text-primary bg-primary/20';

                const label = isBirthday ? 'Birthday' : isAnniversary ? 'Work Anniversary' : isChristmas ? 'Holiday' : 'Leaving';

                const isCompleted = event.status === 'COMPLETED';
                const isPending = event.status === 'PENDING_ACTION';

                return (
                    <div key={event.id} className="bg-card rounded-2xl p-6 relative overflow-hidden group border border-border shadow-sm hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className={cn("p-2.5 rounded-xl shadow-sm", colorClass)}>
                                <Icon className="w-5 h-5" />
                            </div>
                            <div className="text-xs font-bold text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
                                {format(parseISO(event.date), 'MMM d, yyyy')}
                            </div>
                        </div>

                        <div className="space-y-1 mb-6">
                            <h3 className="font-serif font-black text-xl text-foreground">{employee.name}</h3>
                            <p className="text-sm font-medium text-muted-foreground">{label} &middot; {employee.department || 'General'}</p>
                        </div>

                        <div className="space-y-3">
                            {isCompleted ? (
                                <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                                        <CheckCircle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-foreground">Page Published</div>
                                        {event.pageId && (
                                            <Link href={`/p/template-demo`} className="text-xs text-primary hover:underline">
                                                View Page
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <div className="text-xs font-medium text-muted-foreground mb-2">
                                        No celebration page created yet.
                                    </div>
                                    <Link
                                        href={`/dashboard/pages/create?eventId=${event.id}&employeeId=${event.employeeId}`}
                                        className="flex items-center justify-center w-full px-4 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl transition-all shadow-lg shadow-primary/20 text-sm font-bold gap-2"
                                    >
                                        <Sparkles className="w-4 h-4" />
                                        Create Celebration Page
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

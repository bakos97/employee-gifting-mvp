import { Calendar, Gift, Users, CreditCard, TrendingUp } from 'lucide-react';
import { cn } from '@/app/lib/utils';

// Placeholder data for now - will be replaced by real props later
interface StatsGridProps {
    eventCount: number;
    employeeCount: number;
    // We can add more props as we wire up real data
}

export function StatsGrid({ eventCount, employeeCount }: StatsGridProps) {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Events Card */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-orange-100 text-orange-600">
                        <Calendar className="h-5 w-5" />
                    </div>
                    <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        <TrendingUp className="mr-1 h-3 w-3" /> +12%
                    </span>
                </div>
                <div className="mt-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Events This Month</h3>
                    <p className="mt-1 text-3xl font-bold text-foreground">{eventCount}</p>
                </div>
            </div>

            {/* Gifts Sent Card */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                        <Gift className="h-5 w-5" />
                    </div>
                    <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        <TrendingUp className="mr-1 h-3 w-3" /> +5%
                    </span>
                </div>
                <div className="mt-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Gifts Sent (Q1)</h3>
                    <p className="mt-1 text-3xl font-bold text-foreground">24</p>
                </div>
            </div>

            {/* Team Members Card */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                        <Users className="h-5 w-5" />
                    </div>
                    <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        <TrendingUp className="mr-1 h-3 w-3" /> +2
                    </span>
                </div>
                <div className="mt-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Team Members</h3>
                    <p className="mt-1 text-3xl font-bold text-foreground">{employeeCount}</p>
                </div>
            </div>

            {/* Budget Card */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-green-100 text-green-600">
                        <CreditCard className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">75%</span>
                </div>
                <div className="mt-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Budget Used</h3>
                    <div className="flex items-baseline gap-1">
                        <p className="mt-1 text-3xl font-bold text-foreground">$1,240</p>
                        <span className="text-sm text-muted-foreground">/ $1,650</span>
                    </div>
                    <div className="mt-3 h-2 w-full rounded-full bg-secondary">
                        <div className="h-2 w-3/4 rounded-full bg-primary" />
                    </div>
                </div>
            </div>
        </div>
    );
}

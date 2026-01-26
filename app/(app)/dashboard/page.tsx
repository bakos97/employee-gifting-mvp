import { getAppData } from '@/app/lib/db';
import { calculateUpcomingEvents } from '@/app/lib/events';
import { EventTimeline } from '@/app/components/EventTimeline';
import { EmployeeList } from '@/app/components/EmployeeList';
import { StatsGrid } from '@/app/components/StatsGrid';
import { Calendar, Bell, Search, User, Filter } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const data = await getAppData();
  const upcomingEvents = calculateUpcomingEvents(data.employees, data.eventStates, 30);

  // Calculate stats
  const eventCount = upcomingEvents.length;
  const employeeCount = data.employees.length;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* Header with Search and Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Good morning, Simen</h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your team today.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="h-10 w-64 rounded-full border border-input bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button className="relative rounded-full bg-card p-2 text-muted-foreground hover:text-foreground border border-border shadow-sm">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center border border-border shadow-sm">
            <User className="h-5 w-5 text-primary" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <StatsGrid eventCount={eventCount} employeeCount={employeeCount} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Timeline */}
        <section className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-serif text-foreground flex items-center gap-2">
              Upcoming Events
              <span className="text-xs font-sans font-normal bg-primary/10 text-primary px-2 py-1 rounded-full">{upcomingEvents.length}</span>
            </h2>
            <div className="flex gap-2">
              <button className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                <Filter className="h-4 w-4" /> Filter
              </button>
              <button className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                <Calendar className="h-4 w-4" /> Calendar
              </button>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <EventTimeline events={upcomingEvents} employees={data.employees} />
          </div>
        </section>

        {/* Sidebar Widget - Team & Quick Actions */}
        <aside className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-serif text-foreground">Team Overview</h2>
            <button className="text-sm font-medium text-primary hover:underline">View All</button>
          </div>
          <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <EmployeeList employees={data.employees} />
          </div>

          {/* Quick Actions / Featured Gift Placeholder */}
          <div className="bg-primary/5 rounded-xl border border-primary/10 p-6">
            <h3 className="font-bold text-foreground mb-2">Need a last-minute gift?</h3>
            <p className="text-sm text-muted-foreground mb-4">Send a digital gift card instantly to any team member.</p>
            <button className="w-full rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              Send Gift Card
            </button>
          </div>
        </aside>
      </div>

    </div>
  );
}

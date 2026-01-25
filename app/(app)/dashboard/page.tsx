import { getAppData } from '@/app/lib/db';
import { calculateUpcomingEvents } from '@/app/lib/events';
import { EventTimeline } from '@/app/components/EventTimeline';
import { EmployeeList } from '@/app/components/EmployeeList';
import { Users, Calendar } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const data = await getAppData();
  const upcomingEvents = calculateUpcomingEvents(data.employees, data.eventStates, 30);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-2 text-lg">
            You have <span className="text-primary font-bold">{upcomingEvents.length}</span> upcoming events in the next 30 days.
          </p>
        </div>
      </div>

      {/* Events Timeline */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 text-xl font-bold text-gray-800">
          <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
            <Calendar className="w-6 h-6" />
          </div>
          <h2>Upcoming Events</h2>
        </div>
        <EventTimeline events={upcomingEvents} employees={data.employees} gifts={data.gifts} />
      </section>

      {/* Quick Employee List (Preview) */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 text-xl font-bold text-gray-800">
          <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
            <Users className="w-6 h-6" />
          </div>
          <h2>Team Overview</h2>
        </div>
        <EmployeeList employees={data.employees} />
      </section>

    </div>
  );
}

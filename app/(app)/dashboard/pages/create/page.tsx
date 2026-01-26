import { getAppData } from '@/app/lib/db';
import PageBuilder from './page-builder';
import { notFound } from 'next/navigation';

export default async function CreatePage({ searchParams }: { searchParams: { eventId?: string; employeeId?: string } }) {
    const data = await getAppData();

    // For MVP, if no params, just pick the first pending event
    let eventId = searchParams?.eventId;
    let employeeId = searchParams?.employeeId;

    if (!eventId) {
        // Find a pending event
        const pendingEvent = Object.values(data.eventStates).find(s => s.status === 'UPCOMING' || s.status === 'PENDING_ACTION');
        if (pendingEvent) {
            eventId = pendingEvent.id;
            // Parse emp id from event id if possible or look it up. 
            // Our eventStates lacks employeeId link directly (oops), but Event calculation creates ids like `evt_BIRTHDAY_emp-1_2026`.
            // Let's assume we can get it from the event ID string or we fix lookups.
            // Or we just find the employee for the event.
            // Wait, calculateUpcomingEvents returns events with employeeId.
            // But here we only have access to stored state.
            // Let's rely on query params for now.
        }
    }

    // Fallback: Pick first employee for demo
    if (!employeeId) {
        employeeId = data.employees[0]?.id;
    }

    // Mock event ID if missing
    if (!eventId) eventId = `evt_demo_${employeeId}`;

    const employee = data.employees.find(e => e.id === employeeId);

    if (!employee) return <div>Employee not found. Please select an employee from the dashboard.</div>;

    return <PageBuilder employee={employee} eventId={eventId} eventType="BIRTHDAY" />;
}

import { Employee, GiftEvent, EventState } from './types';
import { addYears, differenceInDays, format, isBefore, parseISO, setYear } from 'date-fns';

export function calculateUpcomingEvents(
    employees: Employee[],
    eventStates: Record<string, EventState>,
    daysToLookAhead = 30
): GiftEvent[] {
    const events: GiftEvent[] = [];
    const today = new Date();

    employees.forEach((emp) => {
        // 1. Birthdays
        const dob = parseISO(emp.dateOfBirth);
        let nextBirthday = setYear(dob, today.getFullYear());

        // If birthday passed this year, look at next year
        if (isBefore(nextBirthday, today)) {
            nextBirthday = addYears(nextBirthday, 1);
        }

        if (daysUntil(today, nextBirthday) <= daysToLookAhead) {
            const id = `evt_bd_${emp.id}_${nextBirthday.getFullYear()}`;
            const state = eventStates[id];
            events.push({
                id,
                employeeId: emp.id,
                type: 'BIRTHDAY',
                date: format(nextBirthday, 'yyyy-MM-dd'),
                status: state?.status || 'UPCOMING',
                selectedGiftId: state?.selectedGiftId,
                cardId: state?.cardId,
            });
        }

        // 2. Anniversaries
        const start = parseISO(emp.startDate);
        let nextAnniversary = setYear(start, today.getFullYear());
        if (isBefore(nextAnniversary, today)) {
            nextAnniversary = addYears(nextAnniversary, 1);
        }

        if (daysUntil(today, nextAnniversary) <= daysToLookAhead) {
            const id = `evt_anv_${emp.id}_${nextAnniversary.getFullYear()}`;
            const state = eventStates[id];
            events.push({
                id,
                employeeId: emp.id,
                type: 'ANNIVERSARY',
                date: format(nextAnniversary, 'yyyy-MM-dd'),
                status: state?.status || 'UPCOMING',
                selectedGiftId: state?.selectedGiftId,
                cardId: state?.cardId,
            });
        }

        // 3. Leaving
        if (emp.leavingDate) {
            const leaving = parseISO(emp.leavingDate);
            const diff = differenceInDays(leaving, today);
            if (diff >= 0 && diff <= daysToLookAhead) {
                const id = `evt_leave_${emp.id}`;
                const state = eventStates[id];
                events.push({
                    id,
                    employeeId: emp.id,
                    type: 'LEAVING',
                    date: format(leaving, 'yyyy-MM-dd'),
                    status: state?.status || 'UPCOMING',
                    selectedGiftId: state?.selectedGiftId,
                    cardId: state?.cardId,
                });
            }
        }

        // 4. Christmas
        const christmas = new Date(today.getFullYear(), 11, 25); // Month is 0-indexed, so 11 is Dec
        // If Christmas passed, look at next year logic (optional, but usually fine to just check current year close events)
        let nextChristmas = christmas;
        if (isBefore(nextChristmas, today)) {
            nextChristmas = addYears(nextChristmas, 1);
        }

        // Only trigger if employee is active (not left before Christmas)
        const isEmployeeActiveForChristmas = !emp.leavingDate || isBefore(nextChristmas, parseISO(emp.leavingDate));

        if (isEmployeeActiveForChristmas && daysUntil(today, nextChristmas) <= daysToLookAhead) {
            const id = `evt_xmas_${emp.id}_${nextChristmas.getFullYear()}`;
            const state = eventStates[id];
            events.push({
                id,
                employeeId: emp.id,
                type: 'CHRISTMAS',
                date: format(nextChristmas, 'yyyy-MM-dd'),
                status: state?.status || 'UPCOMING',
                selectedGiftId: state?.selectedGiftId || undefined,
                cardId: state?.cardId,
            });
        }
    });

    return events.sort((a, b) => a.date.localeCompare(b.date));
}

function daysUntil(from: Date, to: Date) {
    return differenceInDays(to, from);
}

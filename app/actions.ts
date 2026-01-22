'use server';

import { revalidatePath } from 'next/cache';
import {
    createEmployee,
    deleteEmployee as deleteEmp,
    updateEmployee as updateEmp,
    getEventState,
    updateEventState,
    createCard as createDbCard,
    getCard,
    addSignature,
    getAppData
} from './lib/db'; // We might not need getAppData here anymore if we fully granularize
import { Employee, Card, EventState } from './lib/types';

export async function addEmployee(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const dob = formData.get('dob') as string;
    const startDate = formData.get('startDate') as string;
    const department = formData.get('department') as string;

    const newEmployee: Employee = {
        id: crypto.randomUUID(),
        name,
        email,
        dateOfBirth: dob,
        startDate,
        department,
    };

    await createEmployee(newEmployee);
    revalidatePath('/');
    return { success: true };
}

export async function deleteEmployee(id: string) {
    await deleteEmp(id);
    revalidatePath('/');
    return { success: true };
}

export async function selectGift(eventId: string, giftId: string) {
    let state = await getEventState(eventId);

    if (!state) {
        state = { id: eventId, status: 'PENDING_ACTION' };
    }

    state.selectedGiftId = giftId;
    state.status = 'COMPLETED';

    await updateEventState(state);
    revalidatePath('/');
    return { success: true };
}

export async function createCard(eventId: string, recipientName: string) {
    const cardId = crypto.randomUUID();

    // Create new card
    const newCard: Card = {
        id: cardId,
        eventId,
        recipientName,
        title: `Happy occasion for ${recipientName}!`,
        signatures: [],
        status: 'DRAFT',
    };

    // We transactionally update card and event link in db.ts if we wanted, 
    // but here we can do it: create card, then update event state.
    // However, I didn't verify if `createDbCard` updates event state in `db.ts`. 
    // Wait, I put logic in `createCard` in `db.ts` to update event state!
    // So I just need to call `createDbCard`.

    // Double check logic in db.ts:
    // It runs: INSERT INTO cards ... AND UPDATE event_states ...
    // BUT what if event_states doesnt exist yet?
    // Often event state is created on demand (like in selectGift).
    // If we create a card for an event that hasn't been "touched" (no state row),
    // the UPDATE will match 0 rows.
    // So we should ensure event state exists first.

    let state = await getEventState(eventId);
    if (!state) {
        state = { id: eventId, status: 'PENDING_ACTION' };
        await updateEventState(state);
    }

    // Now create card (which updates event state cardId)
    await createDbCard(newCard);

    revalidatePath('/');
    return { success: true, cardId };
}

export async function signCard(cardId: string, formData: FormData) {
    const name = formData.get('name') as string;
    const message = formData.get('message') as string;

    if (!name || !message) return { success: false, error: 'Missing fields' };

    const card = await getCard(cardId);
    if (!card) return { success: false, error: 'Card not found' };

    await addSignature(cardId, {
        id: crypto.randomUUID(),
        name,
        message,
        createdAt: new Date().toISOString(),
    });

    revalidatePath(`/card/${cardId}`);
    return { success: true };
}

export async function updateEmployee(id: string, formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const dob = formData.get('dob') as string;
    const startDate = formData.get('startDate') as string;
    const department = formData.get('department') as string;
    const leavingDate = formData.get('leavingDate') as string;

    // Use getAppData to get emp? Or add getEmployee(id)
    // For now I can filter from getAppData or just add getEmployee
    // Let's rely on basic update logic: construct object.

    // We need existing object to keep ID and maybe other fields if they existed?
    // But `updateEmployee` in db.ts takes the whole object.
    // So we need to fetch it first.

    const data = await getAppData();
    // This is inefficient but compatible with previous pattern if I don't add getEmployee.
    // Note: getAppData queries ALL. I should adding getEmployee(id) is better.
    // For now, let's use getAppData because I didn't add getEmployee(id) to imports yet,
    // but I did add `getEmployees` which returns list. 
    // Wait, let's just add `getEmployee` to db.ts real quick? 
    // I can do it in next step or just use what I have. 
    // Using getAppData() is "safe" but slow. 
    // Actually, `updateEmp` takes `Employee`.

    const employee = data.employees.find((emp) => emp.id === id);

    if (employee) {
        employee.name = name;
        employee.email = email;
        employee.dateOfBirth = dob;
        employee.startDate = startDate;
        employee.department = department;
        employee.leavingDate = leavingDate || undefined;

        await updateEmp(employee);
    }

    revalidatePath('/');
    return { success: true };
}

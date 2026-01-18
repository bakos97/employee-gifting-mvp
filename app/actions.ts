'use server';

import { revalidatePath } from 'next/cache';
import { getAppData, saveAppData } from './lib/db';
import { Employee, Card } from './lib/types';

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

    const data = await getAppData();
    data.employees.push(newEmployee);
    await saveAppData(data);
    revalidatePath('/');
    return { success: true };
}

export async function deleteEmployee(id: string) {
    const data = await getAppData();
    data.employees = data.employees.filter((emp) => emp.id !== id);
    await saveAppData(data);
    revalidatePath('/');
    return { success: true };
}

export async function selectGift(eventId: string, giftId: string) {
    const data = await getAppData();

    if (!data.eventStates[eventId]) {
        data.eventStates[eventId] = { id: eventId, status: 'PENDING_ACTION' };
    }

    data.eventStates[eventId].selectedGiftId = giftId;
    data.eventStates[eventId].status = 'COMPLETED';

    await saveAppData(data);
    revalidatePath('/');
    return { success: true };
}

export async function createCard(eventId: string, recipientName: string) {
    const data = await getAppData();
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

    data.cards.push(newCard);

    // Link to event
    if (!data.eventStates[eventId]) {
        data.eventStates[eventId] = { id: eventId, status: 'PENDING_ACTION' };
    }
    data.eventStates[eventId].cardId = cardId;

    await saveAppData(data);
    revalidatePath('/');
    return { success: true, cardId };
}

export async function signCard(cardId: string, formData: FormData) {
    const name = formData.get('name') as string;
    const message = formData.get('message') as string;

    if (!name || !message) return { success: false, error: 'Missing fields' };

    const data = await getAppData();
    const card = data.cards.find(c => c.id === cardId);

    if (!card) return { success: false, error: 'Card not found' };

    card.signatures.push({
        id: crypto.randomUUID(),
        name,
        message,
        createdAt: new Date().toISOString(),
    });

    await saveAppData(data);
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

    const data = await getAppData();
    const employee = data.employees.find((emp) => emp.id === id);

    if (employee) {
        employee.name = name;
        employee.email = email;
        employee.dateOfBirth = dob;
        employee.startDate = startDate;
        employee.department = department;
        employee.leavingDate = leavingDate || undefined;
    }

    await saveAppData(data);
    revalidatePath('/');
    return { success: true };
}

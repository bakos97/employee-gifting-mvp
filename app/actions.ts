'use server';

import { revalidatePath } from 'next/cache';
import {
    createEmployee,
    deleteEmployee as deleteEmp,
    updateEmployee as updateEmp,
    getEventState,
    updateEventState,
    createPage,
    getAppData
} from './lib/db';
import { Employee, CelebrationPage, EventState } from './lib/types';
import { redirect } from 'next/navigation';

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
    revalidatePath('/', 'layout');
    return { success: true };
}

export async function deleteEmployee(id: string) {
    await deleteEmp(id);
    revalidatePath('/');
    return { success: true };
}

export async function createCelebrationPage(
    employeeId: string,
    eventId: string,
    templateId: 'classic' | 'modern',
    content: CelebrationPage['content']
) {
    const pageId = crypto.randomUUID();
    // Simple slug generator: firstname-eventtype-year or just random
    // Ideally user sets slug, or we auto-gen.
    // Let's allow slug to be passed or auto-gen. 
    // For MVP: employeeName-event (we need employee name).
    // Let's just use unique ID based slug for now or let caller handle it.
    // I'll grab employee name from DB or assume caller passes slug.
    // Let's infer slug from content.heroTitle for now or random.
    const slug = `${content.heroTitle.split(' ')[0].toLowerCase()}-${Math.floor(Math.random() * 1000)}`;

    const newPage: CelebrationPage = {
        id: pageId,
        employeeId,
        slug,
        templateId,
        status: 'PUBLISHED', // Direct publish for MVP
        content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    await createPage(newPage);

    // Update Event State
    let state = await getEventState(eventId);
    if (!state) {
        state = { id: eventId, status: 'PENDING_ACTION' };
    }
    state.pageId = pageId;
    state.status = 'COMPLETED';

    await updateEventState(state);

    revalidatePath('/', 'layout');
    return { success: true, slug };
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

        await updateEmp(employee);
    }

    revalidatePath('/', 'layout');
    return { success: true };
}

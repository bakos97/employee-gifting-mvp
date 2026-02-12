'use server';

import { revalidatePath } from 'next/cache';
import {
  createEmployee as dbCreate,
  updateEmployee as dbUpdate,
  deleteEmployee as dbDelete,
} from '../lib/db/employees';

export async function addEmployee(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const date_of_birth = formData.get('dob') as string;
  const start_date = formData.get('startDate') as string;
  const department = (formData.get('department') as string) || null;

  await dbCreate({
    name,
    email,
    date_of_birth,
    start_date,
    department,
  });

  revalidatePath('/', 'layout');
  return { success: true };
}

export async function updateEmployee(id: string, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const date_of_birth = formData.get('dob') as string;
  const start_date = formData.get('startDate') as string;
  const department = (formData.get('department') as string) || null;
  const leaving_date = (formData.get('leavingDate') as string) || null;

  await dbUpdate(id, {
    name,
    email,
    date_of_birth,
    start_date,
    department,
    leaving_date,
  });

  revalidatePath('/', 'layout');
  return { success: true };
}

export async function deleteEmployee(id: string) {
  await dbDelete(id);
  revalidatePath('/', 'layout');
  return { success: true };
}

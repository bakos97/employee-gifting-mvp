'use server';

import { revalidatePath } from 'next/cache';
import {
  createCelebration as dbCreate,
  updateCelebrationStatus as dbUpdateStatus,
  deleteCelebration as dbDelete,
} from '../lib/db/celebrations';
import { createQuestions } from '../lib/db/questions';
import { getDefaultQuestions } from '../lib/default-questions';
import { CelebrationType, CelebrationStatus } from '../lib/types';

export async function createCelebration(formData: {
  employee_id: string;
  type: CelebrationType;
  custom_type_label?: string;
  title: string;
  description?: string;
  event_date?: string;
  questions: { text: string; allow_image: boolean; is_required: boolean }[];
}) {
  const shareToken = crypto.randomUUID().slice(0, 10);

  const celebration = await dbCreate({
    employee_id: formData.employee_id,
    type: formData.type,
    custom_type_label: formData.custom_type_label || null,
    title: formData.title,
    description: formData.description || null,
    event_date: formData.event_date || null,
    status: 'draft',
    share_token: shareToken,
  });

  // Create questions
  if (formData.questions.length > 0) {
    await createQuestions(
      formData.questions.map((q, i) => ({
        celebration_id: celebration.id,
        text: q.text,
        sort_order: i,
        allow_image: q.allow_image,
        is_required: q.is_required,
      }))
    );
  }

  revalidatePath('/', 'layout');
  return { success: true, id: celebration.id };
}

export async function updateCelebrationStatus(id: string, status: CelebrationStatus) {
  await dbUpdateStatus(id, status);
  revalidatePath('/', 'layout');
  return { success: true };
}

export async function deleteCelebration(id: string) {
  await dbDelete(id);
  revalidatePath('/', 'layout');
  return { success: true };
}

export async function getDefaultQuestionsForType(type: CelebrationType, employeeName: string) {
  const templates = getDefaultQuestions(type);
  return templates.map(q => ({
    text: q.text.replace(/\{name\}/g, employeeName),
    allow_image: q.allow_image,
    is_required: q.is_required,
  }));
}

'use server';

import { revalidatePath } from 'next/cache';
import { updateQuestions as dbUpdate } from '../lib/db/questions';

export async function updateQuestions(
  celebrationId: string,
  questions: { id?: string; text: string; sort_order: number; allow_image: boolean; is_required: boolean }[]
) {
  await dbUpdate(celebrationId, questions);
  revalidatePath('/', 'layout');
  return { success: true };
}

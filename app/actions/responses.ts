'use server';

import { revalidatePath } from 'next/cache';
import { createResponses } from '../lib/db/responses';
import { uploadImage } from '../lib/db/storage';

export async function submitContribution(formData: FormData) {
  const celebrationId = formData.get('celebration_id') as string;
  const contributorName = formData.get('contributor_name') as string;
  const contributorEmail = (formData.get('contributor_email') as string) || null;

  if (!celebrationId || !contributorName) {
    return { success: false, error: 'Mangler påkrevde felt' };
  }

  // Parse question responses from formData
  // Questions are sent as: q_{questionId}_text, q_{questionId}_image
  const responses: { question_id: string; text_response: string | null; image_url: string | null }[] = [];

  const questionIds = formData.getAll('question_ids') as string[];

  for (const qId of questionIds) {
    const textResponse = (formData.get(`q_${qId}_text`) as string) || null;
    const imageFile = formData.get(`q_${qId}_image`) as File | null;

    let imageUrl: string | null = null;

    if (imageFile && imageFile.size > 0) {
      try {
        // Generate a temporary response ID for storage path
        const tempId = crypto.randomUUID();
        imageUrl = await uploadImage(celebrationId, tempId, imageFile);
      } catch (err) {
        console.error('Image upload failed:', err);
      }
    }

    if (textResponse || imageUrl) {
      responses.push({
        question_id: qId,
        text_response: textResponse,
        image_url: imageUrl,
      });
    }
  }

  if (responses.length === 0) {
    return { success: false, error: 'Vennligst svar på minst ett spørsmål' };
  }

  await createResponses(
    responses.map(r => ({
      question_id: r.question_id,
      celebration_id: celebrationId,
      contributor_name: contributorName,
      contributor_email: contributorEmail,
      text_response: r.text_response,
      image_url: r.image_url,
    }))
  );

  revalidatePath('/', 'layout');
  return { success: true };
}

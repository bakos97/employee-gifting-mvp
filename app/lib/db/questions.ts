import { createClient } from '../supabase/server';
import { Question } from '../types';

export async function getQuestions(celebrationId: string): Promise<Question[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .eq('celebration_id', celebrationId)
    .order('sort_order');

  if (error) throw error;
  return data ?? [];
}

export async function createQuestions(questions: Omit<Question, 'id' | 'created_at'>[]): Promise<Question[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('questions')
    .insert(questions)
    .select();

  if (error) throw error;
  return data ?? [];
}

export async function updateQuestions(
  celebrationId: string,
  questions: { id?: string; text: string; sort_order: number; allow_image: boolean; is_required: boolean }[]
): Promise<void> {
  const supabase = await createClient();

  // Delete existing questions for this celebration
  await supabase
    .from('questions')
    .delete()
    .eq('celebration_id', celebrationId);

  // Insert the updated set
  if (questions.length > 0) {
    const { error } = await supabase
      .from('questions')
      .insert(
        questions.map((q) => ({
          celebration_id: celebrationId,
          text: q.text,
          sort_order: q.sort_order,
          allow_image: q.allow_image,
          is_required: q.is_required,
        }))
      );

    if (error) throw error;
  }
}

export async function deleteQuestion(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from('questions')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

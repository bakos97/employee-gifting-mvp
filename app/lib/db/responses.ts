import { createClient } from '../supabase/server';
import { Response } from '../types';

export async function getResponses(celebrationId: string): Promise<Response[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('responses')
    .select('*')
    .eq('celebration_id', celebrationId)
    .order('created_at');

  if (error) throw error;
  return data ?? [];
}

export async function getResponsesByQuestion(questionId: string): Promise<Response[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('responses')
    .select('*')
    .eq('question_id', questionId)
    .order('created_at');

  if (error) throw error;
  return data ?? [];
}

export async function createResponse(response: Omit<Response, 'id' | 'created_at'>): Promise<Response> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('responses')
    .insert(response)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function createResponses(responses: Omit<Response, 'id' | 'created_at'>[]): Promise<Response[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('responses')
    .insert(responses)
    .select();

  if (error) throw error;
  return data ?? [];
}

export async function getContributorCount(celebrationId: string): Promise<number> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('responses')
    .select('contributor_name')
    .eq('celebration_id', celebrationId);

  const unique = new Set(data?.map(r => r.contributor_name) ?? []);
  return unique.size;
}

export async function getResponseCount(celebrationId: string): Promise<number> {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from('responses')
    .select('*', { count: 'exact', head: true })
    .eq('celebration_id', celebrationId);

  if (error) throw error;
  return count ?? 0;
}

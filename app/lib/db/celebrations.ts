import { createClient } from '../supabase/server';
import { Celebration, CelebrationWithDetails, CelebrationStatus } from '../types';

export async function getCelebrations(): Promise<CelebrationWithDetails[]> {
  const supabase = await createClient();

  const { data: celebrations, error } = await supabase
    .from('celebrations')
    .select(`
      *,
      employee:employees(*),
      questions(*)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;

  const enriched: CelebrationWithDetails[] = [];

  for (const c of celebrations ?? []) {
    const { count: responseCount } = await supabase
      .from('responses')
      .select('*', { count: 'exact', head: true })
      .eq('celebration_id', c.id);

    const { data: contributors } = await supabase
      .from('responses')
      .select('contributor_name')
      .eq('celebration_id', c.id);

    const uniqueContributors = new Set(contributors?.map(r => r.contributor_name) ?? []);

    enriched.push({
      ...c,
      employee: c.employee,
      questions: c.questions ?? [],
      response_count: responseCount ?? 0,
      contributor_count: uniqueContributors.size,
    });
  }

  return enriched;
}

export async function getCelebration(id: string): Promise<CelebrationWithDetails | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('celebrations')
    .select(`
      *,
      employee:employees(*),
      questions(*, responses:responses(*))
    `)
    .eq('id', id)
    .single();

  if (error) return null;

  const { count: responseCount } = await supabase
    .from('responses')
    .select('*', { count: 'exact', head: true })
    .eq('celebration_id', id);

  const { data: contributors } = await supabase
    .from('responses')
    .select('contributor_name')
    .eq('celebration_id', id);

  const uniqueContributors = new Set(contributors?.map(r => r.contributor_name) ?? []);

  return {
    ...data,
    employee: data.employee,
    questions: data.questions ?? [],
    response_count: responseCount ?? 0,
    contributor_count: uniqueContributors.size,
  };
}

export async function getCelebrationByToken(token: string): Promise<CelebrationWithDetails | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('celebrations')
    .select(`
      *,
      employee:employees(*),
      questions(*)
    `)
    .eq('share_token', token)
    .single();

  if (error) return null;

  const { count: responseCount } = await supabase
    .from('responses')
    .select('*', { count: 'exact', head: true })
    .eq('celebration_id', data.id);

  const { data: contributors } = await supabase
    .from('responses')
    .select('contributor_name')
    .eq('celebration_id', data.id);

  const uniqueContributors = new Set(contributors?.map(r => r.contributor_name) ?? []);

  return {
    ...data,
    employee: data.employee,
    questions: data.questions ?? [],
    response_count: responseCount ?? 0,
    contributor_count: uniqueContributors.size,
  };
}

export async function createCelebration(celebration: Omit<Celebration, 'id' | 'created_at' | 'updated_at'>): Promise<Celebration> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('celebrations')
    .insert(celebration)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateCelebrationStatus(id: string, status: CelebrationStatus): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from('celebrations')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) throw error;
}

export async function deleteCelebration(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from('celebrations')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

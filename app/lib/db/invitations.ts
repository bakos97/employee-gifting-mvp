import { createClient } from '../supabase/server';
import { Invitation, InvitationWithEmployee, InvitationStatus } from '../types';

export async function getInvitationsForCelebration(celebrationId: string): Promise<InvitationWithEmployee[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('invitations')
    .select('*, employee:employees(*)')
    .eq('celebration_id', celebrationId)
    .order('created_at');

  if (error) throw error;
  return data ?? [];
}

export async function createInvitations(
  records: Omit<Invitation, 'id' | 'created_at' | 'sent_at' | 'reminder_sent_at' | 'error_message'>[]
): Promise<Invitation[]> {
  if (records.length === 0) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('invitations')
    .upsert(records, { onConflict: 'celebration_id,employee_id', ignoreDuplicates: true })
    .select();

  if (error) throw error;
  return data ?? [];
}

export async function updateInvitationStatus(
  id: string,
  status: InvitationStatus,
  errorMessage?: string
): Promise<void> {
  const supabase = await createClient();
  const updates: Record<string, unknown> = { status };

  if (status === 'sent') {
    updates.sent_at = new Date().toISOString();
  }
  if (errorMessage !== undefined) {
    updates.error_message = errorMessage;
  }

  const { error } = await supabase
    .from('invitations')
    .update(updates)
    .eq('id', id);

  if (error) throw error;
}

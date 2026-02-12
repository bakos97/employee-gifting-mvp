'use server';

import { revalidatePath } from 'next/cache';
import { getCelebration } from '../lib/db/celebrations';
import { getEmployees } from '../lib/db/employees';
import { getInvitationsForCelebration, createInvitations, updateInvitationStatus } from '../lib/db/invitations';
import { getResendClient } from '../lib/email/resend';
import { getInvitationEmailHtml, getInvitationEmailSubject } from '../lib/email/templates/invitation';
import { CelebrationType } from '../lib/types';

const celebrationTypeLabels: Record<CelebrationType, string> = {
  birthday: 'bursdag',
  anniversary: 'jubileum',
  farewell: 'avskjed',
  custom: 'feiring',
};

function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
}

export async function sendInvitations(celebrationId: string): Promise<{
  sent: number;
  failed: number;
  skipped: number;
}> {
  const celebration = await getCelebration(celebrationId);
  if (!celebration) {
    throw new Error('Feiring ikke funnet');
  }
  if (celebration.status !== 'collecting') {
    throw new Error('Feiringen må ha status "samler inn" for å sende invitasjoner');
  }

  const allEmployees = await getEmployees();
  const eligibleEmployees = allEmployees.filter(e => e.id !== celebration.employee_id);

  const existingInvitations = await getInvitationsForCelebration(celebrationId);
  const alreadyInvitedIds = new Set(existingInvitations.map(inv => inv.employee_id));

  const newEmployees = eligibleEmployees.filter(e => !alreadyInvitedIds.has(e.id));

  if (newEmployees.length === 0) {
    return { sent: 0, failed: 0, skipped: eligibleEmployees.length };
  }

  // Create invitation records
  const newInvitations = await createInvitations(
    newEmployees.map(e => ({
      celebration_id: celebrationId,
      employee_id: e.id,
      email: e.email,
      status: 'pending' as const,
    }))
  );

  const resend = getResendClient();
  const siteUrl = getSiteUrl();
  const contributeUrl = `${siteUrl}/contribute/${celebration.share_token}`;
  const celebrationType = celebration.type === 'custom' && celebration.custom_type_label
    ? celebration.custom_type_label.toLowerCase()
    : celebrationTypeLabels[celebration.type];

  let sent = 0;
  let failed = 0;

  for (const invitation of newInvitations) {
    const employee = newEmployees.find(e => e.id === invitation.employee_id);
    if (!employee) continue;

    const firstName = employee.name.split(' ')[0];

    try {
      await resend.emails.send({
        from: 'Feiring <onboarding@resend.dev>',
        to: [invitation.email],
        subject: getInvitationEmailSubject(celebration.employee.name),
        html: getInvitationEmailHtml({
          recipientFirstName: firstName,
          employeeName: celebration.employee.name,
          celebrationType,
          contributeUrl,
        }),
      });

      await updateInvitationStatus(invitation.id, 'sent');
      sent++;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ukjent feil';
      await updateInvitationStatus(invitation.id, 'failed', errorMessage);
      failed++;
    }
  }

  const skipped = eligibleEmployees.length - newEmployees.length;

  revalidatePath(`/celebrations/${celebrationId}`);
  return { sent, failed, skipped };
}

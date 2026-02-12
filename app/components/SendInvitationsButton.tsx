'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { sendInvitations } from '../actions/invitations';
import { InvitationWithEmployee, CelebrationStatus } from '../lib/types';
import { Mail, CheckCircle2, XCircle, Clock, Loader2, Send } from 'lucide-react';

interface Props {
  celebrationId: string;
  celebrationStatus: CelebrationStatus;
  invitations: InvitationWithEmployee[];
  eligibleCount: number;
}

export function SendInvitationsButton({ celebrationId, celebrationStatus, invitations, eligibleCount }: Props) {
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ sent: number; failed: number; skipped: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (celebrationStatus !== 'collecting') return null;

  const sentCount = invitations.filter(i => i.status === 'sent').length;
  const failedCount = invitations.filter(i => i.status === 'failed').length;
  const pendingCount = invitations.filter(i => i.status === 'pending').length;
  const hasInvitations = invitations.length > 0;
  const allInvited = hasInvitations && invitations.length >= eligibleCount;

  async function handleSend() {
    if (!confirm(`Sende invitasjoner til ${eligibleCount - invitations.length} kollegaer?`)) return;

    setSending(true);
    setError(null);
    setResult(null);

    try {
      const res = await sendInvitations(celebrationId);
      setResult(res);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Noe gikk galt');
    } finally {
      setSending(false);
    }
  }

  const statusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const statusLabel = (status: string) => {
    switch (status) {
      case 'sent': return 'Sendt';
      case 'failed': return 'Feilet';
      default: return 'Venter';
    }
  };

  return (
    <div className="nord-card rounded-2xl p-6 space-y-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Mail className="w-4 h-4 text-amber-400" />
        E-postinvitasjoner
      </div>

      {/* Summary */}
      {hasInvitations && (
        <p className="text-sm text-muted-foreground">
          {sentCount} av {eligibleCount} kollegaer invitert
          {failedCount > 0 && <span className="text-red-400"> ({failedCount} feilet)</span>}
          {pendingCount > 0 && <span> ({pendingCount} venter)</span>}
        </p>
      )}

      {/* Send button */}
      {!allInvited && (
        <button
          onClick={handleSend}
          disabled={sending}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl bg-amber-500 hover:bg-amber-400 text-white transition-all disabled:opacity-50"
        >
          {sending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sender...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              {hasInvitations ? 'Send til nye kollegaer' : 'Send invitasjoner'}
            </>
          )}
        </button>
      )}

      {/* Result message */}
      {result && (
        <div className="text-sm p-3 rounded-xl bg-surface border border-border">
          {result.sent > 0 && <p className="text-emerald-400">{result.sent} invitasjon{result.sent > 1 ? 'er' : ''} sendt</p>}
          {result.failed > 0 && <p className="text-red-400">{result.failed} feilet</p>}
          {result.skipped > 0 && <p className="text-muted-foreground">{result.skipped} allerede invitert</p>}
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="text-sm p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
          {error}
        </div>
      )}

      {/* Invitation list */}
      {hasInvitations && (
        <div className="space-y-2 pt-2 border-t border-border">
          {invitations.map(inv => (
            <div key={inv.id} className="flex items-center gap-3 text-sm">
              {statusIcon(inv.status)}
              <span className="text-foreground">{inv.employee.name}</span>
              <span className="text-muted-foreground text-xs">{inv.email}</span>
              <span className="ml-auto text-xs text-muted-foreground">{statusLabel(inv.status)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

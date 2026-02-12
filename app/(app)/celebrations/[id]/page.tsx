import { getCelebration } from '@/app/lib/db/celebrations';
import { getResponses } from '@/app/lib/db/responses';
import { notFound } from 'next/navigation';
import { CelebrationTypeBadge } from '@/app/components/CelebrationTypeBadge';
import { CelebrationStatusBadge } from '@/app/components/CelebrationStatusBadge';
import { CelebrationAdminActions } from '@/app/components/CelebrationAdminActions';
import { ShareButton } from '@/app/components/ShareButton';
import { MessageSquare, Users, Eye, Link as LinkIcon } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function CelebrationDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const celebration = await getCelebration(params.id);

  if (!celebration) return notFound();

  const responses = await getResponses(celebration.id);
  const contributorNames = [...new Set(responses.map(r => r.contributor_name))];

  const shareUrl = `/contribute/${celebration.share_token}`;
  const tributeUrl = `/tribute/${celebration.id}`;

  return (
    <div className="max-w-4xl space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <CelebrationTypeBadge type={celebration.type} customLabel={celebration.custom_type_label} size="md" />
          <CelebrationStatusBadge status={celebration.status} />
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-foreground" style={{ fontFamily: 'var(--font-playfair)' }}>
          {celebration.title}
        </h1>

        <p className="text-muted-foreground">
          For <span className="text-foreground font-semibold">{celebration.employee.name}</span>
          {celebration.event_date && ` \u00b7 ${celebration.event_date}`}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="nord-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center">
              <MessageSquare className="w-4.5 h-4.5 text-amber-400" />
            </div>
            <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">Svar</span>
          </div>
          <div className="text-3xl font-bold text-foreground" style={{ fontFamily: 'var(--font-playfair)' }}>
            {celebration.response_count}
          </div>
        </div>

        <div className="nord-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center">
              <Users className="w-4.5 h-4.5 text-amber-400" />
            </div>
            <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">Bidragsytere</span>
          </div>
          <div className="text-3xl font-bold text-foreground" style={{ fontFamily: 'var(--font-playfair)' }}>
            {celebration.contributor_count}
          </div>
        </div>

        <div className="nord-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center">
              <Eye className="w-4.5 h-4.5 text-amber-400" />
            </div>
            <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">Spørsmål</span>
          </div>
          <div className="text-3xl font-bold text-foreground" style={{ fontFamily: 'var(--font-playfair)' }}>
            {celebration.questions.length}
          </div>
        </div>
      </div>

      <div className="editorial-line" />

      {/* Actions */}
      <CelebrationAdminActions celebration={celebration} />

      {/* Share link */}
      <div className="nord-card rounded-2xl p-6 space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <LinkIcon className="w-4 h-4 text-amber-400" />
          Delingslenke for bidragsytere
        </div>
        <div className="flex items-center gap-3">
          <code className="flex-1 px-4 py-2.5 bg-surface rounded-xl text-sm text-muted-foreground border border-border truncate">
            {typeof window !== 'undefined' ? window.location.origin : ''}{shareUrl}
          </code>
          <ShareButton url={shareUrl} />
        </div>
        {celebration.status === 'published' && (
          <div className="pt-3 border-t border-border">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
              <Eye className="w-4 h-4 text-amber-400" />
              Tribute-side
            </div>
            <div className="flex items-center gap-3">
              <code className="flex-1 px-4 py-2.5 bg-surface rounded-xl text-sm text-muted-foreground border border-border truncate">
                {typeof window !== 'undefined' ? window.location.origin : ''}{tributeUrl}
              </code>
              <ShareButton url={tributeUrl} />
            </div>
          </div>
        )}
      </div>

      {/* Response preview */}
      {responses.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground" style={{ fontFamily: 'var(--font-playfair)' }}>
            Innsendte svar
          </h2>

          <div className="space-y-3">
            {contributorNames.map(name => {
              const contributorResponses = responses.filter(r => r.contributor_name === name);
              return (
                <div key={name} className="nord-card rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 font-semibold text-xs">
                      {name.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-foreground">{name}</span>
                    <span className="text-xs text-muted-foreground">{contributorResponses.length} svar</span>
                  </div>
                  <div className="space-y-2">
                    {contributorResponses.map(r => (
                      <div key={r.id} className="text-sm text-muted-foreground">
                        {r.text_response && (
                          <p className="italic">&ldquo;{r.text_response}&rdquo;</p>
                        )}
                        {r.image_url && (
                          <div className="mt-2 w-20 h-20 rounded-lg overflow-hidden bg-surface border border-border">
                            <img src={r.image_url} alt="" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

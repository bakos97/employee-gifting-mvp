import { getCelebrationByToken } from '@/app/lib/db/celebrations';
import { ContributionForm } from '@/app/components/ContributionForm';
import { notFound } from 'next/navigation';
import { CelebrationTypeBadge } from '@/app/components/CelebrationTypeBadge';
import { Heart, Clock, CheckCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ContributePage(props: { params: Promise<{ token: string }> }) {
  const params = await props.params;
  const celebration = await getCelebrationByToken(params.token);

  if (!celebration) return notFound();

  // If not collecting, show appropriate message
  if (celebration.status !== 'collecting') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center max-w-md space-y-6">
          <div className="w-20 h-20 bg-surface rounded-3xl border border-border flex items-center justify-center mx-auto">
            {celebration.status === 'draft' ? (
              <Clock className="w-10 h-10 text-muted-foreground" />
            ) : (
              <CheckCircle className="w-10 h-10 text-emerald-400" />
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
              {celebration.status === 'draft'
                ? 'Feiringen er ikke startet ennå'
                : celebration.status === 'published'
                  ? 'Feiringen er allerede publisert'
                  : 'Feiringen er arkivert'}
            </h1>
            <p className="text-muted-foreground">
              {celebration.status === 'draft'
                ? 'Sjekk tilbake litt senere!'
                : `Tributen til ${celebration.employee.name} er allerede ferdig.`}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero header */}
      <div className="relative py-16 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="flex items-center justify-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
              <Heart className="w-5 h-5 text-[hsl(220_16%_8%)]" />
            </div>
          </div>

          <CelebrationTypeBadge type={celebration.type} customLabel={celebration.custom_type_label} size="md" />

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground" style={{ fontFamily: 'var(--font-playfair)' }}>
            {celebration.title}
          </h1>

          {celebration.description && (
            <p className="text-lg text-muted-foreground max-w-lg mx-auto">
              {celebration.description}
            </p>
          )}

          <p className="text-muted-foreground">
            Del dine tanker og minner om <span className="text-amber-400 font-semibold">{celebration.employee.name}</span>
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-6 pb-20">
        <ContributionForm celebration={celebration} />
      </div>
    </div>
  );
}

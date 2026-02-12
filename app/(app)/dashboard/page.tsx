import { getCelebrations } from '@/app/lib/db/celebrations';
import { getEmployees } from '@/app/lib/db/employees';
import { CelebrationCard } from '@/app/components/CelebrationCard';
import { Users, PartyPopper, MessageSquare, Plus } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const [celebrations, employees] = await Promise.all([
    getCelebrations(),
    getEmployees(),
  ]);

  const activeCelebrations = celebrations.filter(c => c.status !== 'archived');
  const totalResponses = celebrations.reduce((sum, c) => sum + c.response_count, 0);

  return (
    <div className="space-y-10 max-w-6xl">

      {/* Header */}
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-amber-400 font-semibold">Oversikt</p>
        <h1 className="text-4xl font-bold tracking-tight text-foreground" style={{ fontFamily: 'var(--font-playfair)' }}>
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Du har <span className="text-amber-400 font-semibold">{activeCelebrations.length}</span> aktive feiringer.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Users, label: "Teamstørrelse", value: employees.length.toString(), sub: "ansatte" },
          { icon: PartyPopper, label: "Aktive feiringer", value: activeCelebrations.length.toString(), sub: "pågående" },
          { icon: MessageSquare, label: "Bidrag totalt", value: totalResponses.toString(), sub: "svar mottatt" },
        ].map((stat, idx) => (
          <div key={idx} className="nord-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center">
                <stat.icon className="w-4.5 h-4.5 text-amber-400" />
              </div>
              <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">{stat.label}</span>
            </div>
            <div className="text-3xl font-bold text-foreground" style={{ fontFamily: 'var(--font-playfair)' }}>
              {stat.value}
            </div>
            <div className="text-xs text-muted-foreground mt-1">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="editorial-line" />

      {/* Quick action */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground" style={{ fontFamily: 'var(--font-playfair)' }}>
          Feiringer
        </h2>
        <Link
          href="/celebrations/new"
          className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-white text-sm font-semibold rounded-xl hover:bg-amber-400 transition-all"
        >
          <Plus className="w-4 h-4" />
          Ny feiring
        </Link>
      </div>

      {/* Celebrations grid */}
      {activeCelebrations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeCelebrations.map(c => (
            <CelebrationCard key={c.id} celebration={c} />
          ))}
        </div>
      ) : (
        <div className="nord-card rounded-2xl p-16 text-center">
          <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/15 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <PartyPopper className="w-7 h-7 text-amber-400" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
            Ingen feiringer ennå
          </h3>
          <p className="text-muted-foreground mb-6">Opprett din første hyllest og la teamet dele fine ord.</p>
          <Link
            href="/celebrations/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-400 transition-all"
          >
            <Plus className="w-4 h-4" />
            Opprett feiring
          </Link>
        </div>
      )}
    </div>
  );
}

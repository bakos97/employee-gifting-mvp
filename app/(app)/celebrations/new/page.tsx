import { CelebrationWizard } from '@/app/components/CelebrationWizard';
import { getEmployees } from '@/app/lib/db/employees';
import { PartyPopper } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function NewCelebrationPage() {
  const employees = await getEmployees();

  return (
    <div className="max-w-4xl space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-amber-400 font-semibold">Ny feiring</p>
        <h1 className="text-4xl font-bold tracking-tight text-foreground" style={{ fontFamily: 'var(--font-playfair)' }}>
          Opprett tribute
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Lag en personlig tribute-side der kollegaer kan dele minner, hilsener og bilder.
        </p>
      </div>

      <div className="editorial-line" />

      <CelebrationWizard employees={employees} />
    </div>
  );
}

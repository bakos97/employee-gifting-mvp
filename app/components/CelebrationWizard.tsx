'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Cake, Award, LogOut, Sparkles, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { Employee, CelebrationType } from '../lib/types';
import { QuestionList } from './QuestionList';
import { createCelebration, getDefaultQuestionsForType } from '../actions/celebrations';
import { cn } from '../lib/utils';

interface CelebrationWizardProps {
  employees: Employee[];
}

const celebrationTypes: { type: CelebrationType; label: string; icon: typeof Cake; desc: string }[] = [
  { type: 'birthday', label: 'Bursdag', icon: Cake, desc: 'Feir en kollegas bursdag' },
  { type: 'anniversary', label: 'Jubileum', icon: Award, desc: 'Marker et arbeidsjubileum' },
  { type: 'farewell', label: 'Avskjed', icon: LogOut, desc: 'Si farvel til en kollega' },
  { type: 'custom', label: 'Egendefinert', icon: Sparkles, desc: 'Lag din egen feiring' },
];

interface QuestionItem {
  text: string;
  allow_image: boolean;
  is_required: boolean;
}

export function CelebrationWizard({ employees }: CelebrationWizardProps) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  // Step 0: Select employee
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  // Step 1: Pick type
  const [selectedType, setSelectedType] = useState<CelebrationType | ''>('');
  const [customLabel, setCustomLabel] = useState('');
  // Step 2: Configure questions
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [questions, setQuestions] = useState<QuestionItem[]>([]);

  const selectedEmployee = employees.find(e => e.id === selectedEmployeeId);

  async function handleTypeSelect(type: CelebrationType) {
    setSelectedType(type);
    if (selectedEmployee) {
      const defaults = await getDefaultQuestionsForType(type, selectedEmployee.name);
      setQuestions(defaults);

      // Auto-generate title
      const typeLabels: Record<CelebrationType, string> = {
        birthday: 'Bursdagsfeiring',
        anniversary: 'Jubileumsfeiring',
        farewell: 'Avskjedsfeiring',
        custom: 'Feiring',
      };
      setTitle(`${typeLabels[type]} for ${selectedEmployee.name}`);
    }
  }

  async function handleSubmit() {
    if (!selectedEmployeeId || !selectedType || !title || questions.length === 0) return;

    setLoading(true);
    try {
      const result = await createCelebration({
        employee_id: selectedEmployeeId,
        type: selectedType,
        custom_type_label: customLabel || undefined,
        title,
        description: description || undefined,
        event_date: eventDate || undefined,
        questions,
      });

      if (result.success) {
        router.push(`/celebrations/${result.id}`);
      }
    } finally {
      setLoading(false);
    }
  }

  const canProceed = [
    selectedEmployeeId !== '',
    selectedType !== '',
    title !== '' && questions.length > 0 && questions.every(q => q.text.trim() !== ''),
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Step indicator */}
      <div className="flex items-center gap-2">
        {['Velg ansatt', 'Type feiring', 'Spørsmål'].map((label, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all",
              i < step ? "bg-amber-500 text-white" :
              i === step ? "bg-amber-500/10 text-amber-400 border border-amber-500/30" :
              "bg-surface text-muted-foreground border border-border"
            )}>
              {i < step ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <span className={cn(
              "text-xs font-medium hidden sm:block",
              i === step ? "text-foreground" : "text-muted-foreground"
            )}>
              {label}
            </span>
            {i < 2 && <div className="w-8 h-px bg-border mx-1" />}
          </div>
        ))}
      </div>

      {/* Step 0: Select employee */}
      {step === 0 && (
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'var(--font-playfair)' }}>
              Hvem skal feires?
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Velg teammedlemmet du vil lage en hyllest til.</p>
          </div>

          <div className="grid gap-2">
            {employees.map((emp) => (
              <button
                key={emp.id}
                onClick={() => setSelectedEmployeeId(emp.id)}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-xl transition-all text-left",
                  selectedEmployeeId === emp.id
                    ? "nord-card border-amber-500/30 bg-amber-500/5"
                    : "nord-card hover:border-amber-500/15"
                )}
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center text-amber-400 font-semibold text-sm">
                  {emp.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{emp.name}</h4>
                  <p className="text-xs text-muted-foreground">{emp.department} &middot; {emp.email}</p>
                </div>
                {selectedEmployeeId === emp.id && (
                  <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
              </button>
            ))}

            {employees.length === 0 && (
              <div className="nord-card rounded-xl p-8 text-center">
                <p className="text-muted-foreground">Ingen ansatte ennå. Legg til ansatte først.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 1: Pick type */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'var(--font-playfair)' }}>
              Hva feirer vi?
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Velg type feiring for {selectedEmployee?.name}.</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {celebrationTypes.map(({ type, label, icon: Icon, desc }) => (
              <button
                key={type}
                onClick={() => handleTypeSelect(type)}
                className={cn(
                  "p-5 rounded-xl text-left transition-all",
                  selectedType === type
                    ? "nord-card border-amber-500/30 bg-amber-500/5"
                    : "nord-card hover:border-amber-500/15"
                )}
              >
                <Icon className={cn(
                  "w-6 h-6 mb-3",
                  selectedType === type ? "text-amber-400" : "text-muted-foreground"
                )} />
                <h4 className="font-semibold text-foreground text-sm">{label}</h4>
                <p className="text-xs text-muted-foreground mt-1">{desc}</p>
              </button>
            ))}
          </div>

          {selectedType === 'custom' && (
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-semibold text-muted-foreground tracking-[0.15em]">Egendefinert type</label>
              <input
                value={customLabel}
                onChange={(e) => setCustomLabel(e.target.value)}
                className="input-field py-3"
                placeholder="f.eks. Forfremmelse, Prosjektlansering..."
              />
            </div>
          )}
        </div>
      )}

      {/* Step 2: Questions & details */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'var(--font-playfair)' }}>
              Tilpass feiringen
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Rediger tittel, dato og spørsmål kollegaer skal svare på.</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-semibold text-muted-foreground tracking-[0.15em]">Tittel</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="input-field py-3" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-semibold text-muted-foreground tracking-[0.15em]">Beskrivelse (valgfritt)</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="input-field py-3 resize-none" placeholder="Kort beskrivelse for bidragsyterne..." />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-semibold text-muted-foreground tracking-[0.15em]">Dato (valgfritt)</label>
              <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="input-field py-3" />
            </div>
          </div>

          <div className="editorial-line" />

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Spørsmål til kollegaer</h3>
            <QuestionList questions={questions} onChange={setQuestions} />
          </div>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        {step > 0 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Tilbake
          </button>
        ) : <div />}

        {step < 2 ? (
          <button
            disabled={!canProceed[step]}
            onClick={() => setStep(step + 1)}
            className="flex items-center gap-2 px-6 py-2.5 bg-amber-500 text-white text-sm font-semibold rounded-xl hover:bg-amber-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Neste
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            disabled={!canProceed[2] || loading}
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-2.5 bg-amber-500 text-white text-sm font-semibold rounded-xl hover:bg-amber-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Oppretter...' : 'Opprett feiring'}
            <Check className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

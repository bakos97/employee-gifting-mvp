'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CelebrationWithDetails } from '../lib/types';
import { submitContribution } from '../actions/responses';
import { ImageUpload } from './ImageUpload';
import { Send, CheckCircle, Heart } from 'lucide-react';

interface ContributionFormProps {
  celebration: CelebrationWithDetails;
}

export function ContributionForm({ celebration }: ContributionFormProps) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);

    // Append question IDs
    for (const q of celebration.questions) {
      formData.append('question_ids', q.id);
    }
    formData.set('celebration_id', celebration.id);

    const result = await submitContribution(formData);

    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.error || 'Noe gikk galt');
    }
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="text-center py-20 space-y-6">
        <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl flex items-center justify-center mx-auto">
          <CheckCircle className="w-10 h-10 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
            Takk for bidraget!
          </h2>
          <p className="text-muted-foreground text-lg">
            Dine hilsener er lagt til i tributen til {celebration.employee.name}.
          </p>
        </div>
        <div className="flex items-center justify-center gap-1 text-amber-400">
          <Heart className="w-5 h-5" />
        </div>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-8">
      {/* Contributor info */}
      <div className="nord-card rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Om deg</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-semibold text-muted-foreground tracking-[0.15em]">Ditt navn *</label>
            <input name="contributor_name" required className="input-field py-3" placeholder="f.eks. Kari Nordmann" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-semibold text-muted-foreground tracking-[0.15em]">E-post (valgfritt)</label>
            <input type="email" name="contributor_email" className="input-field py-3" placeholder="kari@firma.no" />
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {celebration.questions
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((question) => (
            <div key={question.id} className="nord-card rounded-2xl p-6 space-y-3">
              <label className="text-sm font-medium text-foreground block">
                {question.text}
                {question.is_required && <span className="text-amber-400 ml-1">*</span>}
              </label>

              <textarea
                name={`q_${question.id}_text`}
                rows={3}
                required={question.is_required}
                className="input-field py-3 resize-none"
                placeholder="Skriv ditt svar her..."
              />

              {question.allow_image && (
                <ImageUpload name={`q_${question.id}_image`} />
              )}
            </div>
          ))}
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-amber-500 text-white font-semibold py-4 rounded-xl hover:bg-amber-400 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-lg active:scale-[0.99]"
      >
        <Send className="w-5 h-5" />
        {loading ? 'Sender...' : 'Send inn bidrag'}
      </button>
    </form>
  );
}

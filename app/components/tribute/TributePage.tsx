'use client';

import { TributePageData } from '../../lib/types';
import { TributeHero } from './TributeHero';
import { TributeQuoteCard } from './TributeQuoteCard';
import { TributeImageGallery } from './TributeImageGallery';
import { TributeContributorList } from './TributeContributorList';
import { TributeRevealWrapper } from './TributeRevealWrapper';
import { Heart } from 'lucide-react';

interface TributePageProps {
  data: TributePageData;
}

export function TributePage({ data }: TributePageProps) {
  const { celebration, employee, questions, contributors } = data;

  // Gather all images
  const allImages = questions.flatMap(q =>
    q.responses
      .filter(r => r.image_url)
      .map(r => ({ url: r.image_url!, contributorName: r.contributor_name }))
  );

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Hero */}
      <TributeHero
        employeeName={employee.name}
        title={celebration.title}
        type={celebration.type}
        customTypeLabel={celebration.custom_type_label}
        contributorCount={contributors.length}
      />

      {/* Q&A Sections */}
      <div className="max-w-4xl mx-auto px-6 space-y-20 py-20">
        {questions.map((question, qIndex) => {
          const textResponses = question.responses.filter(r => r.text_response);
          if (textResponses.length === 0) return null;

          return (
            <TributeRevealWrapper key={question.id}>
              <section className="space-y-8">
                <div className="text-center">
                  <p className="text-xs uppercase tracking-[0.3em] text-amber-400 font-semibold mb-3">
                    Spørsmål {qIndex + 1}
                  </p>
                  <h2
                    className="text-2xl md:text-3xl font-bold text-foreground max-w-xl mx-auto"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    {question.text}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {textResponses.map((response, rIndex) => (
                    <TributeQuoteCard
                      key={response.id}
                      text={response.text_response!}
                      contributorName={response.contributor_name}
                      index={rIndex}
                    />
                  ))}
                </div>
              </section>
            </TributeRevealWrapper>
          );
        })}

        {/* Photo Gallery */}
        <TributeImageGallery images={allImages} />

        {/* Contributors */}
        <TributeContributorList contributors={contributors} />

        {/* Footer */}
        <div className="text-center py-10 border-t border-border">
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
            <span>Laget med</span>
            <Heart className="w-3.5 h-3.5 text-amber-400" />
            <span>av</span>
            <span className="font-semibold" style={{ fontFamily: 'var(--font-playfair)' }}>
              Tribute<span className="text-amber-400">Page</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

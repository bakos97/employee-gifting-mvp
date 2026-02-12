'use client';

import { TributeRevealWrapper } from './TributeRevealWrapper';

interface TributeImageGalleryProps {
  images: { url: string; contributorName: string }[];
}

export function TributeImageGallery({ images }: TributeImageGalleryProps) {
  if (images.length === 0) return null;

  return (
    <TributeRevealWrapper>
      <section className="space-y-8">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-400 font-semibold mb-3">Minner</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground" style={{ fontFamily: 'var(--font-playfair)' }}>
            Bilder
          </h2>
        </div>

        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {images.map((img, i) => (
            <TributeRevealWrapper key={i} delay={i * 0.06}>
              <div className="break-inside-avoid rounded-2xl overflow-hidden border border-border group">
                <img
                  src={img.url}
                  alt={`Bilde fra ${img.contributorName}`}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="p-3 bg-card">
                  <p className="text-xs text-muted-foreground">
                    Fra <span className="text-amber-400 font-medium">{img.contributorName}</span>
                  </p>
                </div>
              </div>
            </TributeRevealWrapper>
          ))}
        </div>
      </section>
    </TributeRevealWrapper>
  );
}

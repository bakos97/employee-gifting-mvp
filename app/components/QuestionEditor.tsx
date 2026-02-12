'use client';

import { GripVertical, Trash2, Image, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface QuestionEditorProps {
  index: number;
  text: string;
  allowImage: boolean;
  isRequired: boolean;
  onChange: (updates: { text?: string; allowImage?: boolean; isRequired?: boolean }) => void;
  onDelete: () => void;
}

export function QuestionEditor({ index, text, allowImage, isRequired, onChange, onDelete }: QuestionEditorProps) {
  return (
    <div className="nord-card rounded-xl p-5 group">
      <div className="flex items-start gap-3">
        <div className="pt-2 text-muted-foreground cursor-grab">
          <GripVertical className="w-4 h-4" />
        </div>

        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
              Spørsmål {index + 1}
            </span>
          </div>

          <textarea
            value={text}
            onChange={(e) => onChange({ text: e.target.value })}
            rows={2}
            className="input-field py-2.5 text-sm resize-none"
            placeholder="Skriv spørsmålet..."
          />

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={allowImage}
                onChange={(e) => onChange({ allowImage: e.target.checked })}
                className="w-4 h-4 rounded border-border bg-surface text-amber-500 focus:ring-amber-500/20"
              />
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Image className="w-3 h-3" />
                Tillat bilde
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isRequired}
                onChange={(e) => onChange({ isRequired: e.target.checked })}
                className="w-4 h-4 rounded border-border bg-surface text-amber-500 focus:ring-amber-500/20"
              />
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Påkrevd
              </span>
            </label>
          </div>
        </div>

        <button
          onClick={onDelete}
          className="p-2 text-muted-foreground hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

'use client';

import { Plus } from 'lucide-react';
import { QuestionEditor } from './QuestionEditor';

interface QuestionItem {
  text: string;
  allow_image: boolean;
  is_required: boolean;
}

interface QuestionListProps {
  questions: QuestionItem[];
  onChange: (questions: QuestionItem[]) => void;
}

export function QuestionList({ questions, onChange }: QuestionListProps) {
  function updateQuestion(index: number, updates: { text?: string; allowImage?: boolean; isRequired?: boolean }) {
    const next = [...questions];
    if (updates.text !== undefined) next[index] = { ...next[index], text: updates.text };
    if (updates.allowImage !== undefined) next[index] = { ...next[index], allow_image: updates.allowImage };
    if (updates.isRequired !== undefined) next[index] = { ...next[index], is_required: updates.isRequired };
    onChange(next);
  }

  function deleteQuestion(index: number) {
    onChange(questions.filter((_, i) => i !== index));
  }

  function addQuestion() {
    onChange([...questions, { text: '', allow_image: false, is_required: false }]);
  }

  return (
    <div className="space-y-3">
      {questions.map((q, i) => (
        <QuestionEditor
          key={i}
          index={i}
          text={q.text}
          allowImage={q.allow_image}
          isRequired={q.is_required}
          onChange={(updates) => updateQuestion(i, updates)}
          onDelete={() => deleteQuestion(i)}
        />
      ))}

      <button
        type="button"
        onClick={addQuestion}
        className="w-full py-3 border-2 border-dashed border-border rounded-xl text-sm text-muted-foreground hover:text-amber-400 hover:border-amber-500/30 transition-all flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Legg til spørsmål
      </button>
    </div>
  );
}

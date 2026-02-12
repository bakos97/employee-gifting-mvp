'use client';

import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface ImageUploadProps {
  name: string;
  className?: string;
}

export function ImageUpload({ name, className }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    if (!file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    setPreview(url);

    // Update the file input
    const dt = new DataTransfer();
    dt.items.add(file);
    if (inputRef.current) {
      inputRef.current.files = dt.files;
    }
  }

  function clear() {
    setPreview(null);
    if (inputRef.current) inputRef.current.value = '';
  }

  return (
    <div className={className}>
      <input
        ref={inputRef}
        type="file"
        name={name}
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      {preview ? (
        <div className="relative rounded-xl overflow-hidden border border-border">
          <img src={preview} alt="Preview" className="w-full h-40 object-cover" />
          <button
            type="button"
            onClick={clear}
            className="absolute top-2 right-2 w-7 h-7 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            const file = e.dataTransfer.files[0];
            if (file) handleFile(file);
          }}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all",
            dragging
              ? "border-amber-500/50 bg-amber-500/5"
              : "border-border hover:border-amber-500/30"
          )}
        >
          <div className="flex flex-col items-center gap-2">
            <ImageIcon className="w-5 h-5 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">
              Dra og slipp, eller <span className="text-amber-400">velg bilde</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

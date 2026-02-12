'use client';

import { useState, useRef } from 'react';
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle, X } from 'lucide-react';
import { importEmployees } from '../actions/import-employees';
import { ImportResult } from '../lib/types';
import { cn } from '../lib/utils';

export function ExcelImportUploader() {
    const [dragging, setDragging] = useState(false);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ImportResult | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    async function handleFile(file: File) {
        setFileName(file.name);
        setLoading(true);
        setResult(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await importEmployees(formData);
            setResult(res);
        } catch {
            setResult({ success: 0, skipped: 0, errors: ['Noe gikk galt under importen'] });
        } finally {
            setLoading(false);
        }
    }

    function handleDrop(e: React.DragEvent) {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    }

    function reset() {
        setResult(null);
        setFileName(null);
        if (inputRef.current) inputRef.current.value = '';
    }

    return (
        <div className="nord-card rounded-2xl overflow-hidden">
            <div className="px-7 py-5 border-b border-border flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-500/10 rounded-lg flex items-center justify-center">
                    <FileSpreadsheet className="w-4 h-4 text-amber-400" />
                </div>
                <h2 className="text-base font-semibold text-foreground" style={{ fontFamily: 'var(--font-playfair)' }}>
                    Importer fra Excel
                </h2>
            </div>

            <div className="p-7">
                {result ? (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center",
                                    result.errors.length > 0 ? "bg-amber-500/10" : "bg-emerald-500/10"
                                )}>
                                    {result.errors.length > 0 ? (
                                        <AlertCircle className="w-5 h-5 text-amber-400" />
                                    ) : (
                                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground">Import fullført</p>
                                    <p className="text-xs text-muted-foreground">{fileName}</p>
                                </div>
                            </div>
                            <button onClick={reset} className="p-2 hover:bg-surface rounded-lg text-muted-foreground hover:text-foreground transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-center">
                                <div className="text-lg font-bold text-emerald-400">{result.success}</div>
                                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Importert</div>
                            </div>
                            <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/10 text-center">
                                <div className="text-lg font-bold text-amber-400">{result.skipped}</div>
                                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Hoppet over</div>
                            </div>
                            <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/10 text-center">
                                <div className="text-lg font-bold text-red-400">{result.errors.length}</div>
                                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Feil</div>
                            </div>
                        </div>

                        {result.errors.length > 0 && (
                            <div className="p-4 rounded-xl bg-surface border border-border space-y-1 max-h-40 overflow-y-auto">
                                {result.errors.map((err, i) => (
                                    <p key={i} className="text-xs text-red-400">{err}</p>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div
                        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                        onDragLeave={() => setDragging(false)}
                        onDrop={handleDrop}
                        onClick={() => inputRef.current?.click()}
                        className={cn(
                            "border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all",
                            dragging
                                ? "border-amber-500/50 bg-amber-500/5"
                                : "border-border hover:border-amber-500/30 hover:bg-surface/50"
                        )}
                    >
                        <input
                            ref={inputRef}
                            type="file"
                            accept=".xlsx,.xls,.csv"
                            onChange={handleChange}
                            className="hidden"
                        />
                        <div className="flex flex-col items-center gap-3">
                            {loading ? (
                                <>
                                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center animate-pulse">
                                        <FileSpreadsheet className="w-6 h-6 text-amber-400" />
                                    </div>
                                    <p className="text-sm text-muted-foreground">Importerer {fileName}...</p>
                                </>
                            ) : (
                                <>
                                    <div className="w-12 h-12 rounded-xl bg-surface border border-border flex items-center justify-center">
                                        <Upload className="w-5 h-5 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-foreground">
                                            Dra og slipp Excel-fil, eller <span className="text-amber-400">klikk for å velge</span>
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Forventede kolonner: Navn, E-post, Fødselsdato, Startdato, Avdeling (valgfritt)
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

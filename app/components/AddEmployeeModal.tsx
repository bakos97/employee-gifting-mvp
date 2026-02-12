'use client';

import { X, Plus } from 'lucide-react';
import { addEmployee } from '../actions/employees';
import { useState } from 'react';

interface AddEmployeeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AddEmployeeModal({ isOpen, onClose }: AddEmployeeModalProps) {
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        await addEmployee(formData);
        setLoading(false);
        onClose();
    }

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
            <div className="w-full max-w-3xl bg-card rounded-2xl shadow-2xl shadow-black/40 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300 border border-border">

                {/* Header */}
                <div className="flex-none px-8 py-6 border-b border-border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-amber-500/10 rounded-xl flex items-center justify-center">
                            <Plus className="w-4.5 h-4.5 text-amber-400" />
                        </div>
                        <h2 className="text-xl font-semibold text-foreground" style={{ fontFamily: 'var(--font-playfair)' }}>
                            Legg til nytt medlem
                        </h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-surface rounded-lg text-muted-foreground hover:text-foreground transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 p-8 overflow-y-auto">
                    <form id="employee-form" action={handleSubmit} className="h-full flex flex-col justify-center">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-end">

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-semibold text-muted-foreground tracking-[0.15em]">Fullt navn</label>
                                <input name="name" required className="input-field py-3" placeholder="Ola Nordmann" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-semibold text-muted-foreground tracking-[0.15em]">E-post</label>
                                <input type="email" name="email" required className="input-field py-3" placeholder="ola@bedrift.no" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-semibold text-muted-foreground tracking-[0.15em]">Fødselsdato</label>
                                <input type="date" name="dob" required className="input-field py-3" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-semibold text-muted-foreground tracking-[0.15em]">Startdato</label>
                                <input type="date" name="startDate" required className="input-field py-3" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-semibold text-muted-foreground tracking-[0.15em]">Avdeling</label>
                                <div className="relative">
                                    <select name="department" className="input-field appearance-none py-3">
                                        <option value="Engineering">Engineering</option>
                                        <option value="Sales">Sales</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="HR">HR</option>
                                        <option value="Design">Design</option>
                                        <option value="Finance">Finance</option>
                                    </select>
                                    <div className="absolute right-3 top-3.5 pointer-events-none text-muted-foreground">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                            </div>

                            <button
                                disabled={loading}
                                className="w-full bg-amber-500 text-white font-semibold py-3 rounded-xl hover:bg-amber-400 transition-all disabled:opacity-70 flex items-center justify-center gap-2 h-[48px] active:scale-[0.98]"
                            >
                                {loading ? 'Legger til...' : 'Legg til medlem'}
                            </button>

                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}

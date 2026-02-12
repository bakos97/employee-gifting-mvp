'use client';

import { Plus } from 'lucide-react';
import { addEmployee } from '../actions/employees';
import { useState } from 'react';

export function AddEmployeeForm() {
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        await addEmployee(formData);
        setLoading(false);
        const form = document.getElementById('employee-form') as HTMLFormElement;
        if (form) form.reset();
    }

    return (
        <div className="nord-card rounded-2xl overflow-hidden mb-6">
            {/* Header */}
            <div className="px-7 py-5 border-b border-border flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-500/10 rounded-lg flex items-center justify-center">
                    <Plus className="w-4 h-4 text-amber-400" />
                </div>
                <h2 className="text-base font-semibold text-foreground" style={{ fontFamily: 'var(--font-playfair)' }}>
                    Legg til nytt teammedlem
                </h2>
            </div>

            {/* Form Content */}
            <div className="p-7">
                <form id="employee-form" action={handleSubmit}>
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
    );
}

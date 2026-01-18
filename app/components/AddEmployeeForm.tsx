'use client';

import { Plus } from 'lucide-react';
import { addEmployee } from '../actions';
import { useState } from 'react';

export function AddEmployeeForm() {
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        await addEmployee(formData);
        setLoading(false);
        // Optional: Reset form or show success message
        // For now, we rely on Server Actions revalidation to update the list below
        const form = document.getElementById('employee-form') as HTMLFormElement;
        if (form) form.reset();
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8 animate-in slide-in-from-top-4 duration-500">
            {/* Header */}
            <div className="px-8 py-5 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    <Plus className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-gray-800">Add New Team Member</h2>
            </div>

            {/* Form Content */}
            <div className="p-8">
                <form id="employee-form" action={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                        
                        {/* Row 1 */}
                        <div className="space-y-2">
                            <label className="text-xs uppercase font-bold text-gray-500 tracking-wider">Full Name</label>
                            <input name="name" required className="input-field py-3" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase font-bold text-gray-500 tracking-wider">Email</label>
                            <input type="email" name="email" required className="input-field py-3" placeholder="john@company.com" />
                        </div>

                        {/* Row 2 */}
                        <div className="space-y-2">
                            <label className="text-xs uppercase font-bold text-gray-500 tracking-wider">Date of Birth</label>
                            <input type="date" name="dob" required className="input-field py-3" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase font-bold text-gray-500 tracking-wider">Start Date</label>
                            <input type="date" name="startDate" required className="input-field py-3" />
                        </div>

                        {/* Row 3: Dept & Button */}
                        <div className="space-y-2">
                            <label className="text-xs uppercase font-bold text-gray-500 tracking-wider">Department</label>
                            <div className="relative">
                                <select name="department" className="input-field appearance-none py-3">
                                    <option value="Engineering">Engineering</option>
                                    <option value="Sales">Sales</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="HR">HR</option>
                                    <option value="Design">Design</option>
                                    <option value="Finance">Finance</option>
                                </select>
                                <div className="absolute right-4 top-4 pointer-events-none text-gray-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>

                        {/* Button aligns with inputs */}
                        <button 
                            disabled={loading}
                            className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 hover:shadow-lg transition-all disabled:opacity-70 flex items-center justify-center gap-2 h-[48px] transform active:scale-[0.98]"
                        >
                            {loading ? 'Adding...' : 'Add Member'}
                        </button>

                    </div>
                </form>
            </div>

            <style jsx global>{`
                .input-field {
                    width: 100%;
                    background-color: #F8FAFC;
                    border: 1px solid #E2E8F0;
                    border-radius: 0.5rem;
                    padding: 0.5rem 0.75rem;
                    font-size: 0.875rem;
                    color: #1E293B;
                    font-weight: 500;
                    transition: all 0.2s;
                    outline: none;
                }
                .input-field:focus {
                    background-color: #FFFFFF;
                    border-color: #3B82F6;
                    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
                }
            `}</style>
        </div>
    );
}

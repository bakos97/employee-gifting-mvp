'use client';

import { X, Plus } from 'lucide-react';
import { addEmployee } from '../actions';
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
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-in fade-in duration-300">
            {/* Modal Container */}
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">

                {/* Right Side: Header + Form + Inline Footer */}
                <div className="flex-1 bg-white flex flex-col h-full overflow-hidden">

                    {/* Header */}
                    <div className="flex-none px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white z-10">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                <Plus className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800">Add New Member</h2>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content (Spacious Grid) */}
                    <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                        <form id="employee-form" action={handleSubmit} className="h-full flex flex-col justify-center">

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
                                    className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 hover:shadow-lg transition-all disabled:opacity-70 flex items-center justify-center gap-2 h-[46px] transform active:scale-[0.98]"
                                >
                                    {loading ? 'Adding...' : 'Add Member'}
                                </button>

                            </div>
                        </form>
                    </div>
                </div>

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

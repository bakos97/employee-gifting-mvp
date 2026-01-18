'use client';

import { X } from 'lucide-react';
import { updateEmployee } from '../actions';
import { useState } from 'react';
import { Employee } from '../lib/types';

interface EditEmployeeModalProps {
    isOpen: boolean;
    onClose: () => void;
    employee: Employee;
}

export function EditEmployeeModal({ isOpen, onClose, employee }: EditEmployeeModalProps) {
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        await updateEmployee(employee.id, formData);
        setLoading(false);
        onClose();
    }

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-in fade-in duration-300">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">

                {/* Header */}
                <div className="flex-none px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white z-10">
                    <h2 className="text-xl font-bold text-gray-800">Edit Employee</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                    <form action={handleSubmit} className="space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold text-gray-500 tracking-wider">Full Name</label>
                                <input name="name" defaultValue={employee.name} required className="input-field py-3" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold text-gray-500 tracking-wider">Email</label>
                                <input type="email" name="email" defaultValue={employee.email} required className="input-field py-3" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold text-gray-500 tracking-wider">Date of Birth</label>
                                <input type="date" name="dob" defaultValue={employee.dateOfBirth} required className="input-field py-3" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold text-gray-500 tracking-wider">Start Date</label>
                                <input type="date" name="startDate" defaultValue={employee.startDate} required className="input-field py-3" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold text-gray-500 tracking-wider">Department</label>
                                <div className="relative">
                                    <select name="department" defaultValue={employee.department} className="input-field appearance-none py-3">
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
                        </div>

                        {/* Leaving Date Section */}
                        <div className="space-y-2 pt-2 border-t border-gray-100">
                            <label className="text-xs uppercase font-bold text-red-500 tracking-wider">Leaving Date (Optional)</label>
                            <p className="text-xs text-gray-400 mb-2">Setting a leaving date will trigger a leaving event.</p>
                            <input type="date" name="leavingDate" defaultValue={employee.leavingDate} className="input-field py-3 border-red-100 focus:border-red-500 focus:ring-red-100" />
                        </div>

                        <div className="pt-4">
                            <button
                                disabled={loading}
                                className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 hover:shadow-lg transition-all disabled:opacity-70 flex items-center justify-center gap-2 transform active:scale-[0.98]"
                            >
                                {loading ? 'Saving Changes...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
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

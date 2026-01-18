'use client';

import { Employee } from '../lib/types';
import { Plus, MoreVertical, Mail, ChevronUp } from 'lucide-react';
import { cn } from '../lib/utils';
import { useState } from 'react';
import { AddEmployeeForm } from './AddEmployeeForm';

import { EditEmployeeModal } from './EditEmployeeModal';

interface EmployeeListProps {
    employees: Employee[];
}

export function EmployeeList({ employees }: EmployeeListProps) {
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

    return (
        <div className="space-y-6">

            {/* Header / Actions */}
            <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-800 text-xl">All Employees ({employees.length})</h3>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className={cn(
                        "text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center gap-2",
                        showAddForm
                            ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90"
                    )}
                >
                    {showAddForm ? (
                        <>Close Form <ChevronUp className="w-4 h-4" /></>
                    ) : (
                        <>Add Member <Plus className="w-4 h-4" /></>
                    )}
                </button>
            </div>

            {/* Collapsible Add Form */}
            {showAddForm && (
                <div className="animate-in slide-in-from-top-2 duration-300 fade-in">
                    <AddEmployeeForm />
                </div>
            )}

            {/* List */}
            <div className="glass-card rounded-2xl border border-white/60 overflow-hidden shadow-xl">
                <div className="p-4 border-b border-gray-100 bg-white/50 backdrop-blur-sm">
                    {/* Optional: Filter/Search could go here later */}
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Team Roster</div>
                </div>

                <div className="divide-y divide-gray-100 bg-white/60">
                    {employees.length === 0 ? (
                        <div className="p-12 text-center flex flex-col items-center justify-center gap-4">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                                <Plus className="w-8 h-8 text-gray-300" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800">No team members yet</h4>
                                <p className="text-sm text-gray-500">Get started by adding your first employee above.</p>
                            </div>
                        </div>
                    ) : (
                        employees.map((emp) => (
                            <div key={emp.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg shadow-sm">
                                        {emp.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800 group-hover:text-primary transition-colors">{emp.name}</h4>
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <Mail className="w-3 h-3" />
                                            {emp.email}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="hidden md:block text-right">
                                        <div className="text-xs font-bold text-gray-700">{emp.department}</div>
                                        <div className="text-[10px] uppercase tracking-wide text-gray-400">Started: {emp.startDate}</div>
                                    </div>
                                    <button
                                        onClick={() => setEditingEmployee(emp)}
                                        className="text-gray-400 hover:text-primary p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all opacity-0 group-hover:opacity-100"
                                        title="Edit Employee"
                                    >
                                        <MoreVertical className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Edit Modal */}
            {editingEmployee && (
                <EditEmployeeModal
                    isOpen={!!editingEmployee}
                    employee={editingEmployee}
                    onClose={() => setEditingEmployee(null)}
                />
            )}
        </div>
    );
}

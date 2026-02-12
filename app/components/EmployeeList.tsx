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
                <h3 className="text-muted-foreground text-sm font-medium">
                    Alle ansatte <span className="text-foreground font-semibold">({employees.length})</span>
                </h3>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className={cn(
                        "text-sm font-semibold px-5 py-2.5 rounded-xl transition-all flex items-center gap-2",
                        showAddForm
                            ? "bg-surface text-muted-foreground hover:text-foreground border border-border"
                            : "bg-amber-500 text-white hover:bg-amber-400"
                    )}
                >
                    {showAddForm ? (
                        <>Lukk <ChevronUp className="w-4 h-4" /></>
                    ) : (
                        <>Legg til <Plus className="w-4 h-4" /></>
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
            <div className="nord-card rounded-2xl overflow-hidden">
                <div className="px-5 py-3.5 border-b border-border">
                    <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.2em]">
                        Team Roster
                    </div>
                </div>

                <div className="divide-y divide-border">
                    {employees.length === 0 ? (
                        <div className="p-16 text-center flex flex-col items-center justify-center gap-4">
                            <div className="w-14 h-14 bg-surface rounded-2xl flex items-center justify-center border border-border">
                                <Plus className="w-6 h-6 text-muted-foreground" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-foreground" style={{ fontFamily: 'var(--font-playfair)' }}>
                                    Ingen teammedlemmer ennå
                                </h4>
                                <p className="text-sm text-muted-foreground mt-1">Kom i gang ved å legge til din første ansatt.</p>
                            </div>
                        </div>
                    ) : (
                        employees.map((emp) => (
                            <div key={emp.id} className="px-5 py-4 flex items-center justify-between hover:bg-surface/50 transition-colors group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center text-amber-400 font-semibold text-sm">
                                        {emp.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-foreground group-hover:text-amber-400 transition-colors">{emp.name}</h4>
                                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                            <Mail className="w-3 h-3" />
                                            {emp.email}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="hidden md:block text-right">
                                        <div className="text-xs font-medium text-foreground">{emp.department}</div>
                                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                                            Startet: {emp.start_date}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setEditingEmployee(emp)}
                                        className="text-muted-foreground hover:text-amber-400 p-2 rounded-lg hover:bg-amber-500/10 transition-all opacity-0 group-hover:opacity-100"
                                        title="Rediger ansatt"
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

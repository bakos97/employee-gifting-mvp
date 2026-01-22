import { EmployeeList } from '../components/EmployeeList';
import { getAppData } from '../lib/db';
import { Users } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function EmployeesPage() {
    const data = await getAppData();

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center gap-3 text-3xl font-bold text-gray-800">
                <div className="p-3 bg-blue-100 rounded-xl text-blue-600 shadow-sm">
                    <Users className="w-8 h-8" />
                </div>
                <h1>Team Management</h1>
            </div>

            {/* List */}
            <div className="space-y-4">
                <p className="text-gray-500 max-w-2xl">
                    Manage your team members here. Adding a new employee will automatically calculate their upcoming birthdays and work anniversaries.
                </p>
                <div className="glass-card rounded-2xl border border-white/60 p-1 shadow-xl">
                    <EmployeeList employees={data.employees} />
                </div>
            </div>
        </div>
    );
}

import { EmployeeList } from '@/app/components/EmployeeList';
import { ExcelImportUploader } from '@/app/components/ExcelImportUploader';
import { getEmployees } from '@/app/lib/db/employees';
import { Users } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function EmployeesPage() {
    const employees = await getEmployees();

    return (
        <div className="max-w-6xl space-y-10">
            {/* Header */}
            <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.2em] text-amber-400 font-semibold">Administrasjon</p>
                <h1 className="text-4xl font-bold tracking-tight text-foreground" style={{ fontFamily: 'var(--font-playfair)' }}>
                    Ansatte
                </h1>
                <p className="text-muted-foreground max-w-2xl">
                    Administrer teammedlemmene dine. Legg til ansatte manuelt eller importer fra Excel.
                </p>
            </div>

            <div className="editorial-line" />

            {/* Excel Import */}
            <ExcelImportUploader />

            {/* List */}
            <EmployeeList employees={employees} />
        </div>
    );
}

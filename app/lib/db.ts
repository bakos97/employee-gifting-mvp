import { db } from './database';
import { AppData, Employee, CelebrationPage, EventState } from './types';

// Initialize DB tables for pages
db.exec(`
  CREATE TABLE IF NOT EXISTS celebration_pages (
    id TEXT PRIMARY KEY,
    employeeId TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    templateId TEXT NOT NULL,
    status TEXT NOT NULL,
    content TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL
  );
`);

export async function getAppData(): Promise<AppData> {
    const employees = (db.prepare('SELECT * FROM employees').all() as any[]).map(e => ({
        ...e,
        leavingDate: e.leavingDate || undefined,
        department: e.department || undefined,
        avatarUrl: e.avatarUrl || undefined,
    })) as Employee[];

    const pages = (db.prepare('SELECT * FROM celebration_pages').all() as any[]).map(p => ({
        ...p,
        content: JSON.parse(p.content)
    })) as CelebrationPage[];

    const eventStatesRows = db.prepare('SELECT * FROM event_states').all() as EventState[];
    const eventStates: Record<string, EventState> = {};
    for (const st of eventStatesRows) {
        eventStates[st.id] = st;
    }

    return {
        employees,
        pages,
        eventStates
    };
}

// -- Employees --

export async function createEmployee(emp: Employee) {
    db.prepare(`
        INSERT INTO employees (id, name, email, dateOfBirth, startDate, leavingDate, department, avatarUrl)
        VALUES (@id, @name, @email, @dateOfBirth, @startDate, @leavingDate, @department, @avatarUrl)
    `).run({
        ...emp,
        leavingDate: emp.leavingDate || null,
        department: emp.department || null,
        avatarUrl: emp.avatarUrl || null,
    });
}

export async function updateEmployee(emp: Employee) {
    db.prepare(`
        UPDATE employees 
        SET name = @name, email = @email, dateOfBirth = @dateOfBirth, startDate = @startDate, 
            leavingDate = @leavingDate, department = @department, avatarUrl = @avatarUrl
        WHERE id = @id
    `).run({
        ...emp,
        leavingDate: emp.leavingDate || null,
        department: emp.department || null,
        avatarUrl: emp.avatarUrl || null,
    });
}

export async function deleteEmployee(id: string) {
    db.prepare('DELETE FROM employees WHERE id = ?').run(id);
}

// -- Pages --

export async function createPage(page: CelebrationPage) {
    db.prepare(`
        INSERT INTO celebration_pages (id, employeeId, slug, templateId, status, content, createdAt, updatedAt)
        VALUES (@id, @employeeId, @slug, @templateId, @status, @content, @createdAt, @updatedAt)
    `).run({
        ...page,
        content: JSON.stringify(page.content)
    });

    // Also likely update event state to link this page?
    // Not doing it here automatically, caller handles it.
}

export async function getPageBySlug(slug: string): Promise<CelebrationPage | undefined> {
    const row = db.prepare('SELECT * FROM celebration_pages WHERE slug = ?').get(slug) as any;
    if (!row) return undefined;
    return {
        ...row,
        content: JSON.parse(row.content)
    };
}

// -- Events --

export async function updateEventState(state: EventState) {
    // Note: table schema might need update if columns changed (removed selectedGiftId, cardId, added pageId)
    // For MVP we can just use generic JSON or assume columns exist. 
    // Since we are pivoting, let's update table schema if needed or just use 'status'.
    // Existing schema: id, selectedGiftId, cardId, status.
    // We should probably migration or just ignore old columns.
    // I'll add pageId column if not exists via exec helper or just reuse.

    // Check if column exists, if not add it.
    try {
        db.prepare('ALTER TABLE event_states ADD COLUMN pageId TEXT').run();
    } catch (e) {
        // Ignore if exists
    }

    db.prepare(`
        INSERT OR REPLACE INTO event_states (id, pageId, status)
        VALUES (@id, @pageId, @status)
    `).run({
        id: state.id,
        pageId: state.pageId || null,
        status: state.status
    });
}

export async function getEventState(id: string): Promise<EventState | undefined> {
    return db.prepare('SELECT * FROM event_states WHERE id = ?').get(id) as EventState | undefined;
}

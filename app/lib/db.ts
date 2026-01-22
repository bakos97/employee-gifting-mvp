import { db } from './database';
import { AppData, Employee, Gift, EventState, Card, GiftEvent } from './types';

export async function getAppData(): Promise<AppData> {
    const employees = (db.prepare('SELECT * FROM employees').all() as any[]).map(e => ({
        ...e,
        leavingDate: e.leavingDate || undefined,
        department: e.department || undefined,
        avatarUrl: e.avatarUrl || undefined,
    })) as Employee[];

    const gifts = (db.prepare('SELECT * FROM gifts').all() as any[]).map(g => ({
        ...g,
        image: g.image || undefined,
    })) as Gift[];

    const eventStatesRows = db.prepare('SELECT * FROM event_states').all() as EventState[];
    const eventStates: Record<string, EventState> = {};
    for (const st of eventStatesRows) {
        eventStates[st.id] = st;
    }

    const cardsRows = db.prepare('SELECT * FROM cards').all() as any[];
    const cards: Card[] = [];

    const getSignatures = db.prepare('SELECT * FROM signatures WHERE cardId = ?');

    for (const c of cardsRows) {
        const signatures = getSignatures.all(c.id) as any[];
        cards.push({
            ...c,
            signatures
        });
    }

    return {
        employees,
        gifts,
        eventStates,
        cards
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

export async function getEmployees(): Promise<Employee[]> {
    return (db.prepare('SELECT * FROM employees').all() as any[]).map(e => ({
        ...e,
        leavingDate: e.leavingDate || undefined,
        department: e.department || undefined,
    })) as Employee[];
}

// -- Gifts --

export async function getGifts(): Promise<Gift[]> {
    return db.prepare('SELECT * FROM gifts').all() as Gift[];
}

// -- Events --

export async function updateEventState(state: EventState) {
    db.prepare(`
        INSERT OR REPLACE INTO event_states (id, selectedGiftId, cardId, status)
        VALUES (@id, @selectedGiftId, @cardId, @status)
    `).run({
        ...state,
        selectedGiftId: state.selectedGiftId || null,
        cardId: state.cardId || null,
    });
}

// -- Cards --

export async function createCard(card: Card) {
    const insertCard = db.transaction(() => {
        db.prepare(`
            INSERT INTO cards (id, eventId, recipientName, title, status)
            VALUES (@id, @eventId, @recipientName, @title, @status)
        `).run(card);

        // Also update event state to link this card
        db.prepare(`
            UPDATE event_states SET cardId = @cardId WHERE id = @eventId
        `).run({ cardId: card.id, eventId: card.eventId });

        // Ensure event state exists if it doesn't? 
        // Logic in actions calls this after creating event state usually, or we can upsert event state via generic updateEventState.
        // But here we might just want to safeguard or assume caller handles it. 
        // For existing pattern in actions.ts, it updates event state manually. 
        // I will let methods be atomic and caller orchestrates, OR provide a helper.
        // The action `createCard` does: create card, then link to event.
    });
    insertCard();
}

export async function addSignature(cardId: string, signature: { id: string, name: string, message: string, createdAt: string }) {
    db.prepare(`
        INSERT INTO signatures (id, cardId, name, message, createdAt)
        VALUES (@id, @cardId, @name, @message, @createdAt)
    `).run({
        ...signature,
        cardId
    });
}

export async function getEventState(id: string): Promise<EventState | undefined> {
    return db.prepare('SELECT * FROM event_states WHERE id = ?').get(id) as EventState | undefined;
}

export async function getCard(id: string): Promise<Card | undefined> {
    const card = db.prepare('SELECT * FROM cards WHERE id = ?').get(id) as any;
    if (!card) return undefined;

    const signatures = db.prepare('SELECT * FROM signatures WHERE cardId = ?').all(id) as any[];
    return {
        ...card,
        signatures
    };
}

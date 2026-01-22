import fs from 'fs';
import path from 'path';
import { db } from '../app/lib/database';
import type { AppData } from '../app/lib/types';

const JSON_DB_PATH = path.join(process.cwd(), 'data', 'db.json');

function migrate() {
    if (!fs.existsSync(JSON_DB_PATH)) {
        console.error('No source JSON database found at:', JSON_DB_PATH);
        process.exit(1);
    }

    const rawData = fs.readFileSync(JSON_DB_PATH, 'utf-8');
    const data: AppData = JSON.parse(rawData);

    console.log('Starting migration...');

    const insertEmployee = db.prepare(`
        INSERT OR REPLACE INTO employees (id, name, email, dateOfBirth, startDate, leavingDate, department, avatarUrl)
        VALUES (@id, @name, @email, @dateOfBirth, @startDate, @leavingDate, @department, @avatarUrl)
    `);

    const insertGift = db.prepare(`
        INSERT OR REPLACE INTO gifts (id, name, description, price, type, image)
        VALUES (@id, @name, @description, @price, @type, @image)
    `);

    const insertEventState = db.prepare(`
        INSERT OR REPLACE INTO event_states (id, selectedGiftId, cardId, status)
        VALUES (@id, @selectedGiftId, @cardId, @status)
    `);

    const insertCard = db.prepare(`
        INSERT OR REPLACE INTO cards (id, eventId, recipientName, title, status)
        VALUES (@id, @eventId, @recipientName, @title, @status)
    `);

    const insertSignature = db.prepare(`
        INSERT OR REPLACE INTO signatures (id, cardId, name, message, createdAt)
        VALUES (@id, @cardId, @name, @message, @createdAt)
    `);

    const transaction = db.transaction(() => {
        // Migrate Employees
        for (const emp of data.employees) {
            insertEmployee.run({
                id: emp.id,
                name: emp.name,
                email: emp.email,
                dateOfBirth: emp.dateOfBirth,
                startDate: emp.startDate,
                leavingDate: emp.leavingDate || null,
                department: emp.department || null,
                avatarUrl: emp.avatarUrl || null,
            });
        }
        console.log(`Migrated ${data.employees.length} employees.`);

        // Migrate Gifts
        for (const gift of data.gifts) {
            insertGift.run({
                id: gift.id,
                name: gift.name,
                description: gift.description,
                price: gift.price || 0,
                type: gift.type,
                image: gift.image || null,
            });
        }
        console.log(`Migrated ${data.gifts.length} gifts.`);

        // Migrate Event States
        const eventIds = Object.keys(data.eventStates);
        for (const id of eventIds) {
            const state = data.eventStates[id];
            insertEventState.run({
                id: state.id,
                selectedGiftId: state.selectedGiftId || null,
                cardId: state.cardId || null,
                status: state.status,
            });
        }
        console.log(`Migrated ${eventIds.length} event states.`);

        // Migrate Cards
        for (const card of data.cards) {
            insertCard.run({
                id: card.id,
                eventId: card.eventId,
                recipientName: card.recipientName,
                title: card.title,
                status: card.status,
            });

            for (const sig of card.signatures) {
                insertSignature.run({
                    id: sig.id,
                    cardId: card.id,
                    name: sig.name,
                    message: sig.message,
                    createdAt: sig.createdAt,
                });
            }
        }
        console.log(`Migrated ${data.cards.length} cards.`);
    });

    transaction();
    console.log('Migration completed successfully.');
}

migrate();

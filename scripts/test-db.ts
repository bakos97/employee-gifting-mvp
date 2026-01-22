import {
    getAppData,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getGifts,
    updateEventState,
    createCard,
    getCard
} from '../app/lib/db';
import { Employee, Card } from '../app/lib/types';
import assert from 'assert';

async function test() {
    console.log('Starting DB Verification...');

    // 1. Employee CRUD
    const newEmp: Employee = {
        id: 'test_emp_1',
        name: 'Test User',
        email: 'test@example.com',
        dateOfBirth: '1990-01-01',
        startDate: '2023-01-01',
        department: 'Testing'
    };

    console.log('Creating employee...');
    await createEmployee(newEmp);

    let data = await getAppData();
    let emp = data.employees.find(e => e.id === 'test_emp_1');
    assert.ok(emp, 'Employee should exist');
    assert.strictEqual(emp.name, 'Test User');

    console.log('Updating employee...');
    const updatedEmp = { ...newEmp, name: 'Updated User' };
    await updateEmployee(updatedEmp);

    data = await getAppData();
    emp = data.employees.find(e => e.id === 'test_emp_1');
    assert.strictEqual(emp?.name, 'Updated User');

    console.log('Deleting employee...');
    await deleteEmployee('test_emp_1');

    data = await getAppData();
    emp = data.employees.find(e => e.id === 'test_emp_1');
    assert.strictEqual(emp, undefined, 'Employee should be deleted');

    // 2. Gifts Check
    console.log('Checking gifts...');
    const gifts = await getGifts();
    assert.ok(gifts.length > 0, 'Gifts should exist (migrated)');

    // 3. Card & Event State
    console.log('Testing Cards and Events...');
    const eventId = 'test_event_1';

    // Create pre-existing state
    await updateEventState({
        id: eventId,
        status: 'PENDING_ACTION'
    });

    const cardId = 'test_card_1';
    const newCard: Card = {
        id: cardId,
        eventId: eventId,
        recipientName: 'Recipient',
        title: 'Title',
        status: 'DRAFT',
        signatures: []
    };

    await createCard(newCard);

    const fetchedCard = await getCard(cardId);
    assert.ok(fetchedCard, 'Card should exist');
    assert.strictEqual(fetchedCard.title, 'Title');

    // Verify event linked to card
    data = await getAppData();
    const eventState = data.eventStates[eventId];
    assert.strictEqual(eventState.cardId, cardId, 'Event should be linked to card');

    console.log('Verification Success!');
}

test().catch(err => {
    console.error('Test Failed:', err);
    process.exit(1);
});

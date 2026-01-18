import fs from 'fs/promises';
import path from 'path';
import { AppData, Employee, Gift, GiftEvent } from './types';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'db.json');

const INITIAL_DATA: AppData = {
    employees: [
        {
            id: 'emp_1',
            name: 'Alice Johnson',
            email: 'alice@example.com',
            dateOfBirth: '1990-05-15',
            startDate: '2020-03-01',
            department: 'Engineering',
        },
        {
            id: 'emp_2',
            name: 'Bob Smith',
            email: 'bob@example.com',
            dateOfBirth: '1985-11-20',
            startDate: '2019-01-10',
            department: 'Sales',
        },
    ],
    gifts: [
        { id: '1', name: 'Premium Gift Box', description: 'A curated box of premium snacks and goodies', price: 50, type: 'BIRTHDAY', image: '/images/gift-bag.png' },
        { id: '2', name: 'Tech Gadget Set', description: 'Wireless charger and headphones', price: 120, type: 'ANNIVERSARY', image: '/images/gift-bag.png' },
        { id: '3', name: '"Traitor" Mug', description: 'A white ceramic mug with "TRAITOR" in red text. Classic.', price: 15, type: 'LEAVING', image: '/images/mug-traitor.png' },
        { id: '4', name: '"Smells Like Quitting" Candle', description: 'Luxury scented candle. Smells like freedom.', price: 25, type: 'LEAVING', image: '/images/scented-candle.png' },
        { id: '5', name: 'Gourmet Birthday Cake', description: 'Delicious chocolate fudge cake.', price: 40, type: 'BIRTHDAY', image: '/images/birthday-cake.png' },
    ],
    eventStates: {},
    cards: [],
};

export async function getAppData(): Promise<AppData> {
    try {
        const data = await fs.readFile(DATA_FILE_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist, create it with initial data
        await saveAppData(INITIAL_DATA);
        return INITIAL_DATA;
    }
}

export async function saveAppData(data: AppData): Promise<void> {
    try {
        const dir = path.dirname(DATA_FILE_PATH);
        await fs.mkdir(dir, { recursive: true });
        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error('Failed to save data:', error);
        throw new Error('Database save failed');
    }
}

export async function getEmployees(): Promise<Employee[]> {
    const data = await getAppData();
    return data.employees;
}

export async function getGifts(): Promise<Gift[]> {
    const data = await getAppData();
    return data.gifts;
}

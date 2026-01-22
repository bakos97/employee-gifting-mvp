import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_PATH = path.join(process.cwd(), 'data', 'employee-gifting.db');

// Ensure data directory exists
const dataDir = path.dirname(DB_PATH);
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

export const db = new Database(DB_PATH);
// Enable WAL mode for better concurrency
db.pragma('journal_mode = WAL');

// Initialize Schema
const schemaSnippet = `
  CREATE TABLE IF NOT EXISTS employees (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    dateOfBirth TEXT NOT NULL,
    startDate TEXT NOT NULL,
    leavingDate TEXT,
    department TEXT,
    avatarUrl TEXT
  );

  CREATE TABLE IF NOT EXISTS gifts (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price REAL NOT NULL,
    type TEXT NOT NULL,
    image TEXT
  );

  CREATE TABLE IF NOT EXISTS event_states (
    id TEXT PRIMARY KEY,
    selectedGiftId TEXT,
    cardId TEXT,
    status TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS cards (
    id TEXT PRIMARY KEY,
    eventId TEXT NOT NULL,
    recipientName TEXT NOT NULL,
    title TEXT NOT NULL,
    status TEXT NOT NULL,
    FOREIGN KEY(eventId) REFERENCES event_states(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS signatures (
    id TEXT PRIMARY KEY,
    cardId TEXT NOT NULL,
    name TEXT NOT NULL,
    message TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    FOREIGN KEY(cardId) REFERENCES cards(id) ON DELETE CASCADE
  );
`;

db.exec(schemaSnippet);

export default db;

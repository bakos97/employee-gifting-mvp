Employee Gifting App – Database Upgrade
Overview

This project is an MVP for an employee gifting application. The app manages gifting for company staff, including birthdays, retirements, and other work anniversaries (e.g., 30 years at the company). Gifts can range from humorous items (e.g., “traitor” coffee mug) to higher-end items (e.g., gourmet food baskets).

Currently, the app stores all data in a JSON file. The goal of this task is to replace the JSON storage with a functioning relational database that can handle employees, events, and gifts. The database should support basic CRUD operations and enable future features like calendar syncing and gift selection.

Task

Objective: Upgrade the current JSON-based storage to a proper database solution. For the MVP, we recommend SQLite, accessed via Node.js/TypeScript, due to its simplicity, zero server requirements, and full SQL support.

Requirements:

1. Design a relational database schema that covers:

- Employees (name, email, department, etc.)

- Events (type: birthday, retirement, anniversary; date; associated employee)

- Gifts (name, category, price tier, optional humorous tag)

2. Replace the existing JSON file storage in app/lib/db.ts with SQLite-based persistence.

3. Implement basic CRUD operations for each table in TypeScript.

4. Ensure data integrity (foreign keys where appropriate, unique constraints).

5. Provide a migration script in TypeScript that transfers existing JSON data into SQLite.

6. Keep the solution lightweight—use standard Node.js libraries or popular SQLite packages like better-sqlite3 or sqlite.

7. Ensure the database is ready for future enhancements, like assigning gifts to events and syncing calendars.

Deliverables

- SQLite database file (.db)
- Database schema definition (SQL or TypeScript setup code)
- TypeScript module for database interactions (CRUD functions)
- Migration script to populate SQLite from existing JSON data
- Instructions for initializing the database and running migrations

Notes

- The database does not need to handle extremely high traffic or concurrent writes for the MVP.
- Future scalability can consider Postgres or MySQL if needed.
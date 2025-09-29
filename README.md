# Swedish Pastries Bakery Management System

## Description
This project manages inventory for a bakery specializing in Swedish pastries using Express, TypeScript, and Zod. It supports CRUD operations: creating, reading, updating, and deleting pastries.

## Zod Schema Explanation
- `SwedishPastrySchema`: Validates the structure of pastry objects, ensuring each has an `id`, `name`, `description`, and `price`.
  - `id`: A number (minimum 1) for a unique identifier.
  - `name`: A string (1-100 characters) for the pastry name.
  - `description`: A string (1-300 characters) for the pastry description.
  - `price`: A number (10-100) for the pastry price.
  - Why: This prevents invalid data (e.g., missing fields or prices below 10) from being added or updated.

## Instructions on How to Run the Code
1. Create a new folder and open it in your code editor.
2. Create `app.ts` with the code above and a `package.json` with dependencies.
3. Run `npm init -y` and `npm install express zod @types/express @types/node ts-node typescript --save-dev`.
4. Start the server with `npx ts-node app.ts`.
5. Use Insomnia:
   - `GET http://localhost:3000/pastries` to see the list.
   - `POST http://localhost:3000/pastries` with body `{ "name": "New Pastry", "description": "A new pastry", "price": 35 }` to add.
   - `PUT http://localhost:3000/pastries/1` with body `{ "name": "Updated Pastry" }` to update.
   - `DELETE http://localhost:3000/pastries/1` to delete a pastry by ID.
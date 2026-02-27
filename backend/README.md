# Financial Tracker — Backend

Overview

- Node.js + Express API for the Financial Tracker application.
- Responsibilities: user signup/login, CRUD for financial records, authentication.

Tech stack

- Node.js, Express
- MongoDB (Mongoose)
- JWT for auth, bcrypt for passwords
- dotenv for config

Getting started
Prerequisites: Node.js (16+), MongoDB (local or Atlas).

1. Install

```bash
cd backend
npm install
```

2. Environment
   Create a `.env` file with:

```
MONGO_URI=<your_mongo_connection_string>
JWT_SECRET=<strong_secret>
PORT=5000
```

3. Run

```bash
# development (with nodemon)
npm run dev
# production
npm start
```

API (examples)

- `POST /api/auth/signup` — body: `{ name, email, password }`
- `POST /api/auth/login` — body: `{ email, password }` → returns JWT
- `GET /api/records` — protected, list user records
- `POST /api/records` — protected, add record `{ amount, type, date, note }`
- `PUT /api/records/:id`, `DELETE /api/records/:id` — protected

Folder structure (suggested)

- `src/models` — Mongoose models (`User`, `Record`)
- `src/routes` — route definitions
- `src/controllers` — request handlers
- `src/middleware` — auth, error handling

Notes

- Use the `Authorization: Bearer <token>` header for protected routes.
- Add validation and rate-limiting in production.

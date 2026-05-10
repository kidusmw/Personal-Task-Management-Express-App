# Personal Task Management API 📋
> A learning project — don't judge the commits, judge the progress.

## What is this?
A **personal task management REST API** built with Express.js and TypeScript as part of a learning journey into backend development.

## Tech Stack
- [Express.js](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/) (SQLite)
- [JWT](https://jwt.io/) Authentication
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js) Password hashing
- [Zod](https://zod.dev/) Validation

## Getting Started

### Prerequisites
- Node.js
- pnpm

### Setup
```bash
pnpm install
pnpm dlx prisma migrate dev
pnpm dlx prisma generate
pnpm dev
```

### Required Environment Variables
Create a `.env` file in the root with the following:
DATABASE_URL="file:./dev.db"
PORT=3000
JWT_SECRET=your_secret_here

## API Endpoints
### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Tasks (protected)
- `GET /api/tasks`
- `GET /api/tasks/:id`
- `POST /api/tasks`
- `PATCH /api/tasks/:id`
- `DELETE /api/tasks/:id`

---

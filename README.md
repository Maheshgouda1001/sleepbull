# Sleepbull Backend

Production-ready MVP backend for the Sleepbull mattress e-commerce platform.

## Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT auth with HTTP-only cookies
- Zod validation
- Pino logging
- Multer uploads
- Docker

## Highlights

- Clean layered architecture: `routes`, `controllers`, `services`, `repositories`, `middleware`, `validators`
- Low-cost Phase 1 storage with local `/uploads` and a swappable `StorageService`
- Role-based access control for `SUPER_ADMIN`, `ADMIN`, `EDITOR`
- Consistent API response format
- Swagger docs at `/docs`
- Dockerized local development with PostgreSQL
- CI workflow for typecheck, lint, build, and tests
- Sleepbull-branded Swagger theme with changeable CSS variables

## Project Structure

```text
src/
  config/
  controllers/
  docs/
  middleware/
  repositories/
  routes/
  services/
  storage/
  types/
  utils/
  validators/
prisma/
  migrations/
  seed.ts
public/
uploads/
tests/
```

## Quick Start

```bash
npm install
cp .env.example .env
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

API docs: `http://localhost:4000/docs`

## Docker

```bash
cp .env.example .env
docker compose up --build
```

## Default Seed Admin

- Email: `admin@sleepbull.com`
- Password: `Admin@12345`

## Future Upgrades

- Replace local storage with `S3StorageService`
- Replace local PostgreSQL with AWS RDS by updating `DATABASE_URL`
- Move VPS deployment to ECS or EC2 without changing application code
- Add Redis caching and background jobs behind service abstractions
- Put a CDN in front of `/uploads` later without changing API contracts

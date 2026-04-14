# TaskMaster Pro - Backend MVP

TaskMaster Pro is a SaaS-oriented task management microservice built with a clean, modular architecture.  
It provides a production-like REST API for creating, reading, updating, deleting, and filtering tasks.

## Tech Stack

- Node.js (LTS)
- Express.js
- Prisma ORM
- SQLite
- Zod
- Jest + Supertest

## Project Structure

```
taskmaster-pro/
  prisma/
    schema.prisma
  src/
    app.js
    server.js
    routes/
      task.routes.js
    controllers/
      task.controller.js
    services/
      task.service.js
    repositories/
      task.repository.js
    validations/
      task.validation.js
    middleware/
      error.middleware.js
    utils/
      apiError.js
  tests/
    task.test.js
```

## Setup Instructions

1. Install dependencies:

```bash
npm install
```

2. Run Prisma migration:

```bash
npx prisma migrate dev --name init
```

This creates the SQLite database and generates the Prisma client.

## Run the App

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The API runs on `http://localhost:3000` by default.

## Run Tests

```bash
npm test
```

## Run with Docker

Build and run locally with Docker Compose:

```bash
docker compose up --build
```

Run in detached mode:

```bash
docker compose up --build -d
```

Stop containers:

```bash
docker compose down
```

The API will be available at `http://localhost:3000`.

## API Endpoints

### Create Task
- `POST /tasks`

Example body:

```json
{
  "title": "Prepare sprint demo",
  "description": "Collect metrics and slides",
  "status": "pending"
}
```

### Get All Tasks
- `GET /tasks`
- Optional filter: `GET /tasks?status=pending`
- Optional filter: `GET /tasks?status=completed`

### Get Task by ID
- `GET /tasks/:id`

### Update Task
- `PUT /tasks/:id`

Example body:

```json
{
  "title": "Prepare sprint demo v2",
  "status": "completed"
}
```

### Delete Task
- `DELETE /tasks/:id`

## Error Format

All errors return:

```json
{
  "success": false,
  "message": "Error message"
}
```

Common status codes:
- `400` bad request
- `404` not found
- `500` internal server error

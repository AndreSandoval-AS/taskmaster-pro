You are a senior backend engineer.

Your task is to generate a complete backend MVP project called "TaskMaster Pro", a SaaS task management microservice.

The goal is to produce production-quality code with a clean, modular architecture, while keeping it simple enough for an MVP.

---

# PURPOSE

This project is a backend service for managing tasks in a corporate environment.

It must demonstrate:
- clean architecture
- clear separation of concerns
- professional API design
- proper validation and error handling
- testable and maintainable code

The output should be close to real-world production standards, not a tutorial-level implementation.

---

# TECH STACK

Use the following technologies:

- Node.js (latest LTS)
- Express.js
- Prisma ORM
- SQLite (local database)
- Zod (for validation)
- Jest + Supertest (for testing)

---

# DEPENDENCIES

Install and configure the following:

Runtime:
- express
- @prisma/client
- zod

Dev:
- prisma
- jest
- supertest
- nodemon

---

# ARCHITECTURE

Follow a simplified Clean Architecture approach:

- routes → HTTP layer
- controllers → request/response handling
- services → business logic
- repositories → database access (Prisma)
- validations → input validation (Zod)
- middleware → error handling
- utils → shared utilities

Avoid overengineering, but enforce separation of concerns.

---

# PROJECT STRUCTURE

Generate this structure:

/prisma
  schema.prisma

/src
  app.js
  server.js

  /routes
    task.routes.js

  /controllers
    task.controller.js

  /services
    task.service.js

  /repositories
    task.repository.js

  /validations
    task.validation.js

  /middleware
    error.middleware.js

  /utils
    apiError.js

/tests
  task.test.js

.cursorrules
package.json
README.md

---

# DATABASE DESIGN

Use Prisma with SQLite.

Create:

Enum:
- TaskStatus → pending, completed

Model:
Task:
- id (auto-increment int, primary key)
- title (string, required)
- description (string, optional)
- status (enum, default: pending)
- createdAt (datetime, default now)

---

# API REQUIREMENTS

Implement a REST API:

POST   /tasks
GET    /tasks
GET    /tasks/:id
PUT    /tasks/:id
DELETE /tasks/:id

Also support filtering:

GET /tasks?status=pending
GET /tasks?status=completed

---

# VALIDATION RULES

Use Zod:

- title is required on create
- status must be pending or completed
- id must be numeric
- reject invalid query params

---

# BUSINESS LOGIC

- Throw error if task not found
- Prevent invalid status updates
- Support filtering by status
- Keep logic inside services, not controllers

---

# ERROR HANDLING

Implement:

- ApiError class
- global error middleware
- consistent JSON error format:

{
  "success": false,
  "message": "Error message"
}

Use proper HTTP status codes:
- 400 bad request
- 404 not found
- 500 internal error

---

# TESTING

Use Jest + Supertest.

Write tests for:

- create task
- validation failure
- get all tasks
- filter by status
- get task by id (success + not found)
- update task
- delete task

Tests should be runnable with:

npm test

---

# DOCUMENTATION

Generate a README.md including:

- project description
- stack
- setup instructions
- how to run the app
- how to run tests
- API endpoints

---

# CODE QUALITY CONSTRAINTS

- Use async/await (no callbacks)
- Keep functions small and focused
- Use clear naming conventions
- Avoid duplication
- Keep controllers thin
- Do not put business logic in routes
- Do not access Prisma outside repository layer

---

# CONSTRAINTS

- Do NOT use TypeScript (use clean JavaScript with JSDoc if needed)
- Do NOT use external databases (only SQLite)
- Do NOT use complex frameworks (no NestJS)
- Do NOT overcomplicate architecture
- Keep it MVP but production-like

---

# OUTPUT EXPECTATION

Generate:

1. All files with working code
2. Prisma schema
3. Express app setup
4. All layers implemented
5. Tests ready to run
6. README complete

The project must run with:

npm install
npx prisma migrate dev
npm run dev
npm test

---

# FINAL INSTRUCTION

Think like a senior engineer building a clean MVP for a startup.

Prioritize:
- clarity
- maintainability
- correctness

Now generate the full project.
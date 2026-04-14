process.env.DATABASE_URL = "file:./test.db";

const { execSync } = require("node:child_process");
const request = require("supertest");
const { PrismaClient } = require("@prisma/client");
const app = require("../src/app");

const prisma = new PrismaClient();

describe("Task API", () => {
  beforeAll(async () => {
    execSync("npx prisma db push --skip-generate", {
      stdio: "ignore",
      env: { ...process.env, DATABASE_URL: "file:./test.db" },
    });
    await prisma.$connect();
  });

  beforeEach(async () => {
    await prisma.task.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("creates a task", async () => {
    const response = await request(app).post("/tasks").send({
      title: "Prepare quarterly report",
      description: "Summarize performance data",
    });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.title).toBe("Prepare quarterly report");
    expect(response.body.data.status).toBe("pending");
  });

  it("returns validation error for invalid task payload", async () => {
    const response = await request(app).post("/tasks").send({
      description: "Missing title field",
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it("returns validation error for invalid task status", async () => {
    const response = await request(app).post("/tasks").send({
      title: "Bad status",
      status: "in_progress",
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      message: "Status must be either pending or completed",
    });
  });

  it("gets all tasks", async () => {
    await request(app).post("/tasks").send({ title: "Task one" });
    await request(app).post("/tasks").send({ title: "Task two" });

    const response = await request(app).get("/tasks");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveLength(2);
  });

  it("filters tasks by status", async () => {
    await request(app).post("/tasks").send({ title: "Pending task" });
    await request(app).post("/tasks").send({
      title: "Completed task",
      status: "completed",
    });

    const response = await request(app).get("/tasks?status=completed");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0].status).toBe("completed");
  });

  it("returns validation error for invalid filter query", async () => {
    const response = await request(app).get("/tasks?status=done");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      message: "Status must be either pending or completed",
    });
  });

  it("gets a task by id and returns not found when missing", async () => {
    const createResponse = await request(app).post("/tasks").send({ title: "Find me" });
    const taskId = createResponse.body.data.id;

    const successResponse = await request(app).get(`/tasks/${taskId}`);
    expect(successResponse.status).toBe(200);
    expect(successResponse.body.data.id).toBe(taskId);

    const notFoundResponse = await request(app).get("/tasks/9999");
    expect(notFoundResponse.status).toBe(404);
    expect(notFoundResponse.body.success).toBe(false);
  });

  it("returns validation error for non-numeric task id", async () => {
    const response = await request(app).get("/tasks/abc");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      message: "Task id must be a positive integer",
    });
  });

  it("updates a task", async () => {
    const createResponse = await request(app).post("/tasks").send({ title: "Old title" });
    const taskId = createResponse.body.data.id;

    const response = await request(app).put(`/tasks/${taskId}`).send({
      title: "New title",
      status: "completed",
    });

    expect(response.status).toBe(200);
    expect(response.body.data.title).toBe("New title");
    expect(response.body.data.status).toBe("completed");
  });

  it("deletes a task", async () => {
    const createResponse = await request(app).post("/tasks").send({ title: "Delete me" });
    const taskId = createResponse.body.data.id;

    const deleteResponse = await request(app).delete(`/tasks/${taskId}`);
    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body.success).toBe(true);

    const getResponse = await request(app).get(`/tasks/${taskId}`);
    expect(getResponse.status).toBe(404);
  });

  it("returns bad request for malformed JSON body", async () => {
    const response = await request(app)
      .post("/tasks")
      .set("Content-Type", "application/json")
      .send("{\"title\":\"Broken JSON\"");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      message: "Malformed JSON request body",
    });
  });
});

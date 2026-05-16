import request from "supertest";
import { describe, it, expect, beforeEach } from "vitest";
import app from "../../src/index";
import prisma from "../../src/lib/prisma";

let token: string;
let taskId: number;

beforeEach(async () => {
  await prisma.task.deleteMany();
  await prisma.user.deleteMany();

  await request(app).post("/api/auth/register").send({
    firstName: "test",
    lastName: "test",
    email: "test@example.com",
    password: "secret123",
  });

  const loginResponse = await request(app).post("/api/auth/login").send({
    email: "test@example.com",
    password: "secret123",
  });

  token = loginResponse.body.token;

  const createResponse = await request(app)
    .post("/api/task")
    .set("Authorization", `Bearer ${token}`)
    .send({
      subject: "Test Task",
      description: "Test Description",
      status: "PENDING",
    });
  taskId = createResponse.body.result.id;
});

describe("GET /api/task", () => {
  it("should return 200 when fetching all tasks", async () => {
    const response = await request(app)
      .get("/api/task")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it("should return 401 when no token provided", async () => {
    const response = await request(app).get("/api/task");
    expect(response.status).toBe(401);
  });
});

describe("GET /api/task/:id", () => {
  it("should return 200 when task exists", async () => {
    const response = await request(app)
      .get(`/api/task/${taskId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it("should return 404 when task not found", async () => {});
  it("should return 401 when no token provided", async () => {});
});

describe("POST /api/task", () => {
  it("should return 201 when valid data provided", async () => {});
  it("should return 400 when invalid data provided", async () => {});
  it("should return 401 when no token provided", async () => {});
});

describe("PATCH /api/task/:id", () => {
  it("should return 200 when task updated", async () => {});
  it("should return 401 when no token provided", async () => {});
});

describe("DELETE /api/task/:id", () => {
  it("should return 200 when task deleted", async () => {});
  it("should return 401 when no token provided", async () => {});
});

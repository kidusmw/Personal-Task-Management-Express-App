import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../../src/index";
import prisma from "../../src/lib/prisma";
import { beforeEach } from "vitest";

beforeEach(async () => {
  await prisma.user.deleteMany();
  await prisma.task.deleteMany();
});

describe("POST /api/auth/register", () => {
  // HAPPY PATH
  it("should return 201 when valid data is provided", async () => {
    const response = await request(app).post("/api/auth/register").send({
      firstName: "test",
      lastName: "test",
      email: "test@example.com",
      password: "secret123",
    });
    expect(response.status).toBe(201);
  });

  // SAD PATH
  it("should return 400 when invalid data is provided", async () => {
    const response = await request(app).post("/api/auth/register").send({
      firstName: 1,
      lastName: "test",
      email: "test@example.com",
      password: "secret123",
    });

    expect(response.status).toBe(400);
  });
});

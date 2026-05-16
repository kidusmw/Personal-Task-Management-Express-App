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

describe("POST /api/auth/login", () => {
  beforeEach(async () => {
    await request(app).post("/api/auth/register").send({
      firstName: "test",
      lastName: "test",
      email: "test@example.com",
      password: "secret123",
    });
  });

  // VALID CREDENTIALS
  it("should return 200 when valid data is provided", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "secret123",
    });
    expect(response.status).toBe(200);
  });

  // WRONG PASSWORD
  it("should return 401 when wrong password is entered", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "secret12",
    });
    expect(response.status).toBe(401);
  });

  // EMAIL DOESN'T EXIST
  it("should return 401 when email doesn't exist", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "tes@example.com",
      password: "secret123",
    });
    expect(response.status).toBe(401);
  });
});

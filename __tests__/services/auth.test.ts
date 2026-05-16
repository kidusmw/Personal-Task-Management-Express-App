import { describe, it, expect, vi } from "vitest";
import { prismaMock } from "../helpers/prismaMock";
import { register, login } from "../../src/services/auth";

vi.mock("bcryptjs", () => ({
  default: {
    hash: vi.fn().mockResolvedValue("hashedpassword"),
    compare: vi.fn().mockResolvedValue(true),
  },
}));

const fakeUser = {
  id: 1,
  firstName: "test",
  lastName: "test",
  email: "test@example.com",
  password: "hashedpassword",
  createdAt: new Date(),
};

describe("register", () => {
  // HAPPY PATH
  it("should return a new user when firstName, lastName, email and password are provided", async () => {
    prismaMock.user.create.mockResolvedValue(fakeUser);
    const result = await register(
      fakeUser.firstName,
      fakeUser.lastName,
      fakeUser.email,
      "secret123",
    );
    expect(result).toEqual(fakeUser);
  });

  // SAD PATH
  it("should throw an error when user already registered", async () => {
    const { firstName, lastName, email } = fakeUser;
    prismaMock.user.findUnique.mockResolvedValue(fakeUser);
    await expect(
      register(firstName, lastName, email, "secret123"),
    ).rejects.toThrow("Account already exists");
  });
});

describe("login", () => {
  it("should return a logged In user when valid email and password provided", async () => {
    const { email } = fakeUser;
    prismaMock.user.findUnique.mockResolvedValue(fakeUser);
    const result = await login(email, "secret123");
    expect(result).toHaveProperty("token");
  });
});

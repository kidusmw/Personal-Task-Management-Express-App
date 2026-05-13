import { describe, it, expect } from "vitest";
import { prismaMock } from "../helpers/prismaMock";
import { register, login } from "../../src/services/auth";
import { rejects } from "assert/strict";

describe("register", () => {
  const fakeUser = {
    id: 1,
    firstName: "test",
    lastName: "test",
    email: "test@example.com",
    password: "secret123",
    createdAt: new Date(),
    tasks: [],
  };
  it("should return a new user when firstName, lastName, email and password are provided", async () => {
    prismaMock.user.create.mockResolvedValue(fakeUser);
    const result = await register(
      fakeUser.firstName,
      fakeUser.lastName,
      fakeUser.email,
      fakeUser.password,
    );
    expect(result).toEqual(fakeUser);
  });

  // SAD PATH
  it("should throw an error when user already registered", async () => {
    const { firstName, lastName, email, password } = fakeUser;
    prismaMock.user.findUnique.mockResolvedValue(fakeUser);
    await expect(
      register(firstName, lastName, email, password),
    ).rejects.toThrow("Account already exists");
  });
});

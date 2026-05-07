import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import "dotenv/config";

export async function register(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
) {
  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    throw new Error("Account already exists");
  }

  const hash = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hash,
    },
    omit: {
      password: true,
    },
  });
}

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET || "",
    {
      expiresIn: "7d",
    },
  );

  return { token };
}

import { beforeEach, vi } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";
import { PrismaClient } from "../../src/generated/prisma/client";
import prisma from "../../src/lib/prisma";

vi.mock("../../src/lib/prisma", () => ({
  default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock = prisma as unknown as ReturnType<
  typeof mockDeep<PrismaClient>
>;

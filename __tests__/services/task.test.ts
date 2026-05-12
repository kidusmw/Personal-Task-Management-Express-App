import { describe, it, expect } from "vitest";
import { prismaMock } from "../helpers/prismaMock";
import { getTasksById } from "../../src/services/task";
import { Status } from "../../src/generated/prisma/enums";

describe("getTaskById", () => {
  it("should return a task when valid userId and taskId are provided", async () => {
    const fakeTask = {
      id: 1,
      subject: "Test Subject",
      description: "Test Description",
      status: "PENDING" as Status,
      deadline: null,
      userId: 1,
      createdAt: new Date(),
    };
    prismaMock.task.findFirst.mockResolvedValue(fakeTask);
    const result = await getTasksById(1, 1);
    expect(result).toEqual(fakeTask);
  });
});

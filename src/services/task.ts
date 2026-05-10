import prisma from "../lib/prisma";
import { Status } from "../generated/prisma/enums";
import { TaskQuery } from "../types/task";

export async function getTasks(
  userId: number,
  { page, limit, search }: TaskQuery,
) {
  const skip = (page - 1) * limit;
  const take = limit;
  const where = search
    ? {
        userId,
        OR: [{ subject: { contains: search } }],
      }
    : { userId };

  const [tasks, total] = await Promise.all([
    prisma.task.findMany({ where, skip, take }),
    prisma.task.count({ where }),
  ]);

  return {
    data: tasks,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getTasksById(userId: number, taskId: number) {
  const task = await prisma.task.findFirst({
    where: { userId, id: taskId },
  });

  if (!task) {
    throw new Error("Task Not Found");
  }
  return task;
}

export async function createTask(
  userId: number,
  subject: string,
  description: string,
  status: Status,
  deadline?: Date,
) {
  const new_task = await prisma.task.create({
    data: {
      subject,
      description,
      status,
      deadline,
      user: { connect: { id: userId } },
    },
  });
  return new_task;
}

export async function updateTask(
  taskId: number,
  userId: number,
  data: Partial<{
    subject: string;
    description: string;
    status: Status;
    deadline: Date;
  }>,
) {
  return prisma.task.update({
    where: { id: taskId, userId },
    data,
  });
}

export async function deleteTask(userId: number, taskId: number) {
  return prisma.task.delete({
    where: { id: taskId, userId },
  });
}

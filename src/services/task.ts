import prisma from "../lib/prisma";

export async function GetTasks(
  userId: number,
  page: number,
  limit: number,
  search: string,
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

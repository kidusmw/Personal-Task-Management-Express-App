import z from "zod";
import { Status } from "../generated/prisma/enums";

export const taskQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).default(10),
  search: z.coerce.string().optional(),
});

export const createTaskSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  description: z.string().min(1, "Description is required"),
  status: z.enum(["PENDING", "COMPLETED", "FAILED"]).default("PENDING"),
  deadline: z.coerce.date().optional(),
});

export const updateTaskSchema = createTaskSchema.partial();

export type TaskQuery = z.infer<typeof taskQuerySchema>;
export type CreateTask = z.infer<typeof createTaskSchema>;
export type UpdateTask = z.infer<typeof updateTaskSchema>;

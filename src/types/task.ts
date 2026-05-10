import z from "zod";

export const taskQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).default(10),
  search: z.coerce.string().optional(),
});

export type TaskQuery = z.infer<typeof taskQuerySchema>;

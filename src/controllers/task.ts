import { Response, NextFunction } from "express";
import { UserRequest } from "../types/auth";
import { getTasks } from "../services/task";
import { taskQuerySchema } from "../types/task";

export async function getTasksHandler(
  req: UserRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.user!.id;
    const query = taskQuerySchema.parse(req.query);
    const result = await getTasks(userId, query);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

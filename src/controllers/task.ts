import { Response, NextFunction } from "express";
import { UserRequest } from "../types/auth";
import {
  createTask,
  deleteTask,
  getTasks,
  getTasksById,
  updateTask,
} from "../services/task";
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

export async function getTaskByIdHandler(
  req: UserRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const taskId = parseInt(req.params.id as string);
    const userId = req.user!.id;
    const result = await getTasksById(userId, taskId);
    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
}

export async function createTaskHandler(
  req: UserRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { subject, description, status, deadline } = req.body;
    const userId = req.user!.id;
    const result = await createTask(userId, {
      subject,
      description,
      status,
      deadline,
    });
    res.status(201).json({
      message: "Task created",
      result,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateTaskHandler(
  req: UserRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = req.body;
    const userId = req.user!.id;
    const taskId = parseInt(req.params.id as string);
    const result = await updateTask(taskId, userId, data);
    res.status(200).json({
      message: "Task updated",
      result,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteTaskHandler(
  req: UserRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const taskId = parseInt(req.params.id as string);
    const userId = req.user!.id;
    const result = await deleteTask(userId, taskId);
    res.status(200).json({
      message: "Task deleted",
      result,
    });
  } catch (err) {
    next(err);
  }
}

import { Router } from "express";
import {
  getTasksHandler,
  getTaskByIdHandler,
  createTaskHandler,
  updateTaskHandler,
  deleteTaskHandler,
} from "../controllers/task";
import { authenticate } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { createTaskSchema, updateTaskSchema } from "../types/task";

const router = Router();

router.get("/", authenticate, getTasksHandler);
router.get("/:id", authenticate, getTaskByIdHandler);
router.post("/", authenticate, validate(createTaskSchema), createTaskHandler);
router.patch(
  "/:id",
  authenticate,
  validate(updateTaskSchema),
  updateTaskHandler,
);
router.delete("/:id", authenticate, deleteTaskHandler);

export default router;

import { Router } from "express";
import {
  getTasksHandler,
  getTaskByIdHandler,
  createTaskHandler,
  updateTaskHandler,
  deleteTaskHandler,
} from "../controllers/task";
import { authenticate } from "../middleware/auth";

const router = Router();

router.get("/", authenticate, getTasksHandler);
router.get("/:id", authenticate, getTaskByIdHandler);
router.post("/", authenticate, createTaskHandler);
router.patch("/:id", authenticate, updateTaskHandler);
router.delete("/:id", authenticate, deleteTaskHandler);

export default router;

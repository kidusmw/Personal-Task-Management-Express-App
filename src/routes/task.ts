import { Router } from "express";
import { getTasksHandler } from "../controllers/task";
import { authenticate } from "../middleware/auth";

const router = Router();

router.get("/", authenticate, getTasksHandler);

export default router;

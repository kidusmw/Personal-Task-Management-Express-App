import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth";
import { validate } from "../middleware/validate";
import { registerSchema } from "../types/auth";

const router = Router();

router.post("/login", loginUser);
router.post("/register", validate(registerSchema), registerUser);

export default router;

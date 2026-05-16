import { Request } from "express";
import z from "zod";

export interface UserRequest extends Request {
  user?: {
    id: number;
    email: string;
  };
}

export const registerSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.email().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export type Register = z.infer<typeof registerSchema>;

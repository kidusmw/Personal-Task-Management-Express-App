import { Request, Response, NextFunction } from "express";
import { register, login } from "../services/auth";

export async function registerUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { firstName, lastName, email, password } = req.body;
    const result = await register(firstName, lastName, email, password);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email, password } = req.body;
    const result = await login({ email, password });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

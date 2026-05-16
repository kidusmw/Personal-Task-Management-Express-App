import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(err.message);

  if (err.message === "Invalid credentials") {
    return res.status(401).json({ error: err.message });
  }

  if (err.message === "Account already exists") {
    return res.status(409).json({ error: err.message });
  }

  if (err.message === "Task Not Found") {
    return res.status(404).json({ error: err.message });
  }

  res.status(500).json({ error: err.message });
}

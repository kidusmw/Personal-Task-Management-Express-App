import { Response, NextFunction } from "express";
import { UserRequest } from "../types/auth";
import jwt from "jsonwebtoken";
import "dotenv/config";

export function authenticate(
  req: UserRequest,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
    req.user = decoded as UserRequest["user"];
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

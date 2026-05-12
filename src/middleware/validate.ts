import { Request, Response, NextFunction } from "express";
import z from "zod";

export function validate(schema: z.ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const body = schema.safeParse(req.body);
    if (body.error) {
      return res.status(400).json({ errors: body.error.issues });
    }
    req.body = body.data;
    next();
  };
}

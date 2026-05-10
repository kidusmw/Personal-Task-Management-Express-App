import express from "express";
import "dotenv/config";
import authRouter from "./routes/auth";
import taskRouter from "./routes/task";
import { Request, Response, NextFunction } from "express";

const app = express();
app.use(express.json());
const PORT = process.env.PORT;

app.use("/api/auth", authRouter);
app.use("/api/task", taskRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

import express from "express";
import "dotenv/config";
import authRouter from "./routes/auth";
import taskRouter from "./routes/task";
import { Request, Response, NextFunction } from "express";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
app.use(express.json());
const PORT = process.env.PORT;

app.use("/api/auth", authRouter);
app.use("/api/task", taskRouter);

app.use(errorHandler);

export default app;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

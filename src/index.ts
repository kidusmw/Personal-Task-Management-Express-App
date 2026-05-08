import express from "express";
import "dotenv/config";
import authRouter from "./routes/auth";

const app = express();
app.use(express.json());
const PORT = process.env.PORT;

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js";

import connectDB from "./utils/db.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);

app.listen(3000, () => {
  console.log("App successfully listening on port 3000");
});

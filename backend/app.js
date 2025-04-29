import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import adminRouter from "./routes/adminRoutes.js";

import connectDB from "./config/db.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/admin", adminRouter);

app.listen(3000, () => {
  console.log("App successfully listening on port 3000");
});

import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { getOrders } from "../controllers/orderController.js";

const router = express.Router();
router.get("/", userAuth, getOrders);
export default router;

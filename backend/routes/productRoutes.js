import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  getAllProducts,
  getProductById,
} from "../controllers/productController.js";
const router = express.Router();

router.get("/", userAuth, getAllProducts);

router.get("/:productId", userAuth, getProductById);

export default router;

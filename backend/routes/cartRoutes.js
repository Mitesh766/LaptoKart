import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  addToCart,
  getCart,
  removeFromCart,
  handleCartQty,
} from "../controllers/cartController.js";
const router = express.Router();

router.get("/", userAuth, getCart);

router
  .route("/:productId")
  .post(userAuth, addToCart)
  .delete(userAuth, removeFromCart)
  .put(userAuth, handleCartQty);

export default router;

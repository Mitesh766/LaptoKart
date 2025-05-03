import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { addToWishList, getWishList, removeFromWishList } from "../controllers/wishlistController.js";

const router = express.Router();

router.get("/", userAuth, getWishList);

router
  .route("/:productId")
  .post(userAuth, addToWishList)
  .delete(userAuth, removeFromWishList);

export default router;

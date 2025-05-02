import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  getWishList,
  addToWishList,
  removeFromWishList,
  getOrders,
  getUserData,
} from "../controllers/userController.js";
import userAuth from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/",userAuth,getUserData)

router.post("/register", registerUser);
router.post("/login", loginUser);
router.route("/profile").get(userAuth, getProfile).put(userAuth, updateProfile);
router.get("/wishlist", userAuth, getWishList);
router
  .route("/wishlist/:productId")
  .post(userAuth, addToWishList)
  .delete(userAuth, removeFromWishList);

router.get("/orders", userAuth, getOrders);
export default router;

import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  getUserData,
} from "../controllers/userController.js";
import userAuth from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/",userAuth,getUserData)

router.post("/register", registerUser);
router.post("/login", loginUser);
router.route("/profile").get(userAuth, getProfile).put(userAuth, updateProfile);




export default router;

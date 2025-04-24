import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import adminAuthenticate from "../middlewares/adminMiddleware.js";
import { createProduct, getAllUsers, updateProduct } from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
const router = express.Router();

router.get("/getAllUsers", userAuth, adminAuthenticate, getAllUsers);

router.post(
  "/createProduct",
  userAuth,
  adminAuthenticate,
  upload.single("image"),
  createProduct
);

router.put("/:productId",userAuth,adminAuthenticate,updateProduct)

export default router;

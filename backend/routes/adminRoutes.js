import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import adminAuthenticate from "../middlewares/adminMiddleware.js";
import { createProduct, getAllUsers } from "../controllers/adminController.js";
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
  

export default router;

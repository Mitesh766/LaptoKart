    import express from "express";
    import {
    signup,
    login,
    getProfile,
    updateProfile,
    } from "../controllers/userController.js";
    import userAuth from "../middlewares/authMiddleware.js";

    const router = express.Router();

    router.post("/register", signup);
    router.post("/login", login);
    router.route("/profile").get(userAuth, getProfile).put(userAuth, updateProfile);
    export default router;

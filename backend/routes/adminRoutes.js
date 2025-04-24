import express from "express"
import userAuth from "../middlewares/authMiddleware.js"
import adminAuthenticate from "../middlewares/adminMiddleware.js"
import { getAllUsers } from "../controllers/adminController.js"

const router = express.Router()


router.get("/getAllUsers",userAuth,adminAuthenticate,getAllUsers)


export default router
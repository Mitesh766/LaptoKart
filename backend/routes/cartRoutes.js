import express from "express"
import userAuth from "../middlewares/authMiddleware.js"
import { addToCart, getCart } from "../controllers/cartController.js"
const router = express.Router()

router.get("/",userAuth,getCart)
router.post("/:productId",userAuth,addToCart)

export default router

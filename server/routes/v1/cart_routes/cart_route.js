import express from "express";
import { getCartFromID } from "../../../controllers/cart_controllers/cart_controller.js";
import { verifyToken } from "../../../middlewares/authMiddleware.js";
const route = express.Router()


route.get('/cart', verifyToken, getCartFromID)

export default route

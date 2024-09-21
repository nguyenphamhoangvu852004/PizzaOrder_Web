import express from "express";
import { getUser, doUpdateUser } from "../../../controllers/user_controllers/user_Controller.js"
import { verifyToken } from "../../../middlewares/authMiddleware.js";
const route = express.Router()



// Lấy userInfo
route.get('/user', verifyToken, getUser)

// Chỉnh sửa thông tin cá nhân user
route.patch('/user', verifyToken, doUpdateUser)




export default route

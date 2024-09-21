import express from "express";
import { doUpdateAddress, doDeleteAddress, } from "../../../controllers/user_controllers/user_Controller.js"
import { verifyToken } from "../../../middlewares/authMiddleware.js";
const route = express.Router()

// Chỉnh sửa Thông tin địa chỉ 
route.patch('/address', verifyToken, doUpdateAddress)

// Xóa dữ liệu trong trường 
route.delete('/address', verifyToken, doDeleteAddress)


export default route

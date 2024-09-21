
import express from "express";
import { doLogin, doRegister } from "../../../controllers/authen_controllers/authen_controller.js"

const route = express.Router()


route.post('/auth/login', doLogin);

route.post('/auth/register', doRegister);




export default route

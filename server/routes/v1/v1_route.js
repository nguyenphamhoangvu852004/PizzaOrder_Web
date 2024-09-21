import express from "express";
import cart_route from "./cart_routes/cart_route.js"
import product_route from "./product_routes/product_route.js"
import user_route from "./user_routes/user_route.js"
import authen_route from "./authen_routes/authen_route.js"
import address_route from "./user_routes/address_route.js"
const route = express.Router()



route.use(authen_route)
route.use(user_route)
route.use(address_route)
route.use(product_route)
route.use(cart_route)
export default route



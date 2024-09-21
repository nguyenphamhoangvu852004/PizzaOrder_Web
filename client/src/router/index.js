import { createRouter, createWebHistory } from 'vue-router'
import carousel from "../components/carousel.vue"
import product_list from "../components/product-list.vue"
import form_login from "../components/form-login.vue"
import form_signup from "../components/form-signup.vue"
import product_detail from "../components/product-detail.vue"
import shopping_cart from "../components/shoppingCart.vue"
import payment from "../components/payment.vue"
import user from "../components/user.vue"
import messages from "../components/messages.vue"
import address from "../components/address.vue"
import history from "../components/history.vue"
const routes = [
  {
    path: '/',
    components: {
      default: carousel,
      productList: product_list
    }
  }, {
    path: '/form-login',
    component: form_login
  },
  {
    path: '/form-signup',
    component: form_signup
  },
  {
    path: '/product-detail',
    component: product_detail
  },
  {
    path: '/shopping-cart',
    component: shopping_cart
  },
  {
    path: '/payment',
    component: payment
  }, {
    path: '/user',
    component: user
  },
  , {
    path: '/messages',
    component: messages
  }
  , {
    path: '/address',
    component: address
  },
  {
    path: '/history',
    component: history
  },
  
  
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

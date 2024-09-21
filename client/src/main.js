import App from './App.vue'
import router from './router'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import * as Vue from 'vue' // in Vue 3
import axiosInstance from './axios' // Import axios instance từ file axios.js
import VueAxios from 'vue-axios'
import vue3GoogleLogin from 'vue3-google-login'

const CLIENT_ID = "79499781603-2rtunbk322ji97b1gibsujpm3rjm589k.apps.googleusercontent.com"
const app = Vue.createApp(App)
app.use(vue3GoogleLogin, {
    clientId: CLIENT_ID,
})
// Sử dụng axios instance đã được cấu hình
app.use(VueAxios, axiosInstance)
app.use(Buefy)
app.use(router)
app.mount('#app')

<template>
  <section class="section">
    <div class="container">
      <h2 class="title is-2">Our products</h2>
      <div v-if="loading" class="has-text-centered">
        <span class="icon is-large">
          <i class="fas fa-spinner fa-pulse fa-3x"></i>
        </span>
        <p class="loading-message">Please Wait For Loading</p>
      </div>
      <div v-else class="columns is-multiline">
        <div v-for="(product, index) in products" :key="index" class="column is-3">
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img :src="`/images/${product.Image}`" :alt="product.Name" />
              </figure>
            </div>

            <div class="card-content">
              <p class="title is-4">{{ product.Name }}</p>
              <p class="subtitle is-6">{{ product.Price }} đ</p>
            </div>
            <div class="card-footer">
              <a @click="" class="card-footer-item"> Detail</a>
              <a @click="addToCart(product)" class="card-footer-item">
                Add to cart
              </a>

            </div>
          </div>
        </div>
      </div>
    </div>
    <Notification :message="notificationMessage" :isVisible="isNotificationVisible" @close="closeNotification" />
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "@/axios";
import Notification from "./Notification.vue";

const products = ref([]);
const loading = ref(true);
const notificationMessage = ref("");
const isNotificationVisible = ref(false);

const getAllProduct = async () => {
  loading.value = true;
  try {
    const result = await axios.get("product");
    products.value = result;
  } catch (error) {
    console.log("Error fetching products:", error);
  } finally {
    loading.value = false;
  }
};


const addToCart = (product) => {
  let userID = localStorage.getItem("userID");
  let cart = JSON.parse(localStorage.getItem("cart")) || {};

  if (!cart[userID]) {
    cart[userID] = [];
  }

  let existingProduct = cart[userID].find(
    (item) => item.productID === product.ProductID
  );

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart[userID].push({
      productID: product.ProductID,
      name: product.Name,
      price: product.Price,
      image: product.Image,
      quantity: 1,
    });
  }


  localStorage.setItem("cart", JSON.stringify(cart));

  // Hiển thị thông báo

  notificationMessage.value = `Đã thêm ${product.Name} vào giỏ hàng`;
  isNotificationVisible.value = true;
};
const testing = () => {
  console.log("Hàm này dùng để test nvim coi nó chạy ổn hay không, tôi thấy")

}

const closeNotification = () => {
  isNotificationVisible.value = false;
};

onMounted(() => {
  getAllProduct();
});
</script>

<style src="../styles/components/product-list.css" scoped></style>

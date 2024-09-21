<template>
  <section class="section">
    <div class="container">
      <h2 class="title is-2">Shopping Cart</h2>
      <div class="cart-container">
        <div class="list-products">
          <div class="product-detail" v-for="(product, index) in products" :key="index">
            <img :src="`/images/${product.image}`" :alt="product.name" />
            <div class="product-info">
              <h3 class="product-name">{{ product.name }}</h3>
              <p class="product-price">{{ product.price }} đ</p>
              <div class="quantity-control">
                <button @click="decreaseQuantity(index)">-</button>
                <span>{{ product.quantity }}</span>
                <button @click="increaseQuantity(index)">+</button>
              </div>
            </div>
            <button class="remove-btn" @click="removeProduct(index)">X</button>
          </div>
        </div>
        <div class="cart-summary">
          <div class="total">
            <h3>Total Amount</h3>
            <p>{{ totalPrice }} đ</p>
          </div>
          <div class="option">
            <button class="remove-all-btn" @click="removeAllProducts">
              Remove all
            </button>
            <a href="/">
              <button class="continue-btn">Continue shopping</button>
            </a>
            <a>
              <button class="checkout-btn" @click="proceedToPayment">
                Go to payment page
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

const products = ref([]);

onMounted(() => {
  let userID = localStorage.getItem("userID");
  let cart = JSON.parse(localStorage.getItem("cart")) || {};

  // Load products from cart for the current user
  if (cart[userID]) {
    products.value = cart[userID];
  }
});

const increaseQuantity = (index) => {
  products.value[index].quantity += 1;
  updateCart();
};

const decreaseQuantity = (index) => {
  if (products.value[index].quantity > 1) {
    products.value[index].quantity -= 1;
    updateCart();
  }
};

const removeProduct = (index) => {
  products.value.splice(index, 1);
  updateCart();
};

const removeAllProducts = () => {
  products.value = []; // Xóa tất cả sản phẩm trong giỏ
  updateCart(); // Cập nhật giỏ hàng trong localStorage
};

const updateCart = () => {
  let userID = localStorage.getItem("userID");
  let cart = JSON.parse(localStorage.getItem("cart")) || {};
  cart[userID] = products.value;
  localStorage.setItem("cart", JSON.stringify(cart));
};

const totalPrice = computed(() => {
  return products.value.reduce(
    (total, product) => total + product.quantity * product.price,
    0
  );
});

const proceedToPayment = () => {
  // Logic để tiến hành thanh toán
  window.location.href = "/payment";
};
</script>

<style src="../styles/components/shoppingcart.css" scoped></style>

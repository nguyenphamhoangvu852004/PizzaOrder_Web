<template>
  <div class="container">
    <h1 class="title">QUÉT MÃ ĐỂ CHUYỂN KHOẢN</h1>

    <div class="bill-container">
      <h2 class="subtitle">Đơn đặt hàng</h2>
      <h2 class="subtitle">Địa chỉ giao hàng: {{ addresses }}</h2>

      <div v-if="cartItems.length > 0" class="product-list">
        <div v-for="(item, index) in cartItems" :key="index" class="product-item">
          <img :src="`/images/${item.image}`" alt="Product Image" />

          <span class="product-name">{{ item.name }}</span>
          <span class="product-quantity">x{{ item.quantity }} </span>
          <span class="product-price">
            {{ formatPrice(item.price * item.quantity) }} đ
          </span>
        </div>
      </div>
      <div v-else>
        <p>Giỏ hàng trống.</p>
      </div>
      <div class="total-amount">
        <strong>Tổng cộng:</strong> {{ formatPrice(totalAmount) }} đ
      </div>
    </div>

    <div class="img-container">
      <img src="/images/QR_Bank.jpg" alt="QR Code for payment" />
    </div>
  </div>
  <div class="payment-container">
    <button @click="payment()" class="payment-button">
      Tiến Hành Thanh Toán
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "@/axios";

const addresses = ref("");
const cartItems = ref([]);
const totalAmount = ref(0);
const userId = localStorage.getItem("userID");
const token = localStorage.getItem("userToken");

onMounted(() => {
  loadCartItems(userId);
  fetchAddresses();
});

const loadCartItems = (userId) => {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    const cartData = JSON.parse(storedCart);
    cartItems.value = cartData[userId] || [];
    calculateTotalAmount();
    console.log(cartItems);
  }
};

const fetchAddresses = async () => {
  try {
    const response = await axios.get(`user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    addresses.value = response.data[0].Address;
  } catch (err) {
    console.error("Error fetching addresses:", err);
  }
};

const calculateTotalAmount = () => {
  totalAmount.value = cartItems.value.reduce((total, item) => {
    return total + parseFloat(item.price) * item.quantity;
  }, 0);
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN").format(price);
};

const payment = async () => {
  try {
    // Tạo một đơn hàng mới
    const createCartResponse = await axios.post(
      `user/cart/createCart`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!createCartResponse.data.success) {
      alert(`Đã có lỗi trong quá trình tạo đơn hàng`);
      return;
    } else {
      // console.log(createCartResponse.data.cartId);
    }

    // Thêm từng sản phẩm vào giỏ hàng mới
    for (const item of cartItems.value) {
      await axios.post(
        `user/cart/addProductToCart`,
        {
          CartID: createCartResponse.data.cartId,
          ProductID: item.productID,
          Quantity: item.quantity,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }

    alert(`Bạn đã thanh toán thành công. Quay về Trang Chủ`);
    // localStorage.removeItem("cart"); // Xóa giỏ hàng khỏi localStorage
    window.location.href = "/";
  } catch (error) {
    console.error(error);
    alert(`Đã có lỗi trong quá trình thanh toán`);
  }
};
</script>

<style src="../styles/components/payment.css" scoped></style>

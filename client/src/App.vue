<template>
  <!-- Đây là phần Header -->
  <div class="fixed-navbar">
    <b-navbar class="navbar">
      <template #brand>
        <b-navbar-item href="/">
          <img src="/images/logo.png" class="navbar-logo" alt="Logo" />
        </b-navbar-item>
      </template>
      <template #start></template>
      <template #end>
        <b-navbar-item tag="div">
          <div class="navbar-buttons">
            <a v-if="!isLogged" href="/form-login" class="navbar-button login-button">
              <img src="/images/account-icon.png" alt="Account" />
            </a>
            <p v-else="username">
              Welcome, <a href="/user">{{ username }}</a>!
            </p>
            <a href="shopping-cart" class="navbar-button cart-button">
              <img src="/images/cart.png" alt="Cart" />
            </a>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
  <!-- Đây là phần Header -->

  <!-- Đây là phần BODY -->
  <div class="main-content">
    <router-view />
    <router-view name="productList"></router-view>
  </div>
  <!-- Đây là phần BODY -->

  <!-- Đây là phần FOOTER -->
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-left">
        <img src="/images/logo.png" alt="Logo" class="footer-logo" />
        <div class="footer-hotline">
          <p>Hotline Đặt Hàng</p>
          <p class="hotline-number">
            The website is in the process of being developed <br />
            by Nguyen Pham Hoang Vu
          </p>
        </div>
      </div>
      <div class="footer-middle">
        <div class="footer-links">
          <a href="#">Blog</a>
          <a href="#">Tuyển Dụng</a>
          <a href="#">Chính Sách</a>
          <a href="#">Thực Đơn</a>
          <a href="#">Mã e-voucher</a>
          <a href="#">Khuyến Mãi</a>
          <a href="#">Theo Dõi Đơn Hàng</a>
          <a href="#">Danh Sách Cửa Hàng</a>
          <a href="#">Rewards</a>
        </div>
      </div>
      <div class="footer-right">
        <div class="footer-social">
          <a href="https://www.facebook.com/profile.php?id=61556666886780">
            <img style="width: 55px" src="/images/facebook-icon.png" alt="Facebook" />
          </a>
          <a href="#">
            <img src="/images/instagram-icon.png" alt="Instagram" />
          </a>
        </div>
        <div class="footer-payment">
          <img src="/images/mastercard-logo.png" alt="MasterCard" />
          <img src="/images/secured-logo.png" alt="Secured" />
        </div>
        <div class="footer-language">
          <button>Switch To English Version</button>
        </div>
      </div>
    </div>
  </footer>
  <!-- Đây là phần FOOTER -->
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import axios from "@/axios.js";

// Biến kiểm tra trạng thái đăng nhập
const isLogged = ref(false);
const username = ref("");

// Hàm kiểm tra trạng thái đăng nhập
const checkLoginStatus = () => {
  const token = localStorage.getItem("userToken");
  if (token) {
    isLogged.value = true;
    getUsernameFromID();
  } else {
    isLogged.value = false;
  }
};

// Hàm lấy tên người dùng từ ID
const getUsernameFromID = async () => {
  //lấy token được lưu trong localStorage
  const token = localStorage.getItem("userToken");
  try {
    const response = await axios.get(`user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.success) {
      username.value = await response.data[0].Username
      return;
    }

  } catch (error) {
    console.log("Error fetching username:", error);
  }
};
// Kiểm tra trạng thái đăng nhập khi component được mounted
onMounted(() => {
  checkLoginStatus();
});
</script>

<style src="./styles/components/App.css" scoped></style>

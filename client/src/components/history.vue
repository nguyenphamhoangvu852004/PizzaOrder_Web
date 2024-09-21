<template>
  <div id="app">
    <h1>Lịch Sử Đơn Hàng</h1>
    <div class="order-list">
      <div class="order-item" v-for="(order, index) in groupedOrders" :key="index">
        <h2>Đơn hàng #{{ order.CartID }}</h2>
        <p>Ngày đặt: {{ order.DateOfOrder }}</p>
        <p>Tổng tiền: {{ order.totalAmount }} VNĐ</p>
        <h3>Chi tiết:</h3>
        <ul>
          <li v-for="item in order.items" :key="item.Name">
            {{ item.Name }} - {{ item.Quantity }} x {{ item.Price }} VNĐ
          </li>
          <div>
            <!-- Hiển thị tình trạng đơn hàng ngẫu nhiên -->
            <p>Tình trạng đơn hàng: {{ getRandomStatus() }}</p>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "@/axios";

const userID = localStorage.getItem(`userID`);
const userToken = localStorage.getItem(`userToken`);
const listStatus = ref(["Đã Hoàn Thành", "Đang Xử Lý", "Thất Bại"]);
// Khởi tạo carts bằng ref
const carts = ref([]);

onMounted(() => {
  getCartFromID();
});

const getCartFromID = async () => {
  try {
    const response = await axios.get(`cart`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    console.log(response)
    // Cập nhật carts với dữ liệu từ API
    if (!response.data.length == 0) {
      carts.value = response.data;
    }
  } catch (error) {
    console.error("Error fetching cart data:", error);
  }
};

const groupedOrders = computed(() => {
  const orders = [];
  const orderMap = {};

  carts.value.forEach((item) => {
    if (!orderMap[item.CartID]) {
      orderMap[item.CartID] = {
        CartID: item.CartID,
        DateOfOrder: item.DateOfOrder,
        totalAmount: 0,
        items: [],
      };
      orders.push(orderMap[item.CartID]);
    }

    orderMap[item.CartID].items.push({
      Name: item.Name,
      Quantity: item.Quantity,
      Price: item.Price,
    });

    orderMap[item.CartID].totalAmount += parseInt(item.TotalAmount);
  });

  return orders;
});

// Hàm lấy tình trạng ngẫu nhiên
const getRandomStatus = () => {
  const randomIndex = Math.floor(Math.random() * listStatus.value.length);
  return listStatus.value[randomIndex];
};
</script>

<style src="../styles/components/history.css" scoped></style>

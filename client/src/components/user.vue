<template>
  <div class="user-profile">
    <header class="profile-header">
      <h1>User Information</h1>
    </header>
    <nav class="profile-nav">
      <button @click="goToSection('orders')" class="nav-button">
        <i class="fa-solid fa-cart-shopping" style="color: #ffffff"></i> Orders
      </button>
      <button @click="goToSection('messages')" class="nav-button">
        <i class="fa-solid fa-message" style="color: #ffffff"></i> Messages
      </button>
      <button @click="goToSection('history')" class="nav-button">
        <i class="fa-solid fa-bag-shopping" style="color: #ffffff"></i> History
      </button>
      <button @click="goToSection('address')" class="nav-button">
        <i class="fa-solid fa-location-dot" style="color: #ffffff"></i> Address
      </button>
      <button @click="goToSection('payment')" class="nav-button">
        <i class="fa-solid fa-money-bill" style="color: #ffffff"></i> Payment
      </button>
    </nav>
    <div v-if="loading" class="loading-spinner">
      <span class="icon is-large">
        <i class="fas fa-spinner fa-pulse fa-3x"></i>
      </span>
    </div>
    <div v-else-if="error" class="error-message">
      <p>{{ error }}</p>
      <button @click="getUserInfo" class="retry-button">
        <i class="fa-solid fa-arrows-rotate" style="color: #ffffff"></i> Refresh
      </button>
    </div>
    <div v-else class="profile-content">
      <div class="profile-header">
        <div class="avatar-section">
          <div class="avatar-container">
            <img :src="userAvatar" alt="User Avatar" class="avatar-img" />
          </div>
          <input type="file" @change="updateAvatar" id="avatar-upload" style="display: none" />
          <button @click="triggerFileInput" class="upload-button">
            <i class="fa-solid fa-upload" style="color: #ffffff"></i> Update Image
          </button>
        </div>
      </div>

      <div class="profile-section">
        <h2>User Information Detail</h2>
        <div v-if="!isEditingInfo">
          <div class="info-group">
            <label>Username:</label>
            <p>{{ userInfo.fullName }}</p>
          </div>
          <div class="info-group">
            <label>Email:</label>
            <p>{{ userInfo.email }}</p>
          </div>
          <div class="info-group">
            <label>Phone Number:</label>
            <p>{{ userInfo.phone }}</p>
          </div>
          <button @click="startEditingInfo" class="edit-button">
            <i class="fa-solid fa-pen" style="color: #ffffff"></i> Edit
          </button>
        </div>
        <div v-else>
          <form @submit.prevent="saveUserInfo">
            <div class="info-group">
              <label>Username:</label>
              <input v-model="editedInfo.fullName" required />
            </div>
            <div class="info-group">
              <label>Email:</label>
              <input v-model="editedInfo.email" type="email" required />
            </div>
            <div class="info-group">
              <label>Phone Number:</label>
              <input v-model="editedInfo.phone" type="tel" required />
            </div>
            <button type="submit" class="save-button">
              <i class="fa-solid fa-check" style="color: #ffffff"></i> Save
            </button>
            <button @click="cancelEditingInfo" class="cancel-button">
              <i class="fa-solid fa-x" style="color: #ffffff"></i> Cancel
            </button>
          </form>
        </div>
      </div>

      <div class="profile-section">
        <h2>Delivery Address</h2>
        <div v-if="(!userInfo.address && !isEditingAddress) || userInfo.address == 'null'">
          <p>You don't have a delivery address yet.</p>
          <button @click="startAddingAddress" class="add-button">
            <i class="fa-solid fa-plus" style="color: #ffffff"></i> Add Address
          </button>
        </div>
        <div v-else-if="!isEditingAddress">
          <p>{{ userInfo.address }}</p>
          <button @click="startEditingAddress" class="edit-button">
            <i class="fa-solid fa-pen" style="color: #ffffff"></i> Edit
          </button>
          <button @click="deleteAddress" class="remove-button">
            <i class="fa-solid fa-x" style="color: #ffffff"></i> Delete
          </button>
        </div>
        <div v-else>
          <input v-model="editedAddress" placeholder="Enter address" class="address-input" />
          <button @click="saveAddress" class="save-button">Save</button>
          <button @click="cancelEditingAddress" class="cancel-button">Cancel</button>
        </div>
      </div>

      <div class="profile-section">
        <h2>Accumulated points</h2>
        <p>Thông tin điểm tích lũy chưa có sẵn.</p>
        <p>Bạn cần mua hàng để tích lũy điểm.</p>
        <button @click="showPointsHistory" class="history-button">
          View point history
        </button>
      </div>
    </div>

    <button @click="logout" class="logout-button">
      <i class="fa-solid fa-arrow-right-from-bracket" style="color: #ffffff"></i>
      Log Out
    </button>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import axios from "@/axios.js";

const userAvatar = ref("/images/My_Logo.jpg");
const token = localStorage.getItem("userToken");
const userID = localStorage.getItem("userID");

const loading = ref(true);
const error = ref(null);
const isEditingInfo = ref(false);
const isEditingAddress = ref(false);
const editedAddress = ref('');
const addressError = ref(null);

const userInfo = reactive({
  fullName: null,
  email: null,
  phone: null,
  address: null,
});

const editedInfo = reactive({
  fullName: '',
  email: '',
  phone: '',
});

const getUserInfo = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await axios.get(`/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    userInfo.fullName = response.data[0].Username;
    userInfo.email = response.data[0].Email;
    userInfo.phone = response.data[0].Phone;
    userInfo.address = response.data[0].Address;
    console.log(userInfo)
  } catch (err) {
    console.log(err)
  } finally {
    loading.value = false;
  }
};

const startEditingInfo = () => {
  editedInfo.fullName = userInfo.fullName;
  editedInfo.email = userInfo.email;
  editedInfo.phone = userInfo.phone;
  isEditingInfo.value = true;
};
const cancelEditingInfo = () => {
  isEditingInfo.value = false;
};



const saveUserInfo = async () => {
  try {
    const response = await axios.patch(`user`, {
      username: editedInfo.fullName,
      email: editedInfo.email,
      phone: editedInfo.phone
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.success) {
      // Sau khi lưu thành công, cập nhật lại userInfo
      userInfo.fullName = editedInfo.fullName;
      userInfo.email = editedInfo.email;
      userInfo.phone = editedInfo.phone;
      isEditingInfo.value = false;
    } else {
      console.error("Error updating user info");
    }
  } catch (error) {
    console.error("Error saving user info:", error);
  }
};

const startAddingAddress = () => {
  isEditingAddress.value = true;
  editedAddress.value = '';
  addressError.value = null;
};

const startEditingAddress = () => {
  isEditingAddress.value = true;
  editedAddress.value = userInfo.address;
  addressError.value = null;
};


const saveAddress = async () => {
  addressError.value = null;
  try {
    const response = await axios.patch(
      'address', // Đường dẫn API
      {
        address: editedAddress.value, // Dữ liệu địa chỉ mới
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token xác thực
        },
      },
    );
    if (response.success) {
      userInfo.address = editedAddress.value; // Cập nhật địa chỉ mới vào userInfo
      isEditingAddress.value = false; // Đóng chế độ chỉnh sửa sau khi thành công
    } else {
      addressError.value = response.message || 'Failed to update address'; // Hiển thị lỗi nếu có
    }
  } catch (error) {
    addressError.value = error.response?.data?.message || 'An error occurred while saving the address';
  }
};


const cancelEditingAddress = () => {
  isEditingAddress.value = false;
  editedAddress.value = '';
  addressError.value = null;

};

const deleteAddress = async () => {
  try {
    const response = await axios.delete(
      'address', // Đường dẫn API
      {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token xác thực
        },
      },
    );
    console.log(response)

    if (!response.success) {
      addressError.value = response.message || 'Failed to update address'; // Hiển thị lỗi nếu có
    } else {
      userInfo.address = ""
    }


  } catch (error) {
    addressError.value = error.response?.data?.message || 'An error occurred while deleting the address';

  }
};

const triggerFileInput = () => {
  document.getElementById('avatar-upload').click();
};

const updateAvatar = async (event) => {
  const file = event.target.files[0];
  if (file) {
    const formData = new FormData();
    formData.append('avatar', file);
    try {
      const response = await axios.post(`/user/${userID}/avatar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      userAvatar.value = response.data.avatarUrl;
    } catch (error) {
      addressError.value = error.response?.data?.message || 'An error occurred while updoading avatar';

    }
  }
};

const checkLoggedIn = () => {
  const userToken = localStorage.getItem("userToken");
  if (!userToken) {
    window.location.href = "/form-login";
  }
};

const logout = () => {
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i);
    if (key !== "cart") {
      localStorage.removeItem(key);
    }
  }
  window.location.href = "/form-login";
};

const showPointsHistory = () => {
  // Implement points history functionality
  console.log("Show points history");
};

const goToSection = (section) => {
  switch (section) {
    case "orders":
      window.location.href = "/shopping-cart";
      break;
    case "messages":
      window.location.href = "/messages";
      break;
    case "history":
      window.location.href = "/history";
      break;
    case "address":
      window.location.href = "/address";
      break;
    case "payment":
      window.location.href = "/payment";
      break;
    default:
      break;
  }
};

onMounted(() => {
  checkLoggedIn();
  getUserInfo();
});
</script>

<style src="../styles/components/user.css" scoped></style>

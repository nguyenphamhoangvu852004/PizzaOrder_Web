// src/axios.js
import axios from 'axios';

// Tạo một instance của axios với baseURL từ biến môi trường
const instance = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    timeout: 1000, // Cấu hình base URL
});

// Thêm interceptor để xử lý token hết hạn
instance.interceptors.response.use(
    response => response.data,
    async (error) => {
        // Kiểm tra nếu mã lỗi là 401 (Unauthorized)
        if (error.response && error.response.status === 401) {
            // Xóa tất cả dữ liệu trong localStorage
            localStorage.clear();

            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);

export default instance;

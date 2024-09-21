<template>
  <div class="form-signup-container">
    <div class="form-signup">
      <section>
        <div>
          <h3>SIGNUP FORM</h3>
          <img src="/images/My_Logo.jpg" alt="" />
        </div>
        <b-field>
          <b-input v-model="Account.username" type="text" placeholder="Username">
          </b-input>
        </b-field>
        <b-field>
          <b-input v-model="Account.phone" type="text" placeholder="Phonenumber">
          </b-input>
        </b-field>
        <b-field>
          <b-input v-model="Account.email" type="text" placeholder="Email">
          </b-input>
        </b-field>
        <b-field>
          <b-input v-model="Account.password" type="password" placeholder="Password" password-reveal>
          </b-input>
        </b-field>
        <b-field>
          <b-input v-model="Account.passwordConfirm" type="password" placeholder="Confirm Password" password-reveal>
          </b-input>
        </b-field>

        <div>
          <input v-model="isAgreed" type="checkbox" />
          <p>
            I have read and agree to
            <a
              href="https://vietnamnet.vn/toi-dong-y-voi-dieu-khoan-va-dieu-kien-su-doi-tra-lon-nhat-cua-cong-nghe-i36033.html">the
              Terms</a>
          </p>
        </div>
        <b-button @click="signupButton">Sign Up</b-button>

        <p>Go to <a href="/form-login">login page</a></p>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import axios from "@/axios"; // Đảm bảo import axios
import { isValidate } from "@/services/validationForm";

const isAgreed = ref(false);
const Account = reactive({
  username: "",
  phone: "",
  email: "",
  password: "",
});


const signupButton = async () => {
  // Nếu user chưa click vào ô đồng ý điều khoản thì return lỗi 
  if (!isAgreed.value) {
    alert("Vui lòng đồng ý với điều khoản và điều kiện");
    return;
  }
  try {
    // Gọi API và gữi các thông tin tài khoản để đăng ký
    const response = await axios.post("auth/register", {
      username: Account.username,
      phone: Account.phone,
      email: Account.email,
      password: Account.password,
    })

    if (!response.success) {
      alert(`Đã có lỗi khi gữi yêu cầu`)
    }

    alert(`Đăng ký tài khoản thành công. Vui lòng đăng nhập.`)
    window.location.href = "/"

  } catch (error) {
    console.log(error)
  }
}
</script>

<style src="../styles/components/form-login-signup.css" scoped></style>

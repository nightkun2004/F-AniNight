<!-- components/LoginPopup.vue -->
<template>
    <div v-if="show" class="popup">
        <div class="popup-content">
            <h1 style="text-align: center; font-size: 16px" class="text-3xl font-bold underline">เข้าสู่ระบบ</h1>
            <span class="close-btn" @click="closePopup">x</span>
            <form @submit.prevent="login" class="flex flex-col">
                <p v-if="isError" style="color: red; font-size: 12px;">{{ errorMessage }}</p>
                <input v-model="email" placeholder="อีเมล" required />
                <input type="password" v-model="password" placeholder="รหัสผ่านของคุณ" required />
                <button class="bg-gray-500 border-2 btn_login" type="submit">เข้าสู่ระบบ</button>
            </form>

            <a href="/auth/google" target="_blank">
                <button class="login_button flex items-center border-2 px-4 py-2 rounded-lg w-full">
                    <img src="/logo/google_icon.png" alt="google icon" class="google_logo w-4 h-4">
                    <div class="login_text pl-5">
                        เข้าสู่ระบบ / สมัครด้วย Google
                    </div>
                </button>
            </a>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import instance from '@/axios';

// Props
const props = defineProps({
    show: Boolean
});

// Define emit for sending events to parent
const emit = defineEmits(['close']);  // เพิ่ม defineEmits

// Refs for form inputs
const email = ref('');
const password = ref('');
const isError = ref(false);
const errorMessage = ref('');

// Vuex store and router
const store = useStore();
const router = useRouter();

// Close Popup
const closePopup = () => {
    emit('close');  // ใช้ emit เพื่อส่ง event 'close' ไปที่ parent component
};

// Watch login status and reload the page after successful login
watch(() => store.getters.isAuthenticated, (isAuthenticated) => {
    if (isAuthenticated) {
        window.location.reload();  // Reload the page after login
    }
});

// Login method
const login = async () => {
  try {
    const response = await instance.post('/api/v2/login/auth', {
      email: email.value,
      password: password.value
    });

    isError.value = false;
    errorMessage.value = '';

    // รับข้อมูลจาก server แล้ว dispatch action ใน Vuex เพื่อเก็บ token และข้อมูลผู้ใช้
    store.dispatch('setUserData', response.data);
    console.log(response.data)

  } catch (error) {
    console.error('Login failed:', error.response ? error.response.data : error.message.isError);
    isError.value = true;
    errorMessage.value = error.response ? error.response.data.error : 'การเข้าสู่ระบบล้มเหลว';
  }
};
</script>


<style scoped>
.popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.655);
    display: flex;
    justify-content: center;
    align-items: center;
 
}

.popup-content, form {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
}

.popup-content {
    position: relative;
}

form input {
    border-radius: 7px;
    border: none;
    outline: none;
    width: 100%;
    background-color: #fafafa;
    padding: 10px 7px;
    margin-bottom: 20px;
    box-shadow: 2px 1px 2px #eee;
}

.login_button {
    display: flex;
    align-items: center;
    border: 1px solid #eee;
    padding: 4px 7px;
    border-radius: 6px;
}

.btn_login {
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 4px 6px;
    color: #fff;
    background-color: #000;
}

.google_logo {
    width: 20px;
    height: 20px;
}

.login_text {
    text-align: center;
    font-size: 12px;
    padding-left: 20px;
}

.close-btn {
    position: absolute;
    top: 5px;
    right: 20px;
    cursor: pointer;
    font-size: 30px;
}
</style>
<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['toggle-sidebar']);
</script>

<template>
  <header class="aninight-header">
    <!-- ซ้าย -->
    <div class="aninight-header_left">
      <!-- btn togger -->
      <button class="left_menu"   @click="$emit('toggle-sidebar')">
        <svg class="btn-expand icon_svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path
            d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
        </svg>
      </button>
      <a href="/" class="left-logo">
        <img
          src="#" alt="logo">
      </a>
    </div>

    <!-- กลาง: ช่องค้นหา -->
    <div class="aninight-header_center">
      <!-- <div class="search-box">
        <input type="text" placeholder="ค้นหา..." class="search-input">
        <button class="search-btn">ค้นหา</button>
      </div> -->
    </div>

    <!-- ขวา: เมนูและโปรไฟล์ -->
    <div class="aninight-header_right">
      <a href="https://ani-night.online/th/uploads/create/article" target="_blank" class="upload-btn">
        <svg width="23" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512">
          <path
            d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z" />
        </svg>
      </a>
      <a href="/notifications" class="notification-icon">
        <svg class="icon_svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <!-- ไอคอนแจ้งเตือน -->
        </svg>
      </a>
      <a href="https://ani-night.online/auth/login" target="_blank" class="btn-login">
        เข้าสู่ระบบ
      </a>
    </div>
  </header>
</template>

<style scoped>
.aninight-header {
  position: sticky;
  top: 0;
  display: grid;
  grid-template-columns: 272px 1fr auto;
  align-items: center;
  padding-right: 48px;
  background-color: #ffffff;
  border-bottom: 1px solid #eaeaea;
  height: 60px;
  z-index: 99;
}

.btn-login {
  background-color: #000;
  color: #fff;
  text-decoration: none;
  border-radius: 7px;
  padding: 7px;
}

.aninight-header_left {
  display: flex;
  align-items: center;
}

.left_menu {
  background: none;
  border: none;
  width: 28px;
  line-height: 8px;
  margin-left: 10px;
  cursor: pointer;
}

.left-logo {
  padding-left: 20px;
}

.left-logo img {
  width: 100px;
  height: auto;
}

.aninight-header_center {
  display: flex;
  justify-content: center;
}

.search-box {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  background-color: #f5f5f5;
  padding: 8px;
  border-radius: 7px;
}

.search-input {
  width: 100%;
  border: none;
  padding: 8px;
  background: none;
  outline: none;
}

.search-btn {
  background-color: #00a1d6;
  color: white;
  border: none;
  padding: 8px 10px;
  border-radius: 20px;
  cursor: pointer;
}

.aninight-header_right {
  display: flex;
  align-items: center;
}

.upload-btn {
  padding-left: 10px;
  text-decoration: none;
}

.notification-icon {
  margin-right: 16px;
}

.profile-icon img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

@media (max-width: 768px) {
  .aninight-header {
    padding-right: 20px;
  }

  .search-box {
    display: none
  }
  .btn-login {
  display: none;
}
}
</style>

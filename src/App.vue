<script setup>
import { ref , computed, provide } from 'vue';
import { RouterView } from 'vue-router';


const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const sidebarClass = computed(() => ({
  'sidebar-aninight': true,
  'sidebar-closed': !isSidebarOpen.value,
  'open': isSidebarOpen.value
}));

const contentMarginLeft = computed(() => (isSidebarOpen.value ? '272px' : '0'));

provide('isSidebarOpen', isSidebarOpen);
provide('toggleSidebar', toggleSidebar);
provide('sidebarClass', sidebarClass);
provide('contentMarginLeft', contentMarginLeft);

</script>

<template>
  <RouterView />
</template>

<style>

.layout-app {
  background-color: #fafafa;
  min-height: 100vh;
}

.layout-body {
  margin: 0 auto;
  display: flex;
}

.layout_content {
  width: 100%;
  overflow: hidden;
  /* height: 100vh; */
  transition: margin-left 0.3s ease-in-out;
}

.sidebar-aninight {
  position: fixed;
  z-index: 99;
  width: 272px;
  height: 100%;
  transition: width 0.3s ease-in-out;
  background-color: #fff;
  color: #000;
  overflow: hidden;
}

.sidebar-closed {
  width: 0;
}


/* เพิ่มสไตล์สำหรับ loading */
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 1.5rem;
  color: #000;
  text-align: center;
  padding: 20px;
}

/* เพิ่มสไตล์สำหรับ error */
.error {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 1.5rem;
  color: red;
  text-align: center;
  padding: 20px;
}

@media screen and (max-width: 480px) {
  .sidebar-aninight {
    width: 0;
  }

  .sidebar-aninight.open {
    width: 270px;
  }

  .layout_content {
    margin-left: 0;
  }
}
</style>
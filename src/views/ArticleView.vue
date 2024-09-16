<script setup>
import { ref, computed } from 'vue';
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';


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
</script>

<template>
 <div class="web-layout">
    <div class="layout-app">
      <Header @toggle-sidebar="toggleSidebar" />
      <section class="layout-body">
        <Sidebar :class="sidebarClass" />
        <main class="layout_content" :style="{ marginLeft: contentMarginLeft }">
          <h2 style="color: #fff; font-size: 1.5rem; padding: 10px;">หน้าแรก</h2>
        </main>
      </section>
    </div>
  </div>
</template>


<style scoped>
.layout-app {
  background-color: #fafafa;
  min-height: 100vh;
}

.layout-body {
  height: 100vh;
  margin: 0 auto;
  display: flex;
}

.layout_content {
  background-color: #02b3fe;
  width: 100%;
  height: 100vh;
  transition: margin-left 0.3s ease-in-out;
}

.sidebar-aninight {
  position: fixed;
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
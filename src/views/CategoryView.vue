<script setup>
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';

</script>

<template>
  <div class="web-layout">
    <div class="layout-app">
      <Header />
      <section class="layout-body">
        <nav class="sidebar-aninight">
          <Sidebar />
        </nav>
        <main class="layout_content">
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
}

.layout_content {
  background-color: #02b3fe;
  margin-left: 240px;
  height: 100vh;
}

.sidebar-aninight {
  position: fixed;
  width: 272px;
  transition: .3s all ease-in-out;
}

@media screen and (max-width: 480px) {
  .sidebar {
    width: 0;
  }
}
</style>
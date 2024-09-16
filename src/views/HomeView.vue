<script setup>
import { ref, inject, onMounted } from 'vue';
import axios from 'axios';
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import ItemAnime from '@/components/itemAnime.vue'
import WinterView from './WinterView.vue';
import AdSense from '@/components/AdSense.vue';


// รับค่า isSidebarOpen และ toggleSidebar จาก App.vue
const isSidebarOpen = inject('isSidebarOpen');
const toggleSidebar = inject('toggleSidebar');
const sidebarClass = inject('sidebarClass');
const contentMarginLeft = inject('contentMarginLeft');

const animeList = ref([]);
const isLoading = ref(true);
const isError = ref(false);

const carousel = ref(null);

const scroll = (direction) => {
  if (carousel.value) {
    const scrollAmount = 300;
    carousel.value.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
  }
};

onMounted(async () => {
  try {
    const response = await axios.get('https://ani-night.online/api/v2/season/next', {
      params: {
        year: 2024,
        month: 'ตุลาคม',
        season: 'Fall',
      },
    });
    animeList.value = response.data.animes;
  } catch (error) {
    console.error('Error fetching anime data:', error);
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
});

const truncateSynopsis = (synopsis) => {
  const maxLength = 50;
  if (synopsis.length > maxLength) {
    return synopsis.slice(0, maxLength) + ' ...';
  }
  return synopsis;
};
</script>

<template>
  <div class="web-layout">
    <div class="layout-app">
      <Header @toggle-sidebar="toggleSidebar" />
      <section class="layout-body">
        <Sidebar :class="sidebarClass" />
        <main class="layout_content" :style="{ marginLeft: contentMarginLeft }">
          <div class="info-view">
            <div class="title-header">
              <h2 style="color: #000; font-size: 1.5rem; padding: 10px;">อนิเมะ season ที่จะมาถึง</h2>

              <div class="titleright">
                <button class="carousel-button prev" @click="scroll(-1)">
                  <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M11.7071 4.29289C12.0976 4.68342 12.0976 5.31658 11.7071 5.70711L6.41421 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H6.41421L11.7071 18.2929C12.0976 18.6834 12.0976 19.3166 11.7071 19.7071C11.3166 20.0976 10.6834 20.0976 10.2929 19.7071L3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12C3 11.7348 3.10536 11.4804 3.29289 11.2929L10.2929 4.29289C10.6834 3.90237 11.3166 3.90237 11.7071 4.29289Z"
                      fill="#000000" />
                  </svg>
                </button>
                <button class="carousel-button next" @click="scroll(1)">
                  <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z"
                      fill="#000000" />
                  </svg>
                </button>
              </div>
            </div>
            <div class="carousel-container">
              <div v-if="isLoading" class="loading">
                กำลังโหลดข้อมูล...
              </div>

              <div v-else-if="isError" class="error">
                ไม่สามารถโหลดข้อมูลได้
              </div>

              <div v-else>
                <div class="carousel" ref="carousel">
                  <div class="anime-list">
                    <div v-for="anime in animeList" :key="anime._id" class="anime-item">
                      <img v-if="anime.poster.startsWith('http')" class="anime-poster" :src="anime.poster"
                        :alt="anime.title">
                      <img v-else class="anime-poster"
                        :src="anime.poster ? 'https://ani-night.online/uploads/posters/' + anime.poster : 'https://via.placeholder.com/400x200'"
                        :alt="anime.title">

                      <!-- รายละเอียดอนิเมะ -->
                      <div class="anime-details">
                        <h3 class="anime-title">
                          <router-link :to="{ name: 'anime', params: { urlslug: anime.urlslug } }"
                            style="text-decoration: none; color: #000; font-size: 1.2rem;">
                            {{ anime.title }}
                          </router-link>
                        </h3>
                        <p class="anime-description">{{ truncateSynopsis(anime.synopsis) }}</p>
                        <span class="anime-release-date">วันฉาย: {{ anime.month }} {{ anime.year }}</span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            <AdSense />
            <h2 style="color: #000; font-size: 1.5rem; padding: 10px;">อนิเมะ Winter 2025</h2>
            <div>
              <WinterView />
            </div>
          </div>
        </main>
      </section>
    </div>
  </div>
</template>

<style scoped>
.info-view {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.carousel-container {
  display: flex;
  align-items: center;
  margin: 10px;
  overflow: hidden;
}

.title-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.anime-item {
  display: flex;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
  /* Ensure items do not shrink */
}


.anime-poster {
  width: 150px;
  height: 210px;
  object-fit: cover;
}

.anime-details {
  padding: 16px;
  flex: 1;
}

.anime-title {
  font-size: 1.2rem;
  margin: 0;
  color: #333;
}

.anime-description {
  font-size: 0.9rem;
  color: #666;
  margin: 8px 0;
}

.anime-release-date {
  font-size: 0.8rem;
  color: #999;
}

.carousel {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  width: 100%;
}

.carousel::-webkit-scrollbar {
  display: none;
}

.anime-list {
  display: flex;
  flex-direction: row;

}

.carousel-button {
  background-color: #fafafa;
  border-radius: 8px;
  color: #000;
  border: none;
  outline: none;
  padding: 10px;
  cursor: pointer;
  font-size: 1rem;
}

.carousel-button:focus {
  outline: none;
}

.carousel-button.prev {
  margin-right: 10px;
}

.carousel-button.next {
  margin-right: 10px;
}

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
</style>

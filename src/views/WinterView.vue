<template>
    <div v-if="isLoading" class="loading">
        กำลังโหลดข้อมูล...
    </div>

    <div v-else-if="isError" class="error">
        ไม่สามารถโหลดข้อมูลได้
    </div>

    <div class="animes">
        <div class="item" v-for="anime in animeList" :key="anime._id">
            <div class="poster">
                <router-link :to="{ name: 'anime', params: { urlslug: anime.urlslug } }">
                    <img :src="getImageUrl(anime.poster)" alt="anime.title" />
                </router-link>
            </div>
            <div class="name-anime">
                <h2 class="title_anime">{{ anime.title }}</h2>
            </div>
        </div>
        <AdSense />
        <div ref="loadMoreTrigger" class="load-more-trigger"></div>
    </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import axios from 'axios';
import AdSense from '@/components/AdSense.vue';

const animeList = ref([]);
const isLoading = ref(false);
const isError = ref(false);
const page = ref(1);
const limit = 20;

async function loadAnimes() {
    if (isLoading.value) return;

    isLoading.value = true;
    try {
        const response = await axios.get('https://ani-night.online/api/v2/season/anime', {
            params: {
                year: 2025,
                season: 'Winter',
                page: page.value,
                limit: limit,
            },
        });

        if (response.data.animes.length > 0) {
            animeList.value.push(...response.data.animes);
            page.value++;
        }
    } catch (error) {
        console.error('Error fetching anime data:', error);
        isError.value = true;
    } finally {
        isLoading.value = false;
    }
}

function onIntersect(entries) {
    if (entries[0].isIntersecting) {
        loadAnimes();
    }
}

onMounted(() => {
    loadAnimes();

    const observer = new IntersectionObserver(onIntersect);
    observer.observe(loadMoreTrigger.value);

    onBeforeUnmount(() => {
        observer.disconnect();
    });
});

const loadMoreTrigger = ref(null);

function getImageUrl(image) {
    if (image.startsWith('http') || image.startsWith('https')) {
        return image;
    } else {
        return `https://ani-night.online/uploads/posters/${image}`;
    }
}
</script>
<style scoped>
.animes {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    padding: 20px;
    background-color: #f8f9fa;
}

.item {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.item:hover {
    transform: translateY(-10px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.poster {
    width: 100%;
    height: 300px;
    overflow: hidden;
    border-bottom: 1px solid #e6e6e6;
}

.poster img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease-in-out;
}

.item:hover .poster img {
    transform: scale(1.05);
}

.name-anime {
    padding: 15px;
    text-align: center;
}

.title_anime {
    font-size: 1.1rem;
    font-weight: 600;
    color: #333;
    margin: 0;
    transition: color 0.2s ease-in-out;
}

.title_anime:hover {
    color: #00a1d6;
}

.loading,
.error {
    text-align: center;
    padding: 20px;
    font-size: 1.2rem;
    color: #999;
}

/* Media queries for responsive design */
@media (max-width: 1200px) {
    .poster {
        height: 250px;
    }

    .title_anime {
        font-size: 1rem;
    }
}

@media (max-width: 768px) {
    .animes {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }

    .poster {
        height: 200px;
    }
}

@media (max-width: 480px) {
    .animes {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 10px;
    }

    .poster {
        height: 150px;
    }

    .title_anime {
        font-size: 0.9rem;
    }
}
</style>
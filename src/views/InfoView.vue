<template>
    <div class="web-layout">
        <div class="layout-app">
            <Header @toggle-sidebar="toggleSidebar" />
            <section class="layout-body">
                <Sidebar :class="sidebarClass" />
                <main class="layout_content" :style="{ marginLeft: contentMarginLeft }">
                    <div class="view-info">

                        <div v-if="isLoading">
                            <p>กำลังโหลดข้อมูล...</p>
                        </div>

                        <!-- Error -->
                        <div v-if="isError">
                            <p>ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง</p>
                        </div>


                        <div v-if="anime">
                            <div class="anime-header">
                                <div class="poster">
                                    <img :src="getImageUrl(anime.poster)" alt="anime.title" />
                                </div>
                                <div class="info">
                                    <h1 class="title_anime">{{ anime.title }}</h1>

                                    <div class="sub_info">
                                        <p><strong>รูปแบบ:</strong> {{ anime.type }}</p>
                                        <p><strong>ประเภท:</strong> {{ anime.animetype }}</p>
                                        <p><strong>studio ผลิต:</strong> {{ anime.studio }}</p>
                                        <p><strong>Source:</strong> {{ anime.Source }}</p>
                                        <p><strong>Season:</strong> {{ anime.season }}</p>
                                        <p><strong>หมวดหมู่:</strong> {{ anime.categories.join(', ') }}</p>
                                        <p><strong>เดือน:</strong> {{ anime.month }}</p>
                                        <p><strong>ปี:</strong> {{ anime.year }}</p>
                                        <p><strong>เสียง:</strong> {{ anime.voice }}</p>
                                        <p><strong>สถานะ:</strong> {{ anime.status ? 'ฉายแล้ว' : 'ยังไม่ฉาย' }}</p>
                                    </div>

                                    <div class="btns">
                                        <a v-if="anime.website" :href="anime.website" class="Official_website"
                                            target="_blank" rel="noopener noreferrer">
                                            Official website
                                        </a>
                                        <div class="platforms">
                                            <div v-if="anime.streaming.length > 0"
                                                style="display: flex; align-items: center;">
                                                <h3>มีฉายบน :</h3>
                                                <ul class="streaming-platforms">
                                                    <li v-for="(platform, index) in anime.streaming" :key="index">
                                                        <a v-if="platform.crunchyroll" :href="platform.crunchyroll"
                                                            target="_blank" rel="noopener noreferrer">
                                                            <img src="../assets/crunchyroll_icon.png" alt="Crunchyroll"
                                                                class="platform-logo" />
                                                            Crunchyroll
                                                        </a>
                                                        <a v-if="platform.bilibili" :href="platform.bilibili"
                                                            target="_blank" rel="noopener noreferrer">
                                                            <img src="../assets/bilibili_icon.png" alt="Bilibili"
                                                                class="platform-logo" />
                                                            Bilibili
                                                        </a>
                                                        <a v-if="platform.iqiyi" :href="platform.iqiyi" target="_blank"
                                                            rel="noopener noreferrer">
                                                            <img src="../assets/iqiyi_icon.png" alt="IQiyi"
                                                                class="platform-logo" />
                                                            IQiyi
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div v-else>
                                                <p style="text-align: center;">No platforms available.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="spno">
                                <p><strong>เรื่องย่อ:</strong> {{ anime.synopsis }}</p>
                            </div>

                            <AdSense />

                        </div>
                    </div>
                </main>
            </section>
        </div>
    </div>
</template>
<script setup>
import { ref, inject, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import AdSense from '@/components/AdSense.vue';

const isSidebarOpen = inject('isSidebarOpen');
const toggleSidebar = inject('toggleSidebar');
const sidebarClass = inject('sidebarClass');
const contentMarginLeft = inject('contentMarginLeft');


const route = useRoute();
const animeId = route.params.urlslug;
console.log(animeId)
// API KEY 1774bcb5-9e11-4ee0-b93d-a970c1da34fb

const anime = ref(null);
const isLoading = ref(true);
const isError = ref(false);

onMounted(async () => {
    try {
        const response = await axios.get(`https://ani-night.online/api/v2/anime/info/${animeId}`, {
            headers: {
                "x-api-key": "1774bcb5-9e11-4ee0-b93d-a970c1da34fb"
            }
        });
        anime.value = response.data.anime;
        console.log(response.data.anime)
        // Update meta tags
        document.title = `${anime.value.title} | AniNight`;
        const metaTags = [
            { name: 'description', content: anime.value.synopsis },
            { property: 'og:title', content: `${anime.value.title} | AniNight` },
            { property: 'og:keywords', content: `${anime.value.title}, ${anime.value.categories}, ${anime.value.season}, ${anime.value.animetype}, ${anime.value.year} , ${anime.value.Source} , ${anime.value.studio}, ค้นหาอนิเมะ, ดูอนิเมะ` },
            { property: 'og:description', content: anime.value.synopsis },
            { property: 'og:image', content: getImageUrl(anime.value.poster) },
            { property: 'og:image:width', content: '720' },
            { property: 'og:image:height', content: '1030' },
            { property: 'og:site_name', content: 'anime.ani-night.online' },
            { property: 'og:url', content: `anime.ani-night.online/anime/${anime.value.urlslug}` }
        ];

        // Remove existing meta tags
        document.querySelectorAll('meta[name="description"], meta[property^="og:"]').forEach(tag => tag.remove());

        // Add new meta tags
        metaTags.forEach(tag => {
            const meta = document.createElement('meta');
            Object.entries(tag).forEach(([key, value]) => {
                meta.setAttribute(key, value);
            });
            document.head.appendChild(meta);
        });
    } catch (error) {
        console.error('Error fetching anime data:', error);
        isError.value = true;
    } finally {
        isLoading.value = false;
    }
});


// ฟังก์ชันตรวจสอบ URL รูปภาพ
function getImageUrl(image) {
    if (image.startsWith('http') || image.startsWith('https')) {
        return image;
    } else {
        return `https://ani-night.online/uploads/posters/${image}`;
    }
}

function formatPlatform(platform) {
    const platformMap = {
        bilibili: 'Bilibili',
        iqiyi: 'iQIYI',
        crunchyroll: 'Crunchyroll'
    };
    return platformMap[platform] || 'Unknown Platform';
}
</script>
<style scoped>
.btns {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
}

.Official_website {
    background-color: #08cff2fe;
    color: #fff;
    border-radius: 8px;
    padding: 10px;
    text-decoration: none;
    transition: transform 0.3s ease-in-out;
}


/* Container for streaming platforms */
.streaming-platforms {
    margin-top: 20px;
}

/* Header for the streaming platforms section */
.streaming-platforms h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: #333;
}

/* List of platforms */
.streaming-platforms ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

/* Each platform item */
.streaming-platforms ul li {
    display: flex;
    align-items: center;
    gap: 8px;
}

/* Platform link */
.streaming-platforms ul li a {
    text-decoration: none;
    color: #007bff;
    font-weight: bold;
    transition: color 0.3s;
}

/* Hover effect for platform link */
.streaming-platforms ul li a:hover {
    color: #0056b3;
}

.streaming-platforms .platform-logo {
    width: 50px;
    height: auto;
    display: inline-block;
}


.Official_website:hover {
    transform: scale(1.05);
}

.info {
    margin: 5px;
}

.view-info {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
}

.anime-header {
    display: flex;
    flex-direction: row;
    margin: 10px;
    background-color: #fff;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 2px 2px 2px #eee;
}

.poster {
    width: 200px;
    height: 250px;
    border-radius: 8px;
    overflow: hidden;
}

.poster img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.anime-header .title_anime {
    font-size: 1.5rem;
    padding: 10px;
    line-height: 34px;
    font-weight: 500;
}

.sub_info {
    margin: 10px;
}

.sub_info p {
    font-size: 1rem;
    font-weight: 400;
}

.sub_info strong {
    font-size: 1rem;
    font-weight: bold;
}

.spno {
    background-color: #fff;
    border-radius: 10px;
    padding: 12px;
    margin: 12px;
    line-height: 30px;
    text-wrap: wrap;

    & strong {
        font-size: 1rem;
        font-weight: bold;
    }
}

@media screen and (max-width: 780px) {
    .anime-header {
        flex-direction: column;
        align-items: center;
    }
}
</style>
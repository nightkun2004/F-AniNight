<template>
    <div class="web-layout">
        <div class="layout-app">
            <Header @toggle-sidebar="toggleSidebar" />
            <section class="layout-body">
                <Sidebar :class="sidebarClass" />
                <main class="layout_content" :style="{ marginLeft: contentMarginLeft }">
                    <div class="view-info">
                        <div v-if="isAuthenticated">
                            <!-- ตรวจสอบว่าข้อมูลผู้ใช้มีหรือไม่ -->
                            <div v-if="user">


                                <!-- กล่องโปรไฟล์ -->
                                <div class="profile-container">
                                    <!-- แบนเนอร์ด้านบน -->
                                    <div class="profile-banner">
                                        <img v-if="user.bannerImagePath" :src="getImageUrlBanner(user.bannerImagePath)" alt="Banner Image" />
                                    </div>
                                    <div class="profile-info">
                                        <div class="profile_imag">
                                            <img :src="getImageUrl(user.profilePicture)" alt="Profile Picture"
                                            class="profile-picture" />
                                        </div>
                                        <h2>{{ user.username }}</h2>
                                        <p class="role">{{ user.role }}</p>
                                        <p class="joined-date">เข้าร่วมเมื่อ: {{ formattedDate }}</p>
                                        <p><strong>อีเมล:</strong> {{ user.email }}</p>
                                        <button @click="logout" v-if="isAuthenticated" class="btn-logout">ออกจากระบบ</button>
                                    </div>

                                    <!-- ข้อมูลเพิ่มเติม -->
                                    <div class="additional-info">
                                        <p><strong>รายการอนิเมะที่บันทึกทั้งหมด:</strong> {{ user.saveanime.length }}
                                        </p>

                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <p>กำลังโหลดข้อมูลโปรไฟล์...</p>
                            </div>
                        </div>
                        <!-- เมื่อยังไม่เข้าสู่ระบบ -->
                        <div v-else>
                            <p>กรุณาเข้าสู่ระบบเพื่อดูข้อมูลโปรไฟล์</p>
                        </div>
                    </div>
                </main>

            </section>
        </div>
    </div>
</template>
<script setup>
import { ref, inject, onMounted, computed } from 'vue';
import instance from '@/axios';
import { useStore } from 'vuex';
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';

const isSidebarOpen = inject('isSidebarOpen');
const toggleSidebar = inject('toggleSidebar');
const sidebarClass = inject('sidebarClass');
const contentMarginLeft = inject('contentMarginLeft');


const store = useStore();
const user = ref(null);
const isAuthenticated = computed(() => store.getters.isAuthenticated);

const token = store.state.token
const userID = localStorage.getItem('id');


const logout = () => {
  store.dispatch('logout');
};

const fetchProfile = async () => {
    if (!isAuthenticated.value) {
        return;
    }

    try {
        const response = await instance.get(`/api/v2/profile/auth/info?userID=${userID}`, {
        });


        user.value = response.data.user;
        console.log(response.data)
    } catch (error) {
        console.error('Error fetching profile:', error.response ? error.response.data : error.message);
    }
};


onMounted(() => {
    fetchProfile();
    // console.log('Token:', token);
    // console.log('User:', userID);
    // console.log('ID:', store.state.id);
});

// ฟังก์ชันเพื่อแปลงวันที่
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

// ใช้ฟังก์ชันเพื่อแปลงวันที่
const formattedDate = computed(() => formatDate(user.value.createdAt));

function getImageUrl(image) {
    if (image.startsWith('http') || image.startsWith('https')) {
        return image;
    } else {
        return `https://ani-night.online/uploads/profiles/${image}`;
    }
}
function getImageUrlBanner(image) {
    if (image.startsWith('http') || image.startsWith('https')) {
        return image;
    } else {
        return `https://ani-night.online/uploads/banners/${image}`;
    }
}
</script>
<style scoped>
/* แบนเนอร์ */
.profile-banner {
    width: 100%;
    height: 200px;
    background-color: #e1e1e1;
    overflow: hidden;
    border-radius: 10px;
    margin-bottom: 20px;
}

.btn-logout {
  background-color: #ff0606;
  color: #fff;
  text-decoration: none;
  border-radius: 7px;
  padding: 7px;
  margin: 10px;
  outline: none;
}

.profile-banner img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* กล่องข้อมูลโปรไฟล์ */
.profile-container {
    background-color: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 100%;
    margin: auto;
    display: block;
  align-items: center;
  justify-content: center;
}

/* ข้อมูลโปรไฟล์ */
.profile-info {
    text-align: center;
    margin-bottom: 20px;
}

.profile-info h2 {
    font-size: 28px;
    margin-top: 10px;
    color: #333;
}

.profile-info .role {
    font-size: 18px;
    color: #999;
}

.profile-info .joined-date {
    font-size: 14px;
    color: #666;
}

/* จักตงกลาง */
.profile_imag {
    display: flex;
    justify-content: center;
}

/* รูปโปรไฟล์ */
.profile-picture {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 4px solid white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    object-fit: cover;
    margin-top: -80px;
    background-color: white;
}

/* ข้อมูลเพิ่มเติม */
.additional-info {
    padding: 10px;
    border-top: 1px solid #eaeaea;
    display: flex;
    justify-content: space-around;
    text-align: center;
}

.additional-info p {
    font-size: 16px;
    color: #555;
}

.additional-info strong {
    color: #333;
}
</style>
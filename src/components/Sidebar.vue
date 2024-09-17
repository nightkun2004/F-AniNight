<template>
  <div>
    <ul class="sidebar-lists">
      <!-- รายการเมนู: หน้าหลัก -->
      <li class="night-sidebar_item">
        <a href="https://ani-night.online" target="_blank" rel="noopener noreferrer" class="aninight-sidebar_link"
          active-class="active-link">
          <span class="side-home side_icon">
            <svg width="23px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path
                d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
            </svg>
          </span>
          หน้าหลัก
        </a>
      </li>
      <li class="night-sidebar_item">
        <router-link to="/" class="aninight-sidebar_link" active-class="active-link">
          <span class="side-home side_icon">
            <svg width="23" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M192 32c0 17.7 14.3 32 32 32c123.7 0 224 100.3 224 224c0 17.7 14.3 32 32 32s32-14.3 32-32C512 128.9 383.1 0 224 0c-17.7 0-32 14.3-32 32zm0 96c0 17.7 14.3 32 32 32c70.7 0 128 57.3 128 128c0 17.7 14.3 32 32 32s32-14.3 32-32c0-106-86-192-192-192c-17.7 0-32 14.3-32 32zM96 144c0-26.5-21.5-48-48-48S0 117.5 0 144L0 368c0 79.5 64.5 144 144 144s144-64.5 144-144s-64.5-144-144-144l-16 0 0 96 16 0c26.5 0 48 21.5 48 48s-21.5 48-48 48s-48-21.5-48-48l0-224z" />
            </svg>
          </span>
          อนิเมะ
        </router-link>
      </li>
      <li v-if="isAuthenticated" class="night-sidebar_item">
        <router-link :to="{ path: '/profile', query: { id: userID } }" class="aninight-sidebar_link"
          active-class="active-link">
          <span class="side-home side_icon">
            <svg width="23px" height="23px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink">

              <title>profile [#1341]</title>
              <desc>Created with Sketch.</desc>
              <defs>

              </defs>
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Dribbble-Light-Preview" transform="translate(-180.000000, -2159.000000)" fill="#000000">
                  <g id="icons" transform="translate(56.000000, 160.000000)">
                    <path
                      d="M134,2008.99998 C131.783496,2008.99998 129.980955,2007.20598 129.980955,2004.99998 C129.980955,2002.79398 131.783496,2000.99998 134,2000.99998 C136.216504,2000.99998 138.019045,2002.79398 138.019045,2004.99998 C138.019045,2007.20598 136.216504,2008.99998 134,2008.99998 M137.775893,2009.67298 C139.370449,2008.39598 140.299854,2006.33098 139.958235,2004.06998 C139.561354,2001.44698 137.368965,1999.34798 134.722423,1999.04198 C131.070116,1998.61898 127.971432,2001.44898 127.971432,2004.99998 C127.971432,2006.88998 128.851603,2008.57398 130.224107,2009.67298 C126.852128,2010.93398 124.390463,2013.89498 124.004634,2017.89098 C123.948368,2018.48198 124.411563,2018.99998 125.008391,2018.99998 C125.519814,2018.99998 125.955881,2018.61598 126.001095,2018.10898 C126.404004,2013.64598 129.837274,2010.99998 134,2010.99998 C138.162726,2010.99998 141.595996,2013.64598 141.998905,2018.10898 C142.044119,2018.61598 142.480186,2018.99998 142.991609,2018.99998 C143.588437,2018.99998 144.051632,2018.48198 143.995366,2017.89098 C143.609537,2013.89498 141.147872,2010.93398 137.775893,2009.67298"
                      id="profile-[#1341]">

                    </path>
                  </g>
                </g>
              </g>
            </svg>
          </span>
          โปรไฟล์
        </router-link>
      </li>
      <li class="night-sidebar_item">
        <button v-if="!isAuthenticated" @click="showPopup = true" class="btn-login">
          เข้าสู่ระบบ
        </button>

      </li>
      <login-popup :show="showPopup" @close="showPopup = false"></login-popup>
    </ul>

    <!--  -->
    <div></div>
    <div class="sidebar_footer">
      <a href="#" target="_blank">เกี่ยวกับเรา</a>
      <a href="#" target="_blank">นโยบาย</a>
      <a href="#" target="_blank">การให้บริการ</a>
      <a href="#" target="_blank">ติดต่อเรา</a>
      <a href="#" target="_blank">เนื้อหา</a>
    </div>
    <!-- <span class="footer-copyright">© 2024 AniNight</span><br> -->
    <span style="margin-left: 10px;">provided by NPatPublisher</span>
  </div>
</template>

<script setup>
import { ref, computed, defineEmits } from 'vue';
import { useStore } from 'vuex';
import LoginPopup from './LoginPopup.vue';

const store = useStore();
const showPopup = ref(false);

const userID = localStorage.getItem('id');

// Check if user is authenticated
const isAuthenticated = computed(() => store.getters.isAuthenticated);

const emit = defineEmits(['toggle-sidebar']);
</script>

<style scoped>
.sidebar_footer {
  padding: 12px 12px 12px 24px;
  width: 272px;
  line-height: 18px;
  font-size: 14px;
  color: rgba(0, 0, 0, .55);
}

.btn-login {
  display: flex;
  justify-content: center;
  background-color: #000;
  color: #fff;
  text-decoration: none;
  border-radius: 7px;
  padding: 3px;
  margin: 10px auto;
  width: 100%;
}



.sidebar_footer>a {
  display: inline-block;
  margin: 0 12px 8px 0;
  text-decoration: none;
  color: inherit;
}

.footer-copyright {
  margin-top: 16px;
  margin: 10px;
}

.sidebar-lists {
  list-style: none;
  padding: 0;
  margin: 0;
}

.night-sidebar_item {
  margin-bottom: 20px;
}

.aninight-sidebar_link {
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 16px;
  color: #000;
  padding: 12px 24px;
  line-height: 24px;
  transition: background-color 0.2s ease;
}

.active-link {
  background-color: rgba(7, 186, 245, 0.271);
  color: rgb(0, 0, 0);
}


.aninight-sidebar_link:hover {
  background-color: #f5f5f5;
}

.side_icon {
  font-size: 23px;
  margin-right: 16px;
}

.side-home svg,
.side-category svg,
.side-follow svg {
  fill: #555;
}

.side-home svg:hover,
.side-category svg:hover,
.side-follow svg:hover {
  fill: #00a1d6;
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    height: auto;
  }
}
</style>

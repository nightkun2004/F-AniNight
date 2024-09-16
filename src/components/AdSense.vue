<template>
    <div class="ad-container">
        <!-- AdSense Ad Tag -->
        <ins class="adsbygoogle" style="display:block" :data-ad-client="adClient" :data-ad-slot="adSlot"
            :data-ad-format="adFormat" data-full-width-responsive="true"></ins>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';

const adClient = 'ca-pub-6579807593228261';
const adSlot = '6172128544'; 
const adFormat = 'auto'; 

onMounted(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
});
</script>

<style scoped>
.ad-container {
    margin: 20px 0;
    text-align: center;
}
</style>
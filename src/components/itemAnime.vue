<template>
    <div class="anime-item">
      <img :src="anime.poster" alt="Anime Poster" class="anime-poster" />
      <div class="anime-details">
        <h3 class="anime-title">{{ anime.title }}</h3>
        <p class="anime-description">{{ anime.synopsis }}</p>
        <span class="anime-release-date">Release Date: {{ anime.month }} {{ anime.year }}</span>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    anime: {
      type: Object,
      required: true,
    },
  });
  </script>
  
  <style scoped>
  .anime-item {
    display: flex;
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    margin-right: 16px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    flex-shrink: 0; /* Ensure items do not shrink */
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
  </style>
  
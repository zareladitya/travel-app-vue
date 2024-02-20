<script setup>
import { ref } from 'vue'
import trending from '@/data/trending'

const trendingData = ref(trending)
</script>
<template>
  <div class="home__trending__container">
    <div
      v-for="(item, index) in trendingData.data.slice(0, 6)"
      :key="index"
      class="home__trending__card"
      :id="item.id"
    >
      <router-link
        :to="`/trending/id=${item.id}/${item.city}`"
        class="router-link-overlay"
      ></router-link>
      <img :src="item.image[0]" alt="gambar" />
      <div class="home__trending__card-content">
        <h3>{{ item.name }}</h3>
        <p>{{ item.city }}, {{ item.country }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
a.router-link-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
}
.home__trending__container h3 {
  color: #fff;
  font-weight: 600;
}
.home__trending__container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; /* Ensures three cards per row */
  z-index: 2;
}

.home__trending__card {
  flex: 0 1 calc(50%); /* 30% width with 2% gap */
  max-width: 32%;
  margin-bottom: 2%; /* Gap between rows */
  border-radius: 0.5rem;
  box-shadow: 0 2px 3px rgb(0, 0, 0, 0.2);
  transition: all 200ms ease;
  position: relative;
}

.home__trending__card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.3) 100%);
  z-index: 1;
  border-radius: 0.5rem;
}

.home__trending__card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
  filter: brightness(90%);
}

.home__trending__card-content {
  padding: 0 1rem;
  position: absolute;
  top: 0.5rem;
  z-index: 2;
}

.home__trending__card-content p {
  color: #fff;
}

.home__trending__card:hover {
  transform: translateY(-0.5rem);
}
</style>

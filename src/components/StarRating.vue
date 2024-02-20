<template>
  <div class="rating-star">
    <svg
      v-for="star in totalStars"
      :key="star"
      class="star"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke="var(--color-mid-yellow)"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      :class="{ filled: star <= value }"
      @mouseover="hoverStar(star)"
      @click="selectRating(star)"
    >
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      />
    </svg>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
// import hotelData from '@/data/hotels.js';

const value = ref(0)
const totalStars = ref(1)

// watch(() => {
//   // Assuming hotelData is an array, you might want to adjust this logic based on your data structure
//   const currentHotel = hotelData.find((hotel) => hotel.id === 1); // Assuming you want the first hotel
//   if (currentHotel) {
//     value.value = currentHotel.rating;
//     totalStars.value = currentHotel.rating;
//   }
// });
</script>

<style scoped>
.rating-star {
  display: inline-block;
}

.star {
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: transform 0.2s;
}

.star.filled {
  fill: #fdd835; /* change the color to your preference */
}
</style>

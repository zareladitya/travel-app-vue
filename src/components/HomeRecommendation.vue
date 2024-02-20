<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'

import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import IconStar from './icons/IconStar.vue'
import hotels from '@/data/hotels.js'

const activeButton = ref(0)
const setActiveButton = (index) => {
  activeButton.value = index
}

const displayedHotels = computed(() => {
  return hotels.data.slice(0, 4)
})
</script>
<template>
  <div class="home__recommendation">
    <div class="home__recommendation__btn-container">
      <button
        v-for="(btn, index) in ['West Java', 'East Java', 'Bali', 'More']"
        :key="index"
        @click="setActiveButton(index)"
        :class="{ 'home__recommendation-btn-active': activeButton === index }"
      >
        {{ btn }}
      </button>
    </div>

    <div class="home__recommendation__cards-container">
      <div
        v-for="hotelItem in displayedHotels"
        :key="hotelItem.id"
        class="home__recommendation__card"
        :id="hotelItem.id"
      >
        <div class="home__recommendation__card__upper-location">
          <p>{{ hotelItem.city }}</p>
        </div>
        <RouterLink :to="{ name: 'hotel-details', params: { id: hotelItem.id } }">
          <img :src="hotelItem.image" alt="Hotel Image" />
        </RouterLink>
        <div class="home__recommendation__card-content">
          <h4>{{ hotelItem.name }}</h4>
          <div class="home__recommendation__rating">
            <p><IconStar :width="20" />{{ hotelItem.rating }} / 5</p>
          </div>
          <p class="home__recommendation__pricing">Rp {{ hotelItem.price }}</p>
          <div class="home__recomendation-tags flex fd-row">
            <div v-for="(tags, index) in hotelItem.tags" :key="index">
              <p>{{ tags }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="home__recommendation__see-more-btn">
      <button>See All<IconArrowRight :width="20" /></button>
    </div>
  </div>
</template>

<style scoped>
.home__recommendation a {
  padding: 0;
}
.home__recommendation h4 {
  font-size: 20px;
}

.home__recommendation h4,
p {
  color: #000;
}

.home__recommendation {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  gap: 1rem;
}

/* button styling */
.home__recommendation__btn-container {
  display: flex;
  gap: 1rem;
}

.home__recommendation__btn-container button {
  border: 0;
  padding: 0.5rem 1rem;
  border-radius: 1.5rem;
  font-weight: 600;
}
.home__recommendation-btn-active {
  background-color: #3498db;
  color: #fff;
}

.home__recommendation__cards-container {
  display: flex;
  gap: 1%;
}

.home__recommendation__card {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
  width: 28rem;
  max-height: fit-content;
  border-radius: 0.5rem;
  box-shadow: 0 2px 3px rgb(0, 0, 0, 0.2);
  transition: all 200ms ease;
}

.home__recommendation__card__upper-location {
  position: absolute;
  top: 0;
  background-color: var(--color-blue);
  padding: 0.2rem 0.5rem;
  z-index: 4;
  border-radius: 6px 0 6px 0;
}

.home__recommendation__card__upper-location p {
  color: #fff;
}

.home__recommendation__card img {
  width: 100%;
  height: 100%;
  max-height: 13rem;
  transition: 200ms;
  border-radius: 6px 6px 0 0;
}

.home__recommendation__card img:hover {
  filter: brightness(80%);
}
.home__recommendation__card a:hover {
  color: transparent;
  background-color: transparent;
}
.home__recommendation__card-content {
  padding: 0.5rem;
  flex-grow: 1; /* Allow the content to grow vertically */
  /* overflow: hidden;  */
  position: relative;
}

.home__recommendation__rating {
  margin: 0.2rem 0;
  fill: var(--color-orange);
}
.home__recommendation__rating p {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.2rem;
}
.home__recommendation__pricing {
  color: var(--color-orange);
  margin-bottom: 0.4rem;
}
.home__recomendation-tags {
  gap: 0.5rem;
  flex-wrap: wrap;
}
.home__recomendation-tags p {
  background-color: var(--color-blue);
  color: #fff;
  padding: 0.2rem 0.5rem;
  border-radius: 0.4rem;
}
.home__recommendation__see-more-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.home__recommendation__see-more-btn button {
  padding: 0.5rem 2rem;
  border: 0;
  border-radius: 0.2rem;
  font-size: 15px;
  font-weight: 600;
  color: var(--color-light-blue);
  background-color: #edf3f7;
  display: flex;
  align-items: center;
  fill: var(--color-light-blue);
  gap: 0.1rem;
}
</style>

<script></script>

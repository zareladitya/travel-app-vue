<script setup>
import HeroImage from '@/assets/images/mountain-hero-image.jpg';
import { ref, onMounted, watch } from 'vue'
import HotelIcon from '@/components/icons/IconHotel.vue'
import PlaneIcon from '@/components/icons/IconPlane.vue'
import TrainIcon from '@/components/icons/IconTrain.vue'
import BusIcon from '@/components/icons/IconBus.vue'
import HotelComponent from '@/components/HeaderHotel.vue';
import FlightsComponent from '@/components/HeaderFlights.vue';
import TrainComponent from '@/components/HeaderTrain.vue';
import TravelComponent from '@/components/HeaderTravel.vue';


const activeButton = ref(null);

const setActiveButton = (button) => {
  activeButton.value = button;
};

const buttonComponentMap = {
      hotel: HotelComponent,
      flights: FlightsComponent,
      trains : TrainComponent,
      bus : TravelComponent
  };

const activeComponent = ref(HotelComponent);

watch(activeButton, () => {
    activeComponent.value = buttonComponentMap[activeButton.value];
});

onMounted(() =>{
    setActiveButton('hotel')
});

</script>

<script>

</script>

<template>
    <div class="home__header">
      <div class="home__header__background-image">
        <img :src="HeroImage" alt="Hero Image">
      </div>
      <div class="home__header-container pd-6">
        <h1>From Indonesia to the World, All Yours.</h1>
        <div class="home__header-links">
          <button :class="{ active: activeButton === 'hotel' }" @click="setActiveButton('hotel')" class="home__header-btn">
            <HotelIcon :width="25" :fill="activeButton === 'hotel' ? 'var(--color-dark-blue)' : 'var(--vt-c-text-dark-2)'"/>
            Hotel
          </button>
          <button :class="{ active: activeButton === 'flights' }" @click="setActiveButton('flights')" class="home__header-btn">
            <PlaneIcon :width="25" :fill="activeButton === 'flights' ? 'var(--color-blue)' : 'var(--vt-c-text-dark-2)'"/>
            Flights
          </button>
          <button :class="{ active: activeButton === 'trains' }" @click="setActiveButton('trains')" class="home__header-btn">
            <TrainIcon :width="25" :fill="activeButton === 'trains' ? 'var(--color-mid-orange)' : 'var(--vt-c-text-dark-2)'"/>
            Trains
          </button>
          <button :class="{ active: activeButton === 'bus' }" @click="setActiveButton('bus')" class="home__header-btn">
            <BusIcon :width="25" :fill="activeButton === 'bus' ? 'var(--color-green)' : 'var(--vt-c-text-dark-2)'"/>
            Bus & Travel
          </button>
        </div>
        <div class="home__header-content">
          <component :is="activeComponent"></component>
        </div>
      </div>
      <!-- <div class="hei">
        <h2>for testing scroll purposes only</h2>
      </div> -->
    </div>
  </template>

<style>
.hei{
    height: 100vh;
}
.home__header{
  z-index: -3;
}
.home__header h1 {
  color: #fff;
}
.home__header__background-image {
  position: absolute;
  width: 100%;
  max-height: 4rem;
  top: 0;
  left: 0;
  z-index: -2;
}

.home__header__background-image img {
  width: 100%;
  height: 100%;
  max-height: 35rem;
  object-fit: cover;
}

.home__header-container {
    display: flex;
    flex-direction: column;
    color: white;
    gap: 1rem;
}

.home__header-container h1{
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    letter-spacing: 0.2px;
    font-size: 35px;
}
.home__header-links-container{
    display: flex;
}
.home__header-links{
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid var(--vt-c-text-dark-2);
    padding: 1rem 0.5rem;
}
.home__header-links button{
    border: 1px solid transparent;
    padding: 0.5rem 1rem;
    border-radius: 5rem;
    font-size: 18px;
    font-weight: 600;
    background: transparent;
    color: var( --vt-c-text-dark-2);
    fill: var(--vt-c-text-dark-2);
}

.home__header-links button:hover{
    border: 1px solid var( --vt-c-text-dark-2);
}

.home__header-btn{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
}

.home__header-links button.active {
  border: 1px solid white;
  color: #000;
  background-color: #fff;
}

.home__header-links button:hover:not(.active) {
  border: 1px solid white;
}
</style>

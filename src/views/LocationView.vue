<script setup>
import { ref, onMounted, defineProps } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from '@/components/Navbar.vue'
import location from '@/data/location';

const expandedText = ref(false);

const toggleExpand = () => {
    expandedText.value = !expandedText.value
};

const { id } = defineProps(['id']);
const route = useRoute();
const locationData = ref({});

const locationId = parseInt(id || route.params.id, 10);

const fetchlocationDetailsById = (id) => {
    const foundlocation = location.data.find(locationData => locationData.id === id);
    if (foundlocation) {
        locationData.value = { ...foundlocation };
    } else {
        console.error(`location Data with ID ${id} not found.`);
    }
};

onMounted(() => {
    fetchlocationDetailsById(locationId);
    window.scrollTo(0, 0);
    
    const container = document.querySelector('.location-top-sight__carousel__card-container');
    const prevButton = document.querySelector('.carousel-buttons button:first-child');
    const nextButton = document.querySelector('.carousel-buttons button:last-child');

    prevButton.style.visibility = 'hidden';

    nextButton.addEventListener('click', () => {
        prevButton.style.visibility = 'visible';
    });

    container.addEventListener('scroll', () => {
        prevButton.style.visibility = container.scrollLeft === 0 ? 'hidden' : 'visible';

        // Calculate the maximum scroll position
        const maxScroll = container.scrollWidth - container.clientWidth;

        // If the current scroll position is at the maximum, hide the next button
        if (container.scrollLeft >= maxScroll) {
            nextButton.style.visibility = 'hidden';
        } else {
            nextButton.style.visibility = 'visible';
        }
    });
});


const moveCarousel = (direction) => {
    const cardWidth = document.querySelector('.location-top-sight__carousel__card').offsetWidth;
    const container = document.querySelector('.location-top-sight__carousel__card-container');
    const scrollAmount = direction === 'prev' ? -cardWidth : cardWidth;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
};
</script>

<template>
    <Navbar/>
<div class="location-view">
    <div class="location-view-container pd-4">
        <div class="location-view__image-gallery">
            <div class="location-view__image-gallery-container flex fd-row">
                <div class="location-view__image-gallery-main">
                    <img v-if="Array.isArray(locationData.image)" :src="locationData.image[0]" alt="main">
                </div>
                <div class="location-view__image-gallery-side flex fd-col">
                    <img v-if="Array.isArray(locationData.image)" v-for="(image, index) in locationData.image.slice(1, 3)" :key="index" :src="image" :data-index="index + 1">                
                </div>
            </div>
        </div>
        <div class="location-view__details-container sm-top-2">
            <h1>{{ locationData.city }}</h1>
            <div class="location-view__details-context">
                <p>{{ locationData.shortDesc }}</p>
                <p class="toggle-expand" v-if="!expandedText" @click="toggleExpand">Read More</p>
                <div v-if="expandedText">
                    <p><br>{{ locationData.fullDesc }}</p>
                    <p class="toggle-expand" @click="toggleExpand">See Less</p>
                </div>
            </div>
        </div>

        <section class="info-get-to-know sm-top-2">
            <div class="section-info__header">
                <div class="section-info__header__icon-container bg-green">
                    <i class="ri-lightbulb-line icon-30 tc-white"></i>
                </div>
                <div class="section-info__header-content">
                    <h2 class="fw-600 tc-green">Get to know {{ locationData.city }}</h2>
                    <p class="tc-dark-grey">Take a look at {{ locationData.city }} best highlights</p>
                </div>
            </div>
            <div class="location-top-sight__carousel">
                <h2 class="fw-600 tc-darkest-grey sm-top-1">Top Sights In {{ locationData.city }} </h2>
                <div class="location-top-sight__carousel__card-container sm-top-1">
                    <div class="location-top-sight__carousel__card" v-for="(image, index) in locationData.image" :key="index">
                        <img :src="image" :data-index="index ">
                        <h3>Test Destination</h3>
                    </div>
                </div>
                <div class="carousel-buttons">
                    <button @click="moveCarousel('prev')" class="btn btn-rounded"><i class="ri-arrow-left-s-line"></i></button>
                    <button @click="moveCarousel('next')" class="btn btn-rounded"><i class="ri-arrow-right-s-line"></i></button>
                </div>
            </div>
        </section>

        <section class="info-explore sm-top-2">
            <div class="section-info__header">
                <div class="section-info__header__icon-container bg-brown">
                    <i class="ri-road-map-line icon-25 tc-white flex align-center justify-center"></i>
                </div>
                <div class="section-info__header-content">
                    <h2 class="fw-600 tc-brown">Explore {{ locationData.city }}</h2>
                    <p class="tc-dark-grey">Create your itinerary with our top picks below</p>
                </div>
            </div>
            <div class="explore__carousel">
                <h2 class="fw-600 tc-darkest-grey sm-top-1">Must-try Activities in {{ locationData.city }} </h2>
                <p>Fun-filled attractions, tour packages, and more</p>
                <div class="explore__carousel__card-container sm-top-1">
                    <div class="explore__carousel__card" v-for="(image, index) in locationData.image" :key="index">
                        <img :src="image" :data-index="index ">
                        <h3>Card Title</h3>
                    </div>
                </div>
            </div>
        </section>

    </div>
</div>

</template>

<style>

.explore__carousel__card-container{
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
}
.explore__carousel__card{
    width: 20rem;
    border-radius: 0.5rem;
    background-color: #fff;
    box-shadow: 1px 2px rgba(0, 0, 0, 0.2);
}
.explore__carousel__card h3{
    margin: 0.5rem;

}
.explore__carousel__card img{
    width: 100%;
    height: 12rem;
    border-radius: 0.5rem 0.5rem 0 0;
    object-fit: cover;
}

/* section info  */
.section-info__header{
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    padding-bottom: 1rem;
    border-bottom: 1px dashed var(--color-grey);
}

.section-info__header__icon-container{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
}

/* top sight carousel */
.location-top-sight__carousel{
    position: relative;
}

.location-top-sight__carousel__card-container{
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    overflow-y: hidden;
    width: 100%;
    height: 20rem;
    gap: 0.5rem;
    position: relative;
}

.location-top-sight__carousel__card-container::-webkit-scrollbar{
    display: none;
}

.location-top-sight__carousel__card{
  flex: 0 0 auto;
  width: 30rem;
  border-radius: 0.5rem;
}

.location-top-sight__carousel__card img{
    height: 90%;
    width: 100%;
    border-radius: 0.5rem;
}

.carousel-buttons {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 55%;
  transform: translateY(-50%);
  width: 100%;
}

.carousel-buttons button {
  cursor: pointer;
  border: 1px solid #ccc;
  background-color: #f0f0f0;
  width: 3rem;
  height: 3rem;
  font-size: 1.5rem;
}

.btn-rounded {
  border-radius: 50%;
  border: 0;
  padding: 0.5rem;
}

.carousel-buttons button:first-child {
  position: absolute;
  left: -1rem;
}

.carousel-buttons button:last-child {
  position: absolute;
  right: -1rem;
}
/* .location-view-container{
}

.location-view__image-gallery{
} */

.location-view__image-gallery-container{
    width: 100%;
    gap: 0.5rem;
    height: 25rem;
}
.location-view__image-gallery-main {
    width: 50%;
}
.location-view__image-gallery-main img {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(3.141592653589793rad,rgba(255, 255, 255, 0),rgba(3, 18, 26, 0),rgba(0, 0, 0, 0.35));
}
.location-view__image-gallery-side{
    width: 50%;
    height: 100%;
    gap: 0.5rem;
}
.location-view__image-gallery-side img {
    height: 49%;
    object-fit: cover;
}

/* .location-view__details-container{

} */
.location-view__details-container h1{
    color: #000;
    font-size: 2.5rem;
    font-weight: 600;
    letter-spacing: 0.2px;
}

.toggle-expand{
    color: var(--color-blue);
}

</style>
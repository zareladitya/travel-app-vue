<script setup>
import { ref, onMounted, defineProps, computed } from 'vue';
import { useRoute } from 'vue-router';
import image1 from '@/assets/images/mountain-hero-image.jpg';
import image2 from '@/assets/images/car-in-a-beach.jpg';
import StarRating from '@/components/StarRating.vue';
import IconAirCon from '@/components/icons/IconAirCon.vue';
import IconRestaurant from '@/components/icons/IconRestaurant.vue';
import IconWaterWaves from '@/components/icons/IconWaterWaves.vue';
import IconParking from '@/components/icons/IconParking.vue';
import IconWifi from '@/components/icons/IconWifi.vue';
import IconElevator from '@/components/icons/IconElevator.vue';
import IconNonSmoking from '@/components/icons/IconNonSmoking.vue';
import IconSmoking from '@/components/icons/IconSmoking.vue';
import IconBar from '@/components/icons/IconBar.vue';
import hotels from '@/data/hotels';
import Navbar from '@/components/Navbar.vue';

const { id } = defineProps(['id']);
const route = useRoute();

const hotelId = parseInt(id || route.params.id, 10);


const fetchHotelDetailsById = (id) => {
    const foundHotel = hotels.data.find(hotelItem => hotelItem.id === id);
    if (foundHotel) {
        hotel.value = { ...foundHotel, facilities: foundHotel.facilities || [] };
    } else {
        console.error(`Hotel with ID ${id} not found.`);
    }
};

onMounted(() => {
    fetchHotelDetailsById(hotelId);
    window.scrollTo(0,0);
});

const hotel = ref({
  facilities: [],
});

// Computed Hotel Facilities
const hotelFacilities = computed(() => hotel.value.facilities || []);

// Get Icon
const getIconComponent = (facility) => {
  const iconMappings = {
    AC: IconAirCon,
    Restaurant: IconRestaurant,
    Parking : IconParking,
    Pool : IconWaterWaves,
    Wifi : IconWifi,
    Elevator : IconElevator,
    NoSmoking : IconNonSmoking,
    Smoking : IconSmoking,
    Bar : IconBar
  };
  return iconMappings[facility] || null;
};
</script>



<template>
    <Navbar/>
    <div class="hotel__details sm-4">
      <div class="hotel__details-container">
        <div class="hotel__details__image-gallery flex fd-row" id="gallery">
            <div class="hotel__details__image-container">
                <img :src="hotel.image">
            </div>
            <div class="hotel__details-carousel flex fd-col">
                <img :src="image1">
                <img :src="image2">
                <img :src="image2">
                <img :src="image2">
                <div class="image__see-all-photo">
                    <p>See All Photos</p>
                    <img :src="image2">
                </div>
          </div>
        </div>

        <div class="hotel__details-main">
          <h1>{{ hotel.name }}</h1>
          <div class="hotel__rating-container flex">
              <StarRating/><p> {{ hotel.rating }}</p>
          </div>
          <div class="hotel__details-order">
            <h4 class="tc-black">Price/night starts at</h4>
            <h2 class="home__recommendation__pricing  fw-600">Rp {{ hotel.price }}</h2>
            <button class="hotel__recommendation__order-room fw-600">Select Room</button>
          </div>
          <div class="hotel__details__facilities">
              <div class="hotel__details__facilities-content">
                  <h4 class="tc-primary fw-600">Main Facilities</h4>
                <div class="hotel__details__facilities-content-component">
                    <p v-for="facility in hotelFacilities" :key="facility">
                        <component :is="getIconComponent(facility)" :width="20" class="icon-c-light-blue"/> {{ facility }}
                    </p>
                </div>
            </div>
          </div>
          
        </div>

        <div class="hotel__details-content pd-2 flex fd-row">
            <div class="hotel__details__location-container">
                <h4>Location</h4>
                <iframe :src=hotel.location :width="300" :height="200" :style="'border: 0'"></iframe>
            </div>
            <div class="hotel__details__about">
              <h4>About</h4>
              <p>{{ hotel.about }}</p>
            </div>
        </div>
        
      </div>
    </div>
</template>

<style>
body {
    background-color: #fbfbfb;
}
.col-3{
    display: flex;
    flex-direction: column;
    width: 10rem;
    height: 10rem;
}
.w-100{
    width: 10rem;
}
.hotel__details p, 
.hotel__details h1{
    color: #000;
}

.hotel__details{
    padding: 1rem 0;
}
.hotel__details-container{
    position: relative;
    display: grid;
    grid-template-columns: 3fr 1fr; /* Two equal-width columns */
    grid-template-rows: 1fr; /* One row with a height of 150px */      
    width: 100%;
    gap: 1rem;
}


.hotel__details-content{
    grid-column: span 2;
    width: 100%;
}

.hotel__details__image-gallery {
    position: relative;
    gap: 0.5rem;
}
.hotel__details__image-container{
    width: 50rem;
    height: 27rem;
}
.hotel__details__image-container img{
    width: 100%;
    border-radius: 0.5rem;
    object-fit: cover;
    height: 100%;

}

.hotel__details-carousel {
    justify-content: space-between;
    gap: 0.5rem;
}

.hotel__details-carousel img {
  width: 10rem;
  height: 5rem;
  border-radius: 0.2rem;
  object-fit: cover;
  cursor: pointer;
  position: relative;
}
.hotel__details-carousel img:last-child{
    filter: brightness(60%);
    position: relative;
}
.image__see-all-photo {
    position: relative;
    display: flex;
    align-items: center;
}
.image__see-all-photo p {
    position: absolute; /* Change position to absolute */
    z-index: 4;
    width: max-content;
    text-align: center;
    color: #fff;
    font-size: 12px;
    margin: 0 auto;
    left: 25%;
}
.hotel__details__location-container{
    background-color: #fff;
}

.hotel__details-content,
.hotel__details__facilities{
    background-color: #fff;
    padding: 0.5rem;
    border-radius: 0.5rem;
}

.hotel__details__facilities{
    height: 14.5rem;
    padding: 1rem;
}

.hotel__details__facilities::-webkit-scrollbar{
    display: none;
}

.hotel__details__facilities-content h4 {
    margin-bottom: 0.2rem;
}

.hotel__details__facilities-content p{
    display: flex;
    gap: 0.5rem;
    align-items: center;
    margin: 0.1rem 0;
}

.hotel__details__facilities-content-component {
    display: grid;
    grid-template-rows: repeat(6, 1fr);
    grid-auto-flow: column;

}
.hotel__details-main h1{
    font-weight: 600;
    font-size: 25px;
}

.hotel__rating-container{
    gap: 0.1rem;
}

.hotel__details-content p{
    font-size: 13px;
}

.hotel__details-content h4{
    font-weight: 600;
    color: var(--color-blue);
    margin-bottom: 0.5rem;
}

.hotel__details-content{
    gap: 1rem;
}

.hotel__details-order{
    display: flex;
    flex-direction: column;
}

.hotel__details-order button{
    width: 100%;
    padding: 0.5rem 1rem;
    background-color: var(--color-orange);
    border: 0;
    border-radius: 0.4rem;
    color: #fff;
    letter-spacing: 0.5px;
    margin: 1rem 0;
} 


</style>

<script>

// const gallery = ({
//     el: "#gallery",
//     mounted() {
//         AOS.init();
//     },
//     data: {
//         activePhoto : 0,
//         photos : [
//             {
//                 id: 1,
//                 url: "@/assets/images/mountain-hero-image.jpg"
//             },
//             {
//                 id: 2,
//                 url: "@/assets/images/car-in-a-beach.jpg"
//             }
//         ],
//     },
//     methods: {
//         changeActive(id){
//             this.activePhoto = id
//         }
//     }
// });
</script>
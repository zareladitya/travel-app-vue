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
import RoomCardContainer from '@/components/RoomCardContainer.vue';
import hotels from '@/data/hotels';
import Navbar from '@/components/Navbar.vue';

const { id } = defineProps(['id']);
const route = useRoute();

const hotelId = parseInt(id || route.params.id, 10);
const selectRoom = ref(false)
const rooms = ref([]);

const fetchHotelDetailsById = (id) => {
    const foundHotel = hotels.data.find(hotelItem => hotelItem.id === id);
    if (foundHotel) {
        hotel.value = { ...foundHotel, facilities: foundHotel.facilities || [] };
        // Also include rooms data
        rooms.value = foundHotel.rooms || [];
        // Fetch sidebar facilities
        const allFacilities = new Set();
        foundHotel.rooms.forEach(room => {
            room.facilities.forEach(facility => {
                allFacilities.add(facility);
            });
        });
        sidebarFacilities.value = Array.from(allFacilities);
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
const openSelectRoom = () => {
  selectRoom.value = !selectRoom.value;
};
const sidebarFacilities = computed(() => {
    const allFacilities = new Set();
    rooms.value.forEach(room => {
        room.facilities.forEach(facility => {
            allFacilities.add(facility);
        });
    });
    return Array.from(allFacilities);
});



</script>




<template>
    <Navbar/>
    <div class="hotel-details sm-4">
      <div class="hotel-details-container">
        <div class="hotel-details__image-gallery flex fd-row" id="gallery">
            <div class="hotel-details__image-container">
                <img :src="hotel.image">
            </div>
            <div class="hotel-details-carousel flex fd-col">
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

        <div class="hotel-details-main">
          <h1>{{ hotel.name }}</h1>
          <div class="hotel__rating-container flex">
              <StarRating/><p> {{ hotel.rating }}</p>
          </div>
          <div class="hotel-details-order">
            <h4 class="tc-black">Price/night starts at</h4>
            <h2 class="hotel__recommendation__pricing  fw-600">Rp. {{ hotel.price }}</h2>
            <button class="hotel__recommendation__order-room fw-600">Select Room</button>
          </div>
          <div class="hotel-details__facilities">
              <div class="hotel-details__facilities-content">
                  <h4 class="tc-primary fw-600">Main Facilities</h4>
                <div class="hotel-details__facilities-content-component">
                    <p v-for="facility in hotelFacilities" :key="facility">
                        <component :is="getIconComponent(facility)" :width="20" class="icon-c-light-blue"/> {{ facility }}
                    </p>
                </div>
            </div>
          </div>
        </div>

        <div class="hotel-details-content pd-2 flex fd-row">
            <div class="hotel-details__location-container">
                <h4>Location</h4>
                <iframe :src=hotel.location :width="300" :height="200" :style="'border: 0'"></iframe>
            </div>
            <div class="hotel-details__about">
              <h4>About</h4>
              <p>{{ hotel.about }}</p>
            </div>
        </div>
    </div>
    <section class="hotel-details__select-room pd-1 sm-top-1 w-full h-full">
        <div class="hotel-details__select-room-container w-full h-full">
            <h3 class="fw-600">Available Rooms Types in {{ hotel.name }}</h3>
            <div class="hotel-details__room-card w-full sm-top-1">
            <div class="w-full">
                <h3 class="fw-600">Standard Suite</h3>
            </div>
                <RoomCardContainer
                :rooms="rooms"
                :sidebarImage="hotel.image"
                :sidebarSize="hotels.data[0].rooms[0].size"
                :sidebarFacilities="sidebarFacilities"
            />
            </div>
            <div class="hotel-details__room-card w-full sm-top-1">
                <h3 class="fw-600">Premium Suite</h3>
                <RoomCardContainer
                :rooms="rooms"
                :sidebarImage="hotel.image"
                :sidebarSize="hotels.data[0].rooms[0].size"
                :sidebarFacilities="sidebarFacilities"
            />
            </div>
        </div>
    </section>
   
    
        
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

.hotel-details h1{
    color: #000;
}

.hotel-details{
    padding: 1rem 0;
}
.hotel-details-container{
    position: relative;
    display: grid;
    grid-template-columns: 3fr 1fr; /* Two equal-width columns */
    grid-template-rows: 1fr; /* One row with a height of 150px */      
    width: 100%;
    gap: 1rem;
}


.hotel-details-content{
    grid-column: span 2;
    width: 100%;
}

.hotel-details__image-gallery {
    position: relative;
    gap: 0.5rem;
}
.hotel-details__image-container{
    width: 50rem;
    height: 27rem;
}
.hotel-details__image-container img{
    width: 100%;
    border-radius: 0.5rem;
    object-fit: cover;
    height: 100%;

}

.hotel-details-carousel {
    justify-content: space-between;
    gap: 0.5rem;
}

.hotel-details-carousel img {
  width: 10rem;
  height: 5rem;
  border-radius: 0.2rem;
  object-fit: cover;
  cursor: pointer;
  position: relative;
}
.hotel-details-carousel img:last-child{
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
.hotel-details__location-container{
    background-color: #fff;
}

.hotel-details-content,
.hotel-details__facilities{
    background-color: #fff;
    padding: 0.5rem;
    border-radius: 0.5rem;
}

.hotel-details__facilities{
    height: 14.5rem;
    padding: 1rem;
}

.hotel-details__facilities::-webkit-scrollbar{
    display: none;
}

.hotel-details__facilities-content h4 {
    margin-bottom: 0.2rem;
}

.hotel-details__facilities-content p{
    display: flex;
    gap: 0.5rem;
    align-items: center;
    margin: 0.1rem 0;
}

.hotel-details__facilities-content-component {
    display: grid;
    grid-template-rows: repeat(6, 1fr);
    grid-auto-flow: column;

}
.hotel-details-main h1{
    font-weight: 600;
    font-size: 25px;
}

.hotel__rating-container{
    gap: 0.1rem;
}

.hotel-details-content p{
    font-size: 13px;
}

.hotel-details-content h4{
    font-weight: 600;
    color: var(--color-blue);
    margin-bottom: 0.5rem;
}

.hotel-details-content{
    gap: 1rem;
}

.hotel-details-order{
    display: flex;
    flex-direction: column;
}

.hotel-details-order button{
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

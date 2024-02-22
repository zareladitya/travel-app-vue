<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import DropdownOccupancyHotel from '@/components/DropdownOccupancyHotel.vue';
import hotels from '@/data/hotels';
import location from '@/data/location';
import IconStar from '@/components/icons/IconStar.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const hotel = hotels.data;
const locationData = ref({location});
const date = ref();
const textInputOptions = {
  format: 'MM.dd.yyyy'
};

const hotelPartner = [{
    image : [
    "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1108,h_739,f_auto/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/ttcseti5bdmc2popeanz/OrchidForestCikoleTicketinLembangBandung-KlookUnitedKingdom.jpg", 
    "https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/04/10/13/tokyo-main.jpg",
    "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1108,h_739,f_auto/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/ttcseti5bdmc2popeanz/OrchidForestCikoleTicketinLembangBandung-KlookUnitedKingdom.jpg", 
    "https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/04/10/13/tokyo-main.jpg",
    "https://www.thetimes.co.uk/travel/wp-content/uploads/sites/6/2021/05/New_Chidorigafuchi-Park-Tokyo_Credit_GettyImages-1148634785.jpg?w=2200&h=880&crop=1",
    "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1108,h_739,f_auto/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/ttcseti5bdmc2popeanz/OrchidForestCikoleTicketinLembangBandung-KlookUnitedKingdom.jpg", 
    "https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/04/10/13/tokyo-main.jpg",
    "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1108,h_739,f_auto/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/ttcseti5bdmc2popeanz/OrchidForestCikoleTicketinLembangBandung-KlookUnitedKingdom.jpg", 
    "https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/04/10/13/tokyo-main.jpg",
    "https://www.thetimes.co.uk/travel/wp-content/uploads/sites/6/2021/05/New_Chidorigafuchi-Park-Tokyo_Credit_GettyImages-1148634785.jpg?w=2200&h=880&crop=1",
    "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1108,h_739,f_auto/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/ttcseti5bdmc2popeanz/OrchidForestCikoleTicketinLembangBandung-KlookUnitedKingdom.jpg", 
    "https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/04/10/13/tokyo-main.jpg",
    "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1108,h_739,f_auto/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/ttcseti5bdmc2popeanz/OrchidForestCikoleTicketinLembangBandung-KlookUnitedKingdom.jpg", 
    "https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/04/10/13/tokyo-main.jpg",
    "https://www.thetimes.co.uk/travel/wp-content/uploads/sites/6/2021/05/New_Chidorigafuchi-Park-Tokyo_Credit_GettyImages-1148634785.jpg?w=2200&h=880&crop=1",

    ]
}];
</script>

<template>
<Navbar/>
<div class="hotel pd-top-4 w-full">
    <section class="hotel-hero">
        <div class="hotel-banner w-full tc-white pd-4 relative sm-bottom-12">
            <h1 class="fw-700 fs-3rem">Find your next stay</h1>
            <p class="fs-1rem">Search deals on hotels, homes, and much more...</p>
            <div class="hotel-hero__searchbox flex fd-col gap[0.5] pd-1 w-full">
                <div class="hotel-search__destination w-full">
                    <p class="tc-darkest-grey">City, destination, or hotel name</p>
                    <input type="search" placeholder="Search" class="w-full">
                </div>
                <div class="hotel-search__check-in-out flex fd-row gap[0.5]">
                    <div class="hotel-search__check-in w-full">
                        <p class="tc-darkest-grey">Check-in </p>
                        <VueDatePicker class="dp" v-model="date" range :partial-range="false" placeholder="Check In Date" :text-input="textInputOptions" :enable-time-picker="false"/>
                    </div>
                    <div class="hotel-search__check-out w-full">
                        <p class="tc-darkest-grey">Check-out</p>
                        <VueDatePicker class="dp placeholder-m-sd-1" v-model="date" range :partial-range="false" placeholder="Check Out Date" :text-input="textInputOptions" :enable-time-picker="false"/>
                    </div>
                </div>
                <div class="hotel-search__occupancy flex fd-row gap[0.5]">
                    <div class="flex fd-col w-full">
                        <p class="tc-darkest-grey">Guest and Rooms</p>
                        <DropdownOccupancyHotel fontSize="14" width="100"/>
                    </div>
                    <div class="hotel-search__search-cta flex">
                        <button class="btn bg-bright-orange tc-white fw-600 w-full fs-1rem flex gap[0.5]"><i class="ri-search-line"></i>Search Hotel</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="hotel-offers pd-sd-4">
        <h2 class="fw-600">Offers</h2>
        <p>Promotions, deals, and special offers for you</p>
        <div class="hotel-offers__card-container sm-top-1 flex gap[0.5] w-full">
            <div class="hotel-offers__card flex justify-sb w-full">
                <div class="hotel-offers__card-content flex fd-col gap[0.5]">
                    <h3 class="fw-600 fs-1.5rem">Fly away to your dream vacation</h3>
                    <p>Browse properties offering long-term stays, many at reduced monthly rates.</p>
                    <button class="btn bg-dark-blue tc-white fw-600">Book Now</button>
                </div>
                <img :src="hotels.data[0].image" alt="">
            </div>
            <div class="hotel-offers__card flex justify-sb w-full">
                <div class="hotel-offers__card-content flex fd-col gap[0.5]">
                    <h3 class="fw-600 fs-1.5rem">Fly away to your dream vacation</h3>
                    <p>Browse properties offering long-term stays, many at reduced monthly rates.</p>
                    <button class="btn bg-dark-blue tc-white fw-600">Book Now</button>
                </div>
                <img :src="hotels.data[3].image" alt="">
            </div>
        </div>
    </section>
    <section class="sm-top-2 pd-sd-4">
        <h2 class="fw-600">Most Searched Accomodation</h2>
        <p>Promotions, deals, and special offers for you</p>
       
        <div class="hotel-most-search__cards-container sm-top-1 flex gap[0.5]">
            <RouterLink v-for="hotelItem in hotels.data" :key="hotelItem.id" class="hotel-most-search__card w-full " :id="hotelItem.id" :to="{ name: 'hotel-details', params: { id: hotelItem.id } }">
                <div class="hotel-most-search__card__upper-location">
                    <p>{{ hotelItem.city }}</p>
                </div>
                <img :src=" hotelItem.image" alt="Hotel Image">
                <div class="hotel-most-search__card-content">
                    <h4 class="fw-600 fs-1rem tc-black">{{ hotelItem.name }}</h4>
                    <div class="hotel-most-search__rating">
                        <p class="tc-black"><IconStar :width="20"/>{{ hotelItem.rating }} / 5 </p>
                    </div>
                    <p class="hotel-most-search__pricing">Rp {{ hotelItem.price }}</p>
                    <div class="home__recomendation-tags flex fd-row">
                        <div v-for="(tags, index) in hotelItem.tags" :key="index">
                            <p>{{ tags }}</p>
                        </div>
                    </div>
                </div>
            </RouterLink>
        </div>
    </section>
    <section class="sm-top-2 pd-sd-4">
        <h2 class="fw-600">Community Recommendation</h2>
        <p>Promotions, deals, and special offers for you</p>

    </section>
    <section class="hotel-partner flex justify-sb align-center sm-top-2 pd-sd-4 flex">
        <div class="hotel-partner-content">
            <h2 class="fw-600">Hotel Partners</h2>
            <h4 class="tc-grey">Domestic & International</h4>
            <p>Get the best value and ensure a comfortable stay wherever you travel from these hotels by using our services</p>
        </div>
        <div class="hotel-partner__gallery-container" v-for="(partner, index) in hotelPartner" :key="index">
        <div class="hotel-partner__image relative" >
            <img v-for="(image, imgIndex) in partner.image.slice(0, 10)" :src="image" :key="imgIndex" alt="Hotel Partner Image">
            <div class="carousel-buttons">
                <button class="carousel-button prev-button"><i class="ri-arrow-left-s-line"></i></button>
                <button class="carousel-button next-button"><i class="ri-arrow-right-s-line"></i></button>
            </div>
        </div>
    </div>
    </section>
    <section class="sm-top-1">
        
        
    </section>
</div>
<Footer/>
</template>

<style>
.hotel-partner-content{
    max-width: 40ch;
}
.hotel-partner__image{
    width: 60rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}
.hotel-partner__image img{
    width: 10rem;
    height: 8rem;
    object-fit: cover;
}

a.hotel-most-search__card:hover {
    background-color: transparent;
}
.hotel-most-search__card {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
  max-height: fit-content;
  border-radius: 0.5rem;
  box-shadow: 0 2px 3px rgb(0, 0, 0, 0.2);
  transition: all 200ms ease;
}

.hotel-most-search__card__upper-location {
  position: absolute;
  top: 0;
  background-color: var(--color-blue);
  padding: 0.2rem 0.5rem;
  z-index: 4;
  border-radius: 6px 0 6px 0;
}

.hotel-most-search__card__upper-location p{
  color: #fff;
}

.hotel-most-search__card img {
  width: 100%;
  height: 100%;
  max-height: 13rem;
  transition: 200ms;
  border-radius: 6px 6px 0 0;
}

.hotel-most-search__card img:hover {
  filter: brightness(80%);
}
.hotel-most-search__card a:hover{
  color: transparent;
  background-color: transparent;
}
.hotel-most-search__card-content {
  padding: 0.5rem;
  flex-grow: 1; /* Allow the content to grow vertically */
  /* overflow: hidden;  */
  position: relative;
}

.hotel-most-search__rating{
  margin: 0.2rem 0;
  fill: var(--color-orange);
  
}
.hotel-most-search__rating p{
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.2rem;
}
.hotel-most-search__pricing{
  color: var(--color-orange);
  margin-bottom: 0.4rem;
}
.home__recomendation-tags{
  gap: 0.5rem;
  flex-wrap: wrap;
}
.home__recomendation-tags p{
  background-color: var(--color-blue);
  color: #fff;
  padding: 0.2rem 0.5rem;
  border-radius: 0.4rem;
}
 /* */
.hotel-hero{
    height: 70dvh;
}
.hotel-banner{
    background-color: var(--color-dark-blue);
    height: 50%;
}
.hotel-hero__searchbox{
    position: absolute;
    bottom: -80%;
    left: 50%;
    transform: translate(-50%);
    background-color: var(--color-lightest-grey);
    width: 70%;
    box-shadow: 1px 2px 20px 2px rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
}
.hotel-hero__searchbox input{
    height: 2.5rem;
    border-radius: 0.5rem;
    border: 1px solid var(--color-light-grey);
    padding: 0.5rem;
}
.hotel-search__check-in-out input{
    padding: 0 2rem;
}
.hotel-search__search-cta {
    align-items: end;
    width: 20%;
}
.hotel-search__search-cta button{
    height: 2.5rem;
}

.hotel-offers__card {
    padding: 1rem;
    border: 1px solid var(--color-light-grey);
    border-radius: 0.5rem;
}
.hotel-offers__card img{
    width: 20%;
    max-width: 10rem;
    aspect-ratio: 1/1;
    object-fit: cover;
}
.hotel-offers__card-content p{
    width: 70%;
}
.hotel-offers__card-content button{
    width: 10rem;
}
.hotel-most-searched__card-container{
    
}
.hotel-most-searched__card{
}
.hotel-most-searched__card img{
    height: 80%;
}
</style>
<script setup>
import { ref, defineProps, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import trending from '@/data/trending';

const { id } = defineProps(['id']);
const route = useRoute
const trendingData = ref({});

const trendingId = parseInt(id || route.params.id, 10);

const fetchtrendingDetailsById = (id) => {
    const foundtrending = trending.data.find(trendingData => trendingData.id === id);
    if (foundtrending) {
        trendingData.value = { ...foundtrending };
    } else {
        console.error(`trending Data with ID ${id} not found.`);
    }
};
onMounted(() => {
    fetchtrendingDetailsById(trendingId);
    window.scrollTo(0, 0);
});
const date = new Date();

const checkOpenHours = () => {
    let currentHour = new Date().getHours();
    let currentMinute = new Date().getMinutes();
    if (trendingData.value.openHour) {
        const [open, close] = trendingData.value.openHour.split(' - ');
        const [openHour, openMinute] = open.split('.').map(parseFloat);
        const [closeHour, closeMinute] = close.split('.').map(parseFloat);
        
        const isOpen = currentHour >= openHour && currentHour < closeHour;
        if (isOpen){
            return {
            statusHour: 'Open',
            isOpen: true
            }
        }
        else {
            let hoursRemaining = openHour - currentHour;
            let minutesRemaining = openMinute - currentMinute;
            console.log(hoursRemaining)

            if (minutesRemaining < 0) {
                minutesRemaining += 60;
                hoursRemaining -= 1;
            }
            if (hoursRemaining < 0) {
                hoursRemaining += 24;
                console.log(hoursRemaining)
                
            }
            return {
                statusHour: 'Closed',
                isOpen: false,
                hoursRemaining: hoursRemaining,
                minutesRemaining: minutesRemaining
                
            };
        }
        
    }
    console.log(currentHour)
    console.log(currentMinute)

    return { statusHour: 'Unknown', isOpen: false, hoursRemaining: 0, minutesRemaining: 0  };
    
};
</script>

<template>
<Navbar/>
<div class="trending__view">
    <div class="trending__view-container pd-4">
        <div class="trending__view-content section__margin">
            <h1 class="fw-600">{{ trendingData.name }}</h1>
            <p class="trending__view__location"><i class="ri-map-pin-fill"></i>{{ trendingData.city }}, {{ trendingData.country }}</p>
            <p class="trending__view__open-hours">
                <i class="ri-time-fill"></i>
                <span class="tc-red fw-600" :class="{ 'open-hour': checkOpenHours().isOpen }" v-if="checkOpenHours().statusHour === 'Open'">
                    {{ checkOpenHours().statusHour }} 
                </span> 
                <span v-if="checkOpenHours().statusHour === 'Open'">| {{ trendingData.openHour }}</span>
                <span v-if="checkOpenHours().statusHour === 'Closed'">
                    {{ trendingData.openHour }} <br>
                    <span class="tc-red fw-600">{{ checkOpenHours().statusHour }} </span> | {{ checkOpenHours().hoursRemaining }} hours and {{ checkOpenHours().minutesRemaining }} minutes until open 
                </span>
            </p>
        </div>
        <div class="trending-view__image-gallery">
            <div class="trending-view__image-gallery-container flex fd-row">
                <div class="trending-view__image-gallery-main">
                    <img v-if="Array.isArray(trendingData.image)" :src="trendingData.image[0]" alt="main">
                </div>
                <div class="trending-view__image-gallery-side flex">
                    <img v-if="Array.isArray(trendingData.image)" v-for="(image, index) in trendingData.image.slice(1)" :key="index" :src="image" :data-index="index + 1">                
                </div>
            </div>
        </div>
        
    </div>
</div>

</template>

<style>

/* .trending-view__details-container{

} */
.open-hour {
    color: green; /* Apply green color for open hours */
}
.trending-view__details-container h1{
    color: #000;
    font-size: 2.5rem;
    font-weight: 600;
    letter-spacing: 0.2px;
}
.trending__view-content{
    
}
.trending__view__open-hours,
.trending__view__location{
    display: flex;
    gap: 0.5rem;
}

.trending__view-content__open-hours {
    gap: 0.5rem;
}
.toggle-expand{
    color: var(--color-blue);
}

.trending-view__image-gallery-container{
    width: 100%;
    gap: 0.5rem;
    height: 25rem;
}
.trending-view__image-gallery-main {
    width: 50%;
}
.trending-view__image-gallery-main img {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(3.141592653589793rad,rgba(255, 255, 255, 0),rgba(3, 18, 26, 0),rgba(0, 0, 0, 0.35));
    border-radius: 0.4rem;
}
.trending-view__image-gallery-side{
    width: 50%;
    height: 100%;
    gap: 0.5rem;
    flex-wrap: wrap;
}
.trending-view__image-gallery-side img {
    width: 49.3%;
    height: 49%;
    object-fit: cover;
    border-radius: 0.4rem;
}

</style>
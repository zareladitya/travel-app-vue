<script setup>
import { RouterLink, RouterView } from 'vue-router';
import image from '@/assets/images/mountain-hero-image.jpg'
import location from '@/data/location'


</script>
<template>
    <div class="location-container">
    <div v-for="item in location.data" :key="item.id" :id="item.id" class="location__card-id-container">
        <RouterLink :to="`/location/id=${item.id}/${item.city}`">
          <div class="location__card">
              <div class="left-to-right-gradient-mask"></div>
            <img :src="item.image[0]" alt="gambar">
            <div class="location__card-content">
              <h3>{{ item.city }}</h3>
              <p> {{ item.country }}</p>
            </div>
          </div>
        </RouterLink>
    </div>
  </div>
</template>
<style scoped>

a{
    padding: 0;
}
.location-container{
    display: flex;
    gap: 2%;
    width: 100%;
    
}
.location__card-id-container{
    width: 100%;
}
.location__card{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    max-width: 28rem;
    height: 20rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 3px rgb(0, 0, 0, 0.2);
    transition: all 200ms ease;
    position: relative;
}
.location__card img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.5rem;
    background: linear-gradient(180deg, #00000033 0%, #ffffff00 100%);
    filter: brightness(90%);
    transition: all 400ms ease;
}
.gradient-mask:hover +img{
    filter: brightness(100%);
}



.location__card-content{
    position: absolute;
    padding: 0.5rem;
    color: #ffffff;
    bottom: 5%;
    left: 5%;
    font-size: 0.9rem;
    z-index: 3;
}
.location__card-content h3{
    font-weight: 600;
}

</style>
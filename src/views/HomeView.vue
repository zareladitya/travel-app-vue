<script setup>
import { ref } from 'vue';
import HomePageSeperator from '@/components/HomePageSeperator.vue';
import HomeTrending from '@/components/HomeTrending.vue';
import HomeLocation from '@/components/HomeLocation.vue'
import HomeRecommendation from '@/components/HomeRecommendation.vue'
import HeaderView from './HeaderView.vue';
import Navbar from '@/components/HomeNavbar.vue';
import SubscribeNewsletter from '@/components/SubscribeNewsletter.vue';
import Footer from '@/components/Footer.vue';

const alertData = ref({
  title: null,
  message: null,
  type: null,
  timeoutId: null
});

</script>

<template>
    <Navbar/>
  <HeaderView/>
  <main class="sm-top-4">
    <section class="home__main section__margin">
      <section class="home__section__trending pd-top-2">
        <h2 class="fw-600">Rediscover yourself in Asia and beyond</h2>
        <HomeLocation/>
        <section class="home__section__location sm-top-4">
          <h2 class="fw-600">Trending</h2>
          <HomeTrending/>
        </section>
      </section>
      <section class="home__section__recommendation sm-top-4">
        <h2 class="fw-600">Accomodation Recommendations</h2>
        <HomeRecommendation/>
      </section>
    </section>
    <SubscribeNewsletter/>
  <Footer/>
  </main>
</template>

<style>
main{
  border-radius: 1rem 1rem 0 0;
  background-color: #fff;
}
h2{
  color: #000 ;
}
.home__section__trending{
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: #000;;
}
.home__section__location{
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: #000;
}
</style>
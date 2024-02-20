<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HeaderView from './views/HeaderView.vue'
import HomeView from './views/HomeView.vue'
import Footer from './components/Footer.vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  const redirectRoute = localStorage.getItem('redirectRoute')
  if (redirectRoute) {
    router.push(redirectRoute)
    localStorage.removeItem('redirectRoute')
  }
})
</script>

<template>
  <RouterView />
</template>

<style scoped>
.line-gap {
  width: 1px;
  height: 20px;
  background-color: var(--vt-c-black-mute);
}

a {
  margin: 0 1rem;
}
</style>

<script setup>
import { RouterLink } from 'vue-router'
import logo from '../assets/logo.vue'
import userIcon from '../components/icons/IconUser.vue'
import { onMounted, onUnmounted, ref } from 'vue'
import { user } from '@/data/userState'

const navRef = ref(null)
const isScrolled = ref(false)
const userDataProfile = ref(user)

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const handleScroll = () => {
  if (window.scrollY > 0) {
    isScrolled.value = true
  } else {
    isScrolled.value = false
  }
}

const handleLogin = () => {
  console.log('Button clicked!')
}

console.log('User : ' + userDataProfile.value)
console.log('User name : ' + user.name)
console.log('User : ' + user.value)
</script>

<template>
  <nav :class="{ scrolled: isScrolled }" ref="navRef">
    <div class="navbar" :class="{ scrolled_remove_line: isScrolled }" ref="navRef">
      <div class="navbar__logo">
        <RouterLink to="/">
          <logo :width="150" class="white" :class="{ 'scrolled-logo': isScrolled }" />
        </RouterLink>
      </div>
      <div class="navbar__navbar-links">
        <RouterLink to="/hotel">Hotel</RouterLink>
        <RouterLink to="/flights">Flights</RouterLink>
        <RouterLink to="/trains">Trains</RouterLink>
        <RouterLink to="/bus-travel">Bus & Travel</RouterLink>
      </div>
      <div class="navbar__cta-container">
        <div v-if="user" class="profile" :class="{ white: !isScrolled }">
          <RouterLink to="/profile" class="flex gap">
            <i class="ri-user-3-fill" :class="{ white: !isScrolled }"></i>
            <p>
              Hi, <span class="fw-600 capitalize">{{ user }}</span>
            </p>
          </RouterLink>
        </div>
        <div class="navbar__cta-login" v-else>
          <RouterLink to="/login" class="cta-login">
            <button @click="handleLogin" class="btn btn-register">
              <userIcon :width="20" :height="20" /> Log In / Register
            </button>
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="css">

.white{
    fill: #fff;
    color: #fff;
}
.scrolled-logo {
  fill: #000;
}
a{
    color: var(--vt-c-white);
}
a:hover {
  background-color: transparent;
}
nav {
  position: fixed;
  width: 100%;
  transition: all 0.3s ease;
  z-index: 100;
  top: 0;
}
.navbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 4rem;
  /* padding: 0.5rem 4rem; 
  background-color: rgba(255, 255, 255, 0); 
  position: fixed;
  top: 0;
  left: 0;
  transition: background-color 0.3s ease; 
  border-bottom: 1px solid var(--vt-c-black-mute); */
  border-bottom: 1px solid var(--vt-c-divider-dark-2);
}

.navbar__logo {
  display: flex;
  flex: 2;
}
.navbar__logo a:hover {
  background-color: transparent;
  border-radius: 0;
}
.navbar__logo img {
  width: 7rem;
  height: 3rem;
}
.navbar__navbar-links {
  display: flex;
  gap: 0.5rem;
}
.navbar__cta-container {
  display: flex;
  gap: 0.8rem;
  margin-left: 1.5rem;
}

.navbar__cta-container button {
  border: 0;
  fill: #fff;
  display: flex;
  gap: 0.4rem;
}

.navbar__cta-login {
  height: 2rem;
}
.navbar__cta-login .cta-login {
  height: 100%;
  display: flex;
  align-items: center;
}

button.btn-login {
  background: transparent;
  border: 1px solid var(--vt-c-white);
  color: var(--vt-c-white);
  fill: var(--vt-c-white);
  gap: 0.2rem;
  transition: all 200ms ease;
}

button.btn-register {
  background-color: var(--color-blue);
  font-weight: 600;
  color: #fff;
  transition: all 100ms ease;
}

@media (hover: hover) {
  button.btn-register:hover {
    scale: 1.05;
    filter: brightness(95%);
  }
  .scrolled button.btn-login:hover {
    color: var(--vt-c-white);
    fill: var(--vt-c-white);
  }
}

.scrolled_remove_line {
  border-bottom: 0;
}
.scrolled {
  background-color: rgba(255, 255, 255, 0.9);
  color: #000;
}

.scrolled a {
  color: #000;
}
.scrolled button.btn-login {
  border: 1px solid var(--color-blue);
  color: #000;
  fill: var(--color-blue);
  gap: 0.2rem;
  transition: all 200ms ease;
}
</style>

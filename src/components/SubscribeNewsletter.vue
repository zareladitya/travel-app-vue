<script setup>
import mockupIphone from '@/assets/mockup-iphone.vue'
</script>

<template>
  <div class="subscribe-nl">
    <img src="https://wallpapercave.com/wp/wp4190874.jpg" alt="" />
    <div class="subscribe-nl__container sm-top-2">
      <div class="mockup-iphone">
        <mockupIphone width="280" />
      </div>
      <h1>
        Stay updated to our newsletter<br />
        for the latest recommendation and promos.
      </h1>
      <div class="subscribe-nl__input-container">
        <div class="subscibe-nl__input-email">
          <i class="ri-mail-line"></i>
          <input type="text" placeholder="Your Email Address" />
        </div>
        <button>Subscribe to Newsletter</button>
      </div>
    </div>
  </div>
</template>

<style>
.mockup-iphone {
  position: absolute;
  z-index: 2;
  top: -40%;
  left: -50%;
}
.subscribe-nl {
  width: 100%;
  height: 30rem;
  background-color: var(--color-blue);
  display: flex;
  position: relative;
}
.subscribe-nl img {
  background-position: center;
  z-index: 1;
  width: 100%;
  background-size: cover;
  object-fit: cover;
  filter: brightness(70%) contrast(120%) sepia(30%) hue-rotate(-20deg);
  background-color: rgba(0, 0, 255, 0.2);
}
.subscribe-nl__container {
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 25%;
  left: 35%;
  width: 50%;
  z-index: 2;
}

.subscribe-nl__container h1 {
  color: #fff;
  font-weight: 600;
  line-height: 2.5rem;
  margin-bottom: 2rem;
}
.subscribe-nl__input-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.subscibe-nl__input-email {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  background-color: #fff;
  height: 2.5rem;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 30rem;
}

.subscibe-nl__input-email i {
  color: var(--color-blue);
  font-size: 25px;
  margin: 0.5rem;
}
.subscribe-nl input {
  border: 0;
  height: 100%;
  width: 100%;
  border-radius: 0 0.5rem 0.5rem 0;
}
.subscribe-nl input:focus {
  outline: none;
}

.subscribe-nl input::placeholder {
  font-size: 15px;
  letter-spacing: 0.2px;
  color: var(--color-light-grey);
}
.subscribe-nl button {
  border: 0;
  height: 2.5rem;
  background-color: var(--color-bright-orange);
  color: #fff;
  border-radius: 0.5rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  line-height: 1.5rem;
}
.subscribe-nl button:hover {
  filter: brightness(90%);
}
</style>

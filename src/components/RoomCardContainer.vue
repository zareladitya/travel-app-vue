<template>
  <div class="hotel-details__room-card-container flex gap[0.5] sm-top-1">
    <!-- Sidebar -->
    <div class="hotel-details__room-card-container__side-bar">
      <div class="room-card-container__image-container">
        <img :src="sidebarImage" alt="" />
      </div>
      <div class="room-card-container__side-bar-content">
        <p class="sm-bottom-1 sm-sd-0"><i class="ri-ruler-fill sm-right-1"></i>{{ sidebarSize }}</p>
        <div class="room-facilities">
          <p v-for="(facility, index) in sidebarFacilities" :key="index">{{ facility }}</p>
        </div>
      </div>
      <div class="w-full pd-[0.5]">
        <button class="btn bg-lightest-grey w-full tc-primary fw-600">See Room Details</button>
      </div>
    </div>
    <section class="flex fd-col w-full h-full">
      <!-- RoomCard components -->
      <RoomCard
        v-for="(room, index) in rooms"
        :key="index"
        :roomName="room.roomName"
        :bedInfo="room.bedInfo"
        :guestInfo="room.guestInfo"
        :availability="room.availability"
        :amenities="room.amenities"
        :discountInfo="room.discountInfo"
        :originalPrice="room.originalPrice"
        :discountedPrice="room.discountedPrice"
        :additionalInfo="room.additionalInfo"
        :dealInfo="room.dealInfo"
      />
    </section>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import RoomCard from './RoomCard.vue'
const props = defineProps({
  rooms: Array,
  sidebarImage: String,
  sidebarSize: String,
  sidebarFacilities: Array
})
</script>

<style>
.select-room-deals {
  border-top: 1px solid var(--color-grey);
  margin-top: 1rem;
  padding-top: 1rem;
}
.hotel-details__select-room {
  display: flex;
  background: linear-gradient(92deg, #a5defb 0%, #c6ecff 50%, #d6f1ff 100%);
}
.hotel-details__room-card {
  background-color: rgba(247, 249, 250, 1);
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 1px 2px rgba(0, 0, 0, 0.1);
}
.hotel-details__room-card-container__side-bar {
  background-color: #fff;
  border-radius: 0.5rem;
  min-height: 10rem;
  height: 100%;
  width: 30%;
  box-shadow: 1px 2px rgba(0, 0, 0, 0.1);
}
.room-facilities p {
  background-color: var(--color-lighter-green);
  color: var(--color-dark-green);
  border-radius: 50rem;
  padding: 0.1rem 1rem;
  width: fit-content;
  margin: 0.3rem 0;
  font-size: 0.8rem;
}
.room-card-container__image-container {
  height: 10rem;
}
.room-card-container__image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem 0.5rem 0 0;
}
.room-card-container__side-bar-content {
  padding: 0.5rem;
}
.hotel-details__room-card-container__select-room {
  background-color: #fff;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0px 2px rgba(0, 0, 0, 0.1);
}
.select-room-header__room-info {
  display: flex;
  justify-content: space-between;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-grey);
}

.room-content-info__amenities {
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-auto-flow: column;
  column-gap: 5rem;
}
.room-content-info p {
  align-items: center;
  display: flex;
  gap: 0.5rem;
}

.room-price-booking {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: end;
  align-items: end;
}
.room-price h3 {
  font-size: 1.3rem;
}
</style>

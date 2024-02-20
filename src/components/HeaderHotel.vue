<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const destinationQuery = ref('')
const destinationResult = ref([])

const loadDestinationData = () => {
  fetch(`http://localhost:3000/get_locations?search_query=${destinationQuery.value}`)
    .then((response) => response.json())
    .then((data) => {
      destinationResult.value = data
    })
    .catch((error) => {
      console.error('Error fetching data:', error)
    })
}

const highlightDestination = (text) => {
  const regex = new RegExp(`(${destinationQuery.value})`, 'gi')
  return text.replace(regex, '<span class="text-primary fw-bold">$1</span>')
}

const getDestination = (locationsName) => {
  destinationQuery.value = locationsName
  destinationResult.value = []
}

const date = ref()
const textInputOptions = {
  format: 'MM.dd.yyyy'
}

const adultCount = ref(1) // Set your initial value
const childCount = ref(0) // Set your initial value
const roomCount = ref(1) // Set your initial value
const isDropdownOpen = ref(false)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const increaseAdult = () => {
  if (adultCount.value < 8) {
    adultCount.value += 1
  } else {
    alert()
  }
}

const decreaseAdult = () => {
  if (adultCount.value > 1) {
    adultCount.value -= 1
  } else {
    alert()
  }
}

const increaseChild = () => {
  if (childCount.value < 6) {
    childCount.value += 1
  } else {
    alert()
  }
}

const decreaseChild = () => {
  if (childCount.value > 0) {
    childCount.value -= 1
  }
}
const increaseRoom = () => {
  if (roomCount.value < 8 && roomCount.value < adultCount.value) {
    roomCount.value += 1
  } else {
    alert()
  }
}

const decreaseRoom = () => {
  if (roomCount.value > 1) {
    roomCount.value -= 1
  } else {
    alert()
  }
}

const closeDropdownOnClickOutside = (event) => {
  if (!event.target.closest('.readonly-input') && !event.target.closest('.header__dropdown-menu')) {
    isDropdownOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', closeDropdownOnClickOutside)
  loadDestinationData()
})

onUnmounted(() => {
  window.removeEventListener('click', closeDropdownOnClickOutside)
})
</script>

<template>
  <div class="container">
    <div class="desc-hotel-container">
      <p>City or destination name</p>
      <p>Check-in & Check-out Dates</p>
      <p>Guest & Rooms</p>
    </div>
    <div class="container__input-hotel flex row">
      <input
        type="text"
        v-model="destinationQuery"
        placeholder="Enter Destination Location..."
        @input="loadDestinationData"
      />

      <div v-if="destinationQuery.valueOf() !== ''">
        <a
          href="#"
          v-for="result in destinationResult"
          :key="result.id"
          class="list-group-item list-group-item-action"
          @click="getDestination(result.location_name)"
        >
          <span v-html="highlightDestination(result.location_name)"></span>
        </a>
      </div>
      <VueDatePicker
        class="dp"
        v-model="date"
        range
        :partial-range="false"
        placeholder="Stay Date"
        :text-input="textInputOptions"
        :enable-time-picker="false"
      />

      <div class="occupancy-dropdown">
        <input
          :value="`${adultCount} Adult(s), ${childCount} Child, ${roomCount} Room`"
          @click="toggleDropdown"
          class="readonly-input"
          readonly
        />
        <div v-if="isDropdownOpen" class="header__dropdown-menu">
          <div class="occupancy-container flex fd-col">
            <div class="occupancy__detail flex row">
              <p>Adult</p>
              <div class="occupancy__counter flex row">
                <button @click.stop="decreaseAdult"><i class="ri-subtract-line"></i></button>
                <span>{{ adultCount }}</span>
                <button @click.stop="increaseAdult"><i class="ri-add-line"></i></button>
              </div>
            </div>
            <div class="occupancy__detail flex row">
              <p>Child</p>
              <div class="occupancy__counter flex row">
                <button @click.stop="decreaseChild"><i class="ri-subtract-line"></i></button>
                <span>{{ childCount }}</span>
                <button @click.stop="increaseChild"><i class="ri-add-line"></i></button>
              </div>
            </div>
            <div class="occupancy__detail flex row">
              <p>Room</p>
              <div class="occupancy__counter flex row">
                <button @click.stop="decreaseRoom"><i class="ri-subtract-line"></i></button>
                <span>{{ roomCount }}</span>
                <button @click.stop="increaseRoom"><i class="ri-add-line"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button class="search-button"><i class="ri-search-line icon-20 tc-white"></i></button>
    </div>
  </div>
</template>

<style>
.occupancy-dropdown {
  position: relative;
  width: 100%;
}

.header__dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  border: 1px solid #ccc;
  width: 100%;
  display: block;
  background-color: #fff;
  color: black;
  overflow: hidden;
}

.occupancy-dropdown input {
  padding: 0 1rem;
  color: var(--color-grey);
  font-size: 1rem;
}
.occupancy-dropdown input:focus + .header__dropdown-menu {
  display: block;
}

.header__dropdown-menu div {
  padding: 0.4rem;
}
.occupancy__detail {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.occupancy__counter {
  align-items: center;
  gap: 0.5rem;
}

.occupancy__counter button {
  padding: 0.5rem;
  border-radius: 0.4rem;
  border: 0;
  background-color: var(--color-lightest-grey);
  color: var(--color-blue);
  font-size: 20px;
  cursor: pointer;
}

.desc-hotel-container {
  width: 96%;
  display: grid;
  grid-template-rows: auto auto; /* Two rows: one for description, one for input */
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 0.6rem;
}
.desc-hotel-container p {
  font-weight: 600;
  letter-spacing: 0.3px;
}
.container__input-hotel {
  width: 100%;
}
.container__input-hotel input::placeholder {
  color: var(--color-grey);
  font-size: 1rem;
}

#destination {
  padding: 1rem;
}
.container__input-hotel input,
.container__input-hotel .search-button {
  height: 3rem;
  width: 100%;
  border: 0;
  outline: 2.5px solid var(--color-light-grey);
}
.container__input-hotel input[type='text']:first-child {
  border-radius: 1rem 0 0 1rem;
}
.container__input-hotel .search-button {
  width: 8rem;
  border-radius: 0 1rem 1rem 0;
  background-color: var(--color-blue);
}
.dp {
  --dp-border-radius: 0px; /*Configurable border-radius*/
  --dp-cell-border-radius: 0px; /*Specific border radius for the calendar cell*/
}
.container__desc-hotel p {
  font-weight: 400;
  letter-spacing: 0.2px;
}
</style>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const destinationQuery = ref('')
const destinationResult = ref([])
const isLocationDropdownOpen = ref(false)

const loadDestinationData = () => {
    fetch(`http://localhost:3000/get_data?search_query=${destinationQuery.value}`)
    .then(response => response.json())
    .then(data => {
        destinationResult.value = data;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
};

const highlightDestination = (text) => {
    const regex = new RegExp(`(${destinationQuery.value})`, 'gi');
    return text.replace(regex, '<span class="text-primary fw-bold">$1</span>');
};

const getDestination = (locationsName) => {
  destinationQuery.value = locationsName
  destinationResult.value = []
  isLocationDropdownOpen.value = false
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
  window.addEventListener('click', closeDropdownOnClickOutside);
  loadDestinationData();
});

onUnmounted(() => {
  window.removeEventListener('click', closeDropdownOnClickOutside)
});

</script>

<template>
  <div class="header-hotel-container">
    <div class="hotel__destination-container flex fd-row">
      <div class="hotel__destination__location relative flex fd-col w-full">
        <p>City or destination name</p>
        <input
          type="text"
          v-model="destinationQuery"
          placeholder="Enter Destination Location..."
          @input="loadDestinationData"
          class="hotel__destination-input"
        />
        <div
          v-if="destinationQuery.valueOf() !== ''"
          :class="{ 'location__search-dropdown': true, open: isLocationDropdownOpen }"
          class="w-full"
        >
          <div
            v-for="result in destinationResult"
            :key="result.id"
            class="hotel__destination__result"
          >
            <div class="hotel__destination_location-name">
              <span
                v-if="result.location_name"
                v-html="highlightDestination(result.location_name)"
                class="tc-black"
                @click="getDestination(result.location_name)"
              ></span>
              <p class="tc-black">
                {{ result.desc_name }}
              </p>
            </div>
            <span class="hotel__destination__location-tags tc-lighter-blue">{{ result.tags }}</span>
          </div>
        </div>
      </div>
      <div class="hotel__destination__location flex fd-col w-full">
        <p>Check-in & Check-out Dates</p>
        <VueDatePicker
          class="dp"
          v-model="date"
          range
          :partial-range="false"
          placeholder="Stay Date"
          :text-input="textInputOptions"
          :enable-time-picker="false"
        />
      </div>
      <div class="hotel__destination__location flex fd-col w-full">
        <div class="hotel__occupancy-dropdown">
          <p>Guest & Rooms</p>
          <div>
            <input
              :value="`${adultCount} Adult(s), ${childCount} Child, ${roomCount} Room`"
              @click="toggleDropdown"
              class="readonly-input"
              readonly
            />
          </div>
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
      </div>
      <div class="hotel__destination__location flex fd-col">
        <br />
        <button class="search-button"><i class="ri-search-line icon-20 tc-white"></i></button>
      </div>
    </div>
  </div>
</template>

<style>
.hotel__occupancy-dropdown {
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

.hotel__occupancy-dropdown input {
  padding: 0 1rem;
  color: var(--color-grey);
  font-size: 1rem;
}
.hotel__occupancy-dropdown input:focus + .header__dropdown-menu {
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

.desc-hotel-container p {
  font-weight: 600;
  letter-spacing: 0.3px;
}
.hotel__destination-container {
  width: 100%;
}
.hotel__destination-container input::placeholder {
  color: var(--color-grey);
  font-size: 1rem;
}

#destination {
  padding: 1rem;
}
.hotel__destination-container input,
.hotel__destination-container .search-button {
  height: 3rem;
  width: 100%;
  border: 0;
  outline: 2.5px solid var(--color-light-grey);
}
.hotel__destination-container .hotel__destination-input {
  border-radius: 1rem 0 0 1rem;
  padding: 0 1rem;
}
.hotel__destination-container .search-button {
  width: 3rem;
  border-radius: 0 1rem 1rem 0;
  background-color: var(--color-blue);
}

.hotel__destination__location p {
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.hotel__destination__location button {
  margin-top: 0.5rem;
}

.location__search-dropdown {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 5rem;
  background-color: #fff;
  z-index: 3;
  overflow: hidden;
}

.location__search-dropdown.open {
  max-height: 16rem;
  border-radius: 0.4rem;
  border: 2.5px solid var(--color-light-grey);
  overflow-y: auto;
}

.location__search-dropdown div {
  padding: 0.2rem 0.5rem;
}

.location__search-dropdown div:nth-child(even) {
  padding: 0.2rem 0.5rem;
  background-color: var(--color-lightest-grey);
}

.hotel__destination__result {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}

.hotel__destination__location-name {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
}

.hotel__destination__location-tags {
  font-size: 12px;
  margin: 0.2rem 0;
  padding: 0.2rem 0.5rem;
  border: 1px solid var(--color-lighter-blue);
  border-radius: 0.8rem;
}

.dp {
  --dp-border-radius: 0px; /*Configurable border-radius*/
  --dp-cell-border-radius: 0px; /*Specific border radius for the calendar cell*/
}
</style>

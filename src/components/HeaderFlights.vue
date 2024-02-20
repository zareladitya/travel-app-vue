<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

import '@vuepic/vue-datepicker/dist/main.css'

const departureQuery = ref('')
const destinationQuery = ref('')
const departureResult = ref([])
const destinationResult = ref([])

const loadDepartureData = () => {
  fetch(`http://localhost:3000/get_locations?search_query=${departureQuery.value}`)
    .then((response) => response.json())
    .then((data) => {
      departureResult.value = data
    })
    .catch((error) => {
      console.error('Error fetching data:', error)
    })
}

const highlightDeparture = (text) => {
  const regex = new RegExp(`(${departureQuery.value})`, 'gi')
  return text.replace(regex, '<span class="text-primary fw-bold">$1</span>')
}

const getDeparture = (locationsName) => {
  departureQuery.value = locationsName
  departureResult.value = []
}

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

const adultCount = ref(1) // Set your initial value
const childCount = ref(0) // Set your initial value
const infantCount = ref(1) // Set your initial value
const isDropdownOpen = ref(false)
const isFlightTypeDropdownOpen = ref(false)
const isCustomRadioHovered = ref(false)

const selectedOption = ref('Economy')
const hoveredOption = ref(false)

const options = [
  { value: 'Economy', label: 'Economy' },
  { value: 'Business', label: 'Business' },
  { value: 'First Class', label: 'First Class' },
  { value: 'VIP', label: 'VIP' }
]

const toggleOccupancy = () => {
  isDropdownOpen.value = !isDropdownOpen.value
  isFlightTypeDropdownOpen.value = false // Close flight-type-dropdown-container when occupancy dropdown is opened
}
const toggleFlightTypeDropdown = () => {
  isFlightTypeDropdownOpen.value = !isFlightTypeDropdownOpen.value
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
const increaseInfant = () => {
  if (infantCount.value < 8 && infantCount.value < adultCount.value) {
    infantCount.value += 1
  } else {
    alert()
  }
}
const decreaseInfant = () => {
  if (infantCount.value > 1) {
    infantCount.value -= 1
  } else {
    alert()
  }
}
const closeDropdownOnClickOutside = (event) => {
  if (
    !event.target.closest('.readonly-input') &&
    !event.target.closest('.header__dropdown-menu') &&
    !event.target.closest('.flight-type-dropdown-container') &&
    !event.target.closest('.flight-class__dropdown-menu')
  ) {
    isDropdownOpen.value = false
    isFlightTypeDropdownOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', closeDropdownOnClickOutside)
  loadDepartureData()
  loadDestinationData()
})

onUnmounted(() => {
  window.removeEventListener('click', closeDropdownOnClickOutside)
})
</script>

<template>
  <div class="header-flight-container">
    <div class="toggle__header-flight-container flex row">
      <div class="flight-type-container">
        <button class="active">One-way / Round-trip</button>
        <button>Multi-City</button>
      </div>

      <div class="flight-occupant-details flex fd-row">
        <div class="flight__occupancy-dropdown readonly-input" @click="toggleOccupancy">
          <div class="flight__occupancy-dropdown-container">
            <input
              :value="`${adultCount} Adult(s), ${childCount} Child, ${infantCount} Infant`"
              class="readonly-input"
            />
            <i class="ri-arrow-down-s-line"></i>
          </div>
          <div class="occupancy-dropdown">
            <!-- dropdown menu -->
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
                  <p>Infant</p>
                  <div class="occupancy__counter flex row">
                    <button @click.stop="decreaseInfant"><i class="ri-subtract-line"></i></button>
                    <span>{{ infantCount }}</span>
                    <button @click.stop="increaseInfant"><i class="ri-add-line"></i></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- second dropdown -->
        <div>
          <div class="flight-type-dropdown-container" @click="toggleFlightTypeDropdown">
            <p v-if="selectedOption">{{ selectedOption }}</p>
            <i class="ri-arrow-down-s-line"></i>
          </div>
          <div v-if="isFlightTypeDropdownOpen" class="flight-class__dropdown-menu">
            <label
              v-for="option in options"
              :key="option.value"
              @mouseover="hoveredOption = true"
              @mouseout="hoveredOption = false"
              class="button-group"
              :class="{ active: selectedOption === option.value }"
            >
              <div class="flight-class__dropdown-menu-content">
                <input type="radio" :value="option.value" v-model="selectedOption" />
                <span
                  class="custom-radio"
                  :class="{
                    active: selectedOption === option.value,
                    hovered: isCustomRadioHovered
                  }"
                  v-if="selectedOption === option.value"
                  @mouseover="isCustomRadioHovered = true"
                  @mouseout="isCustomRadioHovered = false"
                ></span>
                {{ option.label }}
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="input-flight-container">
    <div class="flight__departure__location-container">
      <div class="flight__departure__location">
        <p class="fw-600">From</p>
        <input
          type="text"
          v-model="departureQuery"
          placeholder="Enter Departure Location..."
          @input="loadDepartureData"
        />

        <div v-if="departureQuery.valueOf() !== ''">
          <a
            href="#"
            v-for="result in departureResult"
            :key="result.id"
            class="list-group-item list-group-item-action"
            @click="getDeparture(result.location_name)"
          >
            <span v-html="highlightDeparture(result.location_name)"></span>
          </a>
        </div>
      </div>
      <div class="flight__departure__location">
        <p class="fw-600">To</p>
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
      </div>
    </div>
    <div class="flight__departure__date-container">
      <div class="flight__departure__date">
        <p class="fw-600">Departure Date</p>
        <input type="text" />
      </div>
      <div class="flight__departure__date">
        <p class="fw-600">Return Date</p>
        <input type="text" />
      </div>
      <div class="flight__departure__date-btn-container">
        <button class="flight__departure__date-btn"><i class="ri-search-line icon-20"></i></button>
      </div>
    </div>
  </div>
</template>

<style>
/* flight-occupant-details */

.flight-occupant-details {
  gap: 1rem;
}
.flight-type-dropdown-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 10rem;
  position: relative;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  color: #fff;
  font-size: 20px;
  border-radius: 0.5rem;
  padding: 0 0.5rem;
  outline: 1px solid #fff;
}
.flight-type-dropdown-container p {
  font-size: 15px;
}
.flight-class__dropdown-menu {
  position: absolute;
  z-index: 20;
  margin-top: 0.2rem;
  width: 10rem;
  border-radius: 0.5rem;
  background-color: #fff;
  color: #000;
  font-size: 12px;
}
.flight-class__dropdown-menu-content {
  display: flex;
  gap: 1rem;
  align-items: center;
}

label {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
}

label input[type='radio'] {
  display: none;
}
.custom-radio {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--color-blue); /* Unchecked background color */
  margin-right: 8px; /* Adjust the spacing */
  text-align: center;
  line-height: 16px;
  font-size: 12px;
  transition: background-color 0.3s; /* Add a transition for a smooth hover effect */
}

.custom-radio.active {
  background-color: var(--color-blue); /* Checked background color */
}

.custom-radio:hover {
  background-color: black; /* Hover background color */
}
.button-group:hover {
  background-color: var(--color-light-grey);
}

.button-group.active {
  background-color: var(--color-lightest-grey);
}
.button-group.active:first-child,
.button-group:first-child:hover {
  border-radius: 0.5rem 0.5rem 0 0;
}
.button-group.active:last-child,
.button-group:last-child:hover {
  border-radius: 0 0 0.5rem 0.5rem;
}

/* Departure */
.input-flight-container {
  height: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0.5rem 0;
  gap: 1rem;
  width: 100%;
}
.flight__departure__location-container,
.flight__departure__date-container {
  width: 100%;
  display: flex;
  flex-direction: row;
}
.flight__departure__location,
.flight__departure__date {
  width: 100%;
}

.flight__departure__location input,
.flight__departure__date input {
  width: 100%;
  height: 3rem;
  border: 0;
  border-radius: 0 1rem 1rem 0;
  outline: 2px solid var(--color-light-grey);
  padding: 1rem;
  margin-top: 0.5rem;
}
.flight__departure__location:first-child input,
.flight__departure__date:first-child input {
  border-radius: 1rem 0 0 1rem;
}
.flight__departure__date-container {
  width: 100%;
}

.flight__departure__date-btn-container {
  width: 25%;
  display: flex;
  align-items: end;
  justify-content: end;
}
.flight__departure__date-btn-container button {
  width: 3rem;
  height: 3rem;
  border: 0;
  border-radius: 1rem;
  background-color: var(--color-blue);
  color: #fff;
}
.flight-type-dropdown-container {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
}
/* First Dropdown */
.flight__occupancy-dropdown {
  width: 15rem;
  height: 1rem;
}
.flight__occupancy-dropdown-container input {
  padding: 0.5rem 1rem;
  height: 2rem;
  position: relative;
  background-color: transparent;
  border: 0;
  width: 100%;
  cursor: pointer;
  color: #fff;
  font-weight: 600;
}
.flight__occupancy-dropdown-container input:focus {
  outline: none;
}
.flight__occupancy-dropdown-container input::selection {
  background-color: transparent;
}

.flight__occupancy-dropdown-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.15);
  width: 100%;
  font-size: 20px;
  border-radius: 0.5rem;
  padding: 0 0.5rem;
  outline: 1px solid #fff;
}

.toggle__header-flight-container {
  justify-content: space-between;
}
.flight-type-container {
  display: flex;
  gap: 0.5rem;
}
.flight-type-container button {
  border: 0;
  border-radius: 5rem;
  padding: 0.5rem 1rem;
  font-weight: 600;
  background-color: rgba(0, 0, 0, 0.2);
  color: #fff;
  letter-spacing: 0.3px;
}
.flight-type-container .active {
  background-color: var(--color-blue);
}
</style>

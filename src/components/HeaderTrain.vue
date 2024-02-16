<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const departureQuery = ref('');
const destinationQuery = ref('');
const departureResult = ref([]);
const destinationResult = ref([]);

const loadDepartureData = () => {
    fetch(`http://localhost:3000/get_data?search_query=${departureQuery.value}`)
    .then(response => response.json())
    .then(data => {
        departureResult.value = data;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
};

const highlightDeparture = (text) => {
    const regex = new RegExp(`(${departureQuery.value})`, 'gi');
    return text.replace(regex, '<span class="text-primary fw-bold">$1</span>');
};

const getDeparture = (locationsName) => {
    departureQuery.value = locationsName;
    departureResult.value = [];
};

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
    destinationQuery.value = locationsName;
    searchResult.value = [];
};


const date = ref();
const textInputOptions = {
  format: 'MM.dd.yyyy'
};

const adultCount = ref(1); // Set your initial value
const childCount = ref(0); // Set your initial value
const infantCount = ref(1); // Set your initial value
const isDropdownOpen = ref(false);


const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};


const increaseAdult = () => {
    if (adultCount.value < 8) {
        adultCount.value += 1;
    } else {
        alert();
    }
};

const decreaseAdult = () => {
    if (adultCount.value > 1) {
        adultCount.value -= 1;
    } else {
        alert();
    }
};

const increaseChild = () => {
    if (childCount.value < 6) {
        childCount.value += 1;
    } else {
        alert();
    }
};

const decreaseChild = () => {
    if (childCount.value > 0) {
        childCount.value -= 1;
    }
};
const increaseInfant = () => {
    if (infantCount.value < 8 && infantCount.value < adultCount.value) {
    infantCount.value += 1;
    } else {
        alert();
    }
};

const decreaseInfant = () => {
    if (infantCount.value > 1) {
        infantCount.value -= 1;
    } else {
        alert();
    }
};

const closeDropdownOnClickOutside = (event) => {
  if (!event.target.closest('.readonly-input') && !event.target.closest('.header__dropdown-menu')) {
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener('click', closeDropdownOnClickOutside);
  loadDepartureData();
  loadDestinationData();

});

onUnmounted(() => {
  window.removeEventListener('click', closeDropdownOnClickOutside);
});



</script>

<template>
<div class="container">
    <div class="desc-train-container">
        <p>Origin</p>
        <p>Destination</p>
        <p>Departure</p>
        <p>Passengers</p>
    </div>
    <div class="container__input-train flex row">
        <input type="text" v-model="departureQuery" placeholder="Enter Departure Location..." @input="loadDepartureData">

        <div v-if="departureQuery.valueOf() !== ''">
            <a href="#" v-for="result in departureResult" :key="result.id" class="list-group-item list-group-item-action" @click="getDeparture(result.country_name)">
            <span v-html="highlightDeparture(result.country_name)"></span>
            </a>
        </div>
        
        <input type="text" v-model="destinationQuery" placeholder="Enter Destination Location..." @input="loadDestinationData">

        <div v-if="destinationQuery.valueOf() !== ''">
            <a href="#" v-for="result in destinationResult" :key="result.id" class="list-group-item list-group-item-action" @click="getDestination(result.country_name)">
            <span v-html="highlightDestination(result.country_name)"></span>
            </a>
        </div>
        <VueDatePicker class="dp" v-model="date" range :partial-range="false" placeholder="Stay Date" :text-input="textInputOptions" :enable-time-picker="false"/>
        
        <div class="occupancy-dropdown">
        <input
          :value="`${adultCount} Adult, ${childCount} Child, ${infantCount} Infant`"
          @click="toggleDropdown" class="readonly-input" readonly/>
        <div v-if="isDropdownOpen" class="header__dropdown-menu">
            <div class="occupancy-container flex fd-col">
                <div class="occupancy__detail flex row" >
                    <p>Adult</p>
                    <div class="occupancy__counter flex row" >
                        <button @click.stop="decreaseAdult"> <i class="ri-subtract-line"></i></button>
                        <span>{{ adultCount }}</span>
                        <button @click.stop="increaseAdult"><i class="ri-add-line"></i> </button>
                    </div>
                </div>
                <div class="occupancy__detail flex row" >
                    <p>Child</p>
                    <div class="occupancy__counter flex row" >
                        <button @click.stop="decreaseChild"> <i class="ri-subtract-line"></i></button>
                        <span>{{ childCount }}</span>
                        <button @click.stop="increaseChild"><i class="ri-add-line"></i> </button>
                    </div>
                </div>
                <div class="occupancy__detail flex row" >
                    <p>Infant</p>
                    <div class="occupancy__counter flex row" >
                        <button @click.stop="decreaseInfant"> <i class="ri-subtract-line"></i></button>
                        <span>{{ infantCount }}</span>
                        <button @click.stop="increaseInfant"><i class="ri-add-line"></i> </button>
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

.occupancy-dropdown input{
    padding: 0 1rem ;
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
    justify-content: space-between
}
.occupancy__counter{
    align-items: center;
    gap: 0.5rem;
}

.occupancy__counter button{
    padding: 0.5rem;
    border-radius: 0.4rem;
    border: 0;
    background-color: var(--color-lightest-grey);
    color: var(--color-blue);
    font-size: 20px;
    cursor: pointer;
}

.desc-train-container {
    width: 100%;
    display: grid;
    grid-template-rows: auto auto; /* Two rows: one for description, one for input */
    grid-template-columns: repeat(4, 1fr);
    margin-bottom: 0.6rem;
}
.desc-train-container p{
    font-weight: 600;
    letter-spacing: 0.3px;
}
.container__input-train{
    width: 100%
}
.container__input-train input::placeholder{
    color: var(--color-grey);
    font-size: 1rem;
}

#destination{
    padding: 1rem;
}
.container__input-train input,
.container__input-train .search-button{
    height: 3rem;
    width: 100%;
    border: 0;
    outline: 2.5px solid var(--color-light-grey);

}
.container__input-train input[type=text]:first-child{
    border-radius: 1rem 0 0 1rem;
}
.container__input-train .search-button{
    width: 8rem;
    border-radius: 0 1rem 1rem 0;
    background-color: var(--color-blue);
}
.dp{
    --dp-border-radius: 0px; /*Configurable border-radius*/
    --dp-cell-border-radius: 0px; /*Specific border radius for the calendar cell*/
}
.container__desc-train p {
    font-weight: 400;
    letter-spacing: 0.2px;
}
</style>
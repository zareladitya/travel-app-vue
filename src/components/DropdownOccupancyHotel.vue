<script setup>
import { ref, onMounted, onUnmounted, defineProps } from 'vue';

const adultCount = ref(1); // Set your initial value
const childCount = ref(0); // Set your initial value
const roomCount = ref(1); // Set your initial value
const isDropdownOpen = ref(false);

const props = defineProps({
  fontSize: {
    type: Number,
    default: 16 // Default font size
  },
  width: {
    type: Number,
    default: 100 // Default width
  }
});

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdownOnClickOutside = (event) => {
  if (!event.target.closest('.readonly-input') && !event.target.closest('.header__dropdown-menu')) {
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener('click', closeDropdownOnClickOutside);
});

onUnmounted(() => {
  window.removeEventListener('click', closeDropdownOnClickOutside);
});


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
const increaseRoom = () => {
    if (roomCount.value < 8 && roomCount.value < adultCount.value) {
    roomCount.value += 1;
    } else {
        showAlert();
    }
};

const decreaseRoom = () => {
    if (roomCount.value > 1) {
        roomCount.value -= 1;
    } else {
        alert();
    }
};

</script>
<template>
<div class="occupancy-dropdown" :style="{ width : width + '%' , minWidth : minWidthRem + 'rem'}">
        <input
          :value="`${adultCount} Adult(s), ${childCount} Child, ${roomCount} Room`"
          @click="toggleDropdown" class="readonly-input" readonly :style="{ fontSize: fontSize + 'px', width : width + '%' , minWidth : minWidthRem + 'rem' }"/>
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
                    <p>Room</p>
                    <div class="occupancy__counter flex row" >
                        <button @click.stop="decreaseRoom"> <i class="ri-subtract-line"></i></button>
                        <span>{{ roomCount }}</span>
                        <button @click.stop="increaseRoom"><i class="ri-add-line"></i> </button>
                    </div>
                </div>
            </div>
     
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
</style>
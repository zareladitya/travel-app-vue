<script setup>
import { ref } from 'vue';
import location from '@/data/location';
const locationData = ref({});
const expanded = ref(false);

const toggleExpand = () => {
  expanded.value = !expanded.value;
};

const props = defineProps({
  title: String
});
</script>

<template>
    <div class="practical-tips__card-dropdown sm-top-1" @click="toggleExpand">
      <div class="practical-tips__card-dropdown-header">
        <h4 class="fw-600">{{ title }}</h4>
        <i :class="['ri-arrow-down-s-line icon-20', expanded ? 'expanded' : '']"></i>
      </div>
      <div class="practical-tips__card-dropdown-content" :class="{ 'expanded': expanded }">
        <slot></slot>
      </div>
    </div>
</template>

<style>
.practical-tips__card-dropdown {
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: #fff;
    overflow: hidden; 
    transition: max-height 0.3s ease; 

}

.practical-tips__card-dropdown-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    padding: 0.5rem;
    cursor: pointer;
}

.practical-tips__card-dropdown-content {
    padding: 0 0.5rem;
    max-height: 0; /* Initially hidden */
    overflow: hidden; /* Hide overflow content when collapsed */
}

/* Expand the content when the card is expanded */
.practical-tips__card-dropdown-content.expanded {
    border-top: 1px solid var(--color-grey);
    padding-top: 0.5rem;
    max-height: 1000px; /* Sufficiently large value to accommodate content */
    margin-bottom: 0.5rem;
}
.ri-arrow-down-s-line{
    transition: all 300ms ease;
}
/* Rotate arrow icon when the card is expanded */
.ri-arrow-down-s-line.expanded {
    transform: rotate(180deg);
}
</style>
  

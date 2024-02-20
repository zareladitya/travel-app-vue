<template>
  <div v-if="showAlert" :class="['custom-alert', 'alert-' + alertType]">
    <p>{{ message }}</p>
    <button @click="hideAlert">OK</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const alertData = ref({
  title: null,
  message: null,
  type: null
})

const showAlert = (title, message, type) => {
  alertData.value = { title, message, type }
}

const closeAlert = () => {
  alertData.value = { title: null, message: null, type: null }
}

const hideAlert = () => {
  alertData.value = { title: null, message: null, type: null }
}
</script>

<style scoped>
.custom-alert {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.alert-danger {
  background-color: #f8d7da; /* Adjust background color for danger alerts */
}

.alert-success {
  background-color: #d4edda; /* Adjust background color for success alerts */
}
</style>

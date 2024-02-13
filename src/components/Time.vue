<template>
    <div>
      <h1>{{ currentTime }}</h1>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentTime: '',
      };
    },
    mounted() {
      this.updateTime(); // Set initial time
      setInterval(this.updateTime, 1000); // Update time every second
    },
    methods: {
      updateTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        this.currentTime = `${hours}:${minutes}:${seconds}`;
      },
    },
  };
  </script>
  

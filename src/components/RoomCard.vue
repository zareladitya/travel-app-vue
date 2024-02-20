<template>
      <div class="hotel-details__room-card-container__select-room w-full h-full sm-bottom-1">
        <div class="select-room-header">
          <h3 class="fw-600">{{ roomName }}</h3>
          <div class="select-room-header__room-info pd-[0.5]">
            <div class="flex gap-1">
              <p><i class="ri-hotel-bed-fill tc-primary sm-right-[0.5]"></i>{{ bedInfo }}</p>
              <p><i class="ri-group-fill tc-primary sm-right-[0.5]"></i>{{ guestInfo }}</p>
            </div>
            <p class="tc-orange">({{ availability }} room(s) available)</p>
          </div>
        </div>
        <div class="select-room-content flex fd-row justify-sb sm-top-1 w-full h-full">
          <div class="room-content-info">
            <div class="room-content-info__amenities">
              <p v-for="amenity in amenities" :key="amenity"><i class="ri-restaurant-line tc-green icon-20"></i>{{ amenity }}</p>
            </div>
            <p class="sm-top-1"><i class="ri-discount-percent-line icon-20"></i>{{ discountInfo }}</p>
          </div>
          <div class="room-price-booking">
            <div class="room-price">
              <h5 class="tc-grey strike-through">Rp. {{ originalPrice }}</h5>
              <h3 class="fw-600 tc-orange">Rp. {{ discountedPrice }}</h3>
              <p class="tc-grey fs-0.8rem">{{ additionalInfo }}</p>
            </div>
            <button class="btn bg-bright-orange tc-white fw-600 w-full">Book Now</button>
          </div>
        </div>
        <div class="select-room-deals">
          <p class="tc-green">{{ dealInfo }}</p>
        </div>
      </div>
  </template>
  
  <script>
  export default {
    props: {
      roomName: String,
      bedInfo: String,
      guestInfo: String,
      availability: Number,
      amenities: Array,
      discountInfo: String,
      originalPrice: String,
      discountedPrice: String,
      additionalInfo: String,
      dealInfo: String
    }
  };
  </script>
  
  <style scoped>
  /* Add scoped styles here if necessary */
  </style>
  
<script setup>
import Navbar from '@/components/Navbar.vue';
</script>

<template>
<Navbar/>
<div class="hotel pd-top-4 w-full">
    <section class="hotel-hero w-full tc-white pd-4 relative">
        <h1 class="fw-700 fs-3rem">Find your next stay</h1>
        <p class="fs-1rem">Search deals on hotels, homes, and much more...</p>
        <div class="hotel-hero__searchbox flex fd-col gap[0.5]">
            <h4>Hotels</h4>
            <div class="hotel-search__destination w-full">
                <p>City, destination, or hotel name</p>
                <input type="search" placeholder="Search" class="w-full">
            </div>
            <div class="hotel-search__check-in-out flex fd-row">
                <input type="search" placeholder="Search" class="w-full">
                <input type="search" placeholder="Search" class="w-full">

            </div>
        </div>
    </section>
</div>
</template>

<style>
.hotel-hero{
    background-color: #002f72;
}
.hotel-hero__searchbox{
    position: absolute;
    bottom: -9rem;
    left: 50%;
    transform: translate(-50%);
    background-color: var(--color-light-grey);
    width: 80%;
}
.hotel-hero__searchbox input{
    height: 3rem;
}
</style>
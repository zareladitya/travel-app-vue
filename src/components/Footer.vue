<script setup>
import logo from '@/assets/logo.vue';
</script>

<template>
    <div class="footer">
        <div class="footer-container pd-top-2">
            <div class="footer__logo-container">
                <logo width="200"/>
                <p>Bandung, IDN</p>
                <p>2024, Rights Reserved</p>
            </div>
            <div class="footer__links-container">
                <div class="footer__links-about">
                    <h4>About</h4>
                    <p>Journy is your gateway to a world of possibilities. Embark on a journey that transcends the conventional, and let Journy be your compass in navigating the tapestry of the world. Your travel dreams are not just destinations – they are experiences waiting to unfold, and Journy is here to make them a reality.</p>
                </div>
                <div class="footer__links__menu">
                    <h4>Menu</h4>
                    <p>Hotel</p>
                    <p>Flight</p>
                    <p>Trains</p>
                    <p>Bus & Travel</p>
                </div>
                <div class="footer__links__contact-us">
                    <h4>Contact Us</h4>
                    <p>Azarel Lazuardi Aditya</p>
                    <p><i class="ri-instagram-line"></i>Instagram</p>
                    <p><i class="ri-github-line"></i>GitHub</p><br>
                    <p>Ghazi Adila Ghifari</p>
                    <p><i class="ri-instagram-line"></i>Instagram</p>
                    <p><i class="ri-github-line"></i>GitHub</p>
                </div>
            </div>

        </div>
    </div>
</template>

<style >

.footer p,
.footer h4{
    color: #ffffff;
}
.footer h4{
    font-weight: 600;
}
.footer{
    height: 20rem;
    width: 100%;
    background-color: var(--color-light-grey);
    padding: 1rem;
    background-color: var(--color-footer);
}

.footer-container{
    display: flex;
    gap: 10%;
}
.footer__logo-container{
    fill: #ffffff;
}
.footer__logo-container p{
    margin-left: 1rem;
    font-size: 13px;
}
.footer__links-container{
    width: 100%;
    display: flex;
    gap: 15%;
}
.footer__links-container h4{
    letter-spacing: 0.3px;
    font-size: 16px;
}
.footer__links-container p{
    color: #dfdfdf;
    cursor: pointer;
}
.footer__links-about{
    max-width: 22rem;
}
.footer__links__menu{
    width: 6rem;
}
.footer__links-container p:hover:not(.footer__links-about p){
    font-weight: 600;
}
.footer__links__contact-us i{
    margin-right: 1rem;
}
</style>
<script setup>
import { onMounted, ref ,computed } from 'vue';
import { RouterLink, RouterView ,useRoute } from 'vue-router'
//components
import hamberger from '@/components/icons/hamberger.vue';
import close from '@/components/icons/close.vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

//mod
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
// import Footer from '../components/Footer.vue';

gsap.registerPlugin(ScrollTrigger);


//判斷是否要footer跟navbar
const route = useRoute()
const hideNavAndFooter = computed(() =>
  ['/qrtask', '/WrongPage', '/CorrectPage'].includes(route.path)
)
    onMounted(() => {












        // Initialize a new Lenis instance for smooth scrolling
    const lenis = new Lenis();

    // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
    // This ensures Lenis's smooth scroll animation updates on each GSAP tick
    gsap.ticker.add((time) => {
    lenis.raf(time * 1000); // Convert time from seconds to milliseconds
    });

    // Disable lag smoothing in GSAP to prevent any delay in scroll animations
    gsap.ticker.lagSmoothing(0);
    });


</script>

<template>
    

    <Navbar v-if="!hideNavAndFooter"/> 
        <!-- <hamberger  :sizeWidth="22"  :sizeHeight="20"/> -->
        <!-- <close  :sizeWidth="37"  :sizeHeight="37"/> -->
    

    <RouterView />
    <Footer v-if="!hideNavAndFooter"/> 
</template>

<style lang="scss"  >
    // .wrapper {
  
    //     a{
    //         font-size: 100px;
    //         color: black;
    //     }
    
    // }
    
    // nav{
    //     // background: yellow;
    //     height: 10dvh;
    //     width: 100%;
    //     display: flex;
    //     position: fixed;
    //     z-index: 2;
    //     a{
    //         color: black;
    //     }
    // }
    // footer{
    //     background: yellow;
    //     height: 100dvh;
    //     width: 100%;
    // }
    body{
        // display: flex;
        // flex-direction: column;
        // justify-content: center;
        // align-items: center;
    }
</style>

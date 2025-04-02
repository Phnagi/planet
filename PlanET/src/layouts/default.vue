<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger);
    let footer = ref(null);
    onMounted(() => {


        let footerDom = footer.value;

        //最後一段吸附 從Box1到Box3的吸附
        let footer_snap = gsap.timeline({
            scrollTrigger: {
                trigger: footerDom,
                start: `50% 100%`,//從box3往上一個Box2的高
                end:  `100% 100%`,
                // pin: true,
                scrub: 1,
                snap:1,
                markers: true,
            }
        });













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
    <nav>
        <RouterLink to="/">home</RouterLink>
        <RouterLink to="/about">about</RouterLink>
    </nav>

    <RouterView />
    <footer ref="footer">

        <h1>this is footer</h1>

    </footer>
</template>

<style lang="scss"  >
    // .wrapper {
  
    //     a{
    //         font-size: 100px;
    //         color: black;
    //     }
    
    // }
    *{
        padding: 0px;
        margin: 0px;
        box-sizing: border-box;
       

    }
    body {
        padding: 0px;
        margin: 0px;
        box-sizing: border-box;
        // background-color: gray;

    }
    nav{
        // background: yellow;
        height: 10dvh;
        width: 100%;
        display: flex;
        position: fixed;
        z-index: 2;
        a{
            color: black;
        }
    }
    footer{
        background: yellow;
        height: 100dvh;
        width: 100%;
    }
</style>

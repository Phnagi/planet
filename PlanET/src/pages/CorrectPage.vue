<script setup>
import { onMounted, ref ,reactive,watch,onBeforeUnmount } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import ImageData from '@/assets/image.json';
import VideoData from '@/assets/video.json';

//components
import hamberger from '@/components/icons/hamberger.vue';
import close from '@/components/icons/close.vue';
import Navbar from '@/components/Navbar.vue';
import DynamicIcon from '@/components/icons/DynamicIcon.vue';
//mod
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

onMounted(()=>{


});
</script>








<template>
    <div class="correactArea">
        <div class="correct p-6">
            <div class="iconBox">
                <DynamicIcon name="walk"/>
            </div>
            <h1 class="tw">答對了</h1>
        </div>
    </div>

  </template>

  <style scoped lang="scss">
.correactArea{
    width: 100dvw;
    height: 100dvh;
    background-color: $color-white;
    .correct{

        padding: 100px 80px 0px 80px;
        height: 100dvh;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        @media(min-width: 767px) and (max-width: 1024px){
            padding: 60px 80px 40px 80px;
        }
        @media (max-width: 767px){
            padding: 60px 40px 40px 40px;
        }
        .iconBox{
            width: 200px;
            position: relative;
            left: 4px;
        }
        h1.tw{
            color: $color-green;
            position: relative;
            left: 4px;
        }
    }
}



</style>
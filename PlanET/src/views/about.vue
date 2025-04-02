<script setup>
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from '@/components/HelloWorld.vue';
</script>

<template>
    <div class="wrapper">
        <h1>this about</h1>
        <RouterView />
        <RouterLink to="/about">about-index</RouterLink>
        <RouterLink to="/about/aboutAbout">about-about2</RouterLink>
    </div>

</template>

<style scoped lang="scss"  >
    .wrapper {
  
        h1{
            font-size: 100px;
            color: black;
        }
    
    }

</style>

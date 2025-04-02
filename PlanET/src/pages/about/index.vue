<script setup>
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from '@/components/HelloWorld.vue';
</script>

<template>
    <div class="wrapper">
        <h1>this about index</h1>
        <RouterLink to="/about">about-index</RouterLink>
        <RouterLink to="/about/about2">about-about2</RouterLink>
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

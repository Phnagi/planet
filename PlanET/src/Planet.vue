<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

</script>

<template>
    <RouterView />
    <RouterLink to="/">home</RouterLink>
    <RouterLink to="/about">about</RouterLink>
</template>

<style scoped lang="scss"  >
    .wrapper {
  
        a{
            font-size: 100px;
            color: black;
        }
    
    }

</style>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from '@/components/HelloWorld.vue';
</script>

<template>
    <div class="wrapper">

        <RouterView />

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

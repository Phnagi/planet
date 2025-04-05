<script setup>
import { RouterLink, RouterView } from 'vue-router';

</script>

<template>
    <div class="wrapperBox">

        <RouterView />

    </div>

</template>

<style scoped lang="scss"  >
    .wrapperBox {
        width: 100%;
        height: 100dvh;
        background-color:$color-white ;
        display: flex;
        justify-content: center;

    
    }

</style>

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
        width: 100dvw;
        // height: 100dvh;
        background-color:$color-white ;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

    
    }

</style>

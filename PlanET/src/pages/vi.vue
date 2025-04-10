<script setup>
import { RouterLink, RouterView } from 'vue-router';
import DynamicIcon from '@/components/icons/DynamicIcon.vue';
import DynamicFunctionalMap from '@/components/icons/DynamicFunctionalMap.vue';
import { onMounted, reactive, ref, watch } from 'vue';
import AboutSelectIconData from '@/assets/json/about/index.json';
import ImageData from '@/assets/image.json';
import Index from '@/components/VI/index.vue';
//component

</script>

<template>
  <div class="warpper">
    <Index/>
  </div>
</template>



<style scoped lang="scss" >
  .warpper{
    width: 100dvw;
  }
</style>


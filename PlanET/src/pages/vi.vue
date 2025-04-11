<script setup>
import { RouterLink, RouterView } from 'vue-router';
import DynamicIcon from '@/components/icons/DynamicIcon.vue';
import DynamicFunctionalMap from '@/components/icons/DynamicFunctionalMap.vue';
import { onMounted, reactive, ref, watch } from 'vue';
import AboutSelectIconData from '@/assets/json/about/index.json';
import ImageData from '@/assets/image.json';

import ViNav from '@/components/VI/viNav.vue';
//component

</script>

<template>
  <div class="vi">
    <div class="viNavBox">
      <ViNav/>
    </div>
    <div class="warpper">
      <RouterView />
    </div>
  </div>

  

</template>



<style scoped lang="scss" >
  .vi{
    // background-color: $color-white;
    // // background: cadetblue;
    // height: 100dvh;
    // // display: flex;
    //  padding: 100px 0px 0px 0px;
    // // flex-direction: column;
    // // justify-content: center;
    // // align-items: center;
    .viNavBox{
    width: 100dvw;
    padding: 100px 0px 0px 0px;
    background-color: $color-white;
    display: flex;
    justify-content: center;
    align-items: center;

    }
    .warpper{
      width: 100dvw;
      background-color: $color-white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }



</style>


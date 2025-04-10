
  
  <script setup>
  import { ref, watch } from 'vue';

  // 建立一個圖標映射物件，手動載入所有可能的 SVG
  const functional_Map = {
    footprint: () => import('@/assets/images/about/footprint/index/functionalMap.svg?raw'),
    buy: () => import('@/assets/images/about/footprint/index/functionalMap_buy.svg?raw'),
    history: () => import('@/assets/images/about/footprint/history/functionalMap_history.svg?raw'),
    edit_route: () => import('@/assets/images/about/footprint/edit_route/functionalMap_editRoute.svg?raw'),
    record: () => import('@/assets/images/about/footprint/record/functionalMap_record.svg?raw'),

    browse: () => import('@/assets/images/about/shop/browse/functionalMap_browse.svg?raw'),
    trade_history: () => import('@/assets/images/about/shop/history/functionalMap_history.svg?raw'),
    mystore: () => import('@/assets/images/about/shop/my_store/functionalMap_mystore.svg?raw'),
    trade_seller: () => import('@/assets/images/about/shop/trade_seller/functionalMap_trade.svg?raw'),
    traffic: () => import('@/assets/images/about/shop/traffic/functionalMap_traffic.svg?raw'),

    mission: () => import('@/assets/images/about/mission/mission_task/functionalMap_mission.svg?raw'),
    friendChallenge: () => import('@/assets/images/about/mission/friend_challenge/functionalMap_friendChallenge.svg?raw'),
    mission_club: () => import('@/assets/images/about/mission/mission_club/functionalMap_missionClub.svg?raw'),
    qrtask: () => import('@/assets/images/about/mission/qr_task/functionalMap_qrtaskMain.svg?raw'),
    qrtask_inner: () => import('@/assets/images/about/mission/qr_task/functionalMap_qrtaskInner.svg?raw'),

    social_browse: () => import('@/assets/images/about/social/browse/functionalMap_social.svg?raw'),
    editPost: () => import('@/assets/images/about/social/editPost/functionalMap_editPost.svg?raw'),
    club: () => import('@/assets/images/about/social/club/functionalMap_club.svg?raw'),
    profile: () => import('@/assets/images/about/social/profile/functionalMap_profile.svg?raw'),

  };

  const props = defineProps({
  name: {
      type: String,
      required: true,
  },
  });

  const functional_MapContent = ref(null);

  async function loadSvg(name) {
  try {
      if (functional_Map[name]) {
      const svg = await functional_Map[name]();
      functional_MapContent.value = svg.default;
      functional_MapContent.value = svg.default.replace('<svg', '<svg width="100%" height="100%"');
      } else {
      console.error(`未找到圖標: ${name}`);
      }
  } catch (e) {
      console.error(`圖標載入失敗: ${name}`, e);
  }
  }

  watch(() => props.name, (newName) => {
  loadSvg(newName);
  });

  loadSvg(props.name);
</script>

<template>
  <div class="functional_Map" v-if="functional_MapContent" v-html="functional_MapContent"></div>
</template>


<style scoped>
.functional_Map {
width: 100%;
height: 100%;
display: flex;
justify-content: flex-start;
align-items:flex-start;
}
</style>
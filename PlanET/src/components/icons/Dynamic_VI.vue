
  
  <script setup>
  import { ref, watch } from 'vue';

  // 建立一個圖標映射物件，手動載入所有可能的 SVG
  const VI_Map = {
    graphics: () => import('@/assets/images/VI/logo/graphics.svg?raw'),
    graphics_full: () => import('@/assets/images/VI/logo/graphics_full.svg?raw'),
    flower: () => import('@/assets/images/VI/logo/flower.svg?raw'),
    vine: () => import('@/assets/images/VI/logo/vine.svg?raw'),

    typography_tw: () => import('@/assets/images/VI/typography/tw.svg?raw'),
    typography_en: () => import('@/assets/images/VI/typography/en.svg?raw'),

    color_34BAF3: () => import('@/assets/images/VI/color/color_34BAF3.svg?raw'),
    color_43B71B: () => import('@/assets/images/VI/color/color_43B71B.svg?raw'),
    color_222222: () => import('@/assets/images/VI/color/color_222222.svg?raw'),
    color_787878: () => import('@/assets/images/VI/color/color_787878.svg?raw'),
    color_F64D4D: () => import('@/assets/images/VI/color/color_F64D4D.svg?raw'),
    color_FFFFFF: () => import('@/assets/images/VI/color/color_FFFFFF.svg?raw'),
  };

  const props = defineProps({
  name: {
      type: String,
      required: true,
  },
  });

  const VI_Content = ref(null);

  async function loadSvg(name) {
  try {
      if (VI_Map[name]) {
      const svg = await VI_Map[name]();
      VI_Content.value = svg.default;
      VI_Content.value = svg.default.replace('<svg', '<svg width="100%" height="100%"');
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
  <div class="icon" v-if="VI_Content" v-html="VI_Content"></div>
</template>


<style scoped>
.icon {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
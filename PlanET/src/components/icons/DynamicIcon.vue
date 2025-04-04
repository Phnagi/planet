
  
  <script setup>
    import { ref, watch } from 'vue';

    // 建立一個圖標映射物件，手動載入所有可能的 SVG
    const iconMap = {
        walk: () => import('@/assets/icon/walk.svg?raw'),
        store: () => import('@/assets/icon/store.svg?raw'),
        train: () => import('@/assets/icon/train.svg?raw'),
        arrow_down: () => import('@/assets/icon/arrow_down.svg?raw'),
        arrow_right: () => import('@/assets/icon/arrow_right.svg?raw'),
        home: () => import('@/assets/icon/home.svg?raw'),
        text: () => import('@/assets/icon/text.svg?raw'),
        hamberger: () => import('@/assets/icon/hamberger.svg?raw'),
        close: () => import('@/assets/icon/close.svg?raw'),

    };

    const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    });

    const iconContent = ref(null);

    async function loadSvg(name) {
    try {
        if (iconMap[name]) {
        const svg = await iconMap[name]();
        iconContent.value = svg.default;
        iconContent.value = svg.default.replace('<svg', '<svg width="100%" height="100%"');
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
    <div class="icon" v-if="iconContent" v-html="iconContent"></div>
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
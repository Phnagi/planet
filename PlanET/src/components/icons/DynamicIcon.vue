
  
  <script setup>
    import { ref, watch } from 'vue';

    // 建立一個圖標映射物件，手動載入所有可能的 SVG
    const iconMap = {
        walk: () => import('@/assets/icon/walk.svg?raw'),
        walk2: () => import('@/assets/icon/walk2.svg?raw'),
        walk2_gray: () => import('@/assets/icon/walk2_gray.svg?raw'),
        store: () => import('@/assets/icon/store.svg?raw'),
        store_gray: () => import('@/assets/icon/store_gray.svg?raw'),
        train: () => import('@/assets/icon/train.svg?raw'),
        arrow_down: () => import('@/assets/icon/arrow_down.svg?raw'),
        arrow_right: () => import('@/assets/icon/arrow_right.svg?raw'),
        home: () => import('@/assets/icon/home.svg?raw'),
        text: () => import('@/assets/icon/text.svg?raw'),
        hamberger: () => import('@/assets/icon/hamberger.svg?raw'),
        close: () => import('@/assets/icon/close.svg?raw'),
        buy: () => import('@/assets/icon/buy.svg?raw'),
        buy_gray: () => import('@/assets/icon/buy_gray.svg?raw'),
        card: () => import('@/assets/icon/card.svg?raw'),
        card_gray: () => import('@/assets/icon/card_gray.svg?raw'),
        club: () => import('@/assets/icon/club.svg?raw'),
        club_gray: () => import('@/assets/icon/club_gray.svg?raw'),
        edit: () => import('@/assets/icon/edit.svg?raw'),
        edit_gray: () => import('@/assets/icon/edit_gray.svg?raw'),
        history: () => import('@/assets/icon/history.svg?raw'),
        history_gray: () => import('@/assets/icon/history_gray.svg?raw'),
        mission: () => import('@/assets/icon/mission.svg?raw'),
        mission_gray: () => import('@/assets/icon/mission_gray.svg?raw'),
        mystore: () => import('@/assets/icon/mystore.svg?raw'),
        mystore_gray: () => import('@/assets/icon/mystore_gray.svg?raw'),
        personal: () => import('@/assets/icon/personal.svg?raw'),
        personal_gray: () => import('@/assets/icon/personal_gray.svg?raw'),
        qrCode: () => import('@/assets/icon/qrCode.svg?raw'),
        qrCode_gray: () => import('@/assets/icon/qrCode_gray.svg?raw'),
        record: () => import('@/assets/icon/record.svg?raw'),
        record_gray: () => import('@/assets/icon/record_gray.svg?raw'),
        shop: () => import('@/assets/icon/shop.svg?raw'),
        social: () => import('@/assets/icon/social.svg?raw'),
        social_gray: () => import('@/assets/icon/social_gray.svg?raw'),

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
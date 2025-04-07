<script setup>
import { RouterLink, RouterView } from 'vue-router';
import DynamicIcon from '@/components/icons/DynamicIcon.vue';
import { onMounted, reactive, ref, watch } from 'vue';
import AboutSelectIconData from '@/assets/json/about/index.json';
import ImageData from '@/assets/image.json';
//slot
import InnerInfoSlot from '@/components/about/InnerInfoSlot.vue';
const iconData = ref([
  { icon: 'buy', text: '消費碳足跡' },
  { icon: 'walk2', text: '節能減碳' },
  { icon: 'edit', text: '資源回收' },
  { icon: 'history', text: '資源回收' }
]);

//接收所有圖片的重新整理
const images = import.meta.glob(
    '@/assets/images/about/**/**/**.png', 
    { 
        eager: true, 
        import: 'default' 
});
//內容data
let contentData_aboutFootprint =reactive({});
//function 來得到所有footprint內的內容

    function resolveImagePaths(contentData) {
        const resolvedData = {};
        
        for (const key in contentData) {
            if(key ==="footprint"){
                    const group = contentData[key];
                // console.log(group);
                // 看是否有 "index" 層級
                for(const innerKey in group ){
                    // console.log(group[innerKey]);
                    resolvedData[innerKey] = group[innerKey].map((item) => {
                        // console.log("item",item)
                        const matched = Object.keys(images).find((path) =>
                        path.includes(item.src)
                        );
                        // console.log(matched)
                        // console.log(item.src)
                        // console.log(images[matched])
                        return {
                        ...item,
                        src: matched ? images[matched] : '', // 沒找到就空字串
                        };
                    });
                }
                // resolvedData[key] = group[key].map((item) => {
                //     // console.log("item",item)
                //     const matched = Object.keys(images).find((path) =>
                //     path.includes(item.src)
                //     );
                //     // console.log(matched)
                //     // console.log(item.src)
                //     // console.log(images[matched])
                //     return {
                //     ...item,
                //     src: matched ? images[matched] : '', // 沒找到就空字串
                //     };
                // });
                
            }

        }

        return resolvedData;
    }
//index要用到的資料..............................................................................
    let footprint_index_textdata = reactive({});
    let footprint_index_icon = ref([]);
    let footprint_index_image = reactive([]);
    //建立function
    function createFootprint_index(){
        Object.assign(footprint_index_textdata, contentData_aboutFootprint.index[0]);
        Object.assign(footprint_index_image, contentData_aboutFootprint.index);
        footprint_index_icon.value = contentData_aboutFootprint.index[0].useIcon;
    };
onMounted(()=>{

    watch(() => contentData_aboutFootprint, (newData) => {
            // console.log("aboutSelectMainIcon_data 已更新", newData);
    });

    const resolved = resolveImagePaths(ImageData.about);
    // console.log('resolved',resolved);
    Object.assign(contentData_aboutFootprint, resolved);
    //拿各自的資料
   
    createFootprint_index();
    // getfootprint_index()
    // console.log(footprint_index_icon.value);
});
</script>

<template>
    <div class="wrapper_index">
        <InnerInfoSlot :items="footprint_index_icon">
            <template #img1>
                    <img v-if="footprint_index_image.length" :src="footprint_index_image[0].src" alt="">
            </template>

            <template #img2>
                <img v-if="footprint_index_image.length" :src="footprint_index_image[1].src" alt="">
            </template>
            <template #h2_tw>
                 <h2 class="tw" v-if="footprint_index_textdata?.title_tw">{{footprint_index_textdata["title_tw"]}}</h2>
            </template>
            <template #h2_en>
                 <h2 class="en">{{footprint_index_textdata["title_en"]}}</h2>
            </template>
            <template #content>
                <p class="tw">{{footprint_index_textdata["text_tw"]}}</p>
            </template>
        </InnerInfoSlot>
    </div>

</template>

<style scoped lang="scss"  >
    .wrapper_index {
        width: 100dvw;
        height: 100%;
        img{
            width: 100%;
        }
        h2.tw{
            color: $color-green;
        }
        h2.en{
            position: relative;
            bottom: 10px;
            color: $color-green;
        }
    }

</style>

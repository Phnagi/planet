<script setup>
import { RouterLink, RouterView } from 'vue-router';
import DynamicIcon from '@/components/icons/DynamicIcon.vue';
import DynamicFunctionalMap from '@/components/icons/DynamicFunctionalMap.vue';
import { onMounted, reactive, ref, watch } from 'vue';
import AboutSelectIconData from '@/assets/json/about/index.json';
import ImageData from '@/assets/image.json';
//接收所有圖片的重新整理
const images = import.meta.glob(
    '@/assets/images/VI/**/**/**.{png,jpg,jpeg,svg,webp}', 
    { 
        eager: true, 
        import: 'default' 
});
//內容data
let contentData_viIndex =reactive({});
//function 來得到所有footprint內的內容
function resolveImagePaths(contentData) {
        const resolvedData = {};
        
        for (const key in contentData) {
            if(key ==="index"){
                    const group = contentData[key];
                // console.log(group);
                // 看是否有 "index" 層級
                for(const innerKey in group ){
                    if(innerKey ==="image"){
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
                    }else{
                        resolvedData[innerKey] =  group[innerKey]
                    }
                    

                }
                
            }

        }

        return resolvedData;
    }
//index要用到的資料..............................................................................
let VI_index_textdata = reactive({});
    let VI_index_icon = ref([]);
    let VI_index_image = reactive([]);
    //建立function
    function createVI_index(){
        Object.assign(VI_index_textdata, contentData_viIndex);
        Object.assign(VI_index_image, contentData_viIndex.image);
       
        // VI_index_icon.value = contentData_viIndex.index[0].useIcon;
    };
onMounted(()=>{

    watch(() => contentData_viIndex, (newData) => {
            // console.log("aboutSelectMainIcon_data 已更新", newData);
    });

    const resolved = resolveImagePaths(ImageData.VI);
    // console.log('resolved',resolved);
    Object.assign(contentData_viIndex, resolved);
    console.log(contentData_viIndex)

    createVI_index();
   
});


</script>

<template>
    <div class="vi_index">
            brand
    </div>

</template>

<style scoped lang="scss"  >
    .vi_index {
        max-width: 1280px;
        height:auto;
        padding: 100px 80px 60px 80px;
        .mainImgBox{
            
        }
        .textBox{

        }
    
    }

</style>

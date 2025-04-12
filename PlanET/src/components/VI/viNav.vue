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
    // console.log(contentData_viIndex)

    createVI_index();
   
});


</script>

<template>
    <div class="vi_nav">
        
     
        <router-link  to="/vi" class="titleBox">
            <h2 class="tw">視覺識別</h2>
            <h2 class="en">visual identity</h2>
        </router-link>

        
        <ul class="select">
            <li><router-link to="/vi/logo"><h5 class="tw">logo設計</h5></router-link></li>
            <li><router-link to="/vi/graphics"><h5 class="tw">輔助圖形</h5></router-link></li>
            <li><router-link to="/vi/typography"><h5 class="tw">字體</h5></router-link></li>
            <li><router-link to="/vi/color"><h5 class="tw">顏色</h5></router-link></li>
            <li><router-link to="/vi/brand"><h5 class="tw">周邊設計</h5></router-link></li>
        </ul>

    </div>

</template>

<style scoped lang="scss"  >
    .vi_nav {
        width: 100%;
        max-width: 1280px;
        height:auto;
        padding: 0px 80px 40px 80px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
            @media(min-width: 767px) and (max-width: 1024px){
                gap: 20px;
            }
            @media (max-width: 767px){
                gap: 10px;
                padding: 0px 40px 40px 40px;
            }
        .titleBox{
            // background-color: cadetblue;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-decoration: none;
            h2.tw{
                color: $color-green;
            }
            h2.en{
                color: $color-green;
                position: relative;
                bottom: 10px;
            }
        }
        .select{
            list-style: none;
            width: 100%;
            // background-color: cadetblue;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 50px;
            @media(min-width: 767px) and (max-width: 1024px){
                width: 80%;
                justify-content: space-between;
            }
            @media (max-width: 767px){
                width: 100%;
                justify-content: space-between;
                gap: 20px;
            }
            li{
                a{
            
                    text-decoration: none;
                    transition: 0.2s ease-in-out;
                    &.router-link-active{
                      
                        h5{
                            color: $color-text;
                        }
                    }
                    h5{
                        color: $color-gray_1 ;
                    }
                }
            }
        }
    
    }

</style>

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
        <!-- <h1>{{VI_index_textdata.title_tw}}</h1>
        <img v-if="VI_index_image.length" :src="VI_index_image[0].src" alt=""> -->
        <div class="mainImgBox">
            <img v-if="VI_index_image.length" :src="VI_index_image[0].src" alt="">
        </div>
        <div class="textBox">

            <ul class="select">
                <li><router-link to="/vi/logo">logo設計</router-link></li>
                <li><router-link to="/vi/graphics">輔助圖形</router-link></li>
                <li><router-link to="/vi/typography">字體</router-link></li>
                <li><router-link to="/vi/color">顏色</router-link></li>
                <li><router-link to="/vi/brand">周邊設計</router-link></li>
            </ul>
            <div class="content">
                <div class="titleBox">
                    <h2 class="tw">{{VI_index_textdata.title_tw}}</h2>
                    <h2 class="en">{{VI_index_textdata.title_en}}</h2>
                </div>
                <p class="tw">{{VI_index_textdata.text}}</p>
            </div>
        </div>
    </div>

</template>

<style scoped lang="scss"  >
    .vi_index {
        width: 100%;
        max-width: 1280px;
        height:auto;
        padding: 0px 80px 60px 80px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 60px;
        @media(min-width: 767px) and (max-width: 1024px){
                
        }
        @media (max-width: 767px){
            gap: 40px;
            padding: 0px 40px 60px 40px;
        }
        .mainImgBox{
            width: 100%;
            img{
                width: 100%;
            }
        }
        .textBox{
            width: 100%;

            // height: 60dvh;
            display: flex;

            justify-content: space-between;
            align-items: flex-start;
            .select{
                list-style: none;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
                gap: 20px;
                @media(min-width: 767px) and (max-width: 1024px){
                    gap: 30px;
                }
                @media (max-width: 767px){
                    display: none;
                }
                li{
                   
                    a{
                    
                       
                        color: $color-gray_1;
                        text-decoration: none;
                        transition: 0.2s ease-in-out;
                        &.router-link-active{
                            color: $color-text;
                        }
                    }
                }
            }
            .content{
                // background: cadetblue;
                position: relative;
                top: -20px;
                width: 70%;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
                @media(min-width: 767px) and (max-width: 1024px){
                
                }
                @media (max-width: 767px){
                    width: 100%;
                }
                .titleBox{
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: flex-start;
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
            }
        }
    
    }

</style>

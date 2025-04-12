<script setup>
import { RouterLink, RouterView } from 'vue-router';
import DynamicIcon from '@/components/icons/DynamicIcon.vue';
import DynamicFunctionalMap from '@/components/icons/DynamicFunctionalMap.vue';
import Dynamic_VI from '@/components/icons/Dynamic_VI.vue';
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
let contentData_viBrand =reactive({});
//function 來得到所有footprint內的內容
function resolveImagePaths(contentData) {
        const resolvedData = {};
        
        for (const key in contentData) {
            if(key ==="brand"){
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
//brand要用到的資料..............................................................................
let VI_brand_textdata = reactive({});
    let VI_brand_inner = ref([]);
    let VI_brand_image = reactive([]);
    //建立function
    function createVI_brand(){
        Object.assign(VI_brand_textdata, contentData_viBrand);
        Object.assign(VI_brand_image, contentData_viBrand.image);
    //   console.log("VI_brand_image", VI_brand_image);
      VI_brand_inner.value = contentData_viBrand.image;
    };
onMounted(()=>{

    watch(() => contentData_viBrand, (newData) => {
            // console.log("aboutSelectMainIcon_data 已更新", newData);
    });

    const resolved = resolveImagePaths(ImageData.VI);
    // console.log('resolved',resolved);
    Object.assign(contentData_viBrand, resolved);
    console.log(contentData_viBrand)

    createVI_brand();
   
});


</script>

<template>
    <div class="vi_brand">
           <div class="contentArea">
                <div class="titleBox">
                    <h2 class="tw">{{VI_brand_textdata.title_tw}}</h2>
                    <h2 class="en">{{VI_brand_textdata.title_en}}</h2>
                </div>
                <p class="tw">{{VI_brand_textdata.text}}></p>
           </div>
           <div class="brandItemArea">
                <div class="brandItem" v-for="(item,idx) in VI_brand_inner " :key="item.name">
                    <div class="imageBox">
                        <img :src="item.src" alt="">
                    </div>
                    <div class="smtitle">
                        <h3 class="tw">{{item.title_tw}}</h3>
                        <h3 class="en">{{item.title_en}}</h3>
                    </div>
                    <p class="tw">{{item.text}}</p>
            </div>
           </div>

    </div>

</template>

<style scoped lang="scss"  >
    .vi_brand {
        width: 100%;
        padding: 20px 80px 40px 80px;
        height: auto;
        max-width: 1280px;
        overflow: hidden;
        // height:auto;
        
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
        gap: 40px;
        @media(min-width: 767px) and (max-width: 1024px){
            height: auto;
           
        }
        @media (max-width: 767px){
            height: auto;
            padding: 0px 40px 40px 40px;
            
        }

        .contentArea{
            width: 700px;
            @media(min-width: 767px) and (max-width: 1024px){
                width: 100%;
            }
            @media (max-width: 767px){
                width: 100%;
            }
            .titleBox{
                width: 100%;
                position: relative;
                
                // left: 0px;
                //flex
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
                text-decoration: none;
                @media(min-width: 767px) and (max-width: 1024px){
                    position: relative;
                    
                }
                @media (max-width: 767px){
                    position: relative;
                   
                }
                h2.tw{
                    color: $color-green;
                }
                h2.en{
                    color: $color-green;
                    position: relative;
                    bottom: 10px;
                }            
            }
            p.tw{

            }
        }
        .brandItemArea{
            display: flex;
            justify-content: space-between;
            gap: 40px;
            @media(min-width: 767px) and (max-width: 1024px){
                flex-direction: column;
                gap: 60px;
            }
            @media (max-width: 767px){
                flex-direction: column;
                gap: 40px;
            }
            .brandItem{
                display: flex;
                flex-direction: column;
                gap: 10px;
                @media(min-width: 767px) and (max-width: 1024px){
                      gap: 20px;
                }
                @media (max-width: 767px){
                      gap: 10px;
                }
                .imageBox{
                    width: 100%;
                    img{
                        width: 100%;
                    }
                }
                .smtitle{
                    position: relative;
                    h3.tw{
                        // width: 100px;
                    }
                    h3.en{
                        position: relative;
                        top: -2px;
                    }
                }
                p.tw{

                }
            }

        }

    
    }

</style>

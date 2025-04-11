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
let contentData_viGraphics =reactive({});
//function 來得到所有footprint內的內容
function resolveImagePaths(contentData) {
        const resolvedData = {};
        
        for (const key in contentData) {
            if(key ==="graphics"){
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
//graphics要用到的資料..............................................................................
let VI_graphics_textdata = reactive({});
    let VI_graphics_icon = ref([]);
    let VI_graphics_image = reactive([]);
    //建立function
    function createVI_graphics(){
        Object.assign(VI_graphics_textdata, contentData_viGraphics);
        Object.assign(VI_graphics_image, contentData_viGraphics.image);
       
        // VI_graphics_icon.value = contentData_viGraphics.graphics[0].useIcon;
    };
onMounted(()=>{

    watch(() => contentData_viGraphics, (newData) => {
            // console.log("aboutSelectMainIcon_data 已更新", newData);
    });

    const resolved = resolveImagePaths(ImageData.VI);
    // console.log('resolved',resolved);
    Object.assign(contentData_viGraphics, resolved);
    console.log(contentData_viGraphics)

    createVI_graphics();
   
});


</script>

<template>
    <div class="vi_graphics">
            <div class="mainGraphics_box">
                <div class="graphics_iconBox">
                    <Dynamic_VI name="graphics_full"/>
                </div>
                <div class="graphics_iconBox">
                    <Dynamic_VI name="graphics"/>
                </div>
              
            </div>
            <div class="contentArea">
                <div class="main_content">
                    <div class="titleBox">
                        <h2 class="tw">{{VI_graphics_textdata.title_tw}}</h2>
                        <h2 class="en">{{VI_graphics_textdata.title_en}}</h2>
                    </div>
                    <p class="tw">{{VI_graphics_textdata.text}}</p>
                    <div class="otherGrapicsArea">
                        <div class="graphics_iconBox">
                            <Dynamic_VI name="vine"/>
                        </div>
                        <div class="graphics_iconBox">
                            <Dynamic_VI name="flower"/>
                        </div>
                    </div>
                    <div class="smContentArea">
                        <div class="vineBox smContent">
                            <div class="smtitle">
                                <h3 class="tw">{{VI_graphics_textdata.title2_tw}}</h3>
                                <h3 class="en">{{VI_graphics_textdata.title2_en}}</h3>
                            </div>
                            <p class="tw">{{VI_graphics_textdata.text2}}</p>
                        </div>
                        <div class="flowerBox smContent">
                            <div class="smtitle">
                                <h3 class="tw">{{VI_graphics_textdata.title3_tw}}</h3>
                                <h3 class="en">{{VI_graphics_textdata.title3_en}}</h3>
                            </div>
                            <p class="tw">{{VI_graphics_textdata.text3}}</p>
                        </div>
                    </div>
                </div>
                <div class="otherGrapicsArea">
                    <div class="graphics_iconBox">
                        <Dynamic_VI name="vine"/>
                    </div>
                    <div class="graphics_iconBox">
                        <Dynamic_VI name="flower"/>
                    </div>
                </div>
            </div>


    </div>

</template>

<style scoped lang="scss"  >
    .vi_graphics{
        width: 100%;
        padding: 0px 80px 40px 80px;
        height: 100dvh;
        max-width: 1280px;
        // height:auto;
        padding: 100px 80px 60px 80px;
        display: flex;
        flex-direction: column;

        gap: 50px;
        @media(min-width: 767px) and (max-width: 1024px){
                
        }
        @media (max-width: 767px){
            height: auto;
                padding: 0px 40px 40px 40px;
        }
        .mainGraphics_box{
            // background: cadetblue;
            width: 100%;
            height: auto;
            display: flex;
            justify-content: flex-start;
            gap: 40px;
            @media(min-width: 767px) and (max-width: 1024px){
                justify-content: center;
            }
            @media (max-width: 767px){
                    
                justify-content: center;
            }
            .graphics_iconBox{
                width: 200px;
            }
            
        }
        .contentArea{
            width: 100%;
            height: auto;
            display: flex;
            justify-content: space-between;
            align-items:flex-end ;
            @media(min-width: 767px) and (max-width: 1024px){
                flex-direction: column;
                justify-content: center;
                align-items: center;
                
            }
            @media (max-width: 767px){      
                flex-direction: column;
                justify-content: center;
                align-items: center;
              
            }
            .main_content{
                width: 40dvw;
                display: flex;
                flex-direction: column;
                gap: 20px;
                @media(min-width: 767px) and (max-width: 1024px){
                     width: 80%;
                     
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
                p.tw{
                    
                }
                .smContentArea{
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    .smContent{
                        display: flex;
                        gap: 50px;
                        .smtitle{
                            // background: cadetblue;
                           
                            position: relative;
                            h3.tw{
                                width: 100px;
                            }
                            h3.en{
                                position: relative;
                                top: -2px;
                            }
                        }
                        p{

                        }
                    }
                }
                .otherGrapicsArea{
                    display: none;

                    @media(min-width: 767px) and (max-width: 1024px){
                        margin: 40px 0px 40px 0px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        gap: 100px;
                    }
                    @media (max-width: 767px){
                        margin: 40px 0px 40px 0px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        gap: 100px;
                    }
                    .graphics_iconBox:nth-child(1){
                        width: 80px;
                        @media(min-width: 767px) and (max-width: 1024px){
                            width: 50px;
                        }
                        @media (max-width: 767px){
                            width: 50px;
                        }
                    
                    }
                    .graphics_iconBox:nth-child(2){
                        width:150px;
                        @media(min-width: 767px) and (max-width: 1024px){
                            width: 50px;
                        }
                        @media (max-width: 767px){
                            width: 80px;
                        }
                    }
                }
            }
            .otherGrapicsArea{
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 100px;
                @media(min-width: 767px) and (max-width: 1024px){
                    display: none;
                }
                @media (max-width: 767px){
                        
                    display: none;
                }
                .graphics_iconBox:nth-child(1){
                    width: 80px;
                   
                }
                .graphics_iconBox:nth-child(2){
                    width:150px;
                }
            }
        }



    
    }

</style>

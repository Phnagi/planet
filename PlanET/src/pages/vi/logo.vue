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
let contentData_viLogo =reactive({});
//function 來得到所有footprint內的內容
function resolveImagePaths(contentData) {
        const resolvedData = {};
        
        for (const key in contentData) {
            if(key ==="logo"){
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
let VI_logo_textdata = reactive({});
    let VI_logo_icon = ref([]);
    let VI_logo_image = reactive([]);
    //建立function
    function createVI_logo(){
        Object.assign(VI_logo_textdata, contentData_viLogo);
        Object.assign(VI_logo_image, contentData_viLogo.image);
       
        // VI_index_icon.value = contentData_viIndex.index[0].useIcon;
    };
onMounted(()=>{

    watch(() => contentData_viLogo, (newData) => {
            // console.log("aboutSelectMainIcon_data 已更新", newData);
    });

    const resolved = resolveImagePaths(ImageData.VI);
    // console.log('resolved',resolved);
    Object.assign(contentData_viLogo, resolved);
    // console.log('contentData_viLogo',contentData_viLogo)

    createVI_logo();
    // console.log('VI_logo_image',VI_logo_image)
});


</script>

<template>
    <div class="vi_logo">
           <div class="godenLogoArea">
                <div class="textArea">
                    <div class="logoGolden_smBox">
                        <img v-if="VI_logo_image.length" :src="VI_logo_image[1].src" alt="">
                    </div>
                    <div class="content">
                        <div class="titleBox">
                            <h2 class="tw">{{VI_logo_textdata.title_tw}}</h2>
                            <h2 class="en">{{VI_logo_textdata.title_en}}</h2>
                        </div>
                        <p class="tw">{{VI_logo_textdata.text}}</p>
                    </div>
                </div>
                <div class="logoArea">
                    <img v-if="VI_logo_image.length" :src="VI_logo_image[0].src" alt="">
                </div>

           </div>
           <div class="meaningArea">
                <div class="meaning_textArea">
                    <div class="smTitleBox">
                        <h3 class="tw">{{VI_logo_textdata.title2_tw}}</h3>
                        <h3 class="en">{{VI_logo_textdata.title2_en}}</h3>
                    </div>
                    <p class="tw">{{VI_logo_textdata.text2}}</p>
                </div>
                <div class="logoBox">
                    <img v-if="VI_logo_image.length" :src="VI_logo_image[2].src" alt="">
                </div>

           </div>
    </div>

</template>

<style scoped lang="scss"  >
    .vi_logo {
        width: 100%;
        max-width: 1280px;
        height:auto;
        padding: 0px 80px 60px 80px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 60px;
        overflow: hidden;
        @media(min-width: 767px) and (max-width: 1024px){
                
        }
        @media (max-width: 767px){
            gap: 40px;
            padding: 0px 40px 60px 40px;
        }
        .godenLogoArea{
            padding: 100px 0px 40px 0px;
            // background: cadetblue;
            width: 100%;
            height: 100dvh;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            @media(min-width: 767px) and (max-width: 1024px){
                padding: 100px 0px 40px 0px;
                height: auto;
                justify-content: center;
                flex-direction: column;
            }
            @media (max-width: 767px){
                padding: 100px 0px 40px 0px;
                height: auto;
                justify-content: center;
                flex-direction: column;
            }
            .textArea{
                width: 400px;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                
                @media(min-width: 767px) and (max-width: 1024px){
                    width: 100%;
                    height: auto;
                    order: 2;
                    flex-direction: row;
                }
                @media (max-width: 767px){
                    height: auto;
                    width: 100%;
                    order: 2;
                    flex-direction: row;
                }

                .logoGolden_smBox{
                    
                    @media(min-width: 767px) and (max-width: 1024px){
                        order: 2;
                       
                    }
                    @media (max-width: 767px){
                        width: 100dvw;
                        height: 100dvh;
                        position: absolute;
                        top: 30px;
                        left: 0px;
                        order: 2;
                       
                    }
                    img{
                        width: 15dvw;
                        @media (max-width: 767px){
                            width: 20dvw;
                       
                        }
                    }
                }
                .content{
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    @media(min-width: 767px) and (max-width: 1024px){
                        width: 70%;
                        order: 1;
                       
                    }
                    @media (max-width: 767px){
                        width: 100%;
                        order: 1;
                       
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

                }
            }
            .logoArea{
                // background: cadetblue;
                // width: 20%;
                // width: 40dvw;
                // width: 600px;
                @media(min-width: 767px) and (max-width: 1024px){
                    order: 1;
                }
                @media (max-width: 767px){
                    order: 1;
                }
                img{
                    width: 600px;
                    @media(min-width: 767px) and (max-width: 1024px){
                         width:65dvw;
                    }
                    @media (max-width: 767px){
                        width:70dvw;
                    }
                }
            }
 
        }
        .meaningArea{
            width: 100%;
            height: 30dvh;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            @media(min-width: 767px) and (max-width: 1024px){
                height: auto;
                flex-direction: column;   
                gap: 20px;
            }
            @media (max-width: 767px){
                gap: 20px;
                height: auto; 
                flex-direction: column;  
                
            }
            .meaning_textArea{
                width: 60%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-start;
                gap: 20px;
                @media(min-width: 767px) and (max-width: 1024px){
                    order: 2;
                    width: 100%;
                }
                @media (max-width: 767px){
                    order: 2;
                    width: 100%;
                }
                .smTitleBox{
                    position: relative;
                    h3.tw{

                    }
                    h3.en{
                        position: relative;
                        top: -2px;
                    }
                }
            }
            .logoBox{
                width: 300px;
                img{
                    width: 100%;
                }
            }
        }
    
    }

</style>

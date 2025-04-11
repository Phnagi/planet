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
let contentData_viColor =reactive({});
//function 來得到所有footprint內的內容
function resolveImagePaths(contentData) {
        const resolvedData = {};
        
        for (const key in contentData) {
            if(key ==="color"){
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
//color要用到的資料..............................................................................
let VI_color_textdata = reactive({});
    let VI_color_icon = ref([]);
    let VI_color_image = reactive([]);

    let VI_color_Color = ref([]);
    let VI_color_mainColor = reactive({});
    //建立function
    function createVI_color(){
        Object.assign(VI_color_textdata, contentData_viColor);
        Object.assign(VI_color_image, contentData_viColor.image);
       
    
       
        VI_color_Color.value = contentData_viColor.image;
        console.log(VI_color_Color.value)
    };
onMounted(()=>{

    watch(() => contentData_viColor, (newData) => {
            // console.log("aboutSelectMainIcon_data 已更新", newData);
    });

    const resolved = resolveImagePaths(ImageData.VI);
    // console.log('resolved',resolved);
    Object.assign(contentData_viColor, resolved);
    console.log(contentData_viColor)

    createVI_color();
   
});


</script>

<template>
    <div class="vi_color">
        <div class="titleBox">
                <h2 class="tw">{{VI_color_textdata.title_tw}}</h2>
                <h2 class="en">{{VI_color_textdata.title_en}}</h2>
        </div>
        <div class="mainArea">
            <div class="contentBox">
                <div class="smtitle">
                    <h3 class="tw">{{VI_color_textdata.title2_tw}}</h3>
                    <h3 class="en">{{VI_color_textdata.title2_en}}</h3>
                </div>
                <p class="tw">{{VI_color_textdata.text}}</p>
            </div>
            <div class="colorArea">
                <div class="smColorArea">
                    <div class="smColor" v-for="(item,idex) in VI_color_Color.slice(2, 6)" v-bind:key="item.name">
                        
                            <div class="smColorSvg">
                                <Dynamic_VI :name="item.name"/>
                            </div>
                            <div class="smcolorContent">
                                <p class="en">{{item.color}}</p>
                                <p class="en">{{item.rgb}}</p>
                                <p class="en">{{item.cmyk}}</p>
                            </div>
                        
                    </div>
                </div>

                <div class="mainColorArea">
                    <div class="mainColor" v-for="(item,idex) in VI_color_Color.slice(0,2)" v-bind:key="item.name">
                            <div class="mainColorSvg">
                                <Dynamic_VI :name="item.name"/>
                            </div>
                            <div class="maincolorContent">
                                <p class="en">{{item.color}}</p>
                                <p class="en">{{item.rgb}}</p>
                                <p class="en">{{item.cmyk}}</p>
                            </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<style scoped lang="scss"  >
    .vi_color {
        width: 100%;
        padding: 20px 80px 40px 80px;
        height: 80dvh;
        max-width: 1280px;
        overflow: hidden;
        // height:auto;
        
        display: flex;
        flex-direction: column;
        position: relative;
        @media(min-width: 767px) and (max-width: 1024px){
            height: auto;
            gap: 20px;
        }
        @media (max-width: 767px){
            height: auto;
            padding: 0px 40px 40px 40px;
            gap: 20px;
        }
        .titleBox{
            width: 100%;
            position: absolute;
            top: 0px;
            // left: 0px;
            //flex
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            text-decoration: none;
            @media(min-width: 767px) and (max-width: 1024px){
                position: relative;
                order: 1;
            }
            @media (max-width: 767px){
                position: relative;
                order: 1;
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
        .mainArea{
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            @media(min-width: 767px) and (max-width: 1024px){
                position: relative;
                order: 2;
                //flex
                justify-content: center;
                align-items: center;
                flex-direction: column;
                gap: 50px;
            }
            @media (max-width: 767px){
                position: relative;
                order: 2;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                gap: 50px;
            }
            .contentBox{
                height: 100%;
                width: 40%;

                //flex
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                align-items: flex-start;
                @media(min-width: 767px) and (max-width: 1024px){
                    width: 100%;
                    height: auto;
                    position: relative;

                    order: 2;
                }
                @media (max-width: 767px){
                    width: 100%;
                     height: auto;
                    position: relative;
                    order: 2;
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
            }
            .colorArea{
                height: 100%;
                width: 500px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                @media(min-width: 767px) and (max-width: 1024px){
                    height: auto;
                    width: 500px;
                    position: relative;
                    order: 1;
                    gap: 50px;
                }
                @media (max-width: 767px){
                    height: auto;
                    width: 70%;
                    position: relative;
                    order: 1;
                    gap: 30px;
                }
                .smColorArea{
                    width: 100%;
                    display: grid;
                    grid-template-columns: 1fr 1fr; // 兩欄
                    grid-template-rows: 1fr 1fr;    // 兩列
                    gap: 40px;
                    
                    @media(min-width: 767px) and (max-width: 1024px){
                        grid-template-columns: 200px 200px; // 兩欄
                        grid-template-rows: 1fr 1fr;    // 兩列
                        order: 2;
                        column-gap: 80px; 
                        justify-content: center;
                    }
                    @media (max-width: 767px){
                        grid-template-columns: 150px 150px; // 兩欄
                        grid-template-rows: 1fr 1fr;    // 兩列
                        justify-content: center;
                        order: 2;
                        row-gap: 20px;
                        column-gap: 20px; 
                    }
                    .smColor{
                        // width: 150px;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        gap: 20px;
                        @media(min-width: 767px) and (max-width: 1024px){
                            justify-content: flex-start;
                            gap: 20px;
                        }
                        @media (max-width: 767px){
                            justify-content:center;
                            gap: 10px;
                        }
                        .smColorSvg{
                            width: 50px;
                        }
                        .smcolorContent{
                            @media (max-width: 767px){
                                 
                                }
                            p{
                                @media (max-width: 767px){
                                    font-size: 8px;
                                }

                            }
                        }
                    }
                }
                .mainColorArea{
                    // width: 100%;
                    display: flex;
                    justify-content: space-between;
                    @media(min-width: 767px) and (max-width: 1024px){

                        order: 1;
                    }
                    @media (max-width: 767px){
                        justify-content: center;
                        order: 1;
                        gap: 50px;
                    }
                    .mainColor{
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        gap: 20px;
                        .mainColorSvg{
                            width: 194px;
                            @media(min-width: 767px) and (max-width: 1024px){
                                
                                width: 194px;
                            }
                            @media (max-width: 767px){
                                width: 30dvw;
                            }
                        }
                        .maincolorContent{
                            width: 100%;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            gap: 2px;
                            p{

                            }
                        }
                    }
                }
            }
        }

    
    }

</style>

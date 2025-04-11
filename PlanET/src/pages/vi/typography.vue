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
let contentData_viTypography =reactive({});
//function 來得到所有footprint內的內容
function resolveImagePaths(contentData) {
        const resolvedData = {};
        
        for (const key in contentData) {
            if(key ==="typography"){
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
//typography要用到的資料..............................................................................
let VI_typography_textdata = reactive({});
let VI_typography_textdata_tw = reactive({});
let VI_typography_textdata_en = reactive({});
    let VI_typography_icon = ref([]);
    let VI_typography_image = reactive([]);
    //建立function
    function createVI_typography(){
        Object.assign(VI_typography_textdata, contentData_viTypography);
        Object.assign(VI_typography_image, contentData_viTypography.image);
        
        Object.assign(VI_typography_textdata_tw, contentData_viTypography.chinese);
        Object.assign(VI_typography_textdata_en, contentData_viTypography.english);
        console.log(VI_typography_textdata_tw)
        // VI_index_icon.value = contentData_viTypography.index[0].useIcon;
    };
onMounted(()=>{

    watch(() => contentData_viTypography, (newData) => {
            // console.log("aboutSelectMainIcon_data 已更新", newData);
    });

    const resolved = resolveImagePaths(ImageData.VI);
    // console.log('resolved',resolved);
    Object.assign(contentData_viTypography, resolved);
    // console.log(contentData_viTypography)

    createVI_typography();
   
});


</script>

<template>
    <div class="vi_typography">
           <div class="titleBox">
                <h2 class="tw">{{VI_typography_textdata.title_tw}}</h2>
                <h2 class="en">{{VI_typography_textdata.title_en}}</h2>
           </div>
           <div class="chineseArea textArea">
                <div class="chinese languageBox">
                    <div class="smtitle">
                        <h3 class="tw">{{VI_typography_textdata_tw.title_tw}}</h3>
                        <h3 class="en">{{VI_typography_textdata_tw.title_en}}</h3>
                    </div>
                    <div class="textcontent">
                        <div class="innerContet letterSpace">
                            <p class="tw">{{VI_typography_textdata_tw.innerTitle}}</p>
                            <p class="tw">{{VI_typography_textdata_tw.innerText}}</p>
                        </div>
                        <div class="innerContet lineHeight">
                            <p class="tw">{{VI_typography_textdata_tw.innerTitle2}}</p>
                            <p class="tw">{{VI_typography_textdata_tw.innerText2}}</p>
                        </div>
                    </div>
                </div>
                <div class="useFontBox">
                    <h3 class="tw">{{VI_typography_textdata_tw.title_tw2}}</h3>
                    <p class="tw usefont">{{VI_typography_textdata_tw.font}}</p>
                </div>
                <div class="fontWeightBox">
                    <div class="smtitle">
                        <h3 class="tw">{{VI_typography_textdata_tw.title_tw3}}</h3>
                        <h3 class="en">{{VI_typography_textdata_tw.title_en3}}</h3>
                    </div>
                    <div class="fontWeightSvg tw">
                        <Dynamic_VI name="typography_tw"/>
                    </div>
                </div>
           </div>

           <div class="englishArea textArea">
                <div class="chinese languageBox">
                    <div class="smtitle">
                        <h3 class="tw">{{VI_typography_textdata_en.title_tw}}</h3>
                        <h3 class="en">{{VI_typography_textdata_en.title_en}}</h3>
                    </div>
                    <div class="textcontent">
                        <div class="innerContet letterSpace">
                            <p class="tw">{{VI_typography_textdata_en.innerTitle}}</p>
                            <p class="tw">{{VI_typography_textdata_en.innerText}}</p>
                        </div>
                        <div class="innerContet lineHeight">
                            <p class="tw">{{VI_typography_textdata_en.innerTitle2}}</p>
                            <p class="tw">{{VI_typography_textdata_en.innerText2}}</p>
                        </div>
                    </div>
                </div>
                <div class="useFontBox">
                    <h3 class="tw">{{VI_typography_textdata_en.title_tw2}}</h3>
                    <p class="tw usefont">{{VI_typography_textdata_en.font}}</p>
                </div>
                <div class="fontWeightBox">
                    <div class="smtitle">
                        <h3 class="tw">{{VI_typography_textdata_tw.title_tw3}}</h3>
                        <h3 class="en">{{VI_typography_textdata_tw.title_en3}}</h3>
                    </div>
                    <div class="fontWeightSvg en">
                        <Dynamic_VI name="typography_en"/>
                    </div>
                </div>
           </div>
    </div>

</template>

<style scoped lang="scss"  >
    .vi_typography {
        width: 100%;
        padding: 0px 80px 40px 80px;
        height: auto;
        max-width: 1280px;
        overflow: hidden;
        // height:auto;
        
        display: flex;
        flex-direction: column;

        gap: 50px;
        @media(min-width: 767px) and (max-width: 1024px){
            height: auto;
        }
        @media (max-width: 767px){
            height: auto;
                padding: 0px 40px 40px 40px;
        }
        .titleBox{
            width: 100%;

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
        .textArea{
            width: 100%;
            // display: flex;
            // flex-direction: column;
            // justify-content: center;
            display: grid;
            grid-template-columns: 1fr 1fr; // 兩欄
            grid-template-rows: 1fr 1fr;    // 兩列
               
            column-gap: 0px;  // 水平方向的間距
            // justify-content: center;
            

            &.chineseArea{
                row-gap: 92px;  // 垂直方向的間距   
                @media(min-width: 767px) and (max-width: 1024px){
                    row-gap: 50px; 
                }
                @media (max-width: 767px){
                    row-gap: 30px; 
                }
            }

            &.englishArea{
                row-gap: 50px;   
                @media(min-width: 767px) and (max-width: 1024px){
                    row-gap: 50px; 
                }
                @media (max-width: 767px){
                    row-gap: 30px; 
                }  
            }
            @media(min-width: 767px) and (max-width: 1024px){
                // height: 300px;
                grid-template-columns: auto ;
                grid-template-rows: auto auto auto;
            }
            @media (max-width: 767px){
                grid-template-columns: auto ;
                grid-template-rows: auto auto auto;
            }
            .languageBox{
                grid-column: 1;
                grid-row: 1;

                display: flex;
                flex-direction: column;
                gap: 20px;
                @media(min-width: 767px) and (max-width: 1024px){
                    
                }
                @media (max-width: 767px){

                }
                .smtitle{                   
                    position: relative;
                    h3.tw{
                        width: 100px;
                    }
                    h3.en{
                        position: relative;
                        top: -2px;
                    }
                }
                .textcontent{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: flex-start;
                    gap: 20px;
                    .innerContet{
                        display: flex;
                        gap: 60px;
                        p{

                        }
                        &:nth-child(1){

                        }
                        &:nth-child(2){
                            
                        }
                    }
                }
            }
            .useFontBox{
                grid-column: 1;
                grid-row: 2;

                display: flex;
                flex-direction: column;
                gap: 0px;
                @media(min-width: 767px) and (max-width: 1024px){
                    height: auto;
                }
                @media (max-width: 767px){
                    height: auto;
                }
                h3.tw{

                }
                .usefont{
                    @media(min-width: 767px) and (max-width: 1024px){
                        position: relative;
                        top: -10px;
                    }
                    @media (max-width: 767px){
                        position: relative;
                        top: -10px;
                    }
                }
            }
            .fontWeightBox{
                grid-column: 2;
                grid-row: 1 / 3; // 橫跨兩行（1到3）
                //flex
                display: flex;
                flex-direction: column;
                gap: 0px;
                //position
                position: relative;
                @media(min-width: 767px) and (max-width: 1024px){
                    grid-column: 1;
                    grid-row: 3; // 橫跨兩行（1到3）
                }
                @media (max-width: 767px){
                    grid-column: 1;
                    grid-row: 3; // 橫跨兩行（1到3）
                }
                .smtitle{                   
                    position: relative;
                    h3.tw{
                        width: 100px;
                    }
                    h3.en{
                        position: relative;
                        top: -2px;
                    }
                }
                .fontWeightSvg.tw{
                    position: relative;
                    left: -6px;
                    @media(min-width: 767px) and (max-width: 1024px){
                        width: 500px;
                        left: -4px;
                    }
                    @media (max-width: 767px){
                        width: 250px;
                        left: -2px;
                    }
                }
                .fontWeightSvg.en{
                    position: relative;
                    top: 10px;
                    left: -4px;
                    @media(min-width: 767px) and (max-width: 1024px){
                        width: 500px;
                        top: 10px;
                        left: -2px;
                    }
                    @media (max-width: 767px){
                        width: 250px;
                        top: 10px;
                        left: -0px;
                    }
                }
            }
        }
    
    }

</style>

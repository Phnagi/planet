<script setup>
import { RouterLink, RouterView } from 'vue-router';
import axios from 'axios';
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { onMounted, reactive, ref,watch ,onBeforeUnmount} from 'vue';
import Lenis from 'lenis'

import ImageData from '@/assets/image.json';
// components
import DynamicIcon from '@/components/icons/DynamicIcon.vue';
//
gsap.registerPlugin(ScrollTrigger)
//存放api data
let imageData_QR = reactive({data:[]});
let imageData_UIimage = reactive({data:[]});
//gsap 選取DOM
let raceBox1_Content = ref(null);
//gsap 時間縣
let indexBox1_ani_tl ;
let indexBox1_aniHandle = ref(false);

// 使用 Vite 的 glob 匯入圖片（會轉成 { [路徑]: 圖片URL }）
const imageMap = import.meta.glob(
  '@/assets/images/index/*.{png,jpg,jpeg,svg,webp}',
  {
    eager: true,
    import: 'default',
  }
);

onMounted(()=>{
    //gsap動畫
    indexBox1_aniHandle = ref(false);
    let raceBox1_ContentDom = raceBox1_Content.value;
    // 創建時間縣
    function createTimelines_indexBox1(){
        ScrollTrigger.getAll().forEach(trigger => {
            if (trigger.vars.id === 'indexBox1_ani_tl') {
                // console.log("ScrollTrigger",trigger)
                trigger.kill();
            }
        });
        indexBox1_ani_tl?.kill();
        indexBox1_ani_tl = gsap.timeline({
            scrollTrigger: {
                trigger: raceBox1_ContentDom,
                start: "20% center",
                end: "bottom center",
                scrub: true,
                // markers: true,
                id:"indexBox1_ani_tl",
                onEnter: () => {
                    indexBox1_aniHandle.value = true; // 滾動進入 trigger 範圍 (↓)
                },
                onLeaveBack: () => {
                    indexBox1_aniHandle.value = false;// 滾動離開 trigger 的 end (↓)
                },
                onEnterBack: () => {
                    indexBox1_aniHandle.value = true;// 從下方回來進入 trigger (↑)
                },

                onLeave: () => {
                    indexBox1_aniHandle.value = false;// 往回滾離開 trigger 的 start (↑)
                }
            }
        });
        // 最後手動 refresh
        ScrollTrigger.refresh();
    }

    createTimelines_indexBox1()
    // 每次 resize 時，重新建立 timeline
    const resizeHandler_indexBox1 = () => {
        createTimelines_indexBox1();
    };

    window.addEventListener("resize", resizeHandler_indexBox1);

    
    onBeforeUnmount(() => {
        window.removeEventListener("resize", resizeHandler_indexBox1);
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());//??
    });


    //data.......................................................................
        // imageData_QR.data = ImageData.index.QRcode;
        // console.log(imageData_QR.data);
        // imageData_UIimage.data = ImageData.index.UI_image;
        // console.log(imageData_UIimage.data);

         //處理照片
            // 把 JSON 中的 src 欄位轉換成實際圖片路徑
            imageData_QR.data = ImageData.index.QRcode.map(item => ({
                ...item,
                src: imageMap[`/src/assets/images/index/${item.src}`]
            }))
            imageData_UIimage.data = ImageData.index.UI_image.map(item => ({
                ...item,
                src: imageMap[`/src/assets/images/index/${item.src}`]
            }))


        watch(() => imageData_UIimage.data, (newData) => {
            console.log("imageData_UIimage 已更新", newData);
        });
        watch(() => imageData_QR.data, (newData) => {
            console.log("imageData_UIimage 已更新", newData);
        });
});
</script>

<template>
    <div ref="raceBox1_Content" class="raceBox1_Content">
        <div :class="['raceBox1_image',{raceBox1_imageAct:indexBox1_aniHandle},{raceBox1_imageUnAct:!indexBox1_aniHandle}]">
            <img v-if="imageData_UIimage.data.length" :src="imageData_UIimage.data[0].src" alt="">              
        </div>
        <div class="raceBox1_content">
            <div :class="['raceBox1_qrCodeBox',{raceBox1_QRAct:indexBox1_aniHandle},{raceBox1_QRUnAct:!indexBox1_aniHandle}]">
                <div class="raceBox1_qrCodeImage">
                    <img v-if="imageData_QR.data.length" :src="imageData_QR.data[0].src" alt="">
                </div>
                <div class="raceBox1_qrCodeText">
                    <h5 v-if="imageData_QR.data.length" class="tw">{{ imageData_QR.data[0].text_tw }}</h5>
                    <h5 v-if="imageData_QR.data.length" class="en">{{ imageData_QR.data[0].text_en }}</h5>
                </div>
        </div>
            <a href=""  :class="['raceBox1_textBox',{raceBox1_textAct:indexBox1_aniHandle},{raceBox1_textUnAct:!indexBox1_aniHandle}]" >
                <div class="raceBox1_titleBox">
                    <h2 class="tw">UI原型設計</h2>
                    <h2 class="en">UI design</h2>
                </div>
                    <div class="raceBox1_contentBox">
                        <p class="tw">
                                        應用程式的原型設計，採用簡約指示的設計風格，
                                        希望能像指示設計一樣，引導使用者並慢慢的改變使用者的生活方式，
                                        讓環保意識提高。
                        </p>
                        <div class="raceBox1_contentIcon">
                            <DynamicIcon name="arrow_right" />
                        </div>
                    </div>
            </a>
        </div>
    </div>
</template>



<style scoped lang="scss">
    .raceBox1_Content{
                    
        width: 100%;
        max-width:1280px;
        padding: 0px 80px 0px 80px;//60是navBar的高度100-60=40為上面的padding 80是左右統一留80px
        //flex
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        @media(min-width: 767px) and (max-width: 1024px){
            flex-direction: column;
        }
        @media (max-width: 767px){
            flex-direction: column;
            padding: 0px 40px 0px 40px;
        }
        .raceBox1_image{
            // background-color: aqua;
            position: relative;
            width: calc(100% - 368px );
            padding: 100px 0px 0px 0px;
            //flex
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            order: 1;
            // background: cadetblue;
            //raceBox1_image animation................................................................................
                transition: opacity 0.5s ease-in-out 0s , transform 1s ease-in-out 0.2s;
                &.raceBox1_imageAct{
                    opacity: 1;
                    transform: translateY(0dvh);
                }
                &.raceBox1_imageUnAct{
                    opacity: 0;
                    transform: translateY(100dvh);
                }
            
            @media(min-width: 767px) and (max-width: 1024px){
                order: 2;
                justify-content: center;
                width:100%;
                padding: 0px 0px 0px 0px;
                top: -50px;
            }
            @media (max-width: 767px){
                order: 2;
                justify-content: center;
                width:100%;
                padding: 0px 0px 0px 0px;
                top: -50px;
            }
            

            img{
                position: relative;
                top: -118px;
                left: -20px;
                width: 100%;
                min-width: 750px;
                @media(min-width: 767px) and (max-width: 1024px){
                    top: 0px;
                    left: 0px;
                    width: 95%;
                    min-width:120%;
                }
                @media (max-width: 767px){
                    top: 0px;
                    left: 0px;
                    width: 100%;
                    min-width:150%;
                }
            }
        }

        .raceBox1_content{
            width: 368px;
            // background-color: antiquewhite;
            padding: 100px 0px 40px 0px;//40是跟上面100-60=40
            //flex
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            order: 2;
            // background-color: aqua;
            @media(min-width: 767px) and (max-width: 1024px){
                order: 1;
                flex-direction: row;
                width: 100%;
                padding: 110px 0px 0px 0px;//30是跟上面90-60=40
            }
            @media (max-width: 767px){
                order: 1;
                flex-direction: column;
                width: 100%;
                gap: 20px;
                padding: 90px 0px 30px 0px;//30是跟上面90-60=40
            }
            .raceBox1_qrCodeBox{
                display: flex;
                flex-direction: column;
                //QR animation...................................................................................
                    transition: opacity 0.5s ease-in-out 0s , transform 1s ease-in-out 0.2s;
                    &.raceBox1_QRAct{
                        opacity: 1;
                        transform: translateY(0dvh);
                    }
                    &.raceBox1_QRUnAct{
                        opacity: 0;
                        transform: translateY(-100dvh);
                    }
                @media (max-width: 767px){
                    order: 2;
                    flex-direction: row;
                    width: 100%;
                    justify-content: space-between;
                }

                .raceBox1_qrCodeImage{
                    width: 220px;
                    img{
                        width: 100%;
                    }
                    @media(min-width: 767px) and (max-width: 1024px){
                        width: 220px;
                    }
                    @media (max-width: 767px){
                        width: 40%;
                    }
                }
                .raceBox1_qrCodeText{
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    @media (max-width: 767px){
                        width: 55%;
                        top: -2px;
                    }
                    h5.tw{

                    }
                    h5.en{

                    }
                }
            }
            .raceBox1_textBox{
                text-decoration: none;
                display: flex;
                flex-direction: column;
                                //raceBox1_textBox animation...................................................................................
                                transition: opacity 0.5s ease-in-out 0s , transform 1s ease-in-out 0.2s;
                    &.raceBox1_textAct{
                        opacity: 1;
                        transform: translateX(0dvh);
                    }
                    &.raceBox1_textUnAct{
                        opacity: 1;
                        transform: translateX(0dvh);
                        // opacity: 0;
                        // transform: translateX(100dvw);
                    }
                @media(min-width: 767px) and (max-width: 1024px){
                    width: 360px;
                    position: relative;
                    top: -18px;

                    
                    
                }
                @media (max-width: 767px){
                    width: 100%;
                    order: 1;
                }

                .raceBox1_titleBox{
                    text-decoration: none;
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    h2.tw{
                        position: relative;
                        color: $color-text;
                        left: -3px;
                    }
                    h2.en{
                        position: relative;
                        color: $color-text;
                        bottom: 10px;
                                    
                    }
                }
                .raceBox1_contentBox{
                    text-decoration: none;
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    p{
                        color: $color-text;
                    }
                    .raceBox1_contentIcon{
                        width: 40px;
                    }
                }
            }
        }
    }
</style>
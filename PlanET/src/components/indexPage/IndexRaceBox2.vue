<script setup>
import { RouterLink, RouterView } from 'vue-router';
import axios from 'axios';
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { onMounted, reactive, ref,watch ,onBeforeUnmount } from 'vue';
import Lenis from 'lenis'

import ImageData from '@/assets/image.json';
import VideoData from '@/assets/video.json';
// components
import DynamicIcon from '@/components/icons/DynamicIcon.vue';
//
gsap.registerPlugin(ScrollTrigger)
//存放api data
let imageData_QR = reactive({data:[]});
let imageData_UIimage = reactive({data:[]});
let video_concept = reactive({data:[]});

//gsap 選取DOM
let raceBox2_Content = ref(null);
//gsap 時間縣
let indexBox2_ani_tl ;
let indexBox2_aniHandle = ref(false);
//獲得父組件的參數 Dom3location
const props = defineProps({
  Dom3location: Number
});
// 使用 Vite 的 glob 匯入圖片（會轉成 { [路徑]: 圖片URL }）
const imageMap = import.meta.glob(
  '@/assets/images/index/*.{png,jpg,jpeg,svg,webp}',
  {
    eager: true,
    import: 'default',
  }
);
const vidoemap = import.meta.glob(
  '@/assets/videos/index/*.mp4',
  {
    eager: true,
    import: 'default',
  }
);
onMounted(()=>{
    

    //gsap動畫
    indexBox2_aniHandle = ref(false);
    
    
    // 創建時間縣
    function createTimelines_indexBox2(){
        ScrollTrigger.getAll().forEach(trigger => {
            if (trigger.vars.id === 'indexBox2_ani_tl') {
                // console.log("ScrollTrigger",trigger)
                trigger.kill();
            }
        });
        indexBox2_ani_tl?.kill();
        //獲取父元素
        let IndexBox3DomLoctaion =ref(props.Dom3location);
        let raceBox2_ContentDom = raceBox2_Content.value;
        console.log("獲得元素",IndexBox3DomLoctaion.value)
        
        indexBox2_ani_tl = gsap.timeline({
            scrollTrigger: {
                trigger: raceBox2_ContentDom,
                start: `${raceBox2_ContentDom.offsetWidth*1.2} center`,//如果之後有增加卷軸數要改
                end: `${raceBox2_ContentDom.offsetWidth+raceBox2_ContentDom.offsetHeight} center`,//如果之後有增加卷軸數要改
                scrub: true,
                // markers: true,
                id:"indexBox2_ani_tl",
                onEnter: () => {
                    indexBox2_aniHandle.value = true; // 滾動進入 trigger 範圍 (↓)
                },
                onLeaveBack: () => {
                    indexBox2_aniHandle.value = false;// 滾動離開 trigger 的 end (↓)
                },
                onEnterBack: () => {
                    indexBox2_aniHandle.value = true;// 從下方回來進入 trigger (↑)
                },

                onLeave: () => {
                    indexBox2_aniHandle.value = false;// 往回滾離開 trigger 的 start (↑)
                }
            }
        });
        // 最後手動 refresh
        ScrollTrigger.refresh();
    }

    
    setTimeout(() => {
        createTimelines_indexBox2()
    }, 10);
    // 每次 resize 時，重新建立 timeline
    const resizeHandler_indexBox2 = () => {
        createTimelines_indexBox2();
      
    };

    window.addEventListener("resize", resizeHandler_indexBox2);

    
    onBeforeUnmount(() => {
        window.removeEventListener("resize", resizeHandler_indexBox2);
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());//??
    });





   //data.......................................................................
    // imageData_QR.data = ImageData.index.QRcode;
    // console.log(imageData_QR.data);
    // imageData_UIimage.data = ImageData.index.UI_image;
    // console.log(imageData_UIimage.data);
    // video_concept.data = VideoData.index;
    // console.log(video_concept.data);
    // watch(() => imageData_UIimage.data, (newData) => {
    //     console.log("imageData_UIimage 已更新", newData);
    // });
  
   //處理照片
    // 把 JSON 中的 src 欄位轉換成實際圖片路徑
    //imageData_QR.data
        imageData_QR.data = ImageData.index.QRcode.map(item => ({
            ...item,
            src: imageMap[`/src/assets/images/index/${item.src}`]
        }))
    //video_concept.data
        video_concept.data = VideoData.index.map(item => ({
            ...item,
            src: vidoemap[`/src/assets/videos/index/${item.src}`]
        }))
        // console.log("video_concept",video_concept.data[0]);



    watch(() => imageData_QR.data, (newData) => {
        console.log("imageData_UIimage 已更新", newData);
    });
    watch(() => video_concept.data, (newData) => {
        console.log("video_concept 已更新", newData);
    });
    watch(() => props.Dom3location, (newData) => {
        console.log("video_concept 已更新", newData);
    });
});
</script>

<template>
    <div ref="raceBox2_Content" class="raceBox2_Content">
        <div :class="['raceBox2_video',{raceBox2_videoAct:indexBox2_aniHandle},{raceBox2_videoUnAct:!indexBox2_aniHandle}]">
            <video v-if="video_concept.data.length" autoplay muted loop :src="video_concept.data[0].src"></video>
        </div>
        <div class="raceBox2_content">
            <div :class="['raceBox2_qrCodeBox',{raceBox2_qrAct:indexBox2_aniHandle},{raceBox2_qrUnAct:!indexBox2_aniHandle}]">
                <div class="raceBox2_qrCodeImage">
                    <img v-if="imageData_QR.data.length" :src="imageData_QR.data[3].src" alt="">
                </div>
                <div class="raceBox2_qrCodeText">
                    <h5 v-if="imageData_QR.data.length" class="tw">{{ imageData_QR.data[3].text_tw }}</h5>
                    <h5 v-if="imageData_QR.data.length" class="en">{{ imageData_QR.data[3].text_en }}</h5>
                </div>
            </div>
            <a href="https://youtu.be/p99WEaJeUOs?si=BqgenGe39G0txmkc"  class="raceBox2_textBox">
                <div class="raceBox2_titleBox">
                    <h2 class="tw">概念影片</h2>
                    <h2 class="en">concept video</h2>
                </div>
                    <div class="raceBox2_contentBox">
                        <p class="tw">
                            這部影片講解了我們的核心理念，希望透過這段影片能全面展現我們的價值及產品的特色，
                            讓觀眾能夠更深入地了解我們的目標和努力的方向。這部影片將為您提供豐富的信息，並幫助您更好地認識我們。
                        </p>
                        <div class="raceBox2_contentIcon">
                            <DynamicIcon name="arrow_right" />
                        </div>
                    </div>
            </a>
        </div>
    </div>
</template>



<style scoped lang="scss">
    .raceBox2_Content{
                    
        width: 100%;
        max-width:1280px;
        padding: 0px 80px 0px 80px;//60是navBar的高度100-60=40為上面的padding 80是左右統一留80px
        //flex
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        @media(min-width: 767px) and (max-width: 1024px) and (max-height: 800px){
            justify-content: center;
            // gap: 50px;
        }
        @media(min-width: 767px) and (max-width: 1024px){
            
        }
        @media (max-width: 767px){
            padding: 0px 40px 0px 40px;//60是navBar的高度100-60=40為上面的padding 80是左右統一留80px
            justify-content: center;
        }
        .raceBox2_video{
            
            width: 100%;
            padding: 80px 0px 0px 0px;//60是navBar的高度100-60=40為上面的padding
           
            //flex
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: flex-start;
                order: 1;

            //raceBox2_video animation................................................................................
                transition: opacity 0.5s ease-in-out 0s , transform 1s ease-in-out 0.2s;
                &.raceBox2_videoAct{
                    opacity: 1;
                    transform: translateY(0dvh);
                }
                &.raceBox2_videoUnAct{
                    opacity: 0;
                    transform: translateY(-100dvh);
                }
            @media(min-width: 767px) and (max-width: 1024px){
                padding: 100px 0px 0px 0px;//60是navBar的高度100-60=40為上面的padding
            }
            @media (max-width: 767px){
                padding: 60px 0px 0px 0px;//60是navBar的高度100-60=40為上面的padding
            }

            video{
                width: 70%;
                @media(min-width: 767px) and (max-width: 1024px){
                    width: 100%;

                }
                @media (max-width: 767px){
                    width: 100%;
                }
            }

        }
        .raceBox2_content{
            width: 70%;
            // background-color: antiquewhite;
            padding: 0px 0px 40px 0px;//40是跟上面100-60=40
            //flex
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            order: 2;
            // background-color: aqua;
            @media(min-width: 767px) and (max-width: 1024px){
                order: 2;
                flex-direction: column;
                width: 100%;
                height: 80dvh;
                padding: 40px 0px 40px 0px;//30是跟上面90-60=40
                @media(max-height: 800px){
                    height: auto;
                    width: 100%;
                    flex-direction: row;
                   
                }
            }
            @media (max-width: 767px){
                order: 2;
                flex-direction: column;
                justify-content: center;
                width: 100%;
                gap: 0px;
                padding: 10px 0px 20px 0px;//30是跟上面90-60=40
            }
            .raceBox2_qrCodeBox{
                display: flex;
                flex-direction: column;
                order: 2;
                justify-content: flex-start;
                // background-color: antiquewhite;
                //raceBox2_qr animation................................................................................
                    transition: opacity 0.5s ease-in-out 0s , transform 1s ease-in-out 0.2s;
                    &.raceBox2_qrAct{
                        opacity: 1;
                        transform: translateX(0dvh);
                    }
                    &.raceBox2_qrUnAct{
                        opacity: 0;
                        transform: translateX(-100dvh);
                    }
                @media(min-width: 767px) and (max-width: 1024px){
                    order: 2;
                    flex-direction: column;
                    height: 300px;
                    width: 100%;
                    @media(max-height: 800px){
                    height: auto;
                    width: auto;
                    justify-content: flex-start;
                    
                    }
                    
                }
                @media (max-width: 767px){
                    order: 2;
                    flex-direction: column;
                    width: 100%;
                    height: 30dvh;
                    justify-content: space-between;
                    align-items: center;
                 
                }

                .raceBox2_qrCodeImage{
                    width: 100px;
                    position: relative;
                    top: 15px;
                    img{
                        width: 100%;
                    }
                    @media(min-width: 767px) and (max-width: 1024px){
                        width: 200px;
                        @media(max-height: 800px){
                            width: 100px;
                            top: 0px;
                        
                        }

                    }
                    @media (max-width: 767px){
                        width:calc(30dvh*0.7);
                        height: calc(30dvh*0.7);
                    }
                }
                .raceBox2_qrCodeText{
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    width: 200px;
                    top: 15px;
                    @media(min-width: 767px) and (max-width: 1024px){
                        width: 150px;
                        // display: none;
                        // background: rebeccapurple;
                        @media(max-height: 800px){
                            width: 200px;
                            top: 0px;
                        
                        }

                    }
                    @media (max-width: 767px){
                        width:calc(30dvh*0.7) ;
                        height: calc(30dvh*0.2);
                        top: 0px;
                        
                    }
                    h5.tw{

                    }
                    h5.en{

                    }
                }
            }
            .raceBox2_textBox{
                width: 400px;
                text-decoration: none;
                display: flex;
                flex-direction: column;
                order: 1;
                //電腦縮小視窗

                //平板
                @media(min-width: 767px) and (max-width: 1024px){
                    width: 360px;
                    position: relative;
                    top: -18px;

                    
                    
                }
                @media (max-width: 767px){
                    width: 100%;
                    order: 1;
                }
                .raceBox2_titleBox{
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
                .raceBox2_contentBox{
                    text-decoration: none;
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    @media(min-width: 767px) and (max-width: 1024px){
                        width: 90%;
                        // background: rebeccapurple;
                    }
                    p{
                        color: $color-text;
                    }
                    .raceBox2_contentIcon{
                        width: 40px;
                    }
                }
            }
        }
    }
</style>
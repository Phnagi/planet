<script setup>
import { RouterLink, RouterView } from 'vue-router';
import axios from 'axios';
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { onMounted, reactive, ref,watch,onBeforeUnmount } from 'vue';
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
let raceBox3_Content = ref(null);
//gsap 時間縣
let indexBox3_ani_tl ;
let indexBox3_aniHandle = ref(false);

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
    indexBox3_aniHandle = ref(false);
    let raceBox3_ContentDom = raceBox3_Content.value;
console.log("raceBox3_ContentDom",raceBox3_ContentDom)
    // 創建時間縣
    function createTimelines_indexBox3(){
        ScrollTrigger.getAll().forEach(trigger => {
            if (trigger.vars.id === 'indexBox3_ani_tl') {
                // console.log("ScrollTrigger",trigger)
                trigger.kill();
            }
        });
        indexBox3_ani_tl?.kill();
        indexBox3_ani_tl = gsap.timeline({
            scrollTrigger: {
                trigger: raceBox3_ContentDom,//如果之後有增加卷軸數要改
                start: `${raceBox3_ContentDom.offsetWidth*1.2} center`,//如果之後有增加卷軸數要改
                end: `${raceBox3_ContentDom.offsetWidth+raceBox3_ContentDom.offsetHeight} center`,
                scrub: true,
                // markers: true,
                id:"indexBox3_ani_tl",
                onEnter: () => {
                    indexBox3_aniHandle.value = true; // 滾動進入 trigger 範圍 (↓)
                },
                onLeaveBack: () => {
                    indexBox3_aniHandle.value = false;// 滾動離開 trigger 的 end (↓)
                },
                // onEnterBack: () => {
                //     indexBox3_aniHandle.value = true;// 從下方回來進入 trigger (↑)
                // },

                // onLeave: () => {
                //     indexBox3_aniHandle.value = false;// 往回滾離開 trigger 的 start (↑)
                // }
            }
        });
        // 最後手動 refresh
        ScrollTrigger.refresh();
    }

    createTimelines_indexBox3()
    // 每次 resize 時，重新建立 timeline
    const resizeHandler_indexBox3 = () => {
        createTimelines_indexBox3();
    };

    window.addEventListener("resize", resizeHandler_indexBox3);

    
    onBeforeUnmount(() => {
        window.removeEventListener("resize", resizeHandler_indexBox3);
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());//??
    });








   //data.......................................................................

    // imageData_QR.data = ImageData.index.QRcode;
    // console.log(imageData_QR.data);
    // imageData_UIimage.data = ImageData.index.UI_image;
    // console.log(imageData_UIimage.data);
    // video_concept.data = VideoData.index;
    // console.log('s',video_concept.data[1]);
    // watch(() => imageData_UIimage.data, (newData) => {
    //     console.log("imageData_UIimage 已更新", newData);
    // });


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
        console.log("video_concept",video_concept.data[0]);

    watch(() => imageData_QR.data, (newData) => {
        console.log("imageData_UIimage 已更新", newData);
    });
    watch(() => video_concept.data, (newData) => {
        console.log("video_concept 已更新", newData);
    });
});
</script>

<template>
    <div ref="raceBox3_Content" class="raceBox3_Content">
        <div :class="['raceBox3_video',{raceBox3_videoAct:indexBox3_aniHandle},{raceBox3_videoUnAct:!indexBox3_aniHandle}]">
            <video v-if="video_concept.data.length" autoplay muted loop :src="video_concept.data[1].src"></video>
        </div>
        <div class="raceBox3_content">
            <div :class="['raceBox3_qrCodeBox',{raceBox3_qrAct:indexBox3_aniHandle},{raceBox3_qrUnAct:!indexBox3_aniHandle}]">
                <div class="raceBox3_qrCodeImage">
                    <img v-if="imageData_QR.data.length" :src="imageData_QR.data[2].src" alt="">
                </div>
                <div class="raceBox3_qrCodeText">
                    <h5 v-if="imageData_QR.data.length" class="tw">{{ imageData_QR.data[2].text_tw }}</h5>
                    <h5 v-if="imageData_QR.data.length" class="en">{{ imageData_QR.data[2].text_en }}</h5>
                </div>
        </div>
            <a href=""  class="raceBox3_textBox">
                <div class="raceBox3_titleBox">
                    <h2 class="tw">操作影片</h2>
                    <h2 class="en">UI design</h2>
                </div>
                    <div class="raceBox3_contentBox">
                        <p class="tw">
                                        應用程式的原型設計，採用簡約指示的設計風格，
                                        希望能像指示設計一樣，引導使用者並慢慢的改變使用者的生活方式，
                                        讓環保意識提高。
                        </p>
                        <div class="raceBox3_contentIcon">
                            <DynamicIcon name="arrow_right" />
                        </div>
                    </div>
            </a>
        </div>
    </div>
</template>



<style scoped lang="scss">
    .raceBox3_Content{
                    
        width: 100%;
        max-width:1280px;
        padding: 0px 80px 0px 80px;//60是navBar的高度100-60=40為上面的padding 80是左右統一留80px
        //flex
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        @media(min-width: 767px) and (max-width: 1024px){
            flex-direction: column;

        }
        @media (max-width: 767px){
            flex-direction: column;
            padding: 0px 40px 0px 40px;//60是navBar的高度100-60=40為上面的padding 80是左右統一留80px
            justify-content: center;
        }
        .raceBox3_video{
            
            width: 70%;
            padding: 0px 0px 0px 0px;//60是navBar的高度100-60=40為上面的padding
         
            //flex
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: flex-start;
                order: 2;

            //raceBox3_video animation................................................................................
                transition: opacity 0.5s ease-in-out 0s , transform 1s ease-in-out 0.2s;
                &.raceBox3_videoAct{
                    opacity: 1;
                    transform: translateX(0dvh);
                }
                &.raceBox3_videoUnAct{
                    opacity: 0;
                    transform: translateX(100dvh);
                }
            @media(min-width: 767px) and (max-width: 1024px){
                width: 100%;
                padding: 100px 0px 0px 0px;//60是navBar的高度100-60=40為上面的padding
                order: 2;
                @media(max-height: 800px){
                    width: 100%;
                    padding: 100px 0px 0px 0px;
                }   
            }
            @media (max-width: 767px){
                width: 100%;
                padding: 60px 0px 0px 0px;//60是navBar的高度100-60=40為上面的padding
                order: 1;
            }
            video{
                width: 100%;
                @media(min-width: 767px) and (max-width: 1024px){
                    width: 100%;
                }
                @media (max-width: 767px){
                    width: 100%;
                }
            }

        }
        .raceBox3_content{
            width: 50%;
            height: 100dvh;
            // background-color: antiquewhite;
            padding: 100px 0px 40px 0px;//40是跟上面100-60=40
            //flex
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            order: 1;
            // background-color: aqua;
            @media(min-width: 767px) and (max-width: 1024px){
                order: 2;
                flex-direction: column;
                width: 100%;
                height: 80dvh;
                padding: 40px 0px 40px 0px;//30是跟上面90-60=40
                @media(max-height: 800px){
                    flex-direction: row;
                    width: 100%;
                    
                }   
            }
            @media (max-width: 767px){
                order: 2;
                flex-direction: column;
                justify-content: center;
                width: 100%;
                height: auto;
                gap: 0px;
                padding: 10px 0px 20px 0px;//30是跟上面90-60=40
            }
            .raceBox3_qrCodeBox{
                height: 200px;
                display: flex;
                flex-direction: column;
                order: 1;
                justify-content: space-between;
                // background-color: antiquewhite;

                //raceBox3_qr animation................................................................................
                transition: opacity 0.5s ease-in-out 0s , transform 1s ease-in-out 0.2s;
                    &.raceBox3_qrAct{
                        opacity: 1;
                        transform: translateX(0dvh);
                    }
                    &.raceBox3_qrUnAct{
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
                .raceBox3_qrCodeImage{
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
                        width:calc(30dvh*0.7) ;
                        height: calc(30dvh*0.7);
                    }
                }
                .raceBox3_qrCodeText{
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    width: 200px;
                    top: -20px;
                    order: 2;
                    @media(min-width: 767px) and (max-width: 1024px){
                        order: 1;
                        @media(max-height: 800px){
                            
                            top: 0px;
                        }
                    }
                    @media (max-width: 767px){
                        width:calc(30dvh*0.7) ;
                        height: calc(30dvh*0.2);
                        top: 0px;
                        order: 1;
                    }
                    h5.tw{

                    }
                    h5.en{

                    }
                }
            }
            .raceBox3_textBox{
                width: 400px;
                text-decoration: none;
                display: flex;
                flex-direction: column;
                order: 1;
                @media(min-width: 767px) and (max-width: 1024px){
                    width: 360px;
                    position: relative;
                    top: -18px;

                    @media(max-height: 800px){
                        height: auto;
                        width: 50%;
                        justify-content: flex-start;
                        top: -18px;
                    }
                    
                }
                @media (max-width: 767px){
                    width: 100%;
                    order: 1;
                }
                .raceBox3_titleBox{
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
                .raceBox3_contentBox{
                    text-decoration: none;
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    p{
                        color: $color-text;
                    }
                    .raceBox3_contentIcon{
                        width: 40px;
                    }
                }
            }
        }
    }
</style>
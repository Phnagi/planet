<script setup>
import { RouterLink, RouterView } from 'vue-router';
import axios from 'axios';
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { onMounted, reactive, ref,watch } from 'vue';
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
onMounted(()=>{
   //data.......................................................................
    // async()=>{
    //     try{
    //         let res = await axios.get('../../public/data/image.json');
    //         imageData.data = res;
    //         console.log(imageData.data);
    //     }catch(err){
    //         console.log(`載入JSON失敗:${err}`);
    //     }
    // }
    imageData_QR.data = ImageData.index.QRcode;
    console.log(imageData_QR.data);
    imageData_UIimage.data = ImageData.index.UI_image;
    console.log(imageData_UIimage.data);
    video_concept.data = VideoData.index;
    console.log(video_concept.data);
    watch(() => imageData_UIimage.data, (newData) => {
        console.log("imageData_UIimage 已更新", newData);
    });
    watch(() => imageData_QR.data, (newData) => {
        console.log("imageData_UIimage 已更新", newData);
    });
    watch(() => video_concept.data, (newData) => {
        console.log("video_concept 已更新", newData);
    });
});
</script>

<template>
    <div class="raceBox2_Content">
        <div class="raceBox2_video">
            <video v-if="video_concept.data.length" autoplay muted loop :src="video_concept.data[0].src"></video>
        </div>
        <div class="raceBox2_content">
            <div class="raceBox2_qrCodeBox">
                <div class="raceBox2_qrCodeImage">
                    <img v-if="imageData_QR.data.length" :src="imageData_QR.data[0].src" alt="">
                </div>
                <div class="raceBox2_qrCodeText">
                    <h5 v-if="imageData_QR.data.length" class="tw">{{ imageData_QR.data[0].text_tw }}</h5>
                    <h5 v-if="imageData_QR.data.length" class="en">{{ imageData_QR.data[0].text_en }}</h5>
                </div>
        </div>
            <a href=""  class="raceBox2_textBox">
                <div class="raceBox2_titleBox">
                    <h2 class="tw">UI原型設計</h2>
                    <h2 class="en">UI design</h2>
                </div>
                    <div class="raceBox2_contentBox">
                        <p class="tw">
                                        應用程式的原型設計，採用簡約指示的設計風格，
                                        希望能像指示設計一樣，引導使用者並慢慢的改變使用者的生活方式，
                                        讓環保意識提高。
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
                justify-content: space-between;
                // background-color: antiquewhite;
                @media(min-width: 767px) and (max-width: 1024px){
                    order: 2;
                    flex-direction: column;
                    height: 300px;
                    width: 100%;
                    
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
                    top: -20px;
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
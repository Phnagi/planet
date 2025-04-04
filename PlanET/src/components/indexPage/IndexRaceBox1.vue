<script setup>
import { RouterLink, RouterView } from 'vue-router';
import axios from 'axios';
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { onMounted, reactive, ref,watch } from 'vue';
import Lenis from 'lenis'

import ImageData from '@/assets/image.json';
// components
import DynamicIcon from '@/components/icons/DynamicIcon.vue';
//
gsap.registerPlugin(ScrollTrigger)
//存放api data
let imageData_QR = reactive({data:[]});
let imageData_UIimage = reactive({data:[]});
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

    watch(() => imageData_UIimage.data, (newData) => {
        console.log("imageData_UIimage 已更新", newData);
    });
    watch(() => imageData_QR.data, (newData) => {
        console.log("imageData_UIimage 已更新", newData);
    });
});
</script>

<template>
    <div class="raceBox1_Content">
        <div class="raceBox1_image">
            <img v-if="imageData_UIimage.data.length" :src="imageData_UIimage.data[0].src" alt="">              
        </div>
        <div class="raceBox1_content">
            <div class="raceBox1_qrCodeBox">
                <div class="raceBox1_qrCodeImage">
                    <img v-if="imageData_QR.data.length" :src="imageData_QR.data[0].src" alt="">
                </div>
                <div class="raceBox1_qrCodeText">
                    <h5 v-if="imageData_QR.data.length" class="tw">{{ imageData_QR.data[0].text_tw }}</h5>
                    <h5 v-if="imageData_QR.data.length" class="en">{{ imageData_QR.data[0].text_en }}</h5>
                </div>
        </div>
            <a href=""  class="raceBox1_textBox">
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
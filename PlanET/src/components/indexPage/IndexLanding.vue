<script setup>
import { RouterLink, RouterView } from 'vue-router';
import axios from 'axios';
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { onMounted, onUnmounted, reactive, ref,watch } from 'vue';
import Lenis from 'lenis'

import ImageData from '@/assets/image.json';
// components
import DynamicIcon from '@/components/icons/DynamicIcon.vue';
//
gsap.registerPlugin(ScrollTrigger)
//存放api data
let imageData_QR = reactive({data:[]});
let gifData = reactive({});
let useGif = ref({});
const randomNumber = ref(0); // 當前的隨機數
let previousNumber = null;   // 前一次的隨機數
let giftimer =null //計時器
// let imageData_UIimage = reactive({data:[]});


// 使用 Vite 的 glob 匯入圖片（會轉成 { [路徑]: 圖片URL }）
const imageMap = import.meta.glob(
  '@/assets/images/index/*.{png,jpg,jpeg,svg,webp}',
  {
    eager: true,
    import: 'default',
  }
);
const gifMap = import.meta.glob(
  '@/assets/gif/index/*.{png,jpg,jpeg,svg,webp,gif}',
  {
    eager: true,
    import: 'default',
  }
);
// console.log("gifMap",gifMap)

//指派到useGif
let changeGif = (idx)=>{
    // Object.assign(useGif, gifData[idx]);
    useGif.value = gifData[idx];
    // VI_color_Color.value = contentData_viColor.image;
    console.log(useGif)
};

//隨機
function generateRandom() {
//   randomNumber.value = Math.floor(Math.random() * 5); // 0 到 4
    let newNumber;
    do {
        newNumber = Math.floor(Math.random() * 5); // 0 到 4
    } while (newNumber === previousNumber);

    previousNumber = newNumber;
    randomNumber.value = newNumber;

    changeGif(newNumber);

}
onMounted(()=>{
   //data.......................................................................

   //處理照片
    // 把 JSON 中的 src 欄位轉換成實際圖片路徑
    imageData_QR.data = ImageData.index.QRcode.map(item => ({
        ...item,
        src: imageMap[`/src/assets/images/index/${item.src}`]
    }))
    gifData = ImageData.index.gif.map(item => ({
        ...item,
        src: gifMap[`/src/assets/gif/index/${item.src}`]
    }))


    // imageData_QR.data = ImageData.index.QRcode;
    console.log("gifData",gifData);
    useGif.value = gifData[0];
    watch(() => imageData_QR.data, (newData) => {
        console.log("imageData_UIimage 已更新", newData);
    });
    watch(() => gifData, (newData) => {
        console.log("imageData_UIimage 已更新", newData);
    });

     giftimer =setInterval(generateRandom,3000)
});
onUnmounted(()=>{
    clearInterval(giftimer); // 清除計時器
});
</script>


<template>
        <div  class="wrapperInner">
            <div class="iconBox_1">
                <div class="icon">
                    <!-- <DynamicIcon name="walk" /> -->
                     <img :src="useGif.src" alt="">
                </div>
                <div class="titleBox_1">
                    <h1 class="tw">星球計畫 </h1>
                    <h2 class="en">PlanET</h2>
                </div>
            </div>

            <div class="qr_codeArray">
                <!-- <img src="../assets/images/index/ig_QRcode.png" alt=""> -->
                <div class="qrcode" v-for="(item,index) in imageData_QR.data.slice(0, 3)" :key="item.id" >
                    <a :href="item.link">
                        <div class="imageBox_1">
                            <img :src="item.src" alt="">
                        </div>
                        <div class="qrcodeTextBox">
                            <p class="tw">{{ item.title_tw }}</p>
                            <h5 class="en">{{ item.title_en }}</h5>
                        </div>
                    </a>

                
                </div>
                <!-- <img src="../assets/images/index/ig_QRcode.png" alt=""> -->
            </div>
            <!-- <div class="iconBox">
                <DynamicIcon name="arrow_down" />
            </div> -->
            
        </div>
</template>



<style scoped lang="scss"> 
    .wrapperInner {
        height: 100dvh;
        width: 100%;
        background-color: $color-white;
        position: relative;
        //flex
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0px;
        padding: 40px 0px 0px 0px;
        @media(min-width: 767px) and (max-width: 1024px){
            padding: 80px 0px 0px 0px;
        }
        @media (max-width: 767px){
            padding: 40px 0px 0px 0px;
        }
        .iconBox_1{
            width: 100%;//調整寬
            // height: 50dvh;
            position: relative;
            // height: 200px;//調整高
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .icon{
                width: 40dvh;//調整寬
                height: 40dvh;//調整高
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                img{
                    width: 100%;
                    border: none;
                    box-shadow: none;
                }
                @media(min-width: 767px) and (max-width: 1024px){
                    width: 40dvh;//調整寬
                    height: 40dvh;//調整高
                }
                @media (max-width: 767px){
                    width: 35dvh;//調整寬
                    height: 35dvh;//調整高
                }
                // background-color: antiquewhite;
            }
            .titleBox_1{
                // background-color: rgb(129, 79, 14);
                width: 100%;
                
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                position: relative;
                bottom: 10px;
                @media(min-width: 767px) and (max-width: 1024px){
                    bottom: 10px;
                }
                    @media (max-width: 767px){
                    bottom: 5px;
                }
                h1.tw{
                    position: relative;
                    
                    padding: 0%;
                    margin: 0%;
                }
                h2.en{
                    position: relative;
                    bottom: 15px;
                    padding: 0%;
                    margin: 0%;
                    @media(min-width: 767px) and (max-width: 1024px){
                        bottom: 15px;
                    }
                    @media (max-width: 767px){
                        bottom: 10px;
                    }
                }
            }
        }

        .qr_codeArray{
            // width: 500px;
            // height: 120px;
            // background-color: antiquewhite;
            display: flex;
            justify-content: space-around;
            align-items: center;
            gap: 5dvw;
            @media(min-width: 767px) and (max-width: 1024px){
                // height: 22dvh;
                gap: 5dvw;
            }
            @media (max-width: 767px){
                // height: 22dvh;
                // width: 200px;
            }
            .qrcode{
                width: 100%;
                height: 100%;
                a{
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-decoration: none;
                    .imageBox_1{
                        width: 95px;
                        @media(min-width: 767px) and (max-width: 1024px){
                            width: 120px;
                        }
                        @media (max-width: 767px){
                            width: 20dvw;
                        }
                        img{
                            width: 100%;
                        }
                    }
                    .qrcodeTextBox{
                        
                        width: 95px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        position: relative;
                        p{
                            position: relative;
                            text-decoration: none;
                            color: $color-text;
                        }
                        h5{
                            position: relative;
                            text-decoration: none;
                            color: $color-text;
                            bottom: 3px;
                        }
                    }
                }

            }
        }

    
    }
</style>
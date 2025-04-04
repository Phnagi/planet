<script setup>
import { onMounted, ref ,reactive,watch } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import ImageData from '@/assets/image.json';
import VideoData from '@/assets/video.json';

//components
import hamberger from '@/components/icons/hamberger.vue';
import close from '@/components/icons/close.vue';
import Navbar from '@/components/Navbar.vue';
import DynamicIcon from '@/components/icons/DynamicIcon.vue';
//mod
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger);
let footer = ref(null);

//存放api data
let footerLogo = reactive({data:[]});
let footerQrcode = reactive({data:[]});
onMounted(()=>{
    let footerDom = footer.value;

        //最後一段吸附 從Box1到Box3的吸附
        let footer_snap = gsap.timeline({
            scrollTrigger: {
                trigger: footerDom,
                start: `50% 100%`,//從box3往上一個Box2的高
                end:  `100% 100%`,
                // pin: true,
                scrub: 1,
                snap:1,
                // markers: true,
            }
        });

    //data..........................................................
    footerLogo.data = ImageData.footer.logo;
    footerQrcode.data = ImageData.index.QRcode;
    console.log('f',footerLogo.data[0]);
    watch(() => footerLogo.data, (newData) => {
        console.log("imageData_UIimage 已更新", newData);
    });
    watch(() => footerQrcode.data, (newData) => {
        console.log("imageData_UIimage 已更新", newData);
    });
});
</script>


<template>
    <footer ref="footer">

        <div class="contentBox">
            <div class="footerTitleBox">
                <img v-if="footerLogo.data.length" :src="footerLogo.data[0].src" alt="">
            </div>
            <div class="inforBox">
                <div class="footerContentBox">
                    <div class="igBox">
                        <h3 class="en">IG</h3>
                        <p class="en">PlanET</p>
                    </div>
                    <div class="emailBox">
                        <h3 class="en">email</h3>
                        <p class="en">planet.dmd114@gmail.com</p>
                    </div>
                </div>
                <div class="footerQRcodeBox">
                    <div class="footerQRcode" v-for="(item,index) in footerQrcode.data" :key="item.id">
                        <a href="item.link">
                            <div class="footer_QRimageBox">
                                <img :src="item.src" alt="">
                            </div>
                            <div class="footer_QRcodeTextBox">
                                <p class="tw">{{ item.title_tw }}</p>
                                <h5 class="en">{{ item.title_en }}</h5>
                            </div>
                        </a>
                    </div>
                </div>

            </div>
        </div>

        <div class="iconAbsolute">
            <DynamicIcon name="walk" />
        </div>

        <ul class="footerOption">
            <li>
                <RouterLink to="/" class="homeBtn">首頁</RouterLink>
            </li>
            <li>
                <RouterLink to="/about" class="aboutBtn">作品介紹</RouterLink>
            </li>
            <li>
                <RouterLink to="/vi" class="viBtn">視覺設計</RouterLink>
            </li>
        </ul>
        

    </footer>
</template>



<style scoped lang="scss">
    footer{
        
        padding: 100px 80px 40px 80px;
        background: $color-white;
        height: 100dvh;
        width: 100%;
        position: relative;
        display: flex;
        justify-content: space-between;
        .contentBox{
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .footerTitleBox{
                width: 50%;
                img{
                    width: 100%;
                }
            }
            .inforBox{
                height: 50dvh;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                gap: 20px;
                .footerContentBox{
                    .igBox{

                    }
                    .footerBox{

                    }
                }
                .footerQRcodeBox{
                    width: 30dvw;
                    display: flex;
                    flex-direction: row;
                    .footerQRcode{
                        width: 100%;
                        a{
                            width: 100%;
                            text-decoration: none;
                            .footer_QRimageBox{
                                width: 100px;

                                display: flex;
                                flex-direction: column;
                                justify-content: center;
                                align-items: center;
                                img{
                                    width: 100%;
                                    
                                }
                            }
                            .footer_QRcodeTextBox{
                                width: 100px;

                                // background-color: antiquewhite;
                                display: flex;
                                flex-direction: column;
                                justify-content: center;
                                align-items: center;
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
        }
        .iconAbsolute{
            width: 300px;
            position: absolute;
            top: 110px;
            right: 0;
        }
        .footerOption{
            list-style: none;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: flex-end;
            list-style: none;
            height: 100%;
           
            li{
                height: 50px;
                // background: red;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                align-items: flex-end;
                a{
                    
                    font-family: $font-family-TW;
                    font-size: $web-FS-SM_title2_C;
                    line-height: $web-LH-SM_title2_C;
                    letter-spacing: $web-LP-SM_title2_C;
                    font-weight: $web-FW-SM_title2_C;
                    list-style: none;
                    text-decoration: none;
                    color: $color-text;
                    transition: 0.4s ease-in-out;
                    &:hover{

                        color: $color-green;
                    }
                }
            }
        }
    }
</style>
<script setup>
import { onMounted, ref ,reactive,watch,onBeforeUnmount } from 'vue';
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
//gsap tl宣告
let footer_snap ;
//存放api data
let footerLogo = reactive({data:[]});
let footerQrcode = reactive({data:[]});
let gifData = reactive({});
let useGif = ref({});
//傳給子組件

// 使用 Vite 的 glob 匯入圖片（會轉成 { [路徑]: 圖片URL }）
const imageMap = {
  ...import.meta.glob('@/assets/images/index/*.{png,jpg,svg,webp}', { eager: true, import: 'default' }),
  ...import.meta.glob('@/assets/images/footer/*.{png,jpg,svg,webp}', { eager: true, import: 'default' })
}
const gifMap = import.meta.glob(
  '@/assets/gif/index/*.{png,jpg,jpeg,svg,webp,gif}',
  {
    eager: true,
    import: 'default',
  }
);
//拿取gif資料
let changeGif = (idx)=>{
    // Object.assign(useGif, gifData[idx]);
    useGif.value = gifData[0];
    // VI_color_Color.value = contentData_viColor.image;
    // console.log(useGif)
};
onMounted(()=>{
    let footerDom = footer.value;

    // //創建時間縣
    function createTimelines_footer(){

        // 清除舊的 timelines 和 ScrollTriggers
        // console.log("ScrollTrigger",ScrollTrigger.getAll());
        ScrollTrigger.getAll().forEach(trigger => {
            if (trigger.vars.id === 'footer') {
                // console.log("ScrollTrigger",trigger)
                trigger.kill();
            }
        });
        footer_snap?.kill();
        //重新創建
        footer_snap = gsap.timeline({
            scrollTrigger: {
                trigger: footerDom,
                start: `0% 100%`,//從box3往上一個Box2的高
                end:  `100% 100%`,
                // pin: true,
                scrub: 1,
                snap:1,
                id: "footer",
                // markers: true,
            }
        });

        // 最後手動 refresh
        ScrollTrigger.refresh();
    }

    // createTimelines_footer();
    // 每次 resize 時，重新建立 timeline
    const resizeHandler_footer = () => {
        // createTimelines_footer();
    };

    // window.addEventListener("resize", resizeHandler_footer);

    
    onBeforeUnmount(() => {
        window.removeEventListener("resize", resizeHandler_footer);
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    });
    //data..........................................................
    // footerLogo.data = ImageData.footer.logo;
    // footerQrcode.data = ImageData.index.QRcode;
    // console.log('f',footerLogo.data[0]);
       //處理照片
    // 把 JSON 中的 src 欄位轉換成實際圖片路徑
    footerQrcode.data = ImageData.index.QRcode.map(item => ({
        ...item,
        src: imageMap[`/src/assets/images/index/${item.src}`]
    }))
    footerLogo.data = ImageData.footer.logo.map(item => ({
        ...item,
        src: imageMap[`/src/assets/images/footer/${item.src}`]
    }))
    gifData = ImageData.index.gif.map(item => ({
        ...item,
        src: gifMap[`/src/assets/gif/index/${item.src}`]
    }))

    watch(() => footerLogo.data, (newData) => {
        console.log("footerLogo 已更新", newData);
    });
    watch(() => footerQrcode.data, (newData) => {
        console.log("footerQrcode 已更新", newData);
    });
    watch(() => gifData, (newData) => {
        console.log("gifData 已更新", newData);
    });
    changeGif();
    console.log("gifData", gifData);
});
</script>


<template>
    <footer ref="footer">

        <div class="footerInner">
            <div class="contentBox">
                <div class="footerTitleBox">
                    <img v-if="footerLogo.data.length" :src="footerLogo.data[0].src" alt="">
                </div>
                <div class="inforBox">
                    <div class="footerContentBox">
                        <div class="igBox">
                            <h3 class="en">IG</h3>
                            <p class="en">planET.114</p>
                        </div>
                        <div class="emailBox">
                            <h3 class="en">email</h3>
                            <p class="en">planet.dmd114@gmail.com</p>
                        </div>
                    </div>
                    <div class="footerQRcodeBox">
                        <div class="footerQRcode" v-for="(item,index) in footerQrcode.data.slice(0, 3)" :key="item.id">
                            <a :href="item.link">
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

            <div class="iconAbsoluteBox">
                <div class="iconAbsolute">
                    <!-- <DynamicIcon name="walk" /> -->
                    <img :src="useGif.src" alt="">
                </div>
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
        
        </div>


    </footer>
</template>



<style scoped lang="scss">
    footer{
        

        background: $color-white;
        height: 100dvh;
        width: 100%;
        
        position: relative;
        display: flex;
        justify-content: center;
        .footerInner{
          
            width: 100%;
            max-width:1280px;
            padding: 100px 80px 40px 80px;
            position: relative;
            display: flex;
            justify-content: space-between;
            @media(min-width: 767px) and (max-width: 1024px){
                padding: 90px 80px 40px 80px;
            }
            @media (max-width: 767px){
                padding: 90px 40px 40px 40px;
            }
            .contentBox{
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;                
                z-index: 1;
                .footerTitleBox{
                    width: 50%;
                    img{
                        width: 100%;
                    }
                    @media(min-width: 767px) and (max-width: 1024px){
                        width: 90%;
                    }
                    @media (max-width: 767px){
                        width: 90%;
                    }
                }
                .inforBox{
                    height: 50dvh;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    gap: 20px;
                    .footerContentBox{
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: flex-start;
                        gap: 5px;
                        @media(min-width: 767px) and (max-width: 1024px){
                            gap: 10px;
                        }
                        @media (max-width: 767px){
                            gap: 10px;
                        }
                        .igBox{

                        }
                        .footerBox{

                        }
                    }
                    .footerQRcodeBox{
                        width: 30dvw;
                        display: flex;
                        flex-direction: row;
                        @media(min-width: 767px) and (max-width: 1024px){
                            width: 50dvw;
                        }
                        @media (max-width: 767px){
                            width: 50dvw;
                        }
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
                                    @media(min-width: 767px) and (max-width: 1024px){
                                        width: 80px;
                                    }
                                    @media (max-width: 767px){
                                        width: 60px;
                                    }
                                }
                                .footer_QRcodeTextBox{
                                    width: 100px;

                                    // background-color: antiquewhite;
                                    display: flex;
                                    flex-direction: column;
                                    justify-content: center;
                                    align-items: center;
                                    @media(min-width: 767px) and (max-width: 1024px){
                                        width: 80px;
                                    }
                                    @media (max-width: 767px){
                                        width: 60px;
                                    }

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
            .iconAbsoluteBox{
   
                position: absolute;
                top: 0%;
                left: 0%;
                width: 100%;
                height: 100%;
                //flex
                display: flex;
                justify-content: flex-end;
                align-items: flex-start;
                z-index: 0;
                @media(min-width: 767px) and (max-width: 1024px){
                    justify-content: center;
                    align-items: center;
                }
                @media (max-width: 767px){
                        justify-content: center;
                        align-items: center;
                }
                .iconAbsolute{
                    width: 300px;
                    height: 300px;
                    position: relative;
                    top: 110px;
                    right: 0;
                    overflow: hidden;
                    // background: cadetblue;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img{
                        width: 105%;
                        border: none;
                        box-shadow: none;
                    }
                    @media(min-width: 767px) and (max-width: 1024px){
                        width: 35dvh;
                        height: 35dvh;
                        top: 0px;
                        left: 20px;
                        overflow: hidden;
                    }
                    @media (max-width: 767px){
                        width: 30dvh;
                        height: 30dvh;
                        top: -20px;
                        left: 10px;
                        overflow: hidden;
                    }
                }
            }

            .footerOption{
                list-style: none;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                align-items: flex-end;
                list-style: none;
                height: 100%;
                position: relative;
                @media(min-width: 767px) and (max-width: 1024px){
                    width: 20dvw;
                    bottom: 10px;
                }
                @media (max-width: 767px){
                    width: 60dvw;
                    bottom: 10px;
                }
            
                li{
                    height: 50px;
                    // background: red;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    align-items: flex-end;
                    @media(min-width: 767px) and (max-width: 1024px){
                        height: 50px;
                    }
                    @media (max-width: 767px){
                        height: 32px;
                    }
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
                        @media(min-width: 767px) and (max-width: 1024px){
                            font-size: $ipad-FS-SM_title2_C;
                            line-height: $ipad-LH-SM_title2_C;
                            letter-spacing: $ipad-LP-SM_title2_C;
                            font-weight: $ipad-FW-SM_title2_C;
                        }
                        @media (max-width: 767px){
                            font-size: $phone-FS-SM_title2_C;
                            line-height: $phone-LH-SM_title2_C;
                            letter-spacing: $phone-LP-SM_title2_C;
                            font-weight: $phone-FW-SM_title2_C;
                        }
                        &:hover{

                            color: $color-green;
                        }

                    }
                }
            }
        }

    }
</style>
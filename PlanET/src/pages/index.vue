<script setup>
import { RouterLink, RouterView } from 'vue-router';
import axios from 'axios';
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { onMounted, reactive, ref,watch ,onBeforeUnmount } from 'vue';
import Lenis from 'lenis'

import ImageData from '@/assets/image.json';
// components
import DynamicIcon from '@/components/icons/DynamicIcon.vue';
import IndexLanding from '@/components/indexPage/IndexLanding.vue';
import IndexRaceBox1 from '@/components/indexPage/indexRaceBox1.vue';
import IndexRaceBox2 from '@/components/indexPage/IndexRaceBox2.vue';
import IndexRaceBox3 from '@/components/indexPage/IndexRaceBox3.vue';

//
gsap.registerPlugin(ScrollTrigger)


let races = ref(null);
let raceWrapper = ref(null);
let homePageWrapper = ref(null);

let wrapper = ref(null);
let raceBox1 = ref(null);
let raceBox2 = ref(null);
let raceBox3 = ref(null);

//存放api data
// let imageData_QR = reactive({data:[]});
// let imageData_UIimage = reactive({data:[]});

//給子組件

let Dom3location;
onMounted(()=>{
    let racesDom = races.value;
    let raceWrapperDom = raceWrapper.value;
    let homePageDom =homePageWrapper.value;
    
    let wrapperDom = wrapper.value;
    let raceBoxDom_1=raceBox1.value;
    let raceBoxDom_2=raceBox2.value;
    let raceBoxDom_3=raceBox3.value;
    //gsap timeline宣告
    let homePageTL_1, homePageTL_snap1, homePageTL_snap2;
    // let racesWidth = racesDom.offsetWidth;
    // let amountToScroll = racesWidth - window.innerWidth;
    // console.log('racesDom',racesDom);
    // console.log('racesWidth',racesWidth);
    // console.log('amountToScroll',amountToScroll);

    // console.log(wrapperDom.offsetHeight, raceBoxDom_3.offsetHeight )
    // console.log(getScrollAmount());
    // console.log(getHomePageScrollDomAnout());

    function getScrollAmount() {
        let racesWidth = racesDom.scrollWidth;
        return -(racesWidth - window.innerWidth);
    }
    function getHomePageScrollDomAnout(){
        let racesWidth = racesDom.scrollWidth;
        let homePageDomHeight =wrapperDom.offsetHeight + raceBoxDom_3.offsetHeight + (racesWidth - window.innerWidth) + raceBoxDom_3.offsetHeight;

        return homePageDomHeight;
    }

    
   // 創建時間線
    
  function createTimelines() {
    // 清除舊的 timelines 和 ScrollTriggers
    // ScrollTrigger.getAll().forEach(trigger => trigger.kill()); //刪掉所有 ScrollTrigger 的 trigger（捲軸觸發器）
    ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.id === 'homePageTL_1') {
            // console.log("ScrollTrigger",trigger)
            trigger.kill();
        }
        if (trigger.vars.id === 'homePageTL_snap1') {
            // console.log("ScrollTrigger",trigger)
            trigger.kill();
        }
        if (trigger.vars.id === 'homePageTL_snap2') {
            // console.log("ScrollTrigger",trigger)
            trigger.kill();
        }
    });
    homePageTL_1?.kill(); //這段等於 if (homePageTL_1) {homePageTL_1.kill();} 刪掉創建的 gsap.timeline() 動畫本身
    homePageTL_snap1?.kill();
    homePageTL_snap2?.kill();

    // 建立 timeline 1  橫向卷軸 snap為吸附
    homePageTL_1 = gsap.timeline({
      scrollTrigger: {
        trigger: raceWrapperDom,
        start: "top top",
        end: `+=${getScrollAmount() * -1}`,
        pin: true,
        scrub: 1,
        snap: 1,
        id: "homePageTL_1",
      }
    });

    homePageTL_1.to(racesDom, {
      x: getScrollAmount(),
      duration: 3,
      ease: "none"
    });

    // timeline snap 1 第一段吸附 從wrapper到Box1的吸附
     homePageTL_snap1 = gsap.timeline({
      scrollTrigger: {
        trigger: homePageDom,
        start: "top top",
        end: `${wrapperDom.offsetHeight * 2} 100%`,
        scrub: 1,
        snap: 1,
        id: "homePageTL_snap1",
      }
    });

    // timeline snap 2 最後一段吸附 從Box2到Box3的吸附
     homePageTL_snap2 = gsap.timeline({
      scrollTrigger: {
        trigger: raceBoxDom_3,
        start: `${-raceBoxDom_2.offsetHeight} top`,
        end: `100% 100%`,
        scrub: 1,
        snap: 1,
        id: "homePageTL_snap2",
        // markers:true,
      }
    });

    // 最後手動 refresh
    ScrollTrigger.refresh();



    //Dom3location
    ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.id === 'homePageTL_snap2') {
            console.log("ScrollTrigger3",trigger.start)
            Dom3location = trigger.start;
        }
    });
    
  }

  createTimelines();

  // 每次 resize 時，重新建立 timeline
  const resizeHandler = () => {
    createTimelines();
  };

  window.addEventListener("resize", resizeHandler);

  onBeforeUnmount(() => {
    window.removeEventListener("resize", resizeHandler);
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  });
  

//原本...............................................................
    //橫向卷軸 snap為吸附
    //    let homePageTL_1 = gsap.timeline({
    //         scrollTrigger: {
    //             trigger: raceWrapperDom,
    //             start: "top top",
    //             end: `+=${getScrollAmount() * -1}`,
    //             pin: true,
    //             scrub: 1,
    //             snap:1,
    //             // markers: true,
    //         }
    //     });
    //第一段吸附 從wrapper到Box1的吸附
        // let homePageTL_snap1 = gsap.timeline({
        //     scrollTrigger: {
        //         trigger: homePageDom,
        //         start: "top top",
        //         end:  `${wrapperDom.offsetHeight*2} 100%`,
        //         // pin: true,
        //         scrub: 1,
        //         snap:1,
        //         // markers: true,
        //     }
        // });


    //最後一段吸附 從Box1到Box3的吸附
        // let homePageTL_snap2 = gsap.timeline({
        //     scrollTrigger: {
        //         trigger: raceBoxDom_3,
        //         start: `${-raceBoxDom_2.offsetHeight} top`,//從box3往上一個Box2的高
        //         end:  `100% 100%`,
        //         // pin: true,
        //         scrub: 1,
        //         snap:1,
        //         // markers: true,
        //     }
        // });

        // 在時間線上加入動畫
        // homePageTL_1.to(racesDom, {
        //     x: getScrollAmount(),
        //     duration: 3,
        //     ease: "none"
        // });


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
    // imageData_QR.data = ImageData.index.QRcode;
    // console.log(imageData_QR.data);
    // imageData_UIimage.data = ImageData.index.UI_image;
    // console.log(imageData_UIimage.data);

    // watch(() => imageData_UIimage.data, (newData) => {
    //     console.log("imageData_UIimage 已更新", newData);
    // });
    // watch(() => imageData_QR.data, (newData) => {
    //     console.log("imageData_UIimage 已更新", newData);
    // });

});


</script>

<template>

    <div ref="homePageWrapper" class="homePageWrapper">


        <div ref="wrapper" class="wrapper">
            <IndexLanding/>
            
        </div>

        <div ref="raceWrapper" class="raceWrapper">
            <div ref="races" class="race">
                <div ref="raceBox1" class="raceBox raceBox1">
                    <IndexRaceBox1/>

                </div>
                <div ref="raceBox2" class="raceBox raceBox2">
                    <IndexRaceBox2 :Dom3location = 'Dom3location' />
                </div>
            </div>
        </div>
        <div ref="raceBox3" class=" raceBox raceBox3">
            <IndexRaceBox3/>
        </div>
    </div>
</template>

<style scoped lang="scss"  >


.homePageWrapper{
    width: 100%;
    // height: 100dvh;
    overflow: hidden;
    .wrapper {
        height: 100dvh;
        width: 100%;
        background-color: $color-white;
        position: relative;
    
    }
    .raceBox{
        height: 100dvh;
        width: 100vw;
        
    }
    .raceWrapper{
        position: relative;
        height: 100dvh;

        .race{
            width: fit-content;
            height: 100dvh;
            position: relative;
            display:flex;
            flex-wrap:nowrap;
            background-color: $color-white;

            .raceBox1{

                width:100dvw;
                display: flex;
                justify-content: center;
                



            }
            .raceBox2{
                width:100dvw;
                display: flex;
                justify-content: center;
                

            }
        }
    }

    .raceBox3{

            height: 100dvh;
            position: relative;
            display:flex;
            justify-content: center;
            flex-wrap:nowrap;
            background-color: $color-white;
    }
}
   
</style>

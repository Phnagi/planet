<script setup>
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from '@/components/HelloWorld.vue';
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { onMounted, ref } from 'vue';
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)


let races = ref(null);
let raceWrapper = ref(null);
let homePageWrapper = ref(null);

let wrapper = ref(null);
let raceBox1 = ref(null);
let raceBox2 = ref(null);
let raceBox3 = ref(null);
onMounted(()=>{
    let racesDom = races.value;
    let raceWrapperDom = raceWrapper.value;
    let homePageDom =homePageWrapper.value;
    
    let wrapperDom = wrapper.value;
    let raceBoxDom_1=raceBox1.value;
    let raceBoxDom_2=raceBox2.value;
    let raceBoxDom_3=raceBox3.value;

    // let racesWidth = racesDom.offsetWidth;
    // let amountToScroll = racesWidth - window.innerWidth;
    // console.log('racesDom',racesDom);
    // console.log('racesWidth',racesWidth);
    // console.log('amountToScroll',amountToScroll);

    console.log(wrapperDom.offsetHeight, raceBoxDom_3.offsetHeight )
    console.log(getScrollAmount());
    console.log(getHomePageScrollDomAnout());

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
   //橫向卷軸 snap為吸附
   let homePageTL_1 = gsap.timeline({
        scrollTrigger: {
            trigger: raceWrapperDom,
            start: "top top",
            end: `+=${getScrollAmount() * -1}`,
            pin: true,
            scrub: 1,
            snap:1,
            // markers: true,
        }
    });
//第一段吸附 從wrapper到Box1的吸附
    let homePageTL_snap1 = gsap.timeline({
        scrollTrigger: {
            trigger: homePageDom,
            start: "top top",
            end:  `${wrapperDom.offsetHeight*2} 100%`,
            // pin: true,
            scrub: 1,
            snap:1,
            // markers: true,
        }
    });


//最後一段吸附 從Box1到Box3的吸附
    let homePageTL_snap2 = gsap.timeline({
        scrollTrigger: {
            trigger: raceBoxDom_3,
            start: `${-raceBoxDom_2.offsetHeight} top`,//從box3往上一個Box2的高
            end:  `100% 100%`,
            // pin: true,
            scrub: 1,
            snap:1,
            markers: true,
        }
    });

    // 在時間線上加入動畫
    homePageTL_1.to(racesDom, {
        x: getScrollAmount(),
        duration: 3,
        ease: "none"
    });

    // homePageTL_snap.to(homePageDom,{
    //     y: 100*3,
    //     duration: 3,
    //     ease: "none"
    // })

    // let homePagetween = gsap.to(racesDom,{
    //     x:getScrollAmount,
    //     duration:3,
    //     ease:"none",
    // })

    // ScrollTrigger.create({
    //     trigger:raceWrapperDom,
    //     start:"top top",
    //     end:`+=${getScrollAmount() * -1}`,
    //     pin:true,
    //     // pinSpacing: false,
    //     animation:homePagetween,
    //     scrub:1,
    //     markers:true
    // })

});


</script>

<template>

    <div ref="homePageWrapper" class="homePageWrapper">


        <div ref="wrapper" class="wrapper">
            <h1>this index</h1>
        </div>

        <div ref="raceWrapper" class="raceWrapper">
            <div ref="races" class="race">
                <div ref="raceBox1" class="raceBox raceBox1">
                    <h2>Box1</h2>
                </div>
                <div ref="raceBox2" class="raceBox raceBox2">
                    <h2>Box2</h2>
                </div>
            </div>
        </div>
        <div ref="raceBox3" class=" raceBox raceBox3">
            <h2>Box3</h2>
        </div>
    </div>
</template>

<style scoped lang="scss"  >
.homePageWrapper{
    .wrapper {
        height: 100dvh;
        width: 100%;
        background-color: rgb(212, 212, 255);
        position: relative;
        
        h1{
            font-size: 100px;
            color: black;
        }
    
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
            background-color: antiquewhite;
            .raceBox1{


            }
            .raceBox2{


            }
        }
    }

    .raceBox3{


    }
}
   
</style>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
//components
import hamberger from '@/components/icons/hamberger.vue';
import close from '@/components/icons/close.vue';
import DynamicIcon from '@/components/icons/DynamicIcon.vue';

//
    // 定義一個響應式變數來存儲視窗寬度
const windowWidth = ref(window.innerWidth);
let RWDHandle_Web = ref(false);
let MobileHandle_Nav = ref(false);
let MobileHandle_animation =ref(true);

let changeHamberger = ref("hamberger");
let hambergerH = ref(32);
let hambergerW = ref(29);
let closeH = ref(32);
let closeW = ref(32);

//選取DOM
let navHamberger =ref(null);
// 定義 resize 事件處理函數
const updateWindowWidth = () => {
    // console.log(RWDHandle_Web.value)
  windowWidth.value = window.innerWidth;
    if(windowWidth.value >= 1024){
        RWDHandle_Web.value=true;
        changeHamberger.value = "hamberger";
        MobileHandle_Nav.value = false;
    }else{
        RWDHandle_Web.value=false;
        
        MobileHandle_animation.value = true;
    }

};
let reset_NavMobilePage = ()=>{
    // console.log("reset_NavMobilePage")
    // RWDHandle_Web.value=false;
    changeHamberger.value = "hamberger";
    MobileHandle_animation.value = true;
    MobileHandle_Nav.value = false;
};

let MobileHandle_NavFC =()=>{
    
    MobileHandle_Nav.value = !MobileHandle_Nav.value;
    // console.log(MobileHandle_Nav.value);
    if (MobileHandle_Nav.value ==true){
        MobileHandle_animation.value = false;

        setTimeout(()=>{
            changeHamberger.value = "close";
            MobileHandle_animation.value = true;
        },500)

        // console.log(changeHamberger.value,1)
    }else{
        MobileHandle_animation.value = false;
        setTimeout(()=>{
            changeHamberger.value = "hamberger";
            MobileHandle_animation.value = true;
        },500)
        // console.log(changeHamberger.value,2);

    }
}
onMounted(() => {
    updateWindowWidth(); 
  // 當組件掛載後，監聽 resize 事件
  window.addEventListener('resize', updateWindowWidth);

  
});

onBeforeUnmount(() => {
  // 當組件卸載前，移除 resize 事件監聽
  window.removeEventListener('resize', updateWindowWidth);
});


</script>
<template>
  <nav>
    <div v-if="RWDHandle_Web" class="navWeb">
        <div class="navLogo">
            <RouterLink to="/">
                <img src="@/assets/images/index/logo.png" alt="">
            </RouterLink>

        </div>
        <ul class="navOption">
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
    <div v-if="!RWDHandle_Web" class="navMoble">
        <div class="navLogo">
            <RouterLink to="/" @click="reset_NavMobilePage()">
                <img src="@/assets/images/index/logo.png" alt="">
            </RouterLink>

        </div>
        <div @click="MobileHandle_NavFC" ref="navHamberger" :class="['navHamberger',{navChangeAnimation:MobileHandle_animation}]">
            <!-- <hamberger v-show="!MobileHandle_Nav" :sizeWidth="hambergerH"  :sizeHeight="hambergerW" />
            <close  v-show="MobileHandle_Nav" :sizeWidth="closeH"  :sizeHeight="closeW"/> -->
            <DynamicIcon :name="changeHamberger"/>
        </div>
    </div>
    <div  :class="['mobileNavPage',{mobileNavPageAct:MobileHandle_Nav}]">
        <div class="navPageMainIconBox">
            <div class="navPageMainIcon">
                <DynamicIcon :name="'arrow_down'"/>
            </div>
        </div>

        <ul class="navOption_List_mobile">
            <li class="navOption_mobile" >
                <div class="iconbox">
                    <DynamicIcon :name="'home'"/>
                </div>
                <RouterLink to="/" @click="reset_NavMobilePage()">首頁</RouterLink>
            </li>
            <li class="navOption_mobile">
                <div class="iconbox">
                    <DynamicIcon :name="'train'"/>
                </div>
                <RouterLink to="/about" @click="reset_NavMobilePage()">作品介紹</RouterLink>
            </li>
            <li class="navOption_mobile">
                <div class="iconbox">
                    <DynamicIcon :name="'text'"/>
                </div>
                <RouterLink to="/vi" @click="reset_NavMobilePage()">視覺設計</RouterLink>
            </li>
            
        </ul>
    </div>
  </nav>

</template>



<style scoped lang="scss"  >
// @use '@/assets/global.scss';

    nav{
        position:fixed;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100dvw;
        box-sizing: border-box;
        background:$color-white;
        
        z-index: 2;

        .navWeb{
            width: 100%;
            max-width:1280px;
            height: 60px;
            display: flex;
            padding: 0px 80px 0px 80px ;
            justify-content: space-between;
            align-items: center;
            // background: rgb(203, 43, 43);

            .navLogo{
                width: 40px;

                position: relative;
                a{
                    width: 100%;
                    img{
                    width: 100%;

                    }
                }

            }
            .navOption{
                width: 368px;
                height: 90%;


                display: flex;
                justify-content: space-between;
                align-items: center;
                list-style: none;
                li{
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        height: 100%;
                        width: 20%;
                    a{
                        font-family: $font-family-TW;
                        font-size: $web-FS-nev_C;
                        line-height: $web-LH-nev_C;
                        letter-spacing: $web-LP-nev_C;
                        font-weight: $web-FW-nev_C;
                        list-style: none;
                        text-decoration: none;
                        color: $color-text;
                        transition: 0.4s ease-in-out;
                        //flex
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                        width: 100%;
                        height: 100%;
                        // background-color: aqua;
                        &:hover{

                            color: $color-green;
                        }
                        &.homeBtn{
                            justify-content: flex-start;
                        }
                        &.aboutBtn{
                            justify-content: center;
                        }
                        &.viBtn{
                            justify-content: flex-end;
                        }


                    }

                    a.router-link-active{
                            color: $color-green;
                    }
                }

            }
        }


        .navMoble{
            position: relative;
            width: 100%;
          
            height: 60px;

            display: flex;
            padding: 0px 80px 0px 80px ;
            justify-content: space-between;
            align-items: center;
            background-color: $color-white;
            transition: 0.2s ease-in-out;
            z-index: 3;
            @media (max-width: 767px){
                padding: 0px 40px 0px 40px ;
            }
            .navLogo{
                width: 36px;

                position: relative;
                @media (max-width: 767px){
                    width: 30px;
                }
                a{
                    width: 100%;
                    img{
                    width: 100%;

                    }
                }
                
            }
            .navHamberger{
                width: 30px;

                display: flex;
                justify-content: center;
                align-items: center;
                // background-color: antiquewhite;
                opacity: 0;
                cursor: pointer;
                transition: 0.5s ease-in-out;
                @media (max-width: 767px){
                    width: 26px;                
          
                }
                &.navChangeAnimation{
                    opacity: 1;
                }
            }
        }

        .mobileNavPage{
            opacity: 1;
            position: absolute;
            top: 60px;
            left: 0;
            width: 100%;
            height: calc(100dvh - 60px);
            background-color: $color-white;
            //flex
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: flex-start;
            //animation
            transform: translateY(-100dvh);
            transform-origin: top;
            transition:0.8s cubic-bezier(.13,.68,.36,.99);
            z-index: 2;
            &.mobileNavPageAct{
                transform: translateY(0dvh);
            }
            .navPageMainIconBox{
                height: 50%;
                margin-top: 40px;
                padding: 0px 80px 0px 80px ;
                // background-color: antiquewhite;


                @media (max-width: 767px){
                padding: 0px 40px 0px 40px ;
                }

                .navPageMainIcon{
                    width: 200px;
                    margin-left: -38px;
                    // background-color: rgb(179, 120, 43);
                }
            }

            ul{
                width: 100%;
                height: 30%;
                padding: 0px 80px 0px 80px ;
                display: flex;
                flex-direction: column;

                list-style-type: none;

                @media (max-width: 767px){
                padding: 0px 40px 0px 40px ;
                }

                li{
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    
                    .iconbox{
                        width: 30px;
                       
                    }
                    a{
                        font-family: $font-family-TW;
                        font-size: $ipad-FS-nev_C;
                        line-height: $ipad-LH-nev_C;
                        letter-spacing: $ipad-LP-nev_C;
                        font-weight: $ipad-FW-nev_C;
                        list-style: none;
                        text-decoration: none;
                        color: $color-text;
                        
                        width: 100%;
                    
                        padding: 0px;
                        margin: 0px 0px 4.5px 20px;
                        @media (max-width: 767px){
                            font-size: $phone-FS-nev_C;
                            line-height: $phone-LH-nev_C;
                            letter-spacing: $phone-LP-nev_C;
                            font-weight: $phone-FW-nev_C;
                        }

                    }
                }

            }
        }


    }

</style>
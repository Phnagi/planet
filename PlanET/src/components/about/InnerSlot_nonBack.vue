<script setup>
import { RouterLink, RouterView } from 'vue-router';
import DynamicIcon from '@/components/icons/DynamicIcon.vue';
import DynamicFunctionalMap from '@/components/icons/DynamicFunctionalMap.vue';
import { onMounted, reactive, ref, watch ,defineProps  } from 'vue';
import AboutSelectIconData from '@/assets/json/about/index.json';
import ImageData from '@/assets/image.json';

// 定義接收的 items 屬性，這些資料來自父組件
const props = defineProps({
//   items: {
//     type: Array,
//     required: true
//   },
  background:{
    type:Boolean,
    required: true
  },
  horizontal:{
    type:Boolean,
    required: true
  }
});
// console.log("props.items",props.items[0])
</script>

<template>
    <div class="innerNonBack_slot">
        <div class="functionalMapArea">
            <div :class="['functionalMapBox',{horizontal:props.horizontal}]">
            
                <slot name="functionalMap"></slot>
            </div>
           
        </div>
        <div class="Content">
            <div class="titleBox">
                <slot name="h3_tw"></slot>
                <slot name="h3_en"></slot>


            </div>
            <div class="smallTitle">
                <slot name="h4_tw"></slot>
                <slot name="h4_en"></slot>
            </div>
            <div class="text">
                <slot name="p"></slot>
            </div>
        </div>
        <div :class="['imageBoxArea',{backgroundcolor:props.background}]">
            <div class="imageBox">
                <slot name="img1"></slot>
            </div>
            <div class="imageBox">
                <slot name="img2"></slot>
            </div>
        </div>


    </div>

</template>

<style scoped lang="scss"  >
    .innerNonBack_slot{
        width: 100%;
        max-width: 1280px;
        height: 100dvh;
        padding: 100px 80px 60px 80px;
        position: relative;
        // background: cadetblue;
        //flex
        display: flex;
        // flex-direction: column;
        justify-content: space-between;
        align-items: center;

        @media(min-width: 767px) and (max-width: 1024px){
            padding: 100px 80px 60px 80px;
            flex-direction: column;
            gap: 20px;
            @media(max-width: 900px){
                flex-direction: column;
                padding: 0px 80px 60px 80px;
            }
          
        }
            @media (max-width: 767px){
            padding: 100px 40px 60px 40px;
            flex-direction: column; 
            gap: 0px;  
        }
        .functionalMapArea{
            position: absolute;   
            padding: 100px 80px 40px 80px; 
            // width: 200px;
            // height: 200px;        
            top: 0px;
            left: 0px;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            @media(min-width: 767px) and (max-width: 1024px){
                padding: 60px 0px 0px 0px; 
                position: relative; 
                height: 20%;    
                width: 100%;
                @media(max-width: 900px){
                    position: absolute; 
                    display: none;
                }
            }
                @media (max-width: 767px){
                padding: 0px 0px 0px 0px; 
                position: relative; 
                height: 20%;   
                width: 100%; 
            }
                .functionalMapBox{
                // width: 200px;
                height: 300px; 
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
                @media(min-width: 767px) and (max-width: 1024px){

                }
                @media (max-width: 767px){
                    height: 250px; 
                }
                &.horizontal{
                    width: 300px;
                    @media(min-width: 767px) and (max-width: 1024px){

                    }
                    @media (max-width: 767px){
                        width: 250px; 
                    }
                }

            }
        }

        .Content{
            
            width: 350px;
            height: 100%;

            //flex
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: flex-start;
            gap: 50px;
            
            @media(min-width: 767px) and (max-width: 1024px){
                width: 100%;
                height: 40%;
                //flex
                justify-content: center;
                align-items: flex-start;
                order: 2;
                gap: 20px;
                
            }
            @media (max-width: 767px){
                width: 100%;
                height: 40%;
                //flex
                justify-content: center;
                align-items: flex-start;
                order: 2;
                gap: 10px;
            }

            .titleBox{
                h3.tw{
                     color: $color-text;
                }
                h3.en{
                    color: $color-text;
                }
            }
            .smallTitle{
                h4.tw{
                    color: $color-text;
                }
                h4.en{
                    color: $color-text;
                }
            }
            .text{
                p{
                    color: $color-text;
                }
                @media(min-width: 767px) and (max-width: 1024px){
                    width: 60%;

                }
                @media (max-width: 767px){
                    width: 100%;


                }
            }
        }
        .imageBoxArea{
            width: 600px;
            height: 100%;
            // background-color: $color_gray_2;
            display: flex;
            justify-content: center;
            align-items: center;
            @media(min-width: 767px) and (max-width: 1024px){
                width: 100%;
                order: 1;
            }
            @media (max-width: 767px){
                width: 100%;
                order: 1;
            }
            .imageBox{
                    // width: 300px;
                    position: relative;
                img{
                    width: 100%;
                }
                &:nth-child(1){
                    // left: 20px;
                }
                &:nth-child(2){
                    // right: 20px;
                }
            }
            &.backgroundcolor{
                background-color: $color_gray_2;
                @media(min-width: 767px) and (max-width: 1024px){
                    background-color: $color_white;
                }
                @media (max-width: 767px){
                   background-color: $color_white;


                }
            }
        }


    }
</style>

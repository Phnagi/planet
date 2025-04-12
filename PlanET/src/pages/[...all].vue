<!-- src/pages/[...all].vue -->
<script setup>
import { RouterLink, RouterView } from 'vue-router';
import DynamicIcon from '@/components/icons/DynamicIcon.vue';
import DynamicFunctionalMap from '@/components/icons/DynamicFunctionalMap.vue';
import Dynamic_VI from '@/components/icons/Dynamic_VI.vue';
import { onMounted, reactive, ref, watch } from 'vue';
import AboutSelectIconData from '@/assets/json/about/index.json';
import ImageData from '@/assets/image.json';

let iconArea = ref(null);
let isHover = ref(false)
onMounted(()=>{

    
   
});


</script>

<template>
    <div class="notFoundBox">
        <div class="not-found">
            <!-- <h1>404</h1>
            <p>喔喔，這個頁面不存在</p>
            <router-link to="/">回首頁</router-link> -->
            <div class="iconArea" ref="iconArea" >
                <div :class="['IconBox wrongIcon', {opacityHandle:!isHover}]">
                    <DynamicIcon name="walk_wrong"/>
                </div>
                <div :class="['IconBox okIcon',{opacityHandle:isHover}]">
                    <DynamicIcon name="walk"/>
                </div>
            </div>

            <router-link to="/" class="textArea" @mouseenter="isHover = true" @mouseleave="isHover = false">
                <h2 class="tw">這個頁面不存在</h2>
                <router-link to="/">"點擊並返回首頁"</router-link> 
            </router-link>
        </div>
    </div>

  </template>
  
  <style scoped lang="scss">
  .notFoundBox{
    width: 100dvw;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $color-white;
    .not-found {
        width: 100%;
        padding: 100px 80px 40px 80px;
        height: 100dvh;
        max-width: 1280px;
        overflow: hidden;
        // height:auto;
        
        display: flex;
        flex-direction: column;
        position: relative;
        justify-content: center;
        align-items: center;
        gap: 40px;
        @media(min-width: 767px) and (max-width: 1024px){
            height: 100dvh;
            gap: 2dvh;
        }
        @media (max-width: 767px){
            height: 100dvh;
            padding: 0px 40px 40px 40px;
            gap: 1dvh;
        }
        .iconArea{
            width: 300px;
            height: 300px;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            @media(min-width: 767px) and (max-width: 1024px){
                width: 35dvw;
                height: 35dvw;
            }
            @media (max-width: 767px){
                width: 30dvh;
                height: 30dvh;
                left: 1px;
            }
            // background: cadetblue;
            .IconBox{
                position: absolute;
                // top: 0px;
                // left: 0px;
                width: 300px;
                display: flex;
                justify-content: center;
                align-items: center;
                @media(min-width: 767px) and (max-width: 1024px){
                    width: 35dvw;
                    height: 35dvw;
                    // left: -25px;
                    // background-color: aliceblue;
                    overflow: hidden;
                }
                @media (max-width: 767px){
                    width: 30dvh;
                    height: 30dvh;
                  
                    overflow: hidden;
                }
                &.okIcon{
                    opacity: 0;
                    transition: 0.2s ease-in-out;

                }
                &.wrongIcon{
                    opacity: 0;
                    transition: 0.2s ease-in-out;
                    
                }
                &.opacityHandle{
                    opacity: 1;
                    transition: 0.2s ease-in-out;
                }
            }


            
        }

        .textArea{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-decoration: none;
            
            &:hover h2{
                    color: $color-green;
            }
            &:hover a{
                    color: $color-green;
            }
            h2{
                color: $color-wrong;
                transition: 0.2s ease-in-out;
            }
            a{
                text-decoration: none;
                color: $color-wrong;
                transition: 0.2s ease-in-out;

            }

        }
  }
  }

  </style>
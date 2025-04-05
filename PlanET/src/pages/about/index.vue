<script setup>
import { RouterLink, RouterView } from 'vue-router';
import DynamicIcon from '../../components/icons/DynamicIcon.vue';

</script>

<template>
    <div class="wrapper">
        <div class="titleBox">
            <h1 class="tw">作品介紹</h1>
            <h2 class="en">introduce</h2>
        </div>
        <ul class="aboutInner_selectBox">
            <RouterLink to="/about">
                <div class="aboutSelectIconBox">
                    <div class="aboutSelectIcon">
                        <DynamicIcon name="walk2"/>
                    </div>

                </div>
                <div class="aboutSelect_btnBox">
                    <h3 class="tw">碳足跡</h3>
                    <div class="aboutSelect_iconBox">
                        <div class="icon">
                            <DynamicIcon name="walk2"/>
                        </div>
                    </div>
                </div>
            </RouterLink>
            <RouterLink to="/about">
                <div class="aboutSelectIconBox">
                    <div class="aboutSelectIcon">
                        <DynamicIcon name="walk2"/>
                    </div>

                </div>
                <div class="aboutSelect_btnBox">
                    <h3 class="tw">碳足跡</h3>
                    <div class="aboutSelect_iconBox">
                        <div class="icon">
                            <DynamicIcon name="walk2"/>
                        </div>
                    </div>
                </div>
            </RouterLink>
            <!-- <RouterLink to="/about/about2">about-about2</RouterLink> -->
        </ul>

    </div>

</template>

<style scoped lang="scss"  >
    .wrapper {
        height: 100dvh;
        width: 100%;
        max-width: 1280px;
        background-color:$color-white;
        padding: 60px 80px 40px 80px;
        position: relative;
        .titleBox{
            width: 100%;
            height: 100dvh;
            //flex
            display: flex;
            flex-direction: column;
            position: absolute;
            h1{
                position: relative;
            }
            h2{
                position: relative;
                top: -20px;
                left: 5px;
            }
        }
        .aboutInner_selectBox{
            position: relative;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: flex-start;
            list-style: none;
            gap: 20px;
            a{
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: flex-start;

                text-decoration: none;
                gap: 20px;
                .aboutSelectIconBox{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .aboutSelectIcon{
                        width: 37px;
                    }
                }

                .aboutSelect_btnBox{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: flex-start;
                    position: relative;
                    top: -8px;
                    h3{
                        color: $color-green;
                    }
                    .aboutSelect_iconBox{
                        width: 16px;
                        .icon{
                            width: 16px;
                        }
                    }
                }
            }
        }
 
    
    }

</style>

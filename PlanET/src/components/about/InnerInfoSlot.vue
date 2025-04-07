<script setup>
import { RouterLink, RouterView } from 'vue-router';
import DynamicIcon from '@/components/icons/DynamicIcon.vue';
import { onMounted, reactive, ref, watch ,defineProps  } from 'vue';
import AboutSelectIconData from '@/assets/json/about/index.json';
import ImageData from '@/assets/image.json';
// 定義接收的 items 屬性，這些資料來自父組件
const props = defineProps({
  items: {
    type: Array,
    required: true
  }
});
console.log("props.items",props.items[0])
</script>

<template>
    <div class="innerinfo_slot">
      
            <div class="innerinfo_imageBox">
                <div class="imgBox">
                    <!-- <img src="@/assets/images/about/footprint/index/footprint.png" alt=""> -->
                    <slot name="img1"></slot>
                </div>
                <div class="imgBox">
                    <!-- <img src="@/assets/images/about/footprint/index/buy.png" alt=""> -->
                    <slot name="img2"></slot>
                </div>
            </div>
            <div class="innerContent_box">
                <div class="innerContent_textBox">
                    <div class="titleBox">
                        <!-- <h2 class="tw">碳足跡計算</h2> -->
                        <!-- <h2 class="en">carbon footprint</h2> -->
                        <slot name="h2_tw"></slot>
                        <slot name="h2_en"></slot>
                    </div>
                    <div class="content">
                        <slot name="content"></slot>
                        
                    </div>
                </div>
                <div class="innerContent_IconBox">
                    
                    
                        <!-- 渲染父組件傳入的 icon_item 資料 -->
                        <div class="icon_item" v-for="(item, index) in props.items" :key="index">
                            <div class="iconBox">
                                <!-- 使用 DynamicIcon 元件來渲染動態圖示 -->
                                <DynamicIcon :name="item.iconName" />
                            </div>
                            <h4 class="iconText tw">{{ item.text }}</h4>
                        </div>
                    
                        <!-- <div class="icon_item">
                            <div class="iconBox">
                                <DynamicIcon name="buy"/>
                            </div>
                            <div class="iconText">消費碳足跡</div>
                        </div> -->
                </div>
            </div>
   
        <!-- <slot>
            <div class="innerinfo_imageBox">
                <div class="imgBox">
                    <img src="@/assets/images/about/footprint/index/footprint.png" alt="">
                </div>
                <div class="imgBox">
                    <img src="@/assets/images/about/footprint/index/buy.png" alt="">
                </div>
            </div>
            <div class="innerContent_box">
                <div class="innerContent_textBox">
                    <div class="titleBox">
                        <h2 class="tw">碳足跡計算</h2>
                        <h2 class="en">carbon footprint</h2>
                    </div>
                    <div class="content">
                        <p class="tw">APP的原型設計，採用簡約指示的設計風格，希望能像指示設計一樣，引導使用者並慢慢的改變使用者的生活方式，讓環保意識提高。</p>
                    </div>
                </div>
                <div class="innerContent_IconBox">
                    

                        <div class="icon_item">
                            <div class="iconBox">
                                <DynamicIcon name="buy"/>
                            </div>
                            <div class="iconText">消費碳足跡</div>
                        </div>
                        
                        <div class="icon_item">
                            <div class="iconBox">
                                <DynamicIcon name="buy"/>
                            </div>
                            <div class="iconText">消費碳足跡</div>
                        </div>
                        
                        <div class="icon_item">
                            <div class="iconBox">
                                <DynamicIcon name="buy"/>
                            </div>
                            <div class="iconText">消費碳足跡</div>
                        </div>
                        
                        <div class="icon_item">
                            <div class="iconBox">
                                <DynamicIcon name="buy"/>
                            </div>
                            <div class="iconText">消費碳足跡</div>
                        </div>
                        <div class="icon_item">
                            <div class="iconBox">
                                <DynamicIcon name="buy"/>
                            </div>
                            <div class="iconText">消費碳足跡</div>
                        </div>
                </div>
            </div>
        </slot> -->
    </div>

</template>

<style scoped lang="scss"  >
    .innerinfo_slot{
        width: 100%;
        height: 100dvh;
        padding: 100px 80px 40px 80px;

        //flex
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        @media(min-width: 767px) and (max-width: 1024px){
            padding: 100px 80px 40px 80px;
        }
            @media (max-width: 767px){
            padding: 100px 40px 40px 40px;
                
        }
        .innerinfo_imageBox{
            background: $color-gray_2;
            width: 75%;
            
            display: flex;
            justify-content: center;
            align-items: center;
            
            @media(min-width: 767px) and (max-width: 1024px){
                width: 100%;
                height: 50dvh;
            }
            @media (max-width: 767px){
                width: 100%;
                
            }
            .imgBox{
                width: 350px;
                position: relative;
                @media(min-width: 767px) and (max-width: 1024px){
                    width: 30dvh;
                }
                @media (max-width: 767px){
                    width: 30dvh; 
                }
                img{
                    width: 100%;

                }
                &:nth-child(1){
                    left:0px;
                    @media(min-width: 767px) and (max-width: 1024px){
                        left:3dvw;
                    }
                    @media (max-width: 767px){
                        left:3dvw;
                    }
                }
                &:nth-child(2){
                    right:0px;
                    @media(min-width: 767px) and (max-width: 1024px){
                        right:3dvw;
                    }
                    @media (max-width: 767px){
                        right:3dvw;
                    }
                }
            }
        }
        .innerContent_box{
            width: 75%;
            height: 35%;
            // background: rebeccapurple;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            @media(min-width: 767px) and (max-width: 1024px){
                width: 100%;
                flex-direction: column;
                justify-content: center;
                height: auto;
            }
            @media (max-width: 767px){
                width: 100%;
                flex-direction: column;
                justify-content: center;
                height: auto;
            }
            .innerContent_textBox{
                width: 50%;
                padding:15px 0px 15px 0px;
                @media(min-width: 767px) and (max-width: 1024px){
                    width: 100%;
                    padding:10px 0px 15px 0px;
                    height: auto;
                }
                @media (max-width: 767px){
                    width: 100%;
                    padding:10px 0px 15px 0px;
                }
                .titleBox{
                    position: relative;
                    h2.tw{
                        color: $color-green;
                    }
                    h2.en{
                        position: relative;
                        bottom: 10px;
                        color: $color-green;
                    }
                }
                .content{

                    p{

                    }

                }
            }
            .innerContent_IconBox{
                width: 330px;
                height: 100%;
                padding:15px 0px 15px 0px;
                //grid;
                display: grid;
                grid-template-rows: repeat(3, 1fr); /* 每欄最多3個（共3列） */
                grid-auto-flow: column;             /* 先塞滿一整列，再往右塞下一欄 */
                // direction: rtl;   
                gap: 0px 30px;                 /* 元素之間的間距 */
                @media(min-width: 767px) and (max-width: 1024px){
                    height: auto;
                    grid-template-rows: repeat(2, 1fr);
                    width: 100%;
                    gap: 10px 40px;   
                    justify-content: flex-start;
                    align-items: flex-start;
                    direction: ltr;
                    padding:0px 0px 15px 0px;
                    // background-color: rebeccapurple;
                }
                @media (max-width: 767px){
                    grid-template-rows: repeat(3, 1fr);
                    width: 100%;
                    gap: 10px 20px;  
                    justify-content: flex-start;
                    align-items: flex-start;
                    direction: ltr;
                    padding:0px 0px 15px 0px;
                    
                }
                .icon_item{
                    // background: cadetblue;
                    // width: 130px;
                    
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    gap: 20px;
                    .iconText{
                        
                     
                    }
                    .iconBox{
                            width: 24px;
                    }
                }
            }
        }
    }
</style>

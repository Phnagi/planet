<script setup>
import { RouterLink, RouterView } from 'vue-router';
import DynamicIcon from '@/components/icons/DynamicIcon.vue';
import { onMounted, reactive, ref, watch } from 'vue';
import AboutSelectIconData from '@/assets/json/about/index.json';
import ImageData from '@/assets/image.json';
//左邊每項小icon資料

let aboutSelectMainIcon_data = reactive([]);
    
//內容data
 let contentData_aboutIndex =reactive({});
 let usecontentData_aboutIndex = reactive({});
 let usecontentData_aboutIndex_image = reactive([]);

// 儲存目前 hover 到哪一個項目的 index
let hoverIndex = ref(null);

const aboutSelectClick = (index) => {
    hoverIndex.value = null;
    hoverIndex.value = index;
    //處理照片內容 用來判斷點到哪一個並且塞入正在show出來的資訊給usecontentData
    // console.log(aboutSelectMainIcon_data[index].name);
    let nowUse_name = aboutSelectMainIcon_data[index].name;
    // console.log(contentData_aboutIndex[nowUse_name][0])
    if (contentData_aboutIndex[nowUse_name]) {
        // 直接修改 usecontentData_aboutIndex 的內容
        Object.assign(usecontentData_aboutIndex, contentData_aboutIndex[nowUse_name][0]);
        // Object.assign(usecontentData_aboutIndex_image, contentData_aboutIndex[nowUse_name]);
        usecontentData_aboutIndex_image = contentData_aboutIndex[nowUse_name];
    } else {
        // 如果沒有資料，設為空陣列
        Object.assign(usecontentData_aboutIndex, []);
        Object.assign(usecontentData_aboutIndex_image, []);
    }
    // console.log('contentData_aboutIndex', usecontentData_aboutIndex_image[0].src);
}

const aboutSelectLeave = () => {
  hoverIndex.value = null;
}
aboutSelectMainIcon_data = AboutSelectIconData;
// 使用 Vite 的 glob 匯入圖片（會轉成 { [路徑]: 圖片URL }）
const images = import.meta.glob(
    '@/assets/images/about/**/**/**.png', 
    { 
        eager: true, 
        import: 'default' 
});

function resolveImagePaths(contentData) {
  const resolvedData = {};

  for (const key in contentData) {
    const group = contentData[key];
    // console.log(images);
    // 看是否有 "index" 層級
    if (group.index) {
      resolvedData[key] = group.index.map((item) => {
        // console.log("item",item)
        const matched = Object.keys(images).find((path) =>
          path.includes(item.src)
        );
        // console.log(matched)
        // console.log(item.src)
        // console.log(images[matched])
        return {
          ...item,
          src: matched ? images[matched] : '', // 沒找到就空字串
        };
      });
    }
  }

  return resolvedData;
}

onMounted(() => {
//左邊主要icon選項資料
    // aboutSelectMainIcon_data = AboutSelectIconData;
    // console.log(aboutSelectMainIcon_data);
      // 預設選取第一個 index
    if (aboutSelectMainIcon_data.length > 0) {
        hoverIndex.value = 0;
    }
    watch(() => aboutSelectMainIcon_data, (newData) => {
            // console.log("aboutSelectMainIcon_data 已更新", newData);
        });
        watch(() => usecontentData_aboutIndex, (newData) => {
            // console.log("aboutSelectMainIcon_data 已更新", newData);
        });
   
    //右邊照片資料
         //處理照片
            // 把 JSON 中的 src 欄位轉換成實際圖片路徑
                //old
                // contentData_aboutIndex = ImageData.about;
                // Object.keys(contentData_aboutIndex).forEach((item)=>{
                //     let innearObjc = contentData_aboutIndex[item];

                //     Object.keys(innearObjc).forEach((itm)=>{
                //         if(itm == "index"){
                //             console.log(item)
                //             console.log(innearObjc[itm])
                //             contentData_aboutIndex[item] = innearObjc[itm]
                //         }
                //     })
                // })
            //new

   
           
            const resolved = resolveImagePaths(ImageData.about);
            // console.log(contentData_aboutIndex)
            Object.assign(contentData_aboutIndex, resolved);
            
            Object.assign(usecontentData_aboutIndex, contentData_aboutIndex["footprint"][0]);//初始化
            usecontentData_aboutIndex_image = contentData_aboutIndex["footprint"];
            // console.log("usecontentData_aboutIndex begin",usecontentData_aboutIndex.title_tw)
            // console.log('Resolved contentData_aboutIndex:', contentData_aboutIndex.footprint[0].title_tw);
    // console.log(aboutSlectMainIcon_act);
    // console.log(aboutSlectMainIcon_unact)
    // console.log(aboutSelectMainIcon_data)
});
</script>

<template>
    <div class="wrapper">
        <div class="titleBox">
            <h1 class="tw">作品介紹</h1>
            <h2 class="en">introduce</h2>
        </div>
        <ul class="aboutInner_selectBox"  >
            <RouterLink to="/about" @click="aboutSelectClick(index)" v-for="(item, index) in aboutSelectMainIcon_data" :key="item.name">
                <div class="aboutSelectIconBox">
                    <div class="aboutSelectIcon">
                        <transition name="fade" class="transitionIcon_aboutIndex">
                            <DynamicIcon v-show="hoverIndex === index" :name="item.act_name" class="aboutSelectIcon_main_act" />
                        </transition>

                        <DynamicIcon v-show="hoverIndex !== index"  :name="item.unAct_name" class="aboutSelectIcon_main_unact"/>


                    </div>

                </div>
                <div class="selectionRightBox">
                    <div class="aboutSelect_right">

                        <h4 :class="['tw',{active:(hoverIndex === index)}]">{{item.title}}</h4>

                        <div class="aboutSelect_iconBox">
                            <div class="icon" v-for="(icon , idx) in item.smallIcon" :key="icon.act_name">
                                <transition name="fade" class="transitionIcon_aboutIndex">
                                    <DynamicIcon v-show="hoverIndex === index" :name="icon.act_name"/>
                                </transition>
                                <DynamicIcon v-show="hoverIndex !== index" :name="icon.unAct_name"/>
                            </div>

                        </div>


                    </div>
                    <div class="arrowIconBox">
                        <transition name="fade" class="transitionIcon_aboutIndex">
                            <DynamicIcon v-show="hoverIndex !== index"  name="arrow_right"/>
                        </transition>
                    </div>
                </div>

            </RouterLink>

            <!-- <RouterLink to="/about/about2">about-about2</RouterLink> -->
        </ul>

        <div class="AbooutIndex_contentsBox">
            <div class="contentTextBox">
                <div class="contentText_titleBox">
                    <h2   class="tw">{{usecontentData_aboutIndex.title_tw}}</h2>  
                    <!-- <h2 v-if="usecontentData_aboutIndex?.title_tw" class="tw">{{"contentData_aboutIndex.footprint[0].title_tw"}}</h2> -->
                    <h2 class="en">{{usecontentData_aboutIndex.title_en}}</h2>
                </div>
                <RouterLink :to="usecontentData_aboutIndex.path" class="contentText_text">
                    <p class="tw">
                        {{usecontentData_aboutIndex.text_tw}}
                    </p>
                    <p class="en">more</p>
                </RouterLink>
            </div>
            <div class="phoneImageBox" >
                <img v-for="(item , idx) in usecontentData_aboutIndex_image"  :key="item.name" 
                    v-if="usecontentData_aboutIndex_image.length" 
                    :src="item.src" alt="">
                <!-- <img v-if="contentData_aboutIndex.footprint?.[1]?.src" :src="contentData_aboutIndex.footprint[1].src" alt=""> -->
            </div>
        </div>

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
        //flex
        display: flex;
        justify-content: space-between;
        @media(min-width: 767px) and (max-width: 1024px){
                flex-direction: column;
                align-items: center;
                justify-content:center;
                padding: 60px 80px 40px 80px;
            }
        @media (max-width: 767px){
                flex-direction: column;
                align-items: center;
                justify-content:center;
                padding: 60px 40px 40px 40px;
                // gap: 20px;
        }
        .titleBox{
            width: 100%;
            height: 100dvh;
            //flex
            display: flex;
            flex-direction: column;
            position: absolute;
            // top: 0px;
            // left: 0px;
            @media(min-width: 767px) and (max-width: 1024px){
                height: auto;
                
                
                position: relative;
                justify-content: center;
                align-items: center;
                order: 1;
                display: none;
            }
            @media (max-width: 767px){
                height: auto;
                position: relative;
                justify-content: center;
                align-items: center;
                display: none;
            }
            h1{
                position: relative;
                color: $color-green;
            }
            h2{
                position: relative;
                top: -20px;
                left: 5px;
                color: $color-green;
                @media(min-width: 767px) and (max-width: 1024px){
                    top: -10px;
                    left: 0px;
                }
                @media (max-width: 767px){
                    top: -20px;
                    left: 0px;
                }
            }
        }
        .aboutInner_selectBox{
            position: relative;
            bottom: 50px;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: flex-start;
            list-style: none;
            gap: 20px;
            @media(min-width: 767px) and (max-width: 1024px){
                height: auto;
                width: 100%;
                //flex
                justify-content: flex-start;
                align-items: center;
                order: 3;
                gap: 10px;
                bottom: 10px;
            }
            @media (max-width: 767px){
                height: auto;
                width: 100%;
                order: 3;
                gap: 10px;
                bottom: 10px;
            }
            a{
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: flex-start;

                text-decoration: none;
                gap: 20px;
                @media(min-width: 767px) and (max-width: 1024px){
                    width: 100%;
                    max-width: 660px;
                    align-items: center;
                }
                @media (max-width: 767px){
                    width: 100%;
                }
                .aboutSelectIconBox{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: relative;

                    .aboutSelectIcon{
                        width: 37px;
                        position: relative;
                        display: flex;
                        justify-content: center;
                        align-content: center;
                        @media(min-width: 767px) and (max-width: 1024px){
                            width: 30px;
                            bottom: -2px;
                        }
                        @media (max-width: 767px){
                            width: 25px;
                        }
                        .aboutSelectIcon_main_act{
                            // width: 37px;
                            // position: absolute;
                            // top: 0px;
                            // right: 0px;
                        }
                        .aboutSelectIcon_main_unact{
                            // width: 37px;
                            // position: relative;
                            // top: 0px;
                            // right: 0px;
                        }

                    }
                    

                }
                .selectionRightBox{
                    display: flex;
                    width: 300px;
                    justify-content: space-between;
                    align-items: flex-end;
                    @media(min-width: 767px) and (max-width: 1024px){
                        height: auto;
                        width: 100%;
                   
                    }
                    @media (max-width: 767px){
                        height: auto;
                        width: 100%;
                     
                    }
                    .aboutSelect_right{
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: flex-start;
                        position: relative;
                        top: -8px;
                        height: auto;
                        @media(min-width: 767px) and (max-width: 1024px){
                            top: 0px;
                            
                        }
                        @media (max-width: 767px){
                            // top: -3px;
                            
                        }
                        h4{
                            color: $color-gray_1;
                            transition: 0.7s ease-in-out;
                            height: auto;
                            &.active{
                                color: $color-green;
                                animation: fadeIn 0.7s ease ;
                                
                            }
                        }
                        .aboutSelect_iconBox{
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            width: auto;
                            gap: 12px;
                            @media(min-width: 767px) and (max-width: 1024px){
                                gap: 12px;
                            
                            }
                                @media (max-width: 767px){
                                gap: 8px;
                            }
                            .icon{
                                width: 16px;
                                @media(min-width: 767px) and (max-width: 1024px){
                                    width: 16px;
                            
                                }
                                @media (max-width: 767px){
                                    width: 12px;
                                }
                            }
                        }
                    }
                    .arrowIconBox{
                        width: 28px;
                        height: auto;
                        @media(min-width: 767px) and (max-width: 1024px){
                            width: 18px;
                            
                        }
                        @media (max-width: 767px){
                            width: 18px;
                        }
                    }
                }

            }
        }
        .AbooutIndex_contentsBox{
            width: 450px;
            height: 100%;
            position: relative;
            padding: 12px 0px 0px 0px;
            //flex
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            @media(min-width: 767px) and (max-width: 1024px){
                width: 100%;
                max-width: 660px;
                order: 2;
                padding: 40px 0px 0px 0px;
                bottom: 2dvh;
                
            }
            @media (max-width: 767px){
                width: 100%;
                order: 2;
                padding: 0px 0px 0px 0px;
                bottom: 2dvh;
                gap: 20px;
            }
            .contentTextBox{
                gap: 0px;
                height: 20%;
                position: relative;
                //flex
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
                @media(min-width: 767px) and (max-width: 1024px){
                    // background: rebeccapurple;
                    height: 150px;
                    order: 2;
                    bottom: 20px;
                }
                @media (max-width: 767px){
                    height: auto;
                    order: 2;
                    bottom: 10px;
                }
                
                .contentText_titleBox{
                    position: relative;
                    //flex
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: flex-start;
                    h2.tw{
                        position: relative;
                        color: $color-green;
                    }
                    h2.en{
                        position: relative;
                        bottom: 12px;
                        left: 2px;
                        color: $color-green;
                    }
                }
                .contentText_text{
                    position: relative;
                    text-decoration: none;
                    @media(min-width: 767px) and (max-width: 1024px){
                        // background: rebeccapurple;

                        bottom: 0px;
                    }
                    @media (max-width: 767px){

                        bottom: 6px;
                    }
                    p.tw{
                        color: $color-text;
                    }
                    p.en{
                        // position: absolute;
                        // bottom: 0px;
                        // right:  0px;
                        color: $color-blue;
                    }
                }
            }
            .phoneImageBox{
                // background: blue;
                height: 70%;
                //flex
                display: flex;
                justify-content: center;
                align-items: flex-end;
                @media(min-width: 767px) and (max-width: 1024px){
                    height: auto;
                    order: 1;
                }
                @media (max-width: 767px){
                    height: auto;
                    order: 1;

                }
                img{
                    width: 320px;
                    position:relative;
                    // bottom: -20px;
                    @media(min-width: 767px) and (max-width: 1024px){
                        width: 25dvh;
                        order: 2;
                    }
                    @media (max-width: 767px){
                        width: 25dvh;
                        order: 2;
                        top: 20px;
                    }
                    &:nth-child(1){
                        position:relative;
                        left: 30px; 
                        @media(min-width: 767px) and (max-width: 1024px){
                            left: 3dvw; 
                        }
                        @media (max-width: 767px){
                            left: 20px; 
                        }  
                    }
                   
                    &:nth-child(2){
                        position:relative;
                        right: 30px;  
                        @media(min-width: 767px) and (max-width: 1024px){
                            right:3dvw;  
                        }
                        @media (max-width: 767px){
                            right: 20px;  
                        }  
                    }
                }

            }

        }
 
    
    }


    .fade-enter-active{
        transition: opacity 0.7s ease ;
    }
    .fade-leave-active {
        transition:  0.3s ease ;
    }
    .fade-enter-from{
        opacity: 0;
        
    }
    .fade-leave-to {
        opacity: 0;
        display:none;
        
    }
    .fade-enter-to{
        opacity: 1;
    }
    .fade-leave-from {
        opacity: 1;
        display:none;
    }
    @keyframes fadeIn {
        0%{ 
            // display: none;
            opacity: 0;
        }

        100%{
            display: flex;
            opacity: 1;
        }
    }
</style>

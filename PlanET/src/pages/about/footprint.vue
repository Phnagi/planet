<script setup>
import { RouterLink, RouterView } from 'vue-router';
import DynamicIcon from '@/components/icons/DynamicIcon.vue';
import DynamicFunctionalMap from '@/components/icons/DynamicFunctionalMap.vue';
import { onMounted, reactive, ref, watch } from 'vue';
import AboutSelectIconData from '@/assets/json/about/index.json';
import ImageData from '@/assets/image.json';
//slot
import InnerInfoSlot from '@/components/about/InnerInfoSlot.vue';
import InnerSlot_nonBack from '@/components/about/InnerSlot_nonBack.vue';

const iconData = ref([
  { icon: 'buy', text: '消費碳足跡' },
  { icon: 'walk2', text: '節能減碳' },
  { icon: 'edit', text: '資源回收' },
  { icon: 'history', text: '資源回收' }
]);

//接收所有圖片的重新整理
const images = import.meta.glob(
    '@/assets/images/about/**/**/**.png', 
    { 
        eager: true, 
        import: 'default' 
});
//內容data
let contentData_aboutFootprint =reactive({});
//function 來得到所有footprint內的內容

    function resolveImagePaths(contentData) {
        const resolvedData = {};
        
        for (const key in contentData) {
            if(key ==="footprint"){
                    const group = contentData[key];
                // console.log(group);
                // 看是否有 "index" 層級
                for(const innerKey in group ){
                    // console.log(group[innerKey]);
                    resolvedData[innerKey] = group[innerKey].map((item) => {
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
                // resolvedData[key] = group[key].map((item) => {
                //     // console.log("item",item)
                //     const matched = Object.keys(images).find((path) =>
                //     path.includes(item.src)
                //     );
                //     // console.log(matched)
                //     // console.log(item.src)
                //     // console.log(images[matched])
                //     return {
                //     ...item,
                //     src: matched ? images[matched] : '', // 沒找到就空字串
                //     };
                // });
                
            }

        }

        return resolvedData;
    }
//index要用到的資料..............................................................................
    let footprint_index_textdata = reactive({});
    let footprint_index_icon = ref([]);
    let footprint_index_image = reactive([]);
    //建立function
    function createFootprint_index(){
        Object.assign(footprint_index_textdata, contentData_aboutFootprint.index[0]);
        Object.assign(footprint_index_image, contentData_aboutFootprint.index);
        footprint_index_icon.value = contentData_aboutFootprint.index[0].useIcon;
    };
//footprint要用到的資料.............................................................................. 
let footprint_content_textdata = reactive({});
    let footprint_content_icon = ref([]);
    let footprint_content_image = reactive([]);
    //建立function
    function createFootprintConten_index(){
        Object.assign(footprint_content_textdata, contentData_aboutFootprint.index[0]);

        Object.assign(footprint_content_image, contentData_aboutFootprint.index[0]);
        // console.log(footprint_content_image)
        footprint_content_icon.value = contentData_aboutFootprint.index[0].useIcon;
    };
//buy要用到的資料.............................................................................. 
let buy_content_textdata = reactive({});
    let buy_content_icon = ref([]);
    let buy_content_image = reactive([]);
    //建立function
    function createBuyContent_index(){
        Object.assign(buy_content_textdata, contentData_aboutFootprint.index[1]);
        // console.log(buy_content_textdata)
        Object.assign(buy_content_image, contentData_aboutFootprint.index[1]);
        
        buy_content_icon.value = contentData_aboutFootprint.index[1].useIcon;
    };
//history要用到的資料.............................................................................. 
let history_content_textdata = reactive({});
    let history_content_icon = ref([]);
    let history_content_image = reactive([]);
    //建立function
    function createHistoryContent_index(){
        Object.assign(history_content_textdata, contentData_aboutFootprint.history[0]);
        // console.log(history_content_textdata)
        Object.assign(history_content_image, contentData_aboutFootprint.history);
        
        history_content_icon.value = contentData_aboutFootprint.history[0].useIcon;
    };
//record要用到的資料.............................................................................. 
let record_content_textdata = reactive({});
    let record_content_icon = ref([]);
    let record_content_image = reactive([]);
    //建立function
    function createRecordContent_index(){
        Object.assign(record_content_textdata, contentData_aboutFootprint.record[0]);
        // console.log(record_content_icon)
        Object.assign(record_content_image, contentData_aboutFootprint.record);
        
        record_content_icon.value = contentData_aboutFootprint.record[0].useIcon;
    };
//editRoute要用到的資料.............................................................................. 
let editRoute_content_textdata = reactive({});
    let editRoute_content_icon = ref([]);
    let editRoute_content_image = reactive([]);
    //建立function
    function createEditRouteContent_index(){
        Object.assign(editRoute_content_textdata, contentData_aboutFootprint.edit_route[0]);
        
        Object.assign(editRoute_content_image, contentData_aboutFootprint.edit_route);
        console.log(editRoute_content_image)
        editRoute_content_icon.value = contentData_aboutFootprint.edit_route[0].useIcon;
    };
onMounted(()=>{

    watch(() => contentData_aboutFootprint, (newData) => {
            // console.log("aboutSelectMainIcon_data 已更新", newData);
    });

    const resolved = resolveImagePaths(ImageData.about);
    // console.log('resolved',resolved);
    Object.assign(contentData_aboutFootprint, resolved);
    // console.log(contentData_aboutFootprint)
    //拿各自的資料
   
    createFootprint_index();
    createFootprintConten_index();
    createBuyContent_index();
    createHistoryContent_index();
    createRecordContent_index();
    createEditRouteContent_index();
    // getfootprint_index()
    // console.log(footprint_index_icon.value);
});
</script>

<template>

    <div class="wrapper_index">
        <InnerInfoSlot :items="footprint_index_icon" >
            <template #img1>
                    <img v-if="footprint_index_image.length" :src="footprint_index_image[0].src" alt="">
            </template>

            <template #img2>
                <img v-if="footprint_index_image.length" :src="footprint_index_image[1].src" alt="">
            </template>
            <template #h2_tw>
                 <h2 class="tw" v-if="footprint_index_textdata?.title_tw">{{footprint_index_textdata["index_title_tw"]}}</h2>
            </template>
            <template #h2_en>
                 <h2 class="en">{{footprint_index_textdata["index_title_en"]}}</h2>
            </template>
            <template #content>
                <p class="tw">{{footprint_index_textdata["index_text"]}}</p>
            </template>
        </InnerInfoSlot>
    </div>
    <div class="wrapper_content" >
        <InnerSlot_nonBack :items="footprint_index_icon" :background="false" :horizontal="true">
            <template #functionalMap>
                <DynamicFunctionalMap :name="footprint_content_textdata.functional_map"/>
            </template>
            <template #h3_tw>
                <h3 class="tw">{{footprint_content_textdata["title_tw"]}}</h3>
            </template>
            <template #h3_en>
                <h3 class="en">{{footprint_content_textdata["title_en"]}}</h3>
            </template>
            <template #h4_tw>
                <h4 class="tw">{{footprint_content_textdata["SubTitle_tw"]}}</h4>

            </template>
            <template #h4_en>
                <h4 class="en">{{footprint_content_textdata["SubTitle_en"]}}</h4>
            </template>
            <template #p>
                <p class="tw">{{footprint_content_textdata["innertext"]}}</p>
            </template>
            <template #img1>
                <img v-if="footprint_content_image" :src="footprint_content_image.src" alt="">
            </template>
            <!-- <template #img2>
                <img src="@/assets/images/about/footprint/index/footprint.png" alt="">
            </template> -->
        </InnerSlot_nonBack>
    </div>
    <div class="wrapper_content" >
        <InnerSlot_nonBack :items="footprint_index_icon" :background="false" :horizontal="true">
            <template #functionalMap>
                <DynamicFunctionalMap :name="buy_content_textdata.functional_map"/>
            </template>
            <template #h3_tw>
                <h3 class="tw">{{buy_content_textdata["title_tw"]}}</h3>
            </template>
            <template #h3_en>
                <h3 class="en">{{buy_content_textdata["title_en"]}}</h3>
            </template>
            <template #h4_tw>
                <h4 class="tw">{{buy_content_textdata["SubTitle_tw"]}}</h4>

            </template>
            <template #h4_en>
                <h4 class="en">{{buy_content_textdata["SubTitle_en"]}}</h4>
            </template>
            <template #p>
                <p class="tw">{{buy_content_textdata["innertext"]}}</p>
            </template>
            <template #img1>
                <img v-if="buy_content_image" :src="buy_content_image.src" alt="">
            </template>
            <!-- <template #img2>
                <img src="@/assets/images/about/footprint/index/footprint.png" alt="">
            </template> -->
        </InnerSlot_nonBack>
    </div>
    <div class="wrapper_content" >
        <InnerSlot_nonBack :items="footprint_index_icon" :background="true" :horizontal="true">
            <template #functionalMap>
                <DynamicFunctionalMap :name="history_content_textdata.functional_map"/>
            </template>
            <template #h3_tw>
                <h3 class="tw">{{history_content_textdata["title_tw"]}}</h3>
            </template>
            <template #h3_en>
                <h3 class="en">{{history_content_textdata["title_en"]}}</h3>
            </template>
            <template #h4_tw>
                <h4 class="tw">{{history_content_textdata["SubTitle_tw"]}}</h4>

            </template>
            <template #h4_en>
                <h4 class="en">{{history_content_textdata["SubTitle_en"]}}</h4>
            </template>
            <template #p>
                <p class="tw">{{history_content_textdata["innertext"]}}</p>
            </template>
            <template #img1>
                <img class="twoimg1" v-if="history_content_image[0]" :src="history_content_image[0].src" alt="">
            </template>
            <template #img2>
                <img class="twoimg2" v-if="history_content_image[1]" :src="history_content_image[1].src" alt="">
            </template>
            <!-- <template #img2>
                <img src="@/assets/images/about/footprint/index/footprint.png" alt="">
            </template> -->
        </InnerSlot_nonBack>
    </div>
    <div class="wrapper_content" >
        <InnerSlot_nonBack :items="footprint_index_icon" :background="false" :horizontal="true">
            <template #functionalMap>
                <DynamicFunctionalMap :name="record_content_textdata.functional_map"/>
            </template>
            <template #h3_tw>
                <h3 class="tw">{{record_content_textdata["title_tw"]}}</h3>
            </template>
            <template #h3_en>
                <h3 class="en">{{record_content_textdata["title_en"]}}</h3>
            </template>
            <template #h4_tw>
                <h4 class="tw">{{record_content_textdata["SubTitle_tw"]}}</h4>

            </template>
            <template #h4_en>
                <h4 class="en">{{record_content_textdata["SubTitle_en"]}}</h4>
            </template>
            <template #p>
                <p class="tw">{{record_content_textdata["innertext"]}}</p>
            </template>
            <template #img1>
                <img class="twoimg1"  v-if="record_content_image[0]" :src="record_content_image[0].src" alt="">
            </template>
            <template #img2>
                <img class="twoimg2"  v-if="record_content_image[1]" :src="record_content_image[1].src" alt="">
            </template>
            <!-- <template #img2>
                <img src="@/assets/images/about/footprint/index/footprint.png" alt="">
            </template> -->
        </InnerSlot_nonBack>
    </div>
    <div class="wrapper_content" >
        <InnerSlot_nonBack :items="footprint_index_icon" :background="false" :horizontal="true">
            <template #functionalMap>
                <DynamicFunctionalMap :name="editRoute_content_textdata.functional_map"/>
            </template>
            <template #h3_tw>
                <h3 class="tw">{{editRoute_content_textdata["title_tw"]}}</h3>
            </template>
            <template #h3_en>
                <h3 class="en">{{editRoute_content_textdata["title_en"]}}</h3>
            </template>
            <template #h4_tw>
                <h4 class="tw">{{editRoute_content_textdata["SubTitle_tw"]}}</h4>

            </template>
            <template #h4_en>
                <h4 class="en">{{editRoute_content_textdata["SubTitle_en"]}}</h4>
            </template>
            <template #p>
                <p class="tw">{{editRoute_content_textdata["innertext"]}}</p>
            </template>
            <template #img1>
                <img   v-if="editRoute_content_image[0]" :src="editRoute_content_image[0].src" alt="">
            </template>
            <!-- <template #img2>
                <img src="@/assets/images/about/footprint/index/footprint.png" alt="">
            </template> -->
        </InnerSlot_nonBack>
    </div>

</template>

<style scoped lang="scss"  >
    // body{
    //     width: 100%;
        
    //     display: flex;
    //     flex-direction: column;
    //     justify-content: center;
    // }
    .wrapper_index {
        width: 100dvw;
        height: 100%;
        img{
            width: 100%;
        }
        h2.tw{
            color: $color-green;
        }
        h2.en{
            position: relative;
            bottom: 10px;
            color: $color-green;
        }
    }
    .wrapper_content{
        width: 100dvw;
        height: 100%;
        display: flex;
        justify-content: center;
        overflow: hidden;
        h3.tw{
            color: $color-text;
        }
        h3.en{
            color: $color-text;
        }
        h4.tw{
            color: $color-text;
        }
        h4.en{
            color: $color-text;
        }
        p{
            color: $color-text;
        }
        img{
            position: relative;
            width: 350px;
            align-items: flex-start;
            @media(min-width: 767px) and (max-width: 1024px){
                width: 38dvw;

            }
            @media (max-width: 767px){
                width: 50dvw;
            }
        }
        .twoimg1{
            left: 50px;
            @media(min-width: 767px) and (max-width: 1024px){
                left: 20px;
            }
            @media (max-width: 767px){
                    left: 20px;
                }
            }   
        .twoimg2{
            right: 50px;
            @media(min-width: 767px) and (max-width: 1024px){
                right: 20px;
            }
            @media (max-width: 767px){
                right: 20px;
            }
        }
    }
</style>

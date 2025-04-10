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
//接收所有圖片的重新整理
const images = import.meta.glob(
    '@/assets/images/about/**/**/**.png', 
    { 
        eager: true, 
        import: 'default' 
});
//內容data
let contentData_aboutstore =reactive({});
//function 來得到所有store內的內容

    function resolveImagePaths(contentData) {
        const resolvedData = {};
        
        for (const key in contentData) {
            if(key ==="store"){
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
                
            }

        }

        return resolvedData;
    }
//index要用到的資料.........................................................................
    let store_index_textdata = reactive({});
    let store_index_icon = ref([]);
    let store_index_image = reactive([]);
    //建立function
    function createstore_index(){
        Object.assign(store_index_textdata, contentData_aboutstore.index[0]);
        Object.assign(store_index_image, contentData_aboutstore.index);
        store_index_icon.value = contentData_aboutstore.index[0].useIcon;
    };
//browse要用到的資料.............................................................................. 
let browse_content_textdata = reactive({});
    let browse_content_icon = ref([]);
    let browse_content_image = reactive([]);
    //建立function
    function createBrowse_content(){
        Object.assign(browse_content_textdata, contentData_aboutstore.browse[0]);

        Object.assign(browse_content_image, contentData_aboutstore.browse);
        // console.log(browse_content_textdata)
        browse_content_icon.value = contentData_aboutstore.browse[0].useIcon;
    };
//trade_seller要用到的資料.............................................................................. 
let trade_seller_content_textdata = reactive({});
    let trade_seller_content_icon = ref([]);
    let trade_seller_content_image = reactive([]);
    //建立function
    function createTrade_content(){
        Object.assign(trade_seller_content_textdata, contentData_aboutstore.trade_seller[0]);

        Object.assign(trade_seller_content_image, contentData_aboutstore.trade_seller);
        // console.log(browse_content_textdata)
        trade_seller_content_icon.value = contentData_aboutstore.trade_seller[0].useIcon;
    };
//mystore要用到的資料.............................................................................. 
let mystore_content_textdata = reactive({});
    let mystore_content_icon = ref([]);
    let mystore_content_image = reactive([]);
    //建立function
    function createMystore_content(){
        Object.assign(mystore_content_textdata, contentData_aboutstore.mystore[0]);

        Object.assign(mystore_content_image, contentData_aboutstore.mystore);
        // console.log(browse_content_textdata)
        mystore_content_icon.value = contentData_aboutstore.mystore[0].useIcon;
    };
//trade_history要用到的資料.............................................................................. 
let trade_history_content_textdata = reactive({});
    let trade_history_content_icon = ref([]);
    let trade_history_content_image = reactive([]);
    //建立function
    function createTrade_history_content(){
        Object.assign(trade_history_content_textdata, contentData_aboutstore.trade_history[0]);

        Object.assign(trade_history_content_image, contentData_aboutstore.trade_history);
        // console.log(browse_content_textdata)
        trade_history_content_icon.value = contentData_aboutstore.trade_history[0].useIcon;
    };
//traffic要用到的資料.............................................................................. 
let traffic_content_textdata = reactive({});
    let traffic_content_icon = ref([]);
    let traffic_content_image = reactive([]);
    //建立function
    function createTraffic_content(){
        Object.assign(traffic_content_textdata, contentData_aboutstore.traffic[0]);

        Object.assign(traffic_content_image, contentData_aboutstore.traffic);
        // console.log(browse_content_textdata)
        traffic_content_icon.value = contentData_aboutstore.traffic[0].useIcon;
    };
onMounted(()=>{

    watch(() => contentData_aboutstore, (newData) => {
            // console.log("aboutSelectMainIcon_data 已更新", newData);
    });

    const resolved = resolveImagePaths(ImageData.about);
    // console.log('resolved',resolved);
    Object.assign(contentData_aboutstore, resolved);
    //拿各自的資料
   
    createstore_index();
    createBrowse_content();
    createTrade_content();
    createMystore_content();
    createTrade_history_content();
    createTraffic_content()
    // getstore_index()
    // console.log(store_index_icon.value);
});
</script>

<template>
    <div class="wrapper_index">
        <InnerInfoSlot :items="store_index_icon">
            <template #img1>
                    <img v-if="store_index_image.length" :src="store_index_image[0].src" alt="">
            </template>

            <template #img2>
                <img v-if="store_index_image.length" :src="store_index_image[1].src" alt="">
            </template>
            <template #h2_tw>
                 <h2 class="tw" v-if="store_index_textdata?.title_tw">{{store_index_textdata["title_tw"]}}</h2>
            </template>
            <template #h2_en>
                 <h2 class="en">{{store_index_textdata["title_en"]}}</h2>
            </template>
            <template #content>
                <p class="tw">{{store_index_textdata["innertext"]}}</p>
            </template>
        </InnerInfoSlot>
    </div>
    <div class="wrapper_content" >
        <InnerSlot_nonBack :items="footprint_index_icon" :background="true" :horizontal="false">
            <template #functionalMap>
                <DynamicFunctionalMap :name="browse_content_textdata.functional_map"/>
            </template>
            <template #h3_tw>
                <h3 class="tw">{{browse_content_textdata["title_tw"]}}</h3>
            </template>
            <template #h3_en>
                <h3 class="en">{{browse_content_textdata["title_en"]}}</h3>
            </template>
            <template #h4_tw>
                <h4 class="tw">{{browse_content_textdata["SubTitle_tw"]}}</h4>

            </template>
            <template #h4_en>
                <h4 class="en">{{browse_content_textdata["SubTitle_en"]}}</h4>
            </template>
            <template #p>
                <p class="tw">{{browse_content_textdata["innertext"]}}</p>
            </template>
            <template #img1>
                <img class="twoimg1" v-if="browse_content_image[0]" :src="browse_content_image[0].src" alt="">
            </template>
            <template #img2>
                <img class="twoimg2" v-if="browse_content_image[1]" :src="browse_content_image[1].src" alt="">
            </template>
            <!-- <template #img2>
                <img src="@/assets/images/about/footprint/index/footprint.png" alt="">
            </template> -->
        </InnerSlot_nonBack>
    </div>
    <div class="wrapper_content" >
        <InnerSlot_nonBack :items="footprint_index_icon" :background="false" :horizontal="true">
            <template #functionalMap>
                <DynamicFunctionalMap :name="trade_seller_content_textdata.functional_map"/>
            </template>
            <template #h3_tw>
                <h3 class="tw">{{trade_seller_content_textdata["title_tw"]}}</h3>
            </template>
            <template #h3_en>
                <h3 class="en">{{trade_seller_content_textdata["title_en"]}}</h3>
            </template>
            <template #h4_tw>
                <h4 class="tw">{{trade_seller_content_textdata["SubTitle_tw"]}}</h4>

            </template>
            <template #h4_en>
                <h4 class="en">{{trade_seller_content_textdata["SubTitle_en"]}}</h4>
            </template>
            <template #p>
                <p class="tw">{{trade_seller_content_textdata["innertext"]}}</p>
            </template>
            <template #img1>
                <img class="twoimg1" v-if="trade_seller_content_image[0]" :src="trade_seller_content_image[0].src" alt="">
            </template>
            <template #img2>
                <img class="twoimg2" v-if="trade_seller_content_image[1]" :src="trade_seller_content_image[1].src" alt="">
            </template>
            <!-- <template #img2>
                <img src="@/assets/images/about/footprint/index/footprint.png" alt="">
            </template> -->
        </InnerSlot_nonBack>
    </div>
    <div class="wrapper_content" >
        <InnerSlot_nonBack :items="footprint_index_icon" :background="true" :horizontal="false">
            <template #functionalMap>
                <DynamicFunctionalMap :name="mystore_content_textdata.functional_map"/>
            </template>
            <template #h3_tw>
                <h3 class="tw">{{mystore_content_textdata["title_tw"]}}</h3>
            </template>
            <template #h3_en>
                <h3 class="en">{{mystore_content_textdata["title_en"]}}</h3>
            </template>
            <template #h4_tw>
                <h4 class="tw">{{mystore_content_textdata["SubTitle_tw"]}}</h4>

            </template>
            <template #h4_en>
                <h4 class="en">{{mystore_content_textdata["SubTitle_en"]}}</h4>
            </template>
            <template #p>
                <p class="tw">{{mystore_content_textdata["innertext"]}}</p>
            </template>
            <template #img1>
                <img class="twoimg1" v-if="mystore_content_image[0]" :src="mystore_content_image[0].src" alt="">
            </template>
            <template #img2>
                <img class="twoimg2" v-if="mystore_content_image[1]" :src="mystore_content_image[1].src" alt="">
            </template>
            <!-- <template #img2>
                <img src="@/assets/images/about/footprint/index/footprint.png" alt="">
            </template> -->
        </InnerSlot_nonBack>
    </div>
    <div class="wrapper_content" >
        <InnerSlot_nonBack :items="footprint_index_icon" :background="true" :horizontal="false">
            <template #functionalMap>
                <DynamicFunctionalMap :name="trade_history_content_textdata.functional_map"/>
            </template>
            <template #h3_tw>
                <h3 class="tw">{{trade_history_content_textdata["title_tw"]}}</h3>
            </template>
            <template #h3_en>
                <h3 class="en">{{trade_history_content_textdata["title_en"]}}</h3>
            </template>
            <template #h4_tw>
                <h4 class="tw">{{trade_history_content_textdata["SubTitle_tw"]}}</h4>

            </template>
            <template #h4_en>
                <h4 class="en">{{trade_history_content_textdata["SubTitle_en"]}}</h4>
            </template>
            <template #p>
                <p class="tw">{{trade_history_content_textdata["innertext"]}}</p>
            </template>
            <template #img1>
                <img v-if="trade_history_content_image[0]" :src="trade_history_content_image[0].src" alt="">
            </template>

            <!-- <template #img2>
                <img src="@/assets/images/about/footprint/index/footprint.png" alt="">
            </template> -->
        </InnerSlot_nonBack>
    </div>
    <div class="wrapper_content" >
        <InnerSlot_nonBack :items="footprint_index_icon" :background="false" :horizontal="false">
            <template #functionalMap>
                <DynamicFunctionalMap :name="traffic_content_textdata.functional_map"/>
            </template>
            <template #h3_tw>
                <h3 class="tw">{{traffic_content_textdata["title_tw"]}}</h3>
            </template>
            <template #h3_en>
                <h3 class="en">{{traffic_content_textdata["title_en"]}}</h3>
            </template>
            <template #h4_tw>
                <h4 class="tw">{{traffic_content_textdata["SubTitle_tw"]}}</h4>

            </template>
            <template #h4_en>
                <h4 class="en">{{traffic_content_textdata["SubTitle_en"]}}</h4>
            </template>
            <template #p>
                <p class="tw">{{traffic_content_textdata["innertext"]}}</p>
            </template>
            <template #img1>
                <img v-if="traffic_content_image[0]" :src="traffic_content_image[0].src" alt="">
            </template>

            <!-- <template #img2>
                <img src="@/assets/images/about/footprint/index/footprint.png" alt="">
            </template> -->
        </InnerSlot_nonBack>
    </div>

</template>

<style scoped lang="scss"  >
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
                width: 30dvh;
            }
            @media (max-width: 767px){
                width: 50dvw;
            }
        }
        .twoimg1{
            left: 50px;
            @media (max-width: 767px){
                left: 20px;
            }
        }
        .twoimg2{
            right: 50px;
            @media (max-width: 767px){
                right: 20px;
            }
        }
    }
</style>

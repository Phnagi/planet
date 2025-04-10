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
let contentData_aboutmission =reactive({});
//function 來得到所有mission內的內容

    function resolveImagePaths(contentData) {
        const resolvedData = {};
        
        for (const key in contentData) {
            if(key ==="mission"){
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
    let mission_index_textdata = reactive({});
    let mission_index_icon = ref([]);
    let mission_index_image = reactive([]);
    //建立function
    function createMission_index(){
        Object.assign(mission_index_textdata, contentData_aboutmission.index[0]);
        Object.assign(mission_index_image, contentData_aboutmission.index);
        mission_index_icon.value = contentData_aboutmission.index[0].useIcon;
    };
//mission_task要用到的資料.............................................................................. 
let mission_task_textdata = reactive({});
    let mission_task_icon = ref([]);
    let mission_task_image = reactive([]);
    //建立function
    function createMission_task_content(){
        Object.assign(mission_task_textdata, contentData_aboutmission.mission_task[0]);

        Object.assign(mission_task_image, contentData_aboutmission.mission_task);
        // console.log(mission_task_textdata)
        mission_task_icon.value = contentData_aboutmission.mission_task[0].useIcon;
    };
//friend_challege要用到的資料.............................................................................. 
let friend_challege_textdata = reactive({});
    let friend_challege_icon = ref([]);
    let friend_challege_image = reactive([]);
    //建立function
    function createFriend_challege_content(){
        Object.assign(friend_challege_textdata, contentData_aboutmission.friend_challege[0]);

        Object.assign(friend_challege_image, contentData_aboutmission.friend_challege);
        // console.log(friend_challege_textdata)
        friend_challege_icon.value = contentData_aboutmission.friend_challege[0].useIcon;
    };
//mission_club要用到的資料.............................................................................. 
let mission_club_textdata = reactive({});
    let mission_club_icon = ref([]);
    let mission_club_image = reactive([]);
    //建立function
    function createMission_club_content(){
        Object.assign(mission_club_textdata, contentData_aboutmission.mission_club[0]);

        Object.assign(mission_club_image, contentData_aboutmission.mission_club);
        // console.log(mission_club_textdata)
        mission_club_icon.value = contentData_aboutmission.mission_club[0].useIcon;
    };
//qr_task要用到的資料.............................................................................. 
let qr_task_textdata = reactive({});
    let qr_task_icon = ref([]);
    let qr_task_image = reactive([]);
    //建立function
    function createQR_task_content(){
        Object.assign(qr_task_textdata, contentData_aboutmission.qr_task[0]);

        Object.assign(qr_task_image, contentData_aboutmission.qr_task);
        // console.log(qr_task_textdata)
        qr_task_icon.value = contentData_aboutmission.qr_task[0].useIcon;
    };
onMounted(()=>{

    watch(() => contentData_aboutmission, (newData) => {
            // console.log("aboutSelectMainIcon_data 已更新", newData);
    });

    const resolved = resolveImagePaths(ImageData.about);
    // console.log('resolved',resolved);
    Object.assign(contentData_aboutmission, resolved);
    //拿各自的資料
   
    createMission_index();
    createMission_task_content();
    createFriend_challege_content();
    createMission_club_content();
    createQR_task_content();
    // getmission_index()
    // console.log(mission_index_icon.value);
});
</script>

<template>
    <div class="wrapper_index">
        <InnerInfoSlot :items="mission_index_icon">
            <template #img1>
                    <img v-if="mission_index_image.length" :src="mission_index_image[0].src" alt="">
            </template>

            <template #img2>
                <img v-if="mission_index_image.length" :src="mission_index_image[1].src" alt="">
            </template>
            <template #h2_tw>
                 <h2 class="tw" v-if="mission_index_textdata?.title_tw">{{mission_index_textdata["title_tw"]}}</h2>
            </template>
            <template #h2_en>
                 <h2 class="en">{{mission_index_textdata["title_en"]}}</h2>
            </template>
            <template #content>
                <p class="tw">{{mission_index_textdata["text_tw"]}}</p>
            </template>
        </InnerInfoSlot>
    </div>
    <div class="wrapper_content" >
        <InnerSlot_nonBack :items="footprint_index_icon" :background="false" :horizontal="true">
            <template #functionalMap>
                <DynamicFunctionalMap :name="mission_task_textdata.functional_map"/>
            </template>
            <template #h3_tw>
                <h3 class="tw">{{mission_task_textdata["title_tw"]}}</h3>
            </template>
            <template #h3_en>
                <h3 class="en">{{mission_task_textdata["title_en"]}}</h3>
            </template>
            <template #h4_tw>
                <h4 class="tw">{{mission_task_textdata["SubTitle_tw"]}}</h4>

            </template>
            <template #h4_en>
                <h4 class="en">{{mission_task_textdata["SubTitle_en"]}}</h4>
            </template>
            <template #p>
                <p class="tw">{{mission_task_textdata["innertext"]}}</p>
            </template>
            <template #img1>
                <img class="twoimg1" v-if="mission_task_image[0]" :src="mission_task_image[0].src" alt="">
            </template>
            <template #img2>
                <img class="twoimg2" v-if="mission_task_image[1]" :src="mission_task_image[1].src" alt="">
            </template>
            <!-- <template #img2>
                <img src="@/assets/images/about/footprint/index/footprint.png" alt="">
            </template> -->
        </InnerSlot_nonBack>
    </div>
    <div class="wrapper_content" >
        <InnerSlot_nonBack :items="footprint_index_icon" :background="false" :horizontal="true">
            <template #functionalMap>
                <DynamicFunctionalMap :name="friend_challege_textdata.functional_map"/>
            </template>
            <template #h3_tw>
                <h3 class="tw">{{friend_challege_textdata["title_tw"]}}</h3>
            </template>
            <template #h3_en>
                <h3 class="en">{{friend_challege_textdata["title_en"]}}</h3>
            </template>
            <template #h4_tw>
                <h4 class="tw">{{friend_challege_textdata["SubTitle_tw"]}}</h4>

            </template>
            <template #h4_en>
                <h4 class="en">{{friend_challege_textdata["SubTitle_en"]}}</h4>
            </template>
            <template #p>
                <p class="tw">{{friend_challege_textdata["innertext"]}}</p>
            </template>
            <template #img1>
                <img  v-if="friend_challege_image[0]" :src="friend_challege_image[0].src" alt="">
            </template>
            <!-- <template #img2>
                <img src="@/assets/images/about/footprint/index/footprint.png" alt="">
            </template> -->
        </InnerSlot_nonBack>
    </div>
    <div class="wrapper_content" >
        <InnerSlot_nonBack :items="footprint_index_icon" :background="true" :horizontal="true">
            <template #functionalMap>
                <DynamicFunctionalMap :name="mission_club_textdata.functional_map"/>
            </template>
            <template #h3_tw>
                <h3 class="tw">{{mission_club_textdata["title_tw"]}}</h3>
            </template>
            <template #h3_en>
                <h3 class="en">{{mission_club_textdata["title_en"]}}</h3>
            </template>
            <template #h4_tw>
                <h4 class="tw">{{mission_club_textdata["SubTitle_tw"]}}</h4>

            </template>
            <template #h4_en>
                <h4 class="en">{{mission_club_textdata["SubTitle_en"]}}</h4>
            </template>
            <template #p>
                <p class="tw">{{mission_club_textdata["innertext"]}}</p>
            </template>
            <template #img1>
                <img  v-if="mission_club_image[0]" :src="mission_club_image[0].src" alt="">
            </template>
            <!-- <template #img2>
                <img src="@/assets/images/about/footprint/index/footprint.png" alt="">
            </template> -->
        </InnerSlot_nonBack>
    </div>
    <div class="wrapper_content" >
        <InnerSlot_nonBack :items="footprint_index_icon" :background="false" :horizontal="true">
            <template #functionalMap>
                <DynamicFunctionalMap :name="qr_task_textdata.functional_map"/>
            </template>
            <template #h3_tw>
                <h3 class="tw">{{qr_task_textdata["title_tw"]}}</h3>
            </template>
            <template #h3_en>
                <h3 class="en">{{qr_task_textdata["title_en"]}}</h3>
            </template>
            <template #h4_tw>
                <h4 class="tw">{{qr_task_textdata["SubTitle_tw"]}}</h4>

            </template>
            <template #h4_en>
                <h4 class="en">{{qr_task_textdata["SubTitle_en"]}}</h4>
            </template>
            <template #p>
                <p class="tw">{{qr_task_textdata["innertext"]}}</p>
            </template>
            <template #img1>
                <img  v-if="qr_task_image[0]" :src="qr_task_image[0].src" alt="">
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

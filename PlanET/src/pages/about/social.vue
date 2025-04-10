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
let contentData_aboutsocial =reactive({});
//function 來得到所有social內的內容

    function resolveImagePaths(contentData) {
        const resolvedData = {};
        
        for (const key in contentData) {
            if(key ==="social"){
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
    let social_index_textdata = reactive({});
    let social_index_icon = ref([]);
    let social_index_image = reactive([]);
    //建立function
    function createsocial_index(){
        Object.assign(social_index_textdata, contentData_aboutsocial.index[0]);
        Object.assign(social_index_image, contentData_aboutsocial.index);
        social_index_icon.value = contentData_aboutsocial.index[0].useIcon;
    };
//browse要用到的資料.............................................................................. 
let browse_textdata = reactive({});
    let browse_icon = ref([]);
    let browse_image = reactive([]);
    //建立function
    function createBrowse_content(){
        Object.assign(browse_textdata, contentData_aboutsocial.browse[0]);

        Object.assign(browse_image, contentData_aboutsocial.browse);
        // console.log(browse_textdata)
        browse_icon.value = contentData_aboutsocial.browse[0].useIcon;
    };
//editPost要用到的資料.............................................................................. 
let editPost_textdata = reactive({});
    let editPost_icon = ref([]);
    let editPost_image = reactive([]);
    //建立function
    function createEditPost_content(){
        Object.assign(editPost_textdata, contentData_aboutsocial.editPost[0]);

        Object.assign(editPost_image, contentData_aboutsocial.editPost);
        // console.log(editPost_textdata)
        editPost_icon.value = contentData_aboutsocial.editPost[0].useIcon;
    };
//club要用到的資料.............................................................................. 
let club_textdata = reactive({});
    let club_icon = ref([]);
    let club_image = reactive([]);
    //建立function
    function createClub_content(){
        Object.assign(club_textdata, contentData_aboutsocial.club[0]);

        Object.assign(club_image, contentData_aboutsocial.club);
        // console.log(club_textdata)
        club_icon.value = contentData_aboutsocial.club[0].useIcon;
    };
//profile要用到的資料.............................................................................. 
let profile_textdata = reactive({});
    let profile_icon = ref([]);
    let profile_image = reactive([]);
    //建立function
    function createProfile_content(){
        Object.assign(profile_textdata, contentData_aboutsocial.profile[0]);

        Object.assign(profile_image, contentData_aboutsocial.profile);
        // console.log(profile_textdata)
        profile_icon.value = contentData_aboutsocial.profile[0].useIcon;
    };
onMounted(()=>{

    watch(() => contentData_aboutsocial, (newData) => {
            // console.log("aboutSelectMainIcon_data 已更新", newData);
    });

    const resolved = resolveImagePaths(ImageData.about);
    // console.log('resolved',resolved);
    Object.assign(contentData_aboutsocial, resolved);
    //拿各自的資料
   
    createsocial_index();
    createBrowse_content();
    createEditPost_content();
    createClub_content();
    createProfile_content();
    // getsocial_index()
    // console.log(social_index_icon.value);
});
</script>

<template>
    <div class="wrapper_index">
        <InnerInfoSlot :items="social_index_icon">
            <template #img1>
                    <img v-if="social_index_image.length" :src="social_index_image[0].src" alt="">
            </template>

            <template #img2>
                <img v-if="social_index_image.length" :src="social_index_image[1].src" alt="">
            </template>
            <template #h2_tw>
                 <h2 class="tw" v-if="social_index_textdata?.title_tw">{{social_index_textdata["title_tw"]}}</h2>
            </template>
            <template #h2_en>
                 <h2 class="en">{{social_index_textdata["title_en"]}}</h2>
            </template>
            <template #content>
                <p class="tw">{{social_index_textdata["text_tw"]}}</p>
            </template>
        </InnerInfoSlot>
    </div>
    <div class="wrapper_content" >
        <InnerSlot_nonBack :items="footprint_index_icon" :background="false" :horizontal="false">
            <template #functionalMap>
                <DynamicFunctionalMap :name="browse_textdata.functional_map"/>
            </template>
            <template #h3_tw>
                <h3 class="tw">{{browse_textdata["title_tw"]}}</h3>
            </template>
            <template #h3_en>
                <h3 class="en">{{browse_textdata["title_en"]}}</h3>
            </template>
            <template #h4_tw>
                <h4 class="tw">{{browse_textdata["SubTitle_tw"]}}</h4>

            </template>
            <template #h4_en>
                <h4 class="en">{{browse_textdata["SubTitle_en"]}}</h4>
            </template>
            <template #p>
                <p class="tw">{{browse_textdata["innertext"]}}</p>
            </template>
            <template #img1>
                <img class="twoimg1" v-if="browse_image[0]" :src="browse_image[0].src" alt="">
            </template>
            <template #img2>
                <img class="twoimg2" v-if="browse_image[1]" :src="browse_image[1].src" alt="">
            </template>
            <!-- <template #img2>
                <img src="@/assets/images/about/footprint/index/footprint.png" alt="">
            </template> -->
        </InnerSlot_nonBack>
    </div>
    <div class="wrapper_content" >
        <InnerSlot_nonBack :items="footprint_index_icon" :background="false" :horizontal="false">
            <template #functionalMap>
                <DynamicFunctionalMap :name="editPost_textdata.functional_map"/>
            </template>
            <template #h3_tw>
                <h3 class="tw">{{editPost_textdata["title_tw"]}}</h3>
            </template>
            <template #h3_en>
                <h3 class="en">{{editPost_textdata["title_en"]}}</h3>
            </template>
            <template #h4_tw>
                <h4 class="tw">{{editPost_textdata["SubTitle_tw"]}}</h4>

            </template>
            <template #h4_en>
                <h4 class="en">{{editPost_textdata["SubTitle_en"]}}</h4>
            </template>
            <template #p>
                <p class="tw">{{editPost_textdata["innertext"]}}</p>
            </template>
            <template #img1>
                <img  v-if="editPost_image[0]" :src="editPost_image[0].src" alt="">
            </template>

            <!-- <template #img2>
                <img src="@/assets/images/about/footprint/index/footprint.png" alt="">
            </template> -->
        </InnerSlot_nonBack>
    </div>
    <div class="wrapper_content" >
        <InnerSlot_nonBack :items="footprint_index_icon" :background="true" :horizontal="true">
            <template #functionalMap>
                <DynamicFunctionalMap :name="club_textdata.functional_map"/>
            </template>
            <template #h3_tw>
                <h3 class="tw">{{club_textdata["title_tw"]}}</h3>
            </template>
            <template #h3_en>
                <h3 class="en">{{club_textdata["title_en"]}}</h3>
            </template>
            <template #h4_tw>
                <h4 class="tw">{{club_textdata["SubTitle_tw"]}}</h4>

            </template>
            <template #h4_en>
                <h4 class="en">{{club_textdata["SubTitle_en"]}}</h4>
            </template>
            <template #p>
                <p class="tw">{{club_textdata["innertext"]}}</p>
            </template>
            <template #img1>
                <img class="twoimg1"  v-if="club_image[1]" :src="club_image[1].src" alt="">
            </template>
            <template #img2>
                <img class="twoimg2"  v-if="club_image[0]" :src="club_image[0].src" alt="">
            </template>

            <!-- <template #img2>
                <img src="@/assets/images/about/footprint/index/footprint.png" alt="">
            </template> -->
        </InnerSlot_nonBack>
    </div>
    <div class="wrapper_content" >
        <InnerSlot_nonBack :items="footprint_index_icon" :background="false" :horizontal="true">
            <template #functionalMap>
                <DynamicFunctionalMap :name="club_textdata.functional_map"/>
            </template>
            <template #h3_tw>
                <h3 class="tw">{{club_textdata["title_tw"]}}</h3>
            </template>
            <template #h3_en>
                <h3 class="en">{{club_textdata["title_en"]}}</h3>
            </template>
            <template #h4_tw>
                <h4 class="tw">{{club_textdata["SubTitle_tw"]}}</h4>

            </template>
            <template #h4_en>
                <h4 class="en">{{club_textdata["SubTitle_en"]}}</h4>
            </template>
            <template #p>
                <p class="tw">{{club_textdata["innertext"]}}</p>
            </template>
            <template #img1>
                <img  v-if="profile_image[0]" :src="profile_image[0].src" alt="">
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

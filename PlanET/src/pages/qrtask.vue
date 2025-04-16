<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'


//題庫
const questionBank = [
  {
    question: '下列哪一種交通方式最環保(以10公里為例)？',
    options: ['A.私家車', 'B.火車', 'C.公車', 'D.摩托車'],
    answer: 1
  },
  {
    question: '哪種燃料的汽車排放的二氧化碳最多？',
    options: ['A.電動汽車', 'B.柴油汽車', 'C.混合動力汽車', 'D.天然氣汽車'],
    answer: 1
  },
  {
    question: '下列哪一種交通工具使用可再生能源最多？',
    options: ['A.火車', 'B.飛機', 'C.電動汽車', 'D.載重卡車'],
    answer: 2
  },
  {
    question: '何種方式可以有效減少城市交通擁堵及環境污染？',
    options: ['A.提高油價', 'B.提倡拼車', 'C.增設停車場', 'D.擴建道路'],
    answer: 1
  },
  {
    question: '以下哪一項措施最有助於降低個人交通碳足跡？',
    options: ['A.購買更大的汽車', 'B.減少開車次數', 'C.選擇高速公路行駛', 'D.定期保養汽車'],
    answer: 1
  }
];

const options = [
  'A.私家車',
  'B.火車',
  'C.公車',
  'D.摩托車'
]

const selectedQuestion = ref(null)
const selectedIndex = ref(null)
const router = useRouter()


// 隨機抽出一題
const randomIndex = Math.floor(Math.random() * questionBank.length)
selectedQuestion.value = questionBank[randomIndex]

function submitAnswer() {
  if (selectedIndex.value === null) return

  if (selectedIndex.value === selectedQuestion.value.answer) {
    router.push('/CorrectPage')
  } else {
    router.push({
      path: '/WrongPage',
      query: {
        selected: selectedIndex.value,
        correct: selectedQuestion.value.answer,
        question: selectedQuestion.value.question,
        options: JSON.stringify(selectedQuestion.value.options)
      }
    })
  }
}
</script>

<template>
    <div class="QA_Area">
        <div class="qa">
            <div class="titleBox">
                <h2 class="tw">QA</h2>
                <h2 class="tw">交通</h2>
            </div>
            <div class="p-6 max-w-xl mx-auto text-center text-xl">
                    <div class="askArea">
                        <h2 class="text-2xl font-bold mb-6">{{ selectedQuestion?.question }}</h2>
            
                        <!-- 自訂樣式選項區塊 -->
                        <div class="selectBox">
                            <div v-for="(option, index) in selectedQuestion?.options" :key="index" class="form-check select">
                                <label
                                :class="['form-check-label', { selected: selectedIndex === index }]"
                                :for="'option' + index"
                                >
                                    <h3 class="tw">{{ option }}</h3>
                                    <input
                                        class="custom-radio"
                                        type="radio"
                                        :id="'option' + index"
                                        name="transport-options"
                                        :value="index"
                                        v-model="selectedIndex"
                                    />
                                </label>
                            </div>
                        </div>



                    </div>
        
                    <!-- 送出按鈕 -->
                    <div class="buttonArea">
                        <button
                            class="submit-button"
                            @click="submitAnswer"
                            :disabled="selectedIndex === null"
                            >
                            送出
                        </button>
                    </div>
            </div>
        </div>
    </div>
  </template>
<style scoped lang="scss">
@use "sass:color";
.QA_Area{
    position: relative;
    height: 100dvh;
    width: 100dvw;
    display: flex;
    justify-content: center;
    background-color: $color-white;
    .qa{
        position: relative;
        padding: 80px 80px 0px 80px;
        height: 100dvh;
        width: 100%;
        max-width: 1280px;
                //flex
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        @media(min-width: 767px) and (max-width: 1024px){

                padding: 60px 80px 40px 80px;
            }
        @media (max-width: 767px){

                padding: 40px 40px 40px 40px;
        }
        .titleBox{
            width: 100%;
            display: flex;
            justify-content: space-between;
            border-bottom: 3px solid $color-green;
            
        }

        .text-xl {

            width: 100%;
            height: 80dvh;
            // background-color: cadetblue;
            margin:20px 0px 0px 0px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .askArea{
                width: 100%;
                display: flex;
                flex-direction: column;
                gap: 20px;
                h2.tw{

                }
                .selectBox{
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    .select{
                        width: 100%;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        // gap: 20px;
                        // .custom-radio {
                        //     width: 20px;
                        //     height: 20px;
                        //     accent-color: $color-green; /* 設定顏色（大多數現代瀏覽器支援） */
                        //     cursor: pointer;
                        //     border: none;
                        // }
                        label{
                            width: 100%;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            cursor: pointer;
                            // .custom-radio{
                            //     display: flex;
                            //     justify-content: center;
                            // }
                            h3.tw {
                                transition: all 0.4s ease;
                                opacity: 0.6;
                                transform: translateY(3px);
                            }
                        }
                    }
                }

          
            }
            .buttonArea{
                display: flex;
                justify-content: center;
                align-items: center;
                .submit-button {
                    padding: 12px 32px;
                    border: none;
                    border-radius: 30px;
                    background-color: $color-green;
                    color: white;
                    font-size: 1.2rem;
                    font-family: $font-family-TW;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

                    &:hover {
                        background-color: color.adjust($color-green, $lightness: -8%);
                        transform: translateY(-2px);
                        // box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
                    }

                    &:active {
                        transform: scale(0.98);
                    }

                    &:disabled {
                        background-color: #ccc;
                        color: #888;
                        cursor: not-allowed;
                        box-shadow: none;
                    }
                }
            }
        }
    }


}

// .form-check-input {
//   width: 20px;
//   height: 20px;
//   accent-color: #2563eb; // 自訂顏色（藍色）
// }

// .form-check-label {
//   font-size: 1.1rem;
//   cursor: pointer;
// }

.custom-radio {
  // 隱藏預設樣式
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  width: 20px;
  height: 20px;
  border: 2px solid $color-green;
  border-radius: 50%;
  margin-right: 10px;
  position: relative;
  cursor: pointer;
  transition: 0.2s;
  top: 0px;
  left: 0px;

  display: flex;
  justify-content: center;
  align-items: center;
}

// 點選後的樣式（小圓點）
.custom-radio:checked::before {
  content: '';
  position: absolute;
  top: -1px;
  left: -1px;
  width: 18px;
  height: 18px;
  background-color: $color-green;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
}


.form-check-label.selected h3.tw {
  color: $color-green;
  
//   font-weight: bold;
    // font-size: 30px;
    font-family: $font-family-TW;
    font-size: $phone-FS-title_C;
    line-height: $phone-LH-title_C;
    letter-spacing:$phone-LP-title_C;
    font-weight: $phone-FW-title_C;


    // ✅ 淡入動畫
    opacity: 1;
    transform: translateY(0);
    transition: all 0.4s ease;
}
</style>

<script setup>
    import { defineProps } from 'vue';

    defineProps({
    sizeWidth: {
        type: Number,
        default: '50'
    },
    sizeHeight: {
        type: Number,
        default: '50'
    }
    });
</script>

<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width=sizeWidth*1.8 :height=sizeHeight*1.8 viewBox="0 0 37 37" fill="none">
    <g clip-path="url(#clip0_82_5255)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.9894 17.545C19.6532 18.2089 19.6532 19.2891 18.9894 19.9529L11.2745 27.6678C10.8755 28.0668 10.2287 28.0668 9.82976 27.6678C9.43081 27.2688 9.43081 26.622 9.82976 26.2231L17.3035 18.7493L9.77769 11.2421C9.37824 10.8436 9.37744 10.1968 9.77589 9.79735C10.1744 9.3979 10.8212 9.3971 11.2206 9.79556L18.9894 17.545Z" fill="#43B71B"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M27.6672 9.82881C28.0661 10.2278 28.0661 10.8746 27.6672 11.2735L21.8786 17.0621C21.4797 17.4611 20.8328 17.4611 20.4339 17.0621C20.0349 16.6632 20.0349 16.0163 20.4339 15.6174L26.2225 9.82881C26.6214 9.42986 27.2682 9.42986 27.6672 9.82881Z" fill="#43B71B"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M20.3089 20.3083C20.7078 19.9094 21.3547 19.9094 21.7536 20.3083L27.5422 26.0969C27.9411 26.4958 27.9411 27.1426 27.5422 27.5416C27.1432 27.9406 26.4964 27.9406 26.0974 27.5416L20.3089 21.753C19.9099 21.3541 19.9099 20.7073 20.3089 20.3083Z" fill="#43B71B"/>
    </g>
    <defs>
        <clipPath id="clip0_82_5255">
        <rect width="25.1104" height="25.2262" fill="white" transform="translate(18.7051 0.867188) rotate(45)"/>
        </clipPath>
    </defs>
    </svg>

</template>

<style>

</style>
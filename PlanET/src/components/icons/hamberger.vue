
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
  <svg xmlns="http://www.w3.org/2000/svg" :width=sizeWidth :height=sizeHeight viewBox="0 0 22 20" fill="none">
  <g clip-path="url(#clip0_80_5243)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.228516 1.12818C0.228516 0.605961 0.651859 0.182617 1.17408 0.182617L20.1596 0.182617C20.6818 0.182617 21.1051 0.605961 21.1051 1.12818C21.1051 1.6504 20.6818 2.07375 20.1596 2.07375H1.17408C0.651859 2.07375 0.228516 1.6504 0.228516 1.12818Z" fill="#43B71B"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.136719 9.28443C0.136719 8.76221 0.560062 8.33887 1.08228 8.33887L20.1524 8.33887C20.6747 8.33887 21.098 8.76221 21.098 9.28443C21.098 9.80665 20.6747 10.23 20.1524 10.23H1.08228C0.560062 10.23 0.136719 9.80665 0.136719 9.28443Z" fill="#43B71B"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.255859 17.6321C0.255859 17.1099 0.679203 16.6865 1.20142 16.6865H20.148C20.6702 16.6865 21.0936 17.1099 21.0936 17.6321C21.0936 18.1543 20.6702 18.5777 20.148 18.5777H1.20142C0.679203 18.5777 0.255859 18.1543 0.255859 17.6321Z" fill="#43B71B"/>
  </g>
  <defs>
    <clipPath id="clip0_80_5243">
      <rect width="21.0546" height="18.9629" fill="white" transform="translate(0.136719 0.182617)"/>
    </clipPath>
  </defs>
</svg>
</template>

<style>

</style>
<template>
    <div class="sider-container" :class="[position == 'right' ? 'sider-right' : 'sider-left' ]">
        <slot></slot>
    </div>
</template>

<script setup>
import { defineProps } from "vue"

defineProps({
    position:{
        type:String,
        default:'right'
    }
})
</script>

<style scoped lang="less">
@import "@/style/global.less";
.sider-container{
    height: 100%;
    width: 20vw;
    position: absolute;
    padding-top: 64px;
    /* top: 64px; */
    color: white;
    text-align: center;
    z-index: 1000;
}
.sider-right{
    right: 0px;
    background-image: linear-gradient(to left,  @color, rgba(255, 0, 0, 0)) !important;
}
.sider-left{
    left: 0px;
    background-image: linear-gradient(to right,  @color, rgba(255, 0, 0, 0)) !important;
}
</style>


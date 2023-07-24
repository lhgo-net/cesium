<template>
    <div class="nav-container">
        <slot></slot>
    </div>
</template>

<style scoped lang="less">
@import "@/style/global.less";
.nav-container{
    position: absolute;
    width: 100vw;
    bottom: 0;
    height: 64px;
    background-image: linear-gradient(to top,  @color, rgba(255, 0, 0, 0)) !important;
}
</style>
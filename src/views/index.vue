<template>
    <div class="app-container">
        <l-header></l-header>
        <!-- <div class="left-container"> -->
            <l-sider position="left"></l-sider>
        <!-- </div> -->
        <!-- <div class="right-container"> -->
            <l-sider position="right"></l-sider>
        <!-- </div> -->
        <l-map></l-map>
        <l-nav></l-nav>
    </div>
</template>

<script setup>
import lMap from "@/components/map.vue"
import lHeader from "@/components/header.vue"
import lSider from "@/components/sider.vue"
import lNav from "@/components/nav.vue"

</script>

<style scoped>
.app-container {
    position: relative;
}
/* .right-container,.left-container{
    position: absolute;
    top: 64px;
} */
</style>
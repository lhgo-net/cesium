<template>
  <div class="conainer-map" id="map">
    <div class="container-tip">
      <v-sheet
        class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4"
        elevation="4"
        height="100"
        max-width="800"
        width="100%"
        rounded
      >
        <p>视角被固定在这里了，不信你试试！</p>
      </v-sheet>
    </div>
  </div>
</template>

<script setup lang="js">
import { onMounted } from 'vue';
import { Base,Camera } from '@lh/cesium';
const {init} = Base

onMounted(async () => {
    const {viewer} = await init('map')
    // 初始化 Cesium Viewer
    const c = new Camera(viewer)
    c.viewerFixed()




})
</script>

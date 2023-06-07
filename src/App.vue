<script setup>
import 'cesium/Build/Cesium/Widgets/widgets.css'
import * as Cesium from 'cesium'
import { onMounted } from 'vue';

onMounted(() => {
  new Cesium.Viewer('cesiumContainer')
})
</script>

<template>
  <div id="cesiumContainer"></div>
</template>

<style scoped>
#cesiumContainer{
  height: 100vh;
  width: 100vw;
}
</style>

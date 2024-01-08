<template>
  <l-map @ready="ready"></l-map>
</template>

<script setup>
import { onMounted, onUnmounted, reactive } from 'vue'
import { provider } from '@/utils/ceisum.map'

const data = reactive({
  terrain: null,
  imageLayer: null,
  annotation: null,
})

onMounted(() => {})
onUnmounted(() => {})

function ready(viewer) {
  data.imageLayer = provider(viewer, {
    name: '影像底图',
    key: 'img_w',
  })
  data.annotation = provider(viewer, {
    name: '影像注记',
    key: 'cia_w',
  })
  data.terrain = viewer.terrainProvider = Cesium.createWorldTerrain({
    requestWaterMask: true, // 请求水体效果所需要的海岸线数据
    requestVertexNormals: true, // 请求地形照明数据
  })
  // viewer.camera.setView({
  //   destination: Cesium.Cartesian3.fromDegrees(106.26667, 38.46667, 2000000.0),
  //   orientation: {
  //     heading: 6.283185307179586,
  //     // 视角
  //     pitch: -1.5686521559334161,
  //     roll: 0
  //   }
  // })
}
</script>

<style scoped></style>

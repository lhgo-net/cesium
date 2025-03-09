<template>
  <div class="conainer-map" id="map"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Base } from '@lh/cesium'

const { init, ImageryLayerConfig, addImageryLayer } = Base
onMounted(async () => {
  const { viewer } = await init('map')
  addImageryLayer(
    viewer,
    ImageryLayerConfig.gaode_ver.type,
    ImageryLayerConfig.gaode_ver.options
  )
})
</script>

<style scoped>
.conainer-map {
  position: relative;
}
.btn {
  position: absolute;
  z-index: 10;
}
</style>

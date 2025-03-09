<template>
  <div class="conainer-map" id="map"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import { Base, Entity } from '@lh/cesium'
import red from '@/assets/red-gradient.png'
import yellow from '@/assets/yellow-gradient.png'

const { init, modifyMap, ImageryLayerConfig, addImageryLayer } = Base

onMounted(async () => {
  const { viewer } = await init('map')
  addImageryLayer(viewer, ImageryLayerConfig.gaode_ver.type, ImageryLayerConfig.gaode_ver.options)

  modifyMap(viewer, true, [10, 200, 100])
  const entity = Entity.DynamicEllipse(viewer, [108.887124, 27.121203], {
    minR: 20,
    maxR: 400,
    image: red
  })
  const entity1 = Entity.DynamicEllipse(viewer, [108.904933, 27.134947], {
    minR: 20,
    maxR: 400,
    image: yellow
  })
  viewer.zoomTo(viewer.entities)
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

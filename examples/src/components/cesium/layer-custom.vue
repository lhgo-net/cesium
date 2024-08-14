<template>
  <div class="conainer-map" id="map"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import { Base } from 'lhcesium'

onMounted(async () => {
  const { viewer } = await Base.init('map')
  const _baselayer = new Cesium.WebMapServiceImageryProvider({
    url: 'http://localhost:8080/geoserver/china-map/wms',
    layers: 'china-map:中国_县2',
    parameters: {
      version: '1.1.0',
      service: 'WMS',
      format: 'image/png',
      transparent: true
    }
  })
  console.log(viewer)
  viewer.imageryLayers.addImageryProvider(_baselayer)
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

<template>
  <div class="conainer-map" id="map"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import { Base, Entity } from '@lh/cesium'

import * as turf from '@turf/turf'

const { init } = Base
const { Cluster } = Entity
const points = turf.randomPoint(3000, { bbox: [101.87, 28.46, 103.53, 29.88] })

onMounted(async () => {
  const { viewer } = await init('map', {
    terrain: Cesium.Terrain.fromWorldTerrain({
      requestWaterMask: true,
      requestVertexNormals: true
    })
  })
  viewer.scene.globe.depthTestAgainstTerrain = true;
  const tmpArry = []
  points.features.forEach((Feature) => {
    tmpArry.push(Feature.geometry.coordinates)
  })
  Cluster(viewer, tmpArry)
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

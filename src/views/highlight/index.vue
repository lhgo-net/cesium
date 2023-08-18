<template>
  <div class="container">

  </div>
</template>

<script setup>
import { onMounted, onUnmounted, reactive } from 'vue'
import { provider } from '@/utils/ceisum.map'
import defaultBJ from '@/assets/json/xnBJ.json'
import { flat, getColorRamp } from '@/utils/utils'

const data = reactive({
  terrain: null,
  imageLayer: null,
  annotation: null,
  primitives:null
})

onUnmounted(() => {
  remove()
})
onMounted(() => {
  highlighCity()
})

function remove() {
  viewer.imageryLayers.removeAll()
  viewer.entities.removeAll()
}
function highlighCity(geo) {
  const globe = viewer.scene.globe
  globe.translucency.enabled = true
  globe.globeAloha = 0
  globe.undergroundColor = undefined
  globe.translucency.backFaceAlpha = 0
  globe.baseColor = new Cesium.Color(0, 0, 0, 0)
  const BJ = geo || defaultBJ
  const geoJSON = BJ.geometries[0].coordinates[0]
  const coordinates = flat(geoJSON)
  const pointList = []
  const maxHeight = []
  const minHeight = new Array(coordinates.length / 2).fill(-1000)
  viewer.imageryLayers.removeAll()
  viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
    url: '/GISFile/terrain/xn'
  })
  viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
    url: '/GISFile/imageLayer/xn/{z}/{x}/{y}.png'
  }))
  for (let i = 0;i < geoJSON.length;i++) {
    pointList.push(Cesium.Cartographic.fromDegrees(geoJSON[i][0], geoJSON[i][1]))
  }
  const promise = Cesium.sampleTerrainMostDetailed(viewer.terrainProvider, pointList)
  promise.then(updatedPositions => {
    for (let i = 0;i < updatedPositions.length;i++) {
      maxHeight.push(updatedPositions[i].height)
    }
    const wall = viewer.entities.add({
      id: 'wall',
      wall: {
        positions: Cesium.Cartesian3.fromDegreesArray(coordinates),
        maximumHeights: maxHeight,
        minimumHeights: minHeight,
        material: getColorRamp('rgb(52,192,214)', 'rgb(15,93,180)')
      }
    })
    viewer.zoomTo(wall)
  })
}
</script>

<style scoped>
.container {
  position: absolute;
  z-index: 1000;
}
</style>
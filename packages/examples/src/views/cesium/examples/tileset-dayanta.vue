<template>
  <div class="conainer-map" id="map"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import { Base } from '@lh/cesium'

onMounted(() => {
  Base.init('map', {
    // shouldAnimate: true,
    terrain: Cesium.Terrain.fromWorldTerrain({
      requestWaterMask: true,
      requestVertexNormals: true
    })
  }).then(async ({ viewer }) => {
    viewer.scene.globe.depthTestAgainstTerrain = true
    const tileset = await Cesium.Cesium3DTileset.fromUrl(
      // 'https://image.giiiis.com/dayanta/tileset.json',
      'http://8.134.217.110:6999/GISFile/incline/xianggang_jiulong/tileset.json',
      {
        skipLevelOfDetail: true,
        baseScreenSpaceError: 1024,
        skipScreenSpaceErrorFactor: 16,
        skipLevels: 1,
        immediatelyLoadDesiredLevelOfDetail: false,
        loadSiblings: false,
        cullWithChildrenBounds: true
      }
    )
    viewer.scene.primitives.add(tileset)
    viewer.zoomTo(tileset)
  })
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

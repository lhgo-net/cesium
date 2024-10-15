<template>
  <div class="conainer-map" id="map"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import { Base } from 'lhcesium'

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
      'http://localhost:6700/tiles/Tile_-001_+015_OSGB/Tile_-001_+015/tileset.json',
      {
        // skipLevelOfDetail: true,
        // baseScreenSpaceError: 1024,
        // skipScreenSpaceErrorFactor: 16,
        // skipLevels: 1,
        // immediatelyLoadDesiredLevelOfDetail: false,
        // loadSiblings: false,
        // cullWithChildrenBounds: true
      }
    )
    let surface = Cesium.Cartesian3.fromRadians(0, 0, 0)
    //模型改变的位置
    let offset = Cesium.Cartesian3.fromRadians(0, 0, 100)
    //定义模型的改变状态
    let translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3())

    tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation)
    console.log(tileset)
    viewer.scene.primitives.add(tileset)
    // tileset.then((tilesets) => {
    viewer.zoomTo(tileset)
    // })
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

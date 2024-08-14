<template>
  <div class="conainer-map" id="map"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import { Base } from 'lhcesium'

const { init,ImageryLayerConfig, addImageryLayer  } = Base
// const { add3Dtiles } = Tiles

function terrain() {
  viewer.terrainProvider = Cesium.createWorldTerrain()
}

onMounted(async () => {
  const { viewer } = await init('map')
  addImageryLayer(
    viewer,
    ImageryLayerConfig.gaode_ver.type,
    ImageryLayerConfig.gaode_ver.options
  )
  // add3Dtiles(viewer,'/tiles/guangzhou/tileset.json')
  const tileset = viewer.scene.primitives.add(await Cesium.Cesium3DTileset.fromIonAssetId(2675733))
  viewer.zoomTo(tileset)

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

<template>
  <div class="conainer-map" id="map">
    <div class="btn">
      <v-sheet>
        <v-lit>
          <v-list-item title="定位" @click="flyTo"></v-list-item>
          <v-list-item title="添加建筑" @click="build"></v-list-item>
          <v-list-item title="添加地形" @click="terrain"></v-list-item>
        </v-lit>
      </v-sheet>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { Map, Tiles } from '@lh/cesium'

function flyTo() {
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(113.280637, 23.125178, 5000.0),
    orientation: {
      heading: Cesium.Math.toRadians(20.0),
      pitch: Cesium.Math.toRadians(-35.0),
      roll: 0.0
    }
  })
}

function build() {
  const tiles = new Tiles()
  tiles.build()
}

function terrain() {
  viewer.terrainProvider = Cesium.createWorldTerrain()
}

onMounted(() => {
  new Map('map')
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

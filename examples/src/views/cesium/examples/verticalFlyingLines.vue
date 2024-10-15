<template>
  <div class="conainer-map" id="map">
    <div class="btn">
      <v-sheet>
        <v-lit>
          <v-list-item title="定位" @click="flyTo"></v-list-item>
          <v-list-item title="飞线" @click="verticalFlyingLines"></v-list-item>
          <v-list-item title="抛物线" @click="parabola"></v-list-item>
          <v-list-item title="轨迹线" @click="trackPlayback"></v-list-item>
        </v-lit>
      </v-sheet>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { Map, Line } from '@/cesium/index'
const line = new Line()

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

function verticalFlyingLines() {
  line.lineFlowInit(viewer, [106.713478, 26.578343], 1000)
}
function parabola() {
  line.parabola(viewer)
}
function trackPlayback() {
  line.trackPlayback()
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

<template>
  <div class="conainer-map" id="map"></div>
</template>

<script setup>
import { onMounted } from "vue";
import { Base,Entity } from "@lh/cesium";
const { init } = Base;
const { Polyline } = Entity;
let viewer;

const line = new Polyline();
onMounted(async () => {
  const v = await init("map");
  viewer = v.viewer;
  line.parabola(
    viewer,
    [106.713478, 26.578343],
    [
      [104.82, 26.58],
      [104.82, 26.58],
      [104.64, 25.81],
      [105.47, 26.21],
      [106.9, 27.7],
      [107.19, 27.95],
      [107.6, 28.89],
      [107.72, 27.97],
      [107.88, 27.22],
      [105.69, 28.57],
      [106.8, 28.16],
      [107.43, 28.56],
      [107.87, 28.54],
      [107.5, 27.76],
      [106.41, 27.81],
      [106.2, 28.33],
      [109.21, 27.73],
      [108.91, 27.24],
      [108.23, 27.94],
      [108.13, 28.27],
      [109.2, 27.52],
      [108.82, 27.68],
      [108.24, 27.52],
      [108.41, 28.02],
      [108.48, 28.57],
      [109.18, 28.17],
      [105.29, 27.32],
      [106.04, 27.03],
      [105.76, 26.66],
      [104.71, 27.13],
      [105.61, 27.16],
    ],
    new Cesium.Color(1.0, 1.0, 1.0, 0.8)
  );
  line.go();
});
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

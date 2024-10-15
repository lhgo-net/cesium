<template>
  <div class="conainer-map" id="map">
    <div class="btn">
      <v-sheet>
        <v-lit>
          <v-list-item title="下雪" @click="startSnow"></v-list-item>
          <v-list-item title="下雨" @click="startRain"></v-list-item>
          <v-list-item title="雾气" @click="startFog"></v-list-item>
        </v-lit>
      </v-sheet>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { Base, Mix } from "lhcesium";

const { Rain, Snow,Fog } = Mix;

let viewer;
const startSnow = () => {
  const ww = new Snow(viewer);
};
const startRain = () => {
  const ww = new Rain(viewer);
};
const startFog = () => {
  const ww = new Fog(viewer);
};
onMounted(async () => {
  const v = await Base.init("map", {
    shouldAnimate: true,
    terrain: Cesium.Terrain.fromWorldTerrain({
      requestWaterMask: true,
      requestVertexNormals: true,
    }),
  });
  viewer = v.viewer;
  const scene = viewer.scene;
  scene.globe.depthTestAgainstTerrain = true;
  scene.camera.setView({
    destination: new Cesium.Cartesian3(
      277096.634865404,
      5647834.481964232,
      2985563.7039122293
    ),
    orientation: {
      heading: 4.731089976107251,
      pitch: -0.32003481981370063,
    },
  });
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

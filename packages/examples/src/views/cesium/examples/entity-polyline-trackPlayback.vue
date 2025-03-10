<template>
  <div class="conainer-map" id="map"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import { Base, Entity } from "@lh/cesium";
const { init } = Base;
const { Polyline } = Entity;

let viewer;

const line = new Polyline()
onMounted(async () => {
  const v = await init("map");
  viewer = v.viewer;
  line.trackPlayback(viewer)
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

<template>
  <div class="conainer-map" id="map"></div>
</template>

<script setup>
import { onMounted } from "vue";
import { Base, Entity } from "@lh/cesium";
import json from "@/assets/json/geojson.json";

const { Polygon } = Entity;


onMounted(async () => {
  const {viewer} = await Base.init("map");
  const p = new Polygon(viewer)
  p.gradient(json)
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

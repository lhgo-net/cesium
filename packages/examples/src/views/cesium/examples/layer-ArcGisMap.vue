<template>
  <div class="conainer-map" id="map"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Base } from "@lh/cesium";

const { init } = Base;
onMounted(async () => {
  const { viewer } = await init("map");
  viewer.imageryLayers.addImageryProvider(
    new Cesium.ImageryLayer(Cesium.createWorldImageryAsync())
  );
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

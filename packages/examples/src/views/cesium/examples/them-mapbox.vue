<template>
  <div class="conainer-map" id="map"></div>
</template>

<script setup>
import { onMounted } from "vue";
import { Base } from "@lh/cesium";
const { init } = Base;

let viewer;

onMounted(async () => {
  const v = await init("map");
  viewer = v.viewer;
  var mapboxLayer = new Cesium.MapboxStyleImageryProvider({
    username: "hklh",
    styleId: "clpki9oma007x01px73gmc9l6",
    accessToken:
      "pk.eyJ1IjoiaGtsaCIsImEiOiJjbDMzdHR5bTcxcTc3M2ptaGxlODEzZnlhIn0.9ZagRtR3ZH3koVr_OUBUCA",
  });
  viewer.imageryLayers.addImageryProvider(mapboxLayer);
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

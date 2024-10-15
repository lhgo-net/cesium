<template>
  <div class="conainer-map" id="map"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Base } from "lhcesium";

const { init } = Base;
onMounted(async () => {
  const { viewer } = await init("map");
  var mapboxLayer = new Cesium.MapboxStyleImageryProvider({
    username: "hklh",
    styleId: "clpkm2ouj009901r88waa6m9j",
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

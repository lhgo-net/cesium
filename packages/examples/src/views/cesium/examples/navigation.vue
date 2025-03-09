<template>
  <div class="conainer-map" id="map"></div>
</template>

<script setup>
import { onMounted } from "vue";
import { Base } from "@lh/cesium";
import CesiumNavigation from "cesium-navigation-es6";
import "cesium-navigation-es6/dist/styles/cesium-navigation.css";

const { init } = Base;
onMounted(async () => {
  const v = await init("map", {
    animation: false,
    timeline: false,
  });
  const options = {
    enableCompass: true,
    enableZoomControls: true,
    enableCompassOuterRing: true,
    enableDistanceLegend: true,
    enableDistanceLegend: true,  
    resetTooltip:'重置视图',
    zoomInTooltip:'放大',
    zoomOutTooltip:'缩小'
  };
  new CesiumNavigation(v.viewer, options);
});
</script>

<!-- <style scoped lang="scss">
@import "@cesium-navigation-es6/dist/styles/cesium-navigation.css";

</style> -->

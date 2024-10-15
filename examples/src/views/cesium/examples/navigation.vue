<template>
  <div class="conainer-map" id="map"></div>
</template>

<script setup>
import { onMounted } from "vue";
import { Base } from "lhcesium";
import CesiumNavigation from "cesium-navigation-es6";
const { init } = Base;
onMounted(async () => {
  const v = await init("map", {
    animation: false,
    timeline: false,
  });
  const options = {
    enableCompass: true,
    enableZoomControls: false,
    enableCompassOuterRing: true,
    enableDistanceLegend: false,
  };

  //修改重置视图的tooltip
  options.resetTooltip = "重置视图";
  //修改放大按钮的tooltip
  options.zoomInTooltip = "放大";
  //修改缩小按钮的tooltip
  options.zoomOutTooltip = "缩小";
  CesiumNavigation(v.viewer, options);
});
</script>

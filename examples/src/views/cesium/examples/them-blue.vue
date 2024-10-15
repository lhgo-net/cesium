<template>
  <div class="conainer-map" id="map"></div>
</template>

<script setup>
import { onMounted } from "vue";
import { Base } from "lhcesium";
const { init, modifyMap, ImageryLayerConfig, addImageryLayer } = Base;

let viewer;

onMounted(async () => {
  const v = await init("map");
  viewer = v.viewer;
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(114.1655, 22.2755, 5000), // 经纬度和高度
  });
  addImageryLayer(
    viewer,
    ImageryLayerConfig.gaode_ver.type,
    ImageryLayerConfig.gaode_ver.options
  );
  modifyMap(viewer, true, [0, 255, 255]);
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

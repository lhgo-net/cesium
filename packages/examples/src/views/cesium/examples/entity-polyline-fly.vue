<template>
  <div class="conainer-map" id="map"></div>
</template>

<script setup>
import { onMounted } from "vue";
import { Base, Entity } from "@lh/cesium";
const { init, modifyMap, ImageryLayerConfig, addImageryLayer } = Base;
const { Polyline } = Entity;

let viewer;

const line = new Polyline();
onMounted(async () => {
  const v = await init("map");
  viewer = v.viewer;
  addImageryLayer(
    viewer,
    ImageryLayerConfig.gaode_ver.type,
    ImageryLayerConfig.gaode_ver.options
  );
  modifyMap(viewer);

  line.lineFlowInit(viewer, [106.713478, 26.578343], 1000);
  line.go()
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

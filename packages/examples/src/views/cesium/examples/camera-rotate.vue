<template>
  <div class="conainer-map" id="map"></div>
</template>

<script setup>
import { onMounted } from "vue";
import { Base, Camera } from "@lh/cesium";

const { init } = Base;
onMounted(async () => {
  const { viewer } = await init("map");
  // 设置旋转中心点的经度、纬度和相机高度（米）
  const longitude = 117.48;
  const latitude = 30.67;
  const cameraHeight = 1500.0;

  // 设置旋转速度（度/秒）
  const rotationSpeed = 10.0;
  const carmera = new Camera(viewer);
  carmera.rotate(viewer,longitude, latitude, cameraHeight);
});
</script>

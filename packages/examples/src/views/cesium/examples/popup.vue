<template>
  <div class="conainer-map" id="map"></div>
</template>

<script setup>
import { onMounted } from "vue";
import { Base, Mix } from "@lh/cesium";

const { init } = Base;
const { popup } = Mix;
let v;
let scene;
onMounted(async () => {
  const { viewer } = await init("map");
  v = viewer;
  scene = viewer.scene;
  let coord = [120.311889, 31.491064];
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(...coord, 1000),
  });
  const entity = new Cesium.Entity({
    position: Cesium.Cartesian3.fromDegrees(120.311889, 31.491064, 0),
    point: {
      show: true,
      pixelSize: 6,
      outlineWidth: 2,
      color: Cesium.Color.RED,
      outlineColor: Cesium.Color.WHITE,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
    },
  });
  viewer.entities.add(entity);
  const div = document.createElement("div");
  div.innerHTML = "我是弹窗";
  div.style.cssText = `
        left:100px;
        top:0;
        height:100px;
        width:100px;
        background:rgba(0,0,0,0.7);
        color:white;
        padding:5px;
        border-radius:5px;
        border:1px solid white;
  `;
  popup(viewer, div, coord);
});
</script>

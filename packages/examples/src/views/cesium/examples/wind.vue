<template>
  <div class="conainer-map" id="map"></div>
</template>

<script setup>
import data from "@/assets/wind/2017121300.json";
import { onMounted } from "vue";
import { Base, Mix } from "@lh/cesium";

const { init} = Base;
const { Windy } = Mix;

let viewer;

onMounted(async () => {
  const v = await init("map");
  viewer = v.viewer;
  const windy = new Windy(data, viewer);
  const timer = setInterval(function () {
    windy.animate();
  }, 300);
});
</script>

<style scoped>
.conainer-map {
  position: relative;
}
</style>

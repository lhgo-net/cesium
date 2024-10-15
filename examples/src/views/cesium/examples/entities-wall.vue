<template>
  <div class="conainer-map" id="map">
    <div class="btn">
      <v-sheet>
        <v-lit>
          <v-list-item title="开启遮罩" @click="mask"></v-list-item>
        </v-lit>
      </v-sheet>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { Base, Entity } from "lhcesium";

const { init } = Base;
const { Line } = Entity;

const line = new Line();

let viewer;

function mask() {
  line.mask(viewer);
}

onMounted(async () => {
  const v = await init("map");
  viewer = v.viewer;
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

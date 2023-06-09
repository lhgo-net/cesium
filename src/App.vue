<script setup>
import { onMounted, reactive } from 'vue'
import { map, provider } from './utils/ceisum.map';
import { TDT_IMAGE } from './config/default'

const store = reactive({})

function onChangeImage(obj) {
  provider(store.viewer, obj)
  // viewer.imageryLayers.get(0).show = false
}


onMounted(() => {
  store.viewer = map('cesiumContainer')

})

</script>

<template>
  <div>
    <div class="tools">
      <div v-for="item in TDT_IMAGE" :key="item.key" @click="onChangeImage(item)">{{ item.name }}</div>
    </div>
    <div id="cesiumContainer"></div>

  </div>
</template>

<style scoped>
#cesiumContainer {
  height: 100vh;
  width: 100vw;
}

.tools {
  position: absolute;
  color: white;
  z-index: 1000;
  cursor: pointer;
}
</style>

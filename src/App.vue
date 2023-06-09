<script setup>
import { onMounted, reactive } from 'vue'
import { map, provider } from './utils/ceisum.map';
import { TDT_IMAGE } from './config/default'

const store = reactive({ items: [], layerSelect: 'vec' })

function onChangeImage(obj) {
  console.log(obj)
  if (store.layer) {
    store.viewer.imageryLayers.remove(store.layer)
  }

  store.layer = provider(store.viewer, obj)
  console.log(store.viewer.imageryLayers._layers)
  // viewer.imageryLayers.get(0).show = false
}


onMounted(() => {
  for (let index = 0;index < TDT_IMAGE.length;index++) {
    const item = TDT_IMAGE[index]
    store.items.push({
      title: item.name,
      value: item.key,
      ...item
    })
  }
  store.viewer = map('cesiumContainer')

})

</script>

<template>
  <v-app>
    <div class="tools">
      <v-card width="200px">
        <v-card-text>
          <v-select label="图层" density :items="TDT_IMAGE" item-title="name" item-value="key" variant="outlined" @click="onChangeImage"></v-select>
        </v-card-text>
      </v-card>
      <!-- <div v-for="item in TDT_IMAGE" :key="item.key" @click="onChangeImage(item)">{{ item.name }}</div> -->
    </div>
    <div id="cesiumContainer"></div>
  </v-app>
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

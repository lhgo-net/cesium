<template>
  <div class="tool">
    <v-switch
      v-model="terrainLoadding"
      hide-details
      true-value="是"
      false-value="否"
      :label="`是否加载地形: ${terrainLoadding}`"
    ></v-switch>
    <v-select
      label="Select"
      :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
      variant="underlined"
    ></v-select>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, reactive } from 'vue'
import { provider } from '@/utils/ceisum.map'

const terrainLoadding = ref('否')
const data = reactive({
  terrain: null,
  imageLayer: null,
  annotation: null,
  primitives: null
})

onUnmounted(() => {
  remove()
})
onMounted(() => {
  const imageLayer = provider(viewer, {
    name: '矢量底图',
    key: 'vec_w'
  })
  const imageLayer1 = provider(viewer, {
    name: '矢量标记',
    key: 'cva_w'
  })
  createOsmBuildings()
  imageLayer.hue = 3
  imageLayer.contrast = -1.2
  imageLayer1.hue = 3
  imageLayer1.contrast = -1.2
})

function remove() {
  viewer.imageryLayers.removeAll()
  viewer.scene.primitives.remove(data.primitives)
}
async function createOsmBuildings() {
  data.primitives = await Cesium.createOsmBuildingsAsync()
  viewer.scene.primitives.add(data.primitives)
}
</script>

<style scoped>
.tool {
  position: absolute;
  z-index: 1000;
  top: 64px;
  width: 200px;
}
</style>

<template>
  <div class="container">
    <l-map></l-map>
  </div>
</template>

<script setup>
import lMap from '@/components/map.vue'
import { onMounted, onUnmounted, reactive } from 'vue'
import { provider } from '@/utils/ceisum.map'

const data = reactive({
  terrain: null,
  imageLayer: null,
  annotation: null
})

onMounted(() => {
  imageLayer()
})
onUnmounted(() => {
  remove()
})
function remove() {
  viewer.imageryLayers.removeAll()
}

function imageLayer() {
  data.imageLayer = provider(viewer, {
    name: '影像底图',
    key: 'img_w'
  })
  data.annotation = provider(viewer, {
    name: '影像注记',
    key: 'cia_w'
  })
}
</script>

<style scoped>
.container {
  position: relative;
}
</style>

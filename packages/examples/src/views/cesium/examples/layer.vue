<template>
  <div class="conainer-map" id="map">
    <div class="btn">
      <v-sheet>
        <v-lit>
          <v-list-item id="img">影像</v-list-item>
          <v-list-item id="vec">矢量图</v-list-item>
        </v-lit>
      </v-sheet>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Base } from '@lh/cesium'

const { init, ImageryLayerConfig, addImageryLayer } = Base

let Viewer
const events = [
  {
    id: '#img',
    event: () => {
      addImageryLayer(
        Viewer,
        ImageryLayerConfig.tianditu_img.type,
        ImageryLayerConfig.tianditu_img.options
      )
      addImageryLayer(
        Viewer,
        ImageryLayerConfig.tianditu_label.type,
        ImageryLayerConfig.tianditu_label.options
      )
    }
  },
  {
    id: '#vec',
    event: () => {
      addImageryLayer(
        Viewer,
        ImageryLayerConfig.tianditu_vec.type,
        ImageryLayerConfig.tianditu_vec.options
      )
      addImageryLayer(
        Viewer,
        ImageryLayerConfig.tianditu_label.type,
        ImageryLayerConfig.tianditu_label.options
      )
    }
  }
]

onMounted(async () => {
  const { viewer } = await init('map')
  Viewer = viewer

  events.forEach((item) => {
    const dom = document.querySelector(item.id)
    console.log(dom)
    dom.addEventListener('click', item.event)
  })
})
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

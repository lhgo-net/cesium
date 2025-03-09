<template>
  <div class="conainer-map" id="map">
    <div class="btn">
      <v-sheet>
        <v-lit>
          <v-list-item title="定位" @click="mask"></v-list-item>
        </v-lit>
      </v-sheet>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { Base, Entity } from '@lh/cesium'

import geoJson from '@/assets/json/tianheqv.json'
import a from '@/assets/spriteline_orange_red.png'

let Road

const mask = () => {
  Road.flyTo()
}
const { modifyMap, ImageryLayerConfig, addImageryLayer } = Base
onMounted(async () => {
  const { viewer } = await Base.init('map')
  addImageryLayer(viewer, ImageryLayerConfig.gaode_ver.type, ImageryLayerConfig.gaode_ver.options)
  modifyMap(viewer, true, [10, 200, 100])

  const opt = {
    show: true,
    geojson: geoJson,
    polyline: {
      clampToGround: true,
      width: new Cesium.ConstantProperty(3),
      material: {
        image: a,
        duration: 1000
      }
    }
  }
  const road = new Entity.FlowRoad(viewer, opt)
  Road = road

  road.draw()
  road.flyTo()
})
</script>

<style scoped>
.conainer-map {
  position: relative;
}
.btn {
  position: absolute;
  z-index: 10;
  cursor: pointer;
}
</style>

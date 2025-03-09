<template>
  <div class="conainer-map" id="map">
    <div class="btn">
      <v-sheet>
        <v-lit>
          <v-list-item title="切换" @click="handlerChange"></v-list-item>
        </v-lit>
      </v-sheet>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { Base } from '@lh/cesium'

const { init } = Base

let viewer

function handlerChange(){
    viewer.scene.mode = 5 - viewer.scene.mode
}

onMounted(async () => {
  const v = await init('map')
  viewer = v.viewer
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

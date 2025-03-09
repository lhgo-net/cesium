<template>
  <div class="conainer-map" id="map">
    <div class="btn">
      <v-sheet>
        <v-lit>
          <v-list-item
            v-for="item in event"
            :key="item.title"
            :title="item.title"
            @click="handlerChange(item)"
          ></v-list-item>
        </v-lit>
      </v-sheet>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
// import { Map, GlobeRotate } from '@/cesium/index'
import { Base } from '@lh/cesium'

const { init,GlobeRotate } = Base
let viewer

let globeRotate

const event = [
  {
    title: '开启地球自转',
    click: () => {
      globeRotate.start()
    }
  },
  {
    title: '关闭地球自转',
    click: () => {
      globeRotate.stop()
    }
  },

  {
    title: '开启日夜',
    click: () => {
      viewer.scene.globe.enableLighting = true
    }
  },
  {
    title: '取消日夜',
    click: () => {
      viewer.scene.globe.enableLighting = false
    }
  }
]

function handlerChange(item) {
  item.click()
}
// 地球球体自转

onMounted(async () => {
  const v = await init('map')
  console.log(v)
  viewer = v.viewer
  globeRotate = new GlobeRotate(viewer)
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

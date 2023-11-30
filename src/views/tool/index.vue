<template>
  <l-map @ready="ready"></l-map>
</template>

<script setup>
import { toWG84 } from '@/utils/utils.js'
import * as dat from 'dat.gui'

let viewer = null

const gui = new dat.GUI()

const cameraFolder = gui.addFolder('相机视角')
const obj = {
  camera: function () {
    console.log(viewer.scene.camera)
    const camera = {
      position: viewer.scene.camera.position,
      heading: viewer.scene.camera.heading,
      pitch: viewer.scene.camera.pitch,
      roll: viewer.scene.camera.roll,
      ...toWG84(viewer.scene.camera.position, viewer)
    }
    alert(JSON.stringify(camera))
  }
}
// console.log(viewer.scene.camera.heading)
// console.log(viewer.scene.camera.pitch)
// console.log(viewer.scene.camera.roll)
// console.log(viewer.scene.camera.position)

cameraFolder.add(obj, 'camera').onChange(e => e)
cameraFolder.open()

function ready(viewers) {
  viewer = viewers
}
</script>

<style lang="less" scoped>

</style>
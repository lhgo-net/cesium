<template>
  <l-map @ready="ready"></l-map>
</template>

<script setup>
import { toWG84 } from '@/utils/utils.js'
import * as dat from 'dat.gui'
import * as turf from '@turf/turf'

import gy from '@/assets/json/贵州省.json'

import test from '@/assets/img/1.png'

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
  const box = turf.bbox(gy)
  console.log(box)
  const points = turf.randomPoint(250, { bbox: box })
  console.log(points)
  const pointPrimitives = viewer.scene.primitives.add(new Cesium.PointPrimitiveCollection())
  const billboards = viewer.scene.primitives.add(new Cesium.BillboardCollection())
  for (let i = 0; i < points.features.length; i++) {
    const element = points.features[i].geometry.coordinates

    pointPrimitives.add({
      // eslint-disable-next-line new-cap
      position: new Cesium.Cartesian3.fromDegrees(...element),
      color: Cesium.Color.YELLOW
    })
    billboards.add({
      // eslint-disable-next-line new-cap
      position: new Cesium.Cartesian3.fromDegrees(...element),
      id: i + 'test',
      code: i,
      image: test,
      scale: 0.2
    })
  }
  const handle = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
  handle.setInputAction(function (click) {
    // console.log(pick)
    const pick = viewer.scene.pick(click.position)
    console.log(click)
    console.log(pick)
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
}
</script>

<style lang="less" scoped></style>
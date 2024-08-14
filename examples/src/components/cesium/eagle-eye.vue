<template>
  <div class="conainer-map" id="map">
    <div class="eagle-eye" id="eye-map"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { Base } from 'lhcesium'

const { init } = Base


let viewer1, viewer2

let worldPosition
let distance

function sync2DView() {
  const viewCenter = new Cesium.Cartesian2(
    Math.floor(viewer1.canvas.clientWidth / 2),
    Math.floor(viewer1.canvas.clientHeight / 2)
  )
  const newWorldPosition = viewer1.scene.camera.pickEllipsoid(viewCenter)
  if (Cesium.defined(newWorldPosition)) {
    worldPosition = newWorldPosition
  }
  distance = Cesium.Cartesian3.distance(worldPosition, viewer1.scene.camera.positionWC)
  viewer2.scene.camera.lookAt(worldPosition, new Cesium.Cartesian3(0.0, 0.0, distance))
}

onMounted(async () => {
  const v1 = await init('map')
  const v2 = await init('eye-map')
  viewer1 = v1.viewer
  viewer2 = v2.viewer
  viewer1.camera.changed.addEventListener(sync2DView)
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
.eagle-eye {
  position: absolute;
  border: 1px solid white;
  bottom: 10px;
  right: 10px;
  z-index: 10;
}
</style>

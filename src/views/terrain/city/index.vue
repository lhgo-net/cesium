<template>
  <l-map @ready="ready">
    <!-- <div id="toolbar">
      <select data-bind="options: exampleTypes, value: currentExampleType"></select>
      <input type="checkbox" value="false" data-bind="checked: clippingPlanesEnabled, valueUpdate: 'input'">
      Globe clipping planes enabled
      <input type="checkbox" value="false" data-bind="checked: edgeStylingEnabled, valueUpdate: 'input'">
      Edge styling enabled
    </div> -->
  </l-map>
</template>

<script setup>
import gyPolygon from '@/assets/json/贵阳市.json'
// import { flat } from '@/utils/utils.js'

// For tracking state when switching exampleTypes
const clippingPlanesEnabled = true
const edgeStylingEnabled = true
let viewer
function ready(viewers) {
  viewer = viewers
  viewer.terrainProvider = Cesium.createWorldTerrain({
    requestWaterMask: true, // 请求水体效果所需要的海岸线数据
    requestVertexNormals: true, // 请求地形照明数据
  })
  // let tileset

  // function reset() {
  //   viewer.entities.removeAll()
  //   viewer.scene.primitives.remove(tileset)
  // }
  loadGrandCanyon()
}

function points() {
  const points = []
  const planes = []
  // const arr = flat(gyPolygon.features[0].geometry.coordinates)
  const gyPoints = gyPolygon.features[0].geometry.coordinates
  // for (let i = 0; i < arr.length; i + 2) {
  //   const item = arr[i]
  //   const Cartesian3 =  Cesium.Cartesian3.fromDegrees()
  // }
  for (let i = 0; i < gyPoints.length; i++) {
    const element = gyPoints[i]
    for (let l = 0; l < 10; l++) {
      const item = element[0][l]
      points.push(Cesium.Cartesian3.fromDegrees(item[0], item[1]))
    }
  }
  console.log(points)
  for (let i = 0; i < points.length; i++) {
    const item = points[i]
    planes.push(new Cesium.ClippingPlane(new Cesium.Cartesian3(item.x, item.y, item.z), 300000.0))
  }
  return planes
}
async function loadGrandCanyon() {
  const globe = viewer.scene.globe
  // Pick a position at the Grand Canyon
  const position = Cesium.Cartographic.toCartesian(
    // new Cesium.Cartographic.fromDegrees(-113.2665534, 36.0939345, 100)
    // eslint-disable-next-line new-cap
    new Cesium.Cartographic.fromDegrees(106.713478, 26.578343, 300000.0)
  )
  const point = await points()
  console.log(point)
  const distance = 300000.0
  const boundingSphere = new Cesium.BoundingSphere(position, distance)
  globe.clippingPlanes = new Cesium.ClippingPlaneCollection({
    modelMatrix: Cesium.Transforms.eastNorthUpToFixedFrame(position),
    planes: point,
    // planes: [
    //   new Cesium.ClippingPlane(
    //     new Cesium.Cartesian3(1.0, 0.0, 0.0),
    //     distance
    //   ),
    //   new Cesium.ClippingPlane(
    //     new Cesium.Cartesian3(-1.0, 0.0, 0.0),
    //     distance
    //   ),
    //   new Cesium.ClippingPlane(
    //     new Cesium.Cartesian3(0.0, 1.0, 0.0),
    //     distance
    //   ),
    //   new Cesium.ClippingPlane(
    //     new Cesium.Cartesian3(0.0, -1.0, 0.0),
    //     distance
    //   )
    // ],
    unionClippingRegions: true,
    edgeWidth: edgeStylingEnabled ? 1.0 : 0.0,
    edgeColor: Cesium.Color.WHITE,
    enabled: clippingPlanesEnabled,
  })
  globe.backFaceCulling = false
  globe.showSkirts = false

  viewer.camera.viewBoundingSphere(boundingSphere, new Cesium.HeadingPitchRange(1, -1, boundingSphere.radius * 5.0))
  viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY)
}
</script>

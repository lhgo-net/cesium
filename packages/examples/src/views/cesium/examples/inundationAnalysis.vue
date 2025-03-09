<template>
  <div class="conainer-map" id="map">
    <div class="btn">
      <v-sheet>
        <v-lit>
          <v-list-item title="绘制" @click="draw"></v-list-item>
        </v-lit>
      </v-sheet>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { Map } from '@lh/cesium'
const { CallbackProperty, Math } = Cesium

let points = [
  [100.04055555555556, 38.765],
  [100.15777777777778, 38.74777777777778],
  [100.15444444444445, 38.723055555555554],
  [100.04, 38.72277777777778]
]
let polygonArr = []
for (let i = 0; i < points.length; i++) {
  polygonArr.push(points[i][0])
  polygonArr.push(points[i][1])
  polygonArr.push(0)
}

function draw() {
  drawWater(3000, polygonArr, 2000)
}
function drawWater(targetHeight, areaCoor, waterHeight) {
  console.log(targetHeight)
  console.log(areaCoor)
  viewer.scene.primitives.add(
    new Cesium.Primitive({
      geometryInstances: new Cesium.GeometryInstance({
        geometry: Cesium.PolygonGeometry.createGeometry(
          new Cesium.PolygonGeometry({
            polygonHierarchy: new Cesium.PolygonHierarchy(
              Cesium.Cartesian3.fromDegreesArrayHeights(areaCoor)
            ),
            perPositionHeight: true,
            extrudedHeight: new CallbackProperty(function () {
              //此处用属性回调函数，直接设置extrudedHeight会导致闪烁。
              waterHeight += 2
              if (waterHeight > targetHeight) {
                waterHeight = targetHeight //给个最大值
              }
              return waterHeight
            }, false)
          })
        )
      }),
      appearance: new Cesium.Material({
        fabric: {
          type: 'Water',
          uniforms: {
            baseWaterColor: new Cesium.Color(64 / 255.0, 157 / 255.0, 253 / 255.0, 0.5),
            normalMap: 'http://127.0.0.1:5500/example/img/R-C.jpg',
            frequency: 1000.0,
            animationSpeed: 0.1,
            amplitude: 10,
            specularIntensity: 10
          }
        }
      })
    })
  )
}

onMounted(() => {
  new Map('map')
  viewer.terrainProvider = Cesium.createWorldTerrain()
  viewer.scene.globe.depthTestAgainstTerrain = true
  viewer.camera.setView({
    //定位到范围中心点
    destination: Cesium.Cartesian3.fromDegrees(100.1057121, 38.7622031, 3000),
    orientation: {
      heading: Math.toRadians(130.30492990896514),
      pitch: Math.toRadians(-17.364771143804237),
      roll: 0.09931507517437696
    }
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

<template>
  <l-map @ready="ready"></l-map>
</template>

<script setup>
import { lineFlowMaterialProperty } from '../../utils/CesiumExtend/lineFlowMaterialProperty'
const myCesium = lineFlowMaterialProperty(Cesium)

function generateRandomPosition(position, num) {
  const list = []
  for (let i = 0; i < num; i++) {
    // random产生的随机数范围是0-1，需要加上正负模拟
    const lon = position[0] + Math.random() * 0.04 * (i % 2 === 0 ? 1 : -1)
    const lat = position[1] + Math.random() * 0.04 * (i % 2 === 0 ? 1 : -1)
    list.push([lon, lat])
  }
  return list
}
function lineFlowInit(_viewer, _center, _num) {
  const _positions = generateRandomPosition(_center, _num)
  _positions.forEach(item => {
    // 经纬度
    const startLon = item[0]
    const startLat = item[1]

    // eslint-disable-next-line new-cap, no-undef
    const startPoint = new myCesium.Cartesian3.fromDegrees(startLon, startLat, 0)

    // 随机高度
    const height = 5000 * Math.random()
    // eslint-disable-next-line new-cap, no-undef
    const endPoint = new myCesium.Cartesian3.fromDegrees(startLon, startLat, height)
    const linePositions = []
    linePositions.push(startPoint)
    linePositions.push(endPoint)
    _viewer.entities.add({
      polyline: {
        positions: linePositions,
        // eslint-disable-next-line no-undef, no-undef
        material: new myCesium.LineFlowMaterialProperty({
          // eslint-disable-next-line no-undef
          color: new myCesium.Color(1.0, 1.0, 0.0, 0.8),
          speed: 15 * Math.random(),
          percent: 0.1,
          gradient: 0.01
        })
      }
    })
  })
}

async function ready(viewer) {
  lineFlowInit(viewer, [113.280637, 23.125178], 5000)
}
</script>
<template>
  <l-map @ready="ready"></l-map>
</template>

<script setup>
import { lineFlowMaterialProperty } from '../../utils/CesiumExtend/lineFlowMaterialProperty'
import { provider } from '@/utils/ceisum.map'
const myCesium = lineFlowMaterialProperty(Cesium)
const dataSource = new Cesium.CustomDataSource('myEntity')

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
function lineFlowInit(viewer, _center, _num) {
  const _positions = generateRandomPosition(_center, _num)
  _positions.forEach((item, index) => {
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
    const entity = new Cesium.Entity({
      name: 'polyline' + index,
      polyline: {
        positions: linePositions,
        // eslint-disable-next-line no-undef, no-undef
        material: new myCesium.LineFlowMaterialProperty({
          // eslint-disable-next-line no-undef
          color: new myCesium.Color(1.0, 1.0, 0.0, 1.0),
          speed: 10 * Math.random(),
          percent: 0.2,
          gradient: 0.05
        })
      }
    })
    dataSource.entities.add(entity)
  })
  viewer.dataSources.add(dataSource)
  viewer.flyTo(dataSource)
}

async function ready(viewer) {
  const imageLayer = provider(viewer, {
    name: '矢量底图',
    key: 'vec_w'
  })
  const imageLayer1 = provider(viewer, {
    name: '矢量标记',
    key: 'cva_w'
  })
  imageLayer.hue = 3
  imageLayer.contrast = -1.2
  imageLayer1.hue = 3
  imageLayer1.contrast = -1.2
  lineFlowInit(viewer, [106.713478, 26.578343], 1000)
}
</script>
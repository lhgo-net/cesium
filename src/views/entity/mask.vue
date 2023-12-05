<template>
  <l-map @ready="ready"></l-map>
</template>

<script setup>
import { reactive } from 'vue'
import gy from '@/assets/json/贵州省.json'
import * as dat from 'dat.gui'
import { getColorRamp } from '@/utils/utils'

const data = reactive({})

const gui = new dat.GUI()
const obj = {
  遮罩: true
}
gui.add(obj, '遮罩').onChange(e => {
  if (e) {
    mask()
  } else {
    data.viewer.dataSources.removeAll()
    data.viewer.entities.removeAll()
  }
})

function mask() {
  data.viewer.scene.skyAtmosphere = undefined
  let point = []
  const pointHeight = []
  //   const height = []
  //   const minHeight = []
  for (let i = 0; i < gy.features[0].geometry.coordinates[0][0].length; i++) {
    point = point.concat(gy.features[0].geometry.coordinates[0][0][i])
  }
  for (let i = 0; i < gy.features[0].geometry.coordinates[0].length; i++) {
    const item = gy.features[0].geometry.coordinates[0][i]
    for (let l = 0; l < item.length; l++) {
      pointHeight.push(item[l][0])
      pointHeight.push(item[l][1])
      pointHeight.push(10000)
    }
  }
  data.viewer.entities.add({
    // name: 'Green wall from surface with outline',
    wall: {
      positions: Cesium.Cartesian3.fromDegreesArrayHeights(pointHeight),
      material: getColorRamp('rgba(52,192,214,0.0)', 'rgba(15,93,180,0.6)'), // 添加半透明的填充材质
      outline: false,
      outlineColor: Cesium.Color.GREEN
      // material: getColorRamp('rgb(52,192,214)', 'rgb(15,93,180)')
    }
  })
  const hole = Cesium.Cartesian3.fromDegreesArray(point)
  const dataSource = new Cesium.CustomDataSource('inverseShade')
  data.viewer.dataSources.add(dataSource)
  dataSource.entities.add({
    polygon: {
      hierarchy: {
        // 左下左上右上右下
        // 对应经纬度[-0,60],[-0,-60],[-180,-60],[-180,60],[-0,60]
        positions: [
          {
            x: 3197104.586923899,
            y: -0.5580000157243585,
            z: 5500477.1339386385
          },
          {
            x: 3197104.586923899,
            y: -0.5580000157243585,
            z: -5500477.1339386385
          },
          {
            x: -3197104.5869239476,
            y: -3.915323898915733,
            z: -5500477.1339386385
          },
          {
            x: -3197104.5869239476,
            y: -3.915323898915733,
            z: 5500477.1339386385
          },
          {
            x: 3197104.586923899,
            y: -0.5580000157243585,
            z: 5500477.1339386385
          }
        ]
      },
      // 填充的颜色，withAlpha透明度
      material: Cesium.Color.BLACK.withAlpha(0.8),
      // 是否被提供的材质填充
      fill: true,
      // 是否显示
      show: true,
      // 顺序,仅当`clampToGround`为true并且支持地形上的折线时才有效。
      zIndex: 10
    }
  })
  dataSource.entities.add({
    polygon: {
      // 获取指定属性（positions，holes（图形内需要挖空的区域））
      hierarchy: {
        // 左下左上右上右下
        // 对应经纬度[0,60],[0,-60],[180,-60],[180,60],[0,60]
        positions: [
          {
            x: 3197104.586923899,
            y: 0.5580000157243585,
            z: 5500477.1339386385
          },
          {
            x: 3197104.586923899,
            y: 0.5580000157243585,
            z: -5500477.1339386385
          },
          {
            x: -3197104.5869239476,
            y: 3.915323898915733,
            z: -5500477.1339386385
          },
          {
            x: -3197104.5869239476,
            y: 3.915323898915733,
            z: 5500477.1339386385
          },
          {
            x: 3197104.586923899,
            y: 0.5580000157243585,
            z: 5500477.1339386385
          }
        ],
        holes: [{ positions: hole }]
      },
      // 填充的颜色，withAlpha透明度
      material: Cesium.Color.BLACK.withAlpha(0.8),
      // 是否被提供的材质填充
      fill: true,
      // 是否显示
      show: true,
      // 顺序,仅当`clampToGround`为true并且支持地形上的折线时才有效。
      zIndex: 10
    }
  })

  // const test = data.viewer.entities.add({
  //   polyline: {
  //     positions: hole,
  //     width: 5,
  //     material: Cesium.Color.AQUA.withAlpha(1),
  //     clampToGround: true
  //   }
  // })
  data.viewer.zoomTo(data.viewer.entities)
}

function ready(viewer) {
  data.viewer = viewer
  mask()
}
</script>
<template>
  <l-map @ready="ready"></l-map>
</template>

<script setup>
import gy from '@/assets/json/贵州省.json'

function ready(viewer) {
  viewer.scene.skyAtmosphere = undefined
  let point = []
  // point数组中放你自己提亮范围的边界经纬度
  for (let i = 0; i < gy.features[0].geometry.coordinates[0][0].length; i++) {
    point = point.concat(gy.features[0].geometry.coordinates[0][0][i])
  }
  const hole = Cesium.Cartesian3.fromDegreesArray(point)
  const dataSource = new Cesium.CustomDataSource('inverseShade')
  viewer.dataSources.add(dataSource)
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

  const test = viewer.entities.add({
    polyline: {
      positions: hole,
      width: 5,
      material: Cesium.Color.AQUA.withAlpha(1),
      clampToGround: true
    }
  })
  const length = 1100
  console.log(length)
  const height = []
  const minHeight = []
  for (let i = 0; i < length; i++) {
    height.push(10000)
    minHeight.push(5000)
  }
  viewer.entities.add({
    name: 'Green wall from surface with outline',
    wall: {
      positions: hole,
      material: Cesium.Color.GREEN,
      outline: true,
      minimumHeight: 90000,
      maximumHeight: 900000
    }
  })
  //   const redWall = viewer.entities.add({
  //     name: 'Red wall at height',
  //     wall: {
  //       positions: Cesium.Cartesian3.fromDegreesArrayHeights([
  //         -115.0,
  //         44.0,
  //         200000.0,
  //         -90.0,
  //         44.0,
  //         200000.0
  //       ]),
  //       minimumHeights: [100000.0, 100000.0],
  //       material: Cesium.Color.RED
  //     }
  //   })
  viewer.zoomTo(test)
}
</script>
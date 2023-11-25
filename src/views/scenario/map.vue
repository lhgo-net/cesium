<template>
  <div id="map-container" class="map-container"></div>
</template>

<script>
import * as Cesium from 'cesium/Cesium'
import 'cesium/Widgets/widgets.css'
import { flattenArray } from './utlis/index'

import china from '@/assets/json/china_.json'
import chinaPolygon from '@/assets/json/china-polygon.json'
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhYWM4MzJjMS1kZGNkLTRjOTItYTY0Yy0yOTc0MmU1NWNjMGYiLCJpZCI6Njc4NTksImlhdCI6MTY5MDc3MTY0MH0.JfeaZ0xaAz-2qBIdRp6G6ogqCfl4q-cAVu_cvxEEdsU'
Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(90, -20, 110, 90)
export default {
  data() {
    return {
      viewer: null
    }
  },
  methods: {
    initMap() {
      const viewer = new Cesium.Viewer('map-container', {
        animation: false,
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        timeline: false,
        navigationHelpButton: false,
        fullscreenButton: false,
        orderIndependentTranslucency: false,
        infoBox: false,
        selectionIndicator: false,
        baseLayerPicker: false,
        contextOptions: {
          webgl: {
            alpha: true
          }
        }
      })
      this.viewer = viewer
      viewer.scene.skyAtmosphere = undefined

      this.$emit('ready', viewer)
      const promise = Cesium.GeoJsonDataSource.load(chinaPolygon)
      promise.then(dataSource => {
        viewer.dataSources.add(dataSource)
        const entities = dataSource.entities.values

        for (let i = 0; i < entities.length; i++) {
          const entity = entities[i]
          entity.polygon.material = Cesium.Color.DEEPSKYBLUE.withAlpha(0.5)
          entity.polygon.outline = false
          entity.polygon.extrudedHeight = 50000
        }
        // viewer.zoomTo(viewer.dataSources.entities)
      })
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(103.8195, 36.0422, 8000000.0), // 设置高度
        orientation: {
          pitch: Cesium.Math.toRadians(-90), // 设置俯仰角
          heading: Cesium.Math.toRadians(0), // 设置偏航角
          roll: 0.0 // 设置滚转角
        }
      })

      let point = flattenArray(china.geometries[0].coordinates)
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

      const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
      // const pickPosition = { x: null, y: null }
      handler.setInputAction(function (movement) {
        // const a = {
        //   position: viewer.camera.position,
        //   heading: viewer.camera.heading,
        //   pitch: viewer.camera.pitch
        // }
        // console.log(a) // 当前视角
        var pickedObject = viewer.scene.pick(movement.endPosition)
        if (Cesium.defined(pickedObject)) {
          // 鼠标在实体上
          console.log('Mouse over the entity')
        } else {
          // 鼠标不在实体上
          console.log('Mouse not over the entity')
        }
        // const cartesian = viewer.camera.pickEllipsoid(
        //   movement.position,
        //   viewer.scene.globe.ellipsoid
        // )
        // if (cartesian) {
        //   const cartographic = Cesium.Cartographic.fromCartesian(cartesian)
        //   const longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(2)// 要更高的精度就修改保留的小数位数
        //   const latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(2)// 同上
        //   pickPosition.x = longitudeString
        //   pickPosition.y = latitudeString
        //   let cf = { x: parseFloat(pickPosition.x), y: parseFloat(pickPosition.y) }

        //   console.log(cf) // 鼠标点击位置
        // }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
    }
  },
  mounted() {
    this.initMap()
  }
}
</script>

<style scoped>
.map-container{
  height: 100%;
  width: 100%;
}
</style>

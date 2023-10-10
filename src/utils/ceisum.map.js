import 'cesium/Build/Cesium/Widgets/widgets.css'
import * as Cesium from 'cesium'
import { flat, getColorRamp } from './utils'
import { CESIUM_TOKEN, TDT_SUBBDOMAINS, TDT_TOKEN } from '../config/default'
import defaultBJ from '../assets/json/xnBJ.json'

export function map(id) {
  Cesium.Ion.defaultAccessToken = CESIUM_TOKEN
  Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(90, -20, 110, 90)

  const viewer = new Cesium.Viewer(id, {
    geocoder: false, // 位置查找工具
    homeButton: false, // 视角返回初始位置
    sceneModePicker: false, // 选择视角的模式（球体、平铺、斜视平铺）
    baseLayerPicker: false, // 图层选择器（地形影像服务）
    navigationHelpButton: false, // 导航帮助(手势，鼠标)
    animation: false, // 左下角仪表盘（动画器件）
    timeline: false, // 底部时间线
    fullscreenButton: false, // 全屏
    vrButton: false // VR
    // terrain: Cesium.Terrain.fromWorldTerrain()
  })

  viewer._cesiumWidget._creditContainer.style.display = 'none'
  // viewer.scene.screenSpaceCameraController.minimumZoomDistance = 1200
  // viewer.scene.screenSpaceCameraController.maximumZoomDistance = 25000000

  // 修改homeButton的默认返回位置
  window.viewer = viewer

  return viewer
}

export function provider(viewer, obj) {
  const arr = obj.key.split('_')
  const providerImage = new Cesium.ImageryLayer(
    new Cesium.WebMapTileServiceImageryProvider({
      url: `http://{s}.tianditu.com/${obj.key}/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=${arr[0]}&tileMatrixSet=${arr[1]}&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=${TDT_TOKEN}`,
      layer: obj.key, // WMTS请求的层名称
      style: 'default', // WMTS请求的样式名称
      format: 'image/jpeg',
      tileMatrixSetID: 'GoogleMapsCompatible', // 用于WMTS请求的TileMatrixSet的标识符
      subdomains: TDT_SUBBDOMAINS, // 天地图8个服务器
      minimumLevel: 0, // 最小层级
      maximumLevel: 18 // 最大层级
    })
  )
  viewer.imageryLayers.add(providerImage)
  return providerImage
}

export function SceneMode(viewer, val) {
  if (val === '2D') {
    viewer.scene.mode = Cesium.SceneMode.SCENE2D
  } else {
    viewer.scene.mode = Cesium.SceneMode.SCENE3D
  }
}

export function highlighCity(geo) {
  const globe = viewer.scene.globe
  globe.translucency.enabled = true
  globe.globeAloha = 0
  globe.undergroundColor = undefined
  globe.translucency.backFaceAlpha = 0
  globe.baseColor = new Cesium.Color(0, 0, 0, 0)
  const BJ = geo || defaultBJ
  const geoJSON = BJ.geometries[0].coordinates[0]
  const coordinates = flat(geoJSON)
  const pointList = []
  const maxHeight = []
  const minHeight = new Array(coordinates.length / 2).fill(-1000)
  viewer.imageryLayers.removeAll()
  viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
    url: '/GISFile/terrain/xn'
  })
  viewer.imageryLayers.addImageryProvider(
    new Cesium.UrlTemplateImageryProvider({
      url: '/GISFile/imageLayer/xn/{z}/{x}/{y}.png'
    })
  )
  for (let i = 0; i < geoJSON.length; i++) {
    pointList.push(Cesium.Cartographic.fromDegrees(geoJSON[i][0], geoJSON[i][1]))
  }
  const promise = Cesium.sampleTerrainMostDetailed(viewer.terrainProvider, pointList)
  promise.then(updatedPositions => {
    for (let i = 0; i < updatedPositions.length; i++) {
      maxHeight.push(updatedPositions[i].height)
    }
    const wall = viewer.entities.add({
      id: 'wall',
      wall: {
        positions: Cesium.Cartesian3.fromDegreesArray(coordinates),
        maximumHeights: maxHeight,
        minimumHeights: minHeight,
        material: getColorRamp('rgb(52,192,214)', 'rgb(15,93,180)')
      }
    })
    viewer.zoomTo(wall)
  })
}

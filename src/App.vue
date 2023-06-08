<script setup>
import 'cesium/Build/Cesium/Widgets/widgets.css'
import * as Cesium from 'cesium'
import { onMounted } from 'vue';

onMounted(() => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiY2UyZTUzZi05YmM5LTRlYzAtYmUyNi02NGYzNjE1ZGFkNGQiLCJpZCI6Njc4NTksImlhdCI6MTYzMjE0Mjg3Mn0.LIVC0sPo5GDd6c1GTDmCqSZOMIijKc5bPACcNI8Sxpc'
  Cesium.Ion.defaultAccessToken = token
  const viewer = new Cesium.Viewer('cesiumContainer', {
    geocoder: false,   // 位置查找工具
    homeButton: false,  // 视角返回初始位置
    sceneModePicker: false,   // 选择视角的模式（球体、平铺、斜视平铺）
    baseLayerPicker: false,    // 图层选择器（地形影像服务）
    navigationHelpButton: false,   // 导航帮助(手势，鼠标)
    animation: false,   // 左下角仪表盘（动画器件）
    timeline: false,   // 底部时间线
    fullscreenButton: false,   // 全屏
    vrButton: false,  // VR
    terrainProvider: Cesium.createWorldTerrain()
  })
  viewer._cesiumWidget._creditContainer.style.display = "none"
  viewer.imageryLayers.get(0).show = false
  viewer.scene.primitives.add(Cesium.createOsmBuildings())

  const subdomains = ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"]
  const key = '405cbfa73674c6d32b2f3f4719b1d92c'
  const providerImage = new Cesium.WebMapTileServiceImageryProvider({
    url: `http://{s}.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=${key}`,
    layer: "img_w",	//WMTS请求的层名称
    style: "default",//WMTS请求的样式名称
    format: "tiles",//MIME类型，用于从服务器检索图像
    format: "image/jpeg",
    tileMatrixSetID: "GoogleMapsCompatible",//	用于WMTS请求的TileMatrixSet的标识符
    subdomains: subdomains,//天地图8个服务器
    minimumLevel: 1,//最小层级
    maximumLevel: 16,//最大层级
  })
  const providerLabel = new Cesium.WebMapTileServiceImageryProvider({
    url: "http://{s}.tianditu.gov.cn/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0" +
      "&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}" +
      "&style=default.jpg&tk=" + key,
    // url: TDT_CVA_W,//url地址
    layer: "cia_w",	//WMTS请求的层名称
    style: "default",//WMTS请求的样式名称
    format: "tiles",//MIME类型，用于从服务器检索图像
    tileMatrixSetID: "GoogleMapsCompatible",//	用于WMTS请求的TileMatrixSet的标识符
    subdomains: subdomains,//天地图8个服务器
    minimumLevel: 0,//最小层级
    maximumLevel: 18,//最大层级
  })
  const imageryLayer = new Cesium.ImageryLayer(providerImage)
  const imageryLabel = new Cesium.ImageryLayer(providerLabel)
  viewer.imageryLayers.add(imageryLayer)
  viewer.imageryLayers.add(imageryLabel)
  console.log(viewer)
})

</script>

<template>
  <div id="cesiumContainer"></div>
</template>

<style scoped>
#cesiumContainer {
  height: 100vh;
  width: 100vw;
}
</style>

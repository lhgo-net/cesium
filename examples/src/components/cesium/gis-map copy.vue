<!-- <script src="../../BigScreen/bigScreen.api.ts"></script> -->
<template>
  <div class="app-contain">
    <!-- leaflet 地图容器 -->
    <div id="myMap"></div>
  </div>
</template>

<script setup>
// 本地资源数据
import dot3Url from '@/assets/images/vector.png'
// 引入样式
import { onMounted, ref, nextTick, computed } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
// 地图聚合 Leaflet.markercluster(聚合图层)
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import 'leaflet.markercluster'

const props = defineProps({
  dataLan: {
    type: Object,
    default: () => {},
  },
})

const defData = computed(() => props.dataLan.gtTaxiLatAndLngDtos)

let map = null
const initMap = () => {
  const imagesLayer = L.tileLayer(
    `http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}`
  )

  const layers = L.layerGroup([imagesLayer])
  map = L.map('myMap', {
    //需绑定地图容器div的id
    center: [39.56, 116.2], //初始地图中心
    zoom: 3, //初始缩放等级
    maxZoom: 15,
    minZoom: 3,
    zoomControl: false, //缩放组件
    attributionControl: false, //去掉右下角logol
    scrollWheelZoom: true, //默认开启鼠标滚轮缩放
    // 限制显示地理范围
    maxBounds: L.latLngBounds(L.latLng(-80, -180), L.latLng(80, 180)),
    layers: [layers], // 图层
  }).setView([31.7391549, 118.3503943], 13)
  L.circle([31.7391549, 118.3503943], {
    radius: 5000,
    boxShadow: 'inset 0px 0px 54px 0px #2DA0F2',
    color: 'rgba(45,160,242,0.01)',
    fillColor: '#2DA0F2 ',
    fillOpacity: 0.3,
  }).addTo(map)
  /** 地图聚合 */
  addMapFeature(defData.value)
}

// 地图聚合
const addMapFeature = (data) => {
  // 创建新的聚合图层，向其添加标记，然后将其添加到地图中
  const projectPointLayer = L.markerClusterGroup({
    showCoverageOnHover: false, // 为true时,当鼠标悬停在聚合点上时，它会显示它聚合的边界
    zoomToBoundsOnClick: true, //  为true时，当鼠标点击某个聚合点时，会缩放到它的边界范围
    chunkedLoading: true,
    spiderfyOnMaxZoom: true,
    maxClusterRadius: 80, // 聚类从中心标记覆盖的最大半径（以像素为单位）,默认值 80
    spiderLegPolylineOptions: { weight: 1, color: '#222', opacity: 0.5 },
  }).addTo(map)
  let geojson = data
  if (geojson) {
    addProjectClusterLayers(geojson, projectPointLayer)
    projectPointLayer.on('click', function (e) {
      e.layer.unbindPopup() // 用于解除地图图层（layer）与其关联的弹出窗口（popup）
      // 图层点击弹出窗口处理事件
      // const elements = getProjectPopupContent(e.layer.options.properties) // 返回内容
      // e.layer.bindPopup(elements).openPopup(e.latlng) // 弹窗
    })
  }
}

/*
 * 点单击内容函数
 */
const getProjectPopupContent = (item) => {
  // 内容及单击事件
  const elements = `<div>${toPopupItemStr('经度', item.lon)} ${toPopupItemStr(
    '纬度',
    item.lat
  )} ${toPopupItemStr('阈值', item.valve)}</div>`
  return elements
}
const toPopupItemStr = (name, value) => {
  return value ? `<b>${name}:</b>${value}<br>` : ''
}

/*
 * 加载聚合图层
 */
const addProjectClusterLayers = async (geojson, clusterlayer) => {
  let markerList = [] // 聚合标记点列表
  if (geojson.length > 0) {
    for (let i = 0; i < geojson.length; i++) {
      // if (geojson.features[i].geometry) {
      if (geojson) {
        // const properties = geojson.features[i].properties
        // const coordinate = geojson.features[i].geometry.coordinates
        /*  点状展示样式(无聚合状态) */
        let img = dot3Url
        const myIcon = L.icon({
          iconUrl: img,
          iconSize: [40, 25],
        })
        const marker = L.marker(new L.LatLng(geojson[i].lat, geojson[i].lng), {
          // properties: properties,
          icon: myIcon,
        })
        markerList.push(marker)
      }
    }
  }
  clusterlayer.addLayers(markerList)
}

onMounted(() => {
  initMap()
})
</script>

<style scoped>
.app-contain {
  height: 100%;
}
#myMap {
  /* width: 92vw; */
  height: 141vh;
  /* height: 100%; */
  /* height: 500px; */
}

.blue-theme {
  --leaflet-primary-color: blue;
  --leaflet-primary-text-color: white;
}
</style>

<template>
  <l-map @ready="ready"> </l-map>
</template>

<script setup>
import * as dat from 'dat.gui'
import lMap from '@/components/map.vue'
import { onMounted, onUnmounted, reactive } from 'vue'
import { provider } from '@/utils/ceisum.map'

const gui = new dat.GUI()
const folder = gui.addFolder('天地图')
const themeFolder = gui.addFolder('主题')

const layer = {
  全球影像底图: function () {
    provider(data.viewer, { name: '全球影像底图(墨卡托投影)', key: 'img_w' })
  },
  全球矢量底图: function () {
    provider(data.viewer, { name: '全球影像底图(墨卡托投影)', key: 'vec_w' })
  },
  全球地形晕渲: function () {
    provider(data.viewer, { name: '全球地形晕渲(墨卡托投影)', key: 'ter_w' })
  },
  全球矢量注记: function () {
    provider(data.viewer, { name: '全球矢量注记(墨卡托投影)', key: 'cva_w' })
  },
  全球影像注记: function () {
    provider(data.viewer, { name: '全球影像注记(墨卡托投影)', key: 'cia_w' })
  },
  全球地形注记: function () {
    provider(data.viewer, { name: '全球地形注记(墨卡托投影)', key: 'cta_w' })
  },
}

const theme = {
  blue: function () {
    const layers = data.viewer.scene.imageryLayers
    layers.addImageryProvider(
      new Cesium.MapboxStyleImageryProvider({
        url: 'https://api.mapbox.com/styles/v1',
        username: 'hklh',
        styleId: 'clpki9oma007x01px73gmc9l6',
        accessToken: 'pk.eyJ1IjoiaGtsaCIsImEiOiJjbDMzdHR5bTcxcTc3M2ptaGxlODEzZnlhIn0.9ZagRtR3ZH3koVr_OUBUCA',
        scaleFactor: true,
      })
    )
  },
  sky: function () {
    const layers = data.viewer.scene.imageryLayers
    layers.addImageryProvider(
      new Cesium.MapboxStyleImageryProvider({
        url: 'https://api.mapbox.com/styles/v1',
        username: 'hklh',
        styleId: 'clpkm2ouj009901r88waa6m9j',
        accessToken: 'pk.eyJ1IjoiaGtsaCIsImEiOiJjbDMzdHR5bTcxcTc3M2ptaGxlODEzZnlhIn0.9ZagRtR3ZH3koVr_OUBUCA',
        scaleFactor: true,
      })
    )
  },
}

folder.add(layer, '全球影像底图').onChange((e) => e)
folder.add(layer, '全球矢量底图').onChange((e) => e)
folder.add(layer, '全球地形晕渲').onChange((e) => e)
folder.add(layer, '全球矢量注记').onChange((e) => e)
folder.add(layer, '全球影像注记').onChange((e) => e)
folder.add(layer, '全球地形注记').onChange((e) => e)
folder.open()

themeFolder.add(theme, 'blue').onChange((e) => e)
themeFolder.add(theme, 'sky').onChange((e) => e)
themeFolder.open()

const data = reactive({})

onMounted(() => {})
onUnmounted(() => {})

function ready(viewer) {
  data.viewer = viewer
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(113.330789, 23.111273, 1000),
    orientation: {
      // 设置相机的Heading，Pitch，Roll，参照上图
      heading: Cesium.Math.toRadians(-180),
      pitch: Cesium.Math.toRadians(-35),
      roll: 0.0,
    },
    duration: 3,
  })
}
</script>

<template>
  <div style="background-color: black; height: 100%">
    <header
      style="
        color: white;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      "
    >
      <!-- <dv-decoration-5 style="width: 300px; height: 40px">
      </dv-decoration-5> -->
      <dv-decoration-7 style="height: 30px"><h2>气象数据系统</h2></dv-decoration-7>
      <div style="width: 100%; display: flex; justify-content: space-between">
        <dv-decoration-3 style="width: 250px; height: 20px" />
        <dv-decoration-3 style="width: 250px; height: 20px" />
      </div>
      <dv-decoration-2 style="height: 5px" />
    </header>
    <div class="container" demo-bg>
      <div class="left">
        <dv-border-box-12 :dur="5" :color="color">
          <Tree :data="cityData" @changeCity="handlerSelect"></Tree>
        </dv-border-box-12>
      </div>
      <div class="main">
        <div class="top">
          <div class="map">
            <dv-border-box-12 style="padding: 10px">
              <div id="map" style="height: 100%"></div>
            </dv-border-box-12>
          </div>
          <div class="map-right">
            <dv-border-box-12 :dur="5" :color="color">
              <list></list>
            </dv-border-box-12>
          </div>
        </div>
        <div class="bottom">
          <dv-border-box-12 :dur="5" :color="color">
            <!-- <div dv-bg>dv-border-box8</div> -->
          </dv-border-box-12>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import list from './list.vue'
import { ref } from 'vue'
import Tree from '@/components/tool/tree/index.vue'
import cityData from '@/assets/json/area-full.json'
import { onMounted } from 'vue'
// import axios from 'axios'

import { Base } from '@lh/cesium'

const { init, ImageryLayerConfig, addImageryLayer, modifyMap } = Base
const color = ref([])

// const model = ref(false)

// const changeCity = (city) => {
//   axios
//     .get('https://geo.datav.aliyun.com/areas_v3/bound/geojson', {
//       params: {
//         code: `${city.adcode}${model.value ? '_full' : ''}`
//       }
//     })
//     .then((res) => {
//       addGeoJson(res.data)
//     })
// }

// const addGeoJson = (geo) => {
//   viewer.dataSources.removeAll()
//   const promise = Cesium.GeoJsonDataSource.load(geo)
//   promise.then((datasource) => {
//     viewer.dataSources.add(datasource)
//     viewer.zoomTo(datasource)
//     let entities = datasource.entities.values
//     for (let i = 0; i < entities.length; i++) {
//       let entity = entities[i]

//       entity.polygon.material = new Cesium.ColorMaterialProperty(
//         new Cesium.Color(255, 255, 255, 0.1)
//       )
//       entity.polygon.extrudedHeight = 100
//       entity.polygon.outline = true
//       entity.polygon.outlineColor = Cesium.Color.LIGHTSKYBLUE
//     }
//   })
// }

const handlerSelect = (item) => {
  console.log(item)
}

onMounted(async () => {
  const { viewer } = await init('map', { showSkyAtmosphere: false })
  viewer.scene.fog.enabled = false
  addImageryLayer(
    viewer,
    ImageryLayerConfig.gaode_ver.type,
    ImageryLayerConfig.gaode_ver.options
  )
  // modifyMap(viewer, true, [255, 255, 255])
})
</script>

<style scoped lang="scss">
.container {
  height: calc(100vh - 68px);
  display: flex;
  gap: 10px;
  background-color: black;
  padding: 10px;
}

.left {
  flex: 2;
}
.main {
  flex: 10;
  .top {
    height: 70vh;
    display: flex;
    gap: 10px;
    .map {
      flex: 10;
      padding: 10px;
    }
    .map-right {
      flex: 4;
    }
  }
  .bottom {
    height: 22.5vh;
    margin-top: 10px;
  }
}
</style>

<style>
.border-box-content {
  overflow: auto !important;
}
/* 自定义滚动条的宽度和高度 */
.border-box-content::-webkit-scrollbar {
  width: 5px;
  height: 12px;
}

/* 自定义滚动条轨道（背景）的样式 */
.border-box-content::-webkit-scrollbar-track {
  background: white;
  border-radius: 6px;
}

/* 自定义滚动条的滑块（前景）的样式 */
.border-box-content::-webkit-scrollbar-thumb {
  background: linear-gradient(to top, #7acaec, white);
  border-radius: 6px;
}

/* 当鼠标悬停在滑块上时，改变滑块的颜色 */
.border-box-content::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.7);
}
</style>

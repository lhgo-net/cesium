<template>
  <div class="app-container">
    <l-header></l-header>
    <l-sider position="left">
      <div class="chart-container" v-for="item in list.data" :key="item.name" @click="click(item)">
        <v-card color="rgba(0,0,0,0)" border flat>
          <v-card-title class="text-white">{{item.name}}</v-card-title>
          <v-img src="https://cdn.vuetifyjs.com/images/cards/house.jpg" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="220px" cover>

            <v-card-text class="text-white">{{item.text}}</v-card-text>
            <!-- <v-card-subtitle class="text-white">{{item.text}}</v-card-subtitle> -->
          </v-img>
          <!-- <v-card-title class="text-white text-h6">{{item.name}}</v-card-title> -->

        </v-card>
      </div>
    </l-sider>
    <l-sider position="right">
      <div class="chart-container">
        <l-line :option="option" id="chart4"></l-line>
      </div>
      <div class="chart-container">
        <l-line :option="option" id="chart5"></l-line>
      </div>
      <div class="chart-container">
        <l-line :option="option" id="chart6"></l-line>
      </div>
    </l-sider>
    <l-map></l-map>
    <l-nav>
      <!-- <div style="color:white;text-align: center;">
        <ul>
          <li>地形观测</li>
          <li>建筑模型</li>
          <li>模拟走行</li>
        </ul>
      </div> -->
    </l-nav>
  </div>
</template>

<script setup>
import { onMounted, reactive, warn } from 'vue'
import lMap from '@/components/map.vue'
import lHeader from '@/components/header.vue'
import lSider from '@/components/sider.vue'
import lNav from '@/components/nav.vue'
import lLine from '@/components/chart/chart.vue'

import * as echarts from 'echarts'

import gz from '@/assets/json/广州市.json'
import { provider,highlighCity } from '@/utils/ceisum.map'
import { flyLine } from '@/utils/event'

const list = reactive({
  data: [
    {
      name: '矢量建筑模型',
      fun: createOsmBuildings,
      text: '全球城市矢量建筑模型',
    },
    {
      name: '3D突出城市',
      fun: highlighCity,
      img: '',
    },
    {
      name: '加载天地图',
      fun: '',
      img: '',
    },
  ],
})

onMounted(async () => {
  flyLine() //飞线
  // provider(viewer, {
  //   name: '影像底图',
  //   key: 'img_w',
  // })
  // try {
  //   const imageryLayer = viewer.imageryLayers.addImageryProvider(await Cesium.IonImageryProvider.fromAssetId(2))
  //   await viewer.zoomTo(imageryLayer)
  // } catch (error) {}
  console.log(viewer)
  // createOsmBuildings()
  // start()
  // for (let i = 0; i < list.data.length; i++) {
  //   const item = list.data[i];
  //   item.fun()
  // }
})

const option = {
  title: {
    text: '未定义的数据',
    textStyle: {
      color: 'white',
    },
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985',
      },
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      axisLabel: {
        color: 'white',
      },
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
  ],
  yAxis: [
    {
      type: 'value',
      axisLabel: {
        color: 'white',
      },
    },
  ],
  series: [
    {
      name: 'Email',
      type: 'line',
      stack: 'Total',
      smooth: true,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(128, 255, 165)',
          },
          {
            offset: 1,
            color: 'rgb(1, 191, 236)',
          },
        ]),
      },
      emphasis: {
        focus: 'series',
      },
      data: [120, 132, 101, 134, 90, 230, 210],
    },
  ],
}

function click(item) {
  console.log(item)
  item.fun()
}

function flat(arr) {
  if (Object.prototype.toString.call(arr) != '[object Array]') {
    return false
  }
  let res = []
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] instanceof Array) {
      res = res.concat(flat(arr[i]))
    } else {
      res.push(arr[i])
    }
  }
  return res
}

async function createOsmBuildings() {
  const osmBuildingsTileset = await Cesium.createOsmBuildingsAsync()
  viewer.scene.primitives.add(osmBuildingsTileset)
}

function start() {
  console.log(gz)
  // const promise = Cesium.GeoJsonDataSource.load(gz)
  // promise.then((dataSources) => {
  //   viewer.dataSources.add(dataSources)
  //   viewer.zoomTo(dataSources.entities)
  // })

  const positionLines = flat(gz.features[0].geometry.coordinates[0])
  const line = gz.features[0].geometry.coordinates[0]
  const maximumHeights = []
  const minimumHeights = []
  for (let i = 0; i < positionLines.length / 2; i++) {
    // const item = positionLines.length / 2[i]
    maximumHeights.push(10000)
    minimumHeights.push(1000)
  }
  // console.log(positionLines)
  viewer.entities.add({
    name: 'wall',
    wall: {
      positions: Cesium.Cartesian3.fromDegreesArray(positionLines),
      maximumHeights: maximumHeights,
      minimumHeights: minimumHeights,
      material: Cesium.Color.BLUE.withAlpha(0.5),
      outline: true,
      outlineColor: Cesium.Color.BLACK,
    },
  })
  // viewer.entities.add({
  //   name: 'polyline',
  //   polyline: {
  //     positions: Cesium.Cartesian3.fromDegreesArray(positionLines),
  //     width: 10,
  //     material: new Cesium.PolylineGlowMaterialProperty({
  //       glowPower: 0.2,
  //       taperPower: 0.5,
  //       color: Cesium.Color.CORNFLOWERBLUE,
  //     }),
  //   },
  // })
  viewer.zoomTo(viewer.entities)
}
</script>

<style scoped lang="less">
.app-container {
  position: relative;
}

.chart-container {
  height: 30vh;
}
ul {
  margin: 0;
  padding: 0;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  li {
    list-style: none;
    padding: 5px;
  }
}
/* .right-container,.left-container{
    position: absolute;
    top: 64px;
} */
</style>
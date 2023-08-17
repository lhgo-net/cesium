<template>
  <div class="app-container">
    <l-header></l-header>
    <!-- <l-sider position="left">
      <div class="chart-container" v-for="item in list.data" :key="item.name" @click="click(item)">
        <v-card color="rgba(0,0,0,0)" border flat>
          <v-card-title class="text-white">{{item.name}}</v-card-title>
          <v-img src="https://cdn.vuetifyjs.com/images/cards/house.jpg" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="220px" cover>
            <v-card-text class="text-white">{{item.text}}</v-card-text>
          </v-img>
        </v-card>
      </div>
    </l-sider> -->
    <!-- <l-sider position="right">
      <div class="chart-container">
        <l-line :option="option" id="chart4"></l-line>
      </div>
      <div class="chart-container">
        <l-line :option="option" id="chart5"></l-line>
      </div>
      <div class="chart-container">
        <l-line :option="option" id="chart6"></l-line>
      </div>
    </l-sider> -->
    <l-map></l-map>
    <l-nav>
      <div style="color:white;text-align: center;">
        <ul>
          <li>地形观测</li>
          <li>建筑模型</li>
          <li>模拟走行</li>
        </ul>
      </div>
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
import { flyLine,mockGuizhouPoint,clustering,anlie1 } from '@/utils/event'

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
  // flyLine() //飞线

  const imageLayer = provider(viewer, {
    name: '矢量底图',
    key: 'vec_w',
  })
  const imageLayer1 = provider(viewer, {
    name: '矢量标记',
    key: 'cva_w',
  })
  createOsmBuildings()
  imageLayer.hue = 3
  imageLayer.contrast = -1.2
  imageLayer1.hue = 3
  imageLayer1.contrast = -1.2

  // clustering()
  // anlie1()
  console.log(imageLayer)
  console.log(viewer)
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
  item.fun()
}

async function createOsmBuildings() {
  const osmBuildingsTileset = await Cesium.createOsmBuildingsAsync()
  viewer.scene.primitives.add(osmBuildingsTileset)
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
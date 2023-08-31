<template>
  <div>

  </div>
</template>

<script setup>
import { nextTick, onMounted, reactive } from 'vue'
import axios from '@/server/axios'

const store = reactive({
  image: []
})

function walkThroughTasks() { // 获取走航任务
  axios.post('/api/radar/sail/queryTaskListByDate', {
    dateStr: '2023-06-08',
    deviceCode: 'KC-04161',
    isFilter: '0'
  }).then(res => {
    store.tasks = res.data.data
    console.log(res.data.data)
    return res.data.data
  })
}

function walkThroughTrajectory(taskId, startRecId, endRecId) { // 获取走航轨迹
  return new Promise((resolve, reject) => {
    axios.post('/api/radar/sail/querySailChilds', {
      taskId,
      startRecId,
      endRecId
    }).then(res => {
      store.trajectory = res.data.data
      resolve(res.data.data)
    })
  })
}

function walkThroughImage(taskId, startRecId, maxColor = 1, capt = 0.7, pointNum = 135, type = 0) { // 获取走行图谱
  return new Promise((resolve, reject) => {
    axios.get('/api/radar/sail/querySailImg', {
      params: {
        taskId,
        startRecId,
        maxColor,
        capt,
        pointNum,
        type
      },
      responseType: 'blob'
    }, {
      Headers: {
        'Content-Type': 'image/png;charset=UTF-8'
      }
    }
    ).then(res => {
      store.image.push(res)
      resolve(res)
    })
  })
}

function toImage(data) {
  const blob = new Blob([data], { type: 'image/png' })
  // const reader = new FileReader()
  const url = window.URL.createObjectURL(blob)
  const img = document.createElement('img')
  // const body = document.querySelector('body')
  img.src = url
  return url
}
function handleParam() {
  const taskId = 30116
  for (let i = 0; i < 301; i++) {
    Promise.all([walkThroughTrajectory(taskId, i, i + 1), walkThroughImage(taskId, i)])
      .then(async res => {
        if (res[0] && res[0].length > 1) {
          const arr = []
          let url
          for (let i = 0; i < res[0].length; i++) { // 处理坐标
            const item = res[0][i]
            arr.push(item.jingDu)
            arr.push(item.weiDu)
            arr.push(1000.0)
            url = toImage(res[1].data)
          }

          await wall(arr, url)
        }
      })
  }
  viewer.zoomTo(viewer.entities)
  console.log(viewer.entities)
}
// function img() {
//   new Cesium.MaterialProperty()
// }

function wall(arr, url) {
  // console.log(arr)
  viewer.entities.add({
    wall: {
      positions: Cesium.Cartesian3.fromDegreesArrayHeights(arr),
      material: new Cesium.ImageMaterialProperty({
        image: url
      }),
      outline: false
    }
  })
}

onMounted(() => {
  nextTick(() => {
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(104.36140497906362, 31.058718684416775, 10000)
    })
    walkThroughTasks()
    handleParam()
    // wall()

    const greenWall = viewer.entities.add({
      name: 'Green wall from surface with outline',
      wall: {
        positions: Cesium.Cartesian3.fromDegreesArrayHeights([
          104.36140497906362,
          31.058718684416775,
          1000.0,
          104.36090217470567,
          31.059292559123275,
          1000.0]),
        material: Cesium.Color.GREEN,
        outline: true
      }
    })
    viewer.zoomTo(greenWall)
  })
})

</script>

<style less scoped>

</style>
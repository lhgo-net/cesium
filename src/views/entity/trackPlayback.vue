<template>
  <div>
    <l-map></l-map>
  </div>
</template>

<script setup>
import lMap from '@/components/map.vue'
import { onMounted, ref } from 'vue'
// import { useRouter } from 'vue-router'

// const router = useRouter()
// const route = useRoute()

function trackPlayback() {
  const dataSource = new Cesium.CustomDataSource('myData')
  const lujing = [
    [107.053287, 26.778993],
    [107.055953, 26.779768],
    [107.064043, 26.787965],
    [107.074581, 26.802795],
    [107.088892, 26.803218],
    [107.105905, 26.810333],
    [107.110221, 26.813996],
    [107.121163, 26.815228],
    [107.130557, 26.820265],
    [107.143923, 26.81841],
    [107.172442, 26.819161],
    [107.19721, 26.806435],
    [107.208278, 26.812164],
    [107.216657, 26.811941],
    [107.225071, 26.808807],
    [107.228695, 26.806811],
    [107.233958, 26.805519],
    [107.239544, 26.804944],
    [107.244484, 26.80222],
    [107.246088, 26.797206],
    [107.248628, 26.794917],
    [107.252309, 26.7942],
    [107.255252, 26.792286],
    [107.257584, 26.793108],
    [107.259303, 26.795727],
    [107.26257, 26.797523],
    [107.26609, 26.803241]
  ]

  dataSource.entities.add({
    name: 'line',
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArray(lujing.flat()),
      material: Cesium.Color.RED,
      width: 2
    }
    // billboard: {
    //   image: 'image.png'
    // }
  })
  viewer.zoomTo(dataSource)
  const property = new Cesium.SampledPositionProperty()
  const startTime = new Date()
  const timeSamp = startTime.getTime()
  let stopTime
  for (let index = 0; index < lujing.length; index++) {
    const item = lujing[index]
    const time = new Date(timeSamp + index * 5000)
    stopTime = time
    const position = Cesium.Cartesian3.fromDegrees(item[0], item[1])
    property.addSample(Cesium.JulianDate.fromDate(time), position)
  }
  lujing.forEach((item, index) => {
    const time = new Date(timeSamp + index * 5000)
    stopTime = time
    const position = Cesium.Cartesian3.fromDegrees(item[0], item[1])
    property.addSample(Cesium.JulianDate.fromDate(time), position)
  })
  viewer.dataSources.add(dataSource)
}

onMounted(async () => {
  trackPlayback()
})

</script>
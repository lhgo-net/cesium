<template>
  <div>
    <l-map @ready="ready"></l-map>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
// import { useRouter } from 'vue-router'

// const router = useRouter()
// const route = useRoute()

function ready(viewer) {
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
  })
  const property = new Cesium.SampledPositionProperty()
  const startTime = new Date()
  const timeSamp = startTime.getTime()
  let stopTime
  lujing.forEach((item, index) => {
    const time = new Date(timeSamp + index * 5000)
    stopTime = time
    console.log(stopTime)
    const position = Cesium.Cartesian3.fromDegrees(item[0], item[1])
    property.addSample(Cesium.JulianDate.fromDate(time), position)
  })
  property.setInterpolationOptions({
    interpolationDegree: 0.00001,
    interpolationAlgorithm: Cesium.LagrangepolynomialApproxmation
  })
  viewer.entities.add({
    availability: new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
      start: Cesium.JulianDate.fromDate(startTime),
      stop: Cesium.JulianDate.fromDate(new Date(stopTime))
    })]),
    position: property,
    path: {
      leadTime: 0,
      resolution: 1,
      material: new Cesium.PolylineGlowMaterialProperty({
        glowPower: 0.1,
        color: Cesium.Color.GREEN
      }),
      width: 10
    },
    billboard: {
      image: '/img/222.png'
    }
  })
  viewer.clock.currentTime = Cesium.JulianDate.fromDate(startTime)
  viewer.clock.stopTime = Cesium.JulianDate.fromDate(new Date(stopTime))
  viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP
  viewer.clock.shouldAnimate = true
  viewer.dataSources.add(dataSource)
  viewer.zoomTo(dataSource)
}

onMounted(async () => {
})

</script>
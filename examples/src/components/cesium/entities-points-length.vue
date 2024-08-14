<template>
  <div class="conainer-map" id="map">
    <div class="btn ma-8">
      <dv-button border="Border2" color="#4c8045" id="line">线长</dv-button>
      <dv-button border="Border2" color="#4c8045" id="circle">圆面积</dv-button>
      <dv-button border="Border2" color="#4c8045" id="ract">矩形面积</dv-button>
      <dv-button border="Border2" color="#4c8045" id="polygon">多边形面积</dv-button>
      <dv-button border="Border2" color="#4c8045" id="clear">清除</dv-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { Base, Mix } from 'lhcesium'

const {Length} = Mix
const { DrawLine, DrawCircle, DrawRect, DrawPolygon } = Mix

let Viewer = null
let drawArr = []

const event = [
  {
    id: 'line',
    click: () => {
      let kk = new DrawLine(Viewer)
      console.log(kk.activePoints)
      drawArr.push(kk)
    }
  },
  {
    id: 'circle',
    click: () => {
      let kk = new DrawCircle(Viewer)
      drawArr.push(kk)
    }
  },
  {
    id: 'ract',
    click: () => {
      let kk = new DrawRect(Viewer)
      drawArr.push(kk)
    }
  },
  {
    id: 'polygon',
    click: () => {
      let kk = new DrawPolygon(Viewer)
      drawArr.push(kk)
    }
  },
  {
    id: 'clear',
    click: () => {
      drawArr.forEach((draw) => {
        draw.clear()
      })
    }
  }
]

onMounted(async () => {
  const { viewer } = await Base.init('map')
  Viewer = viewer
  event.forEach((item) => {
    const dom = document.querySelector(`#${item.id}`)
    dom.addEventListener('click', item.click)
  })
  //   const area = new LineLength(viewer)
})
</script>
<style scoped>
.conainer-map {
  position: relative;
}
.btn {
  position: absolute;
  z-index: 10;
}
</style>

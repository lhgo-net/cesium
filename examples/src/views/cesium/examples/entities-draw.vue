<template>
  <div class="conainer-map" id="map">
    <div class="btn">
      <dv-button border="Border2" color="#4c8045" id="line">线</dv-button>
      <dv-button border="Border2" color="#4c8045" id="circle">圆</dv-button>
      <dv-button border="Border2" color="#4c8045" id="ract">矩形</dv-button>
      <dv-button border="Border2" color="#4c8045" id="polygon">多边形</dv-button>
      <dv-button border="Border2" color="#4c8045" id="clear">清除</dv-button>

      <!-- <v-sheet>
        <v-lit>
          <v-list-item title="线" id="line"></v-list-item>
          <v-list-item title="圆" id="circle"></v-list-item>
          <v-list-item title="矩形" id="ract"></v-list-item>
          <v-list-item title="多边形" id="polygon"></v-list-item>
          <v-list-item title="清除" id="clear"></v-list-item>
        </v-lit>
      </v-sheet> -->
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { Base, Mix } from 'lhcesium'

const { DrawLine, DrawCircle, DrawRect, DrawPolygon } = Mix
let Viewer = null
let drawArr = []
const event = [
  {
    id: 'line',
    click: () => {
      let kk = new DrawLine(Viewer)
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
  viewer.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
  Viewer = viewer
  event.forEach((item) => {
    const dom = document.querySelector(`#${item.id}`)
    dom.addEventListener('click', item.click)
  })
})
</script>

<style scoped>
.conainer-map {
  position: relative;
}
.btn {
  position: absolute;
  z-index: 10;
  cursor: pointer;
}
</style>

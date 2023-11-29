<template>
  <l-map @ready="ready">
  </l-map>
</template>

<script setup>
import * as dat from 'dat.gui'
import lMap from '@/components/map.vue'
import { onMounted, onUnmounted, reactive } from 'vue'
import { provider } from '@/utils/ceisum.map'

const gui = new dat.GUI()
const folder = gui.addFolder('天地图')

const layer = {
  全球影像底图: function() {
    provider(data.viewer, { name: '全球影像底图(墨卡托投影)', key: 'img_w' })
  },
  全球矢量底图: function() {
    provider(data.viewer, { name: '全球影像底图(墨卡托投影)', key: 'vec_w' })
  },
  全球地形晕渲: function() {
    provider(data.viewer, { name: '全球地形晕渲(墨卡托投影)', key: 'ter_w' })
  },
  全球矢量注记: function() {
    provider(data.viewer, { name: '全球矢量注记(墨卡托投影)', key: 'cva_w' })
  },
  全球影像注记: function() {
    provider(data.viewer, { name: '全球影像注记(墨卡托投影)', key: 'cia_w' })
  },
  全球地形注记: function() {
    provider(data.viewer, { name: '全球地形注记(墨卡托投影)', key: 'cta_w' })
  }
}

folder.add(layer, '全球影像底图').onChange(e => e)
folder.add(layer, '全球矢量底图').onChange(e => e)
folder.add(layer, '全球地形晕渲').onChange(e => e)
folder.add(layer, '全球矢量注记').onChange(e => e)
folder.add(layer, '全球影像注记').onChange(e => e)
folder.add(layer, '全球地形注记').onChange(e => e)
folder.open()

const data = reactive({})

onMounted(() => {
})
onUnmounted(() => {
})

function ready(viewer) {
  data.viewer = viewer
}
</script>

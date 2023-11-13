<template>
  <l-map @ready="ready"></l-map>
</template>

<script setup>
import { onMounted } from 'vue'

import { provider } from '@/utils/ceisum.map'

function getRandomHexColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16)
}

async function ready(viewer) {
  const imageLayer = provider(viewer, {
    name: '矢量底图',
    key: 'vec_w'
  })
  const imageLayer1 = provider(viewer, {
    name: '矢量标记',
    key: 'cva_w'
  })
  imageLayer.hue = 3
  imageLayer.contrast = -1.2
  imageLayer1.hue = 3
  imageLayer1.contrast = -1.2
  const tilesets = viewer.scene.primitives.add(
    await Cesium.Cesium3DTileset.fromIonAssetId(2315873)
  )
  tilesets.readyPromise.then(function(tileset) {
    // tileset.style = new Cesium.Cesium3DTileStyle({
    //   color: {
    //     conditions: [['true', 'color(\'rgb(51, 153, 255)\',1)']]
    //   }
    // })

    viewer.flyTo(tileset)
  })
  console.log(tilesets)

  tilesets.tileLoad.addEventListener(async function(title) {
    const content = title.content
    const _features = content.batchTable._features
    const colors = []
    for (let i = 0; i < _features.length; i++) {
      const cesiumColor = await Cesium.Color.fromCssColorString(getRandomHexColor())
      colors.push(cesiumColor)
      const color = colors[i]
      _features[i].color = color || Cesium.Color.RED.withAlpha(0.4)
    }
  })
}

onMounted(() => {
})

</script>

<style scoped>

</style>
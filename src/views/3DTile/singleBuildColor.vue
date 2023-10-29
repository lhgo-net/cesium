<template>
  <div>
    <l-map></l-map>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

import lMap from '@/components/map.vue'
import { provider } from '@/utils/ceisum.map'

async function initBuild() {
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

  tilesets.tileLoad.addEventListener(function(title) {
    const content = title.content
    const feature = content.getFeature(0)
    feature.content.batchTable._features[460].color = Cesium.Color.RED.withAlpha(0.4)
    console.log(feature.content.batchTable._features[0])
  })
  console.log(viewer.scene)
}

onMounted(() => {
  initBuild()
})

</script>

<style scoped>

</style>
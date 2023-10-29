<template>
  <l-map @ready="ready"></l-map>
</template>

<script setup>
function getRandomHexColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16)
}
async function ready(viewer) {
  const tilesets = viewer.scene.primitives.add(
    await Cesium.Cesium3DTileset.fromIonAssetId(2315873)
  )
  tilesets.readyPromise.then(function(tileset) {
    tilesets.root.children.forEach(function(tile) {
      // 处理每个节点中的建筑物数据
      console.log(tile)
    })
    viewer.flyTo(tileset)
  })
  tilesets.tileLoad.addEventListener(async function(title) {
    const content = title.content
    const _features = content.batchTable._features
    console.log(content)
    console.log(_features)
    const colors = []
    for (let i = 0; i < _features.length; i++) {
      const cesiumColor = await Cesium.Color.fromCssColorString(getRandomHexColor())
      colors.push(cesiumColor)
      const color = colors[i] // 每栋建筑对应的颜色
      //   console.log(color)
      //   console.log(_features[i])
      _features[i].color = color || Cesium.Color.RED.withAlpha(0.4)

      // 创建材质
      //   const material = new Cesium.Material({
      //     fabric: {
      //       type: 'Color',
      //       uniforms: {
      //         color
      //       }
      //     }
      //   })

      // 应用材质到每栋建筑物
      //   _features[i].appearance.material = material
    }
  })
}
</script>
<template>
  <div>
    <l-map @ready="ready"></l-map>
  </div>
</template>

<script setup>
async function ready(viewer) {
  console.log(viewer)
  const tilesets = viewer.scene.primitives.add(await Cesium.Cesium3DTileset.fromIonAssetId(2315873))
  tilesets.readyPromise.then(function (tileset) {
    // tileset.style = new Cesium.Cesium3DTileStyle({
    //   color: {
    //     conditions: [['true', 'color(\'rgb(51, 153, 255)\',1)']]
    //   }
    // })
    const content = tileset.content
    console.log(tileset)
    console.log(content)

    // content.tileset._tileset._root.children.forEach(function(tile) {
    //   const content = tile.content
    //   const featuresLength = content.featuresLength

    //   for (let i = 0; i < featuresLength; ++i) {
    //     const feature = content.getFeature(i)

    //     // 获取几何信息
    //     const geometry = feature.geometry

    //     // 获取顶点坐标
    //     const positions = geometry._attributes.position.values // 顶点坐标

    //     // 获取 UV 坐标
    //     const textureCoordinates = geometry._attributes.st.values // UV 坐标

    //     // 此处可对顶点坐标和 UV 坐标执行任何你需要的操作

    //     console.log(positions)
    //     console.log(textureCoordinates)
    //   }
    // })
    viewer.flyTo(tileset)
  })
  // tilesets.readyPromise.then(function(tileset) {
  //   console.log(tileset)
  //   const boundingSphere = tileset.boundingVolume.boundingSphere

  //   console.log('Bounding sphere center: ', boundingSphere.center)
  //   console.log('Bounding sphere radius: ', boundingSphere.radius)

  //   const content = tileset.content
  //   const featuresLength = content.featuresLength
  //   console.log('Number of features in the tileset: ', featuresLength)

  //   // 获取单个特定的feature（建筑物）
  //   const feature = content.getFeature(0)
  //   console.log('Feature properties: ', feature.getPropertyNames())
  // })

  tilesets.tileLoad.addEventListener(function (title) {
    const content = title.content
    // const _features = content.batchTable._features
    const feature = content.getFeature(0)
    console.log(feature.getExactClassName())
    console.log(feature)
  })
}
</script>

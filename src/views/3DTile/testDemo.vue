<template>
  <div>
    <l-map @ready="ready"></l-map>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { provider } from '@/utils/ceisum.map'

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

import lMap from '@/components/map.vue'
// import { provider } from '@/utils/ceisum.map'
function makeGradientTexture() {
  // const size = 254
  // const typedArray = new Uint8Array(3 * size * size)
  // for (let i = 0; i < size; i++) {
  //   for (let j = 0; j < size; j++) {
  //     const index = i * size + j
  //     // red increases in the +x direction (to the right)
  //     typedArray[3 * index + 0] = j
  //     // Green increases in the +y direction (from bottom to top)
  //     typedArray[3 * index + 1] = i
  //   // blue is 0 so it is omitted.
  //   }
  // }
  // console.log(typedArray)
  // return new Cesium.TextureUniform({
  //   typedArray,
  //   width: size,
  //   height: size,
  //   pixelFormat: Cesium.PixelFormat.RGB
  // })

  // let Array
  const url = '/img/222.png'
  const img = new Image()
  img.src = url + '?' + new Date().getTime()
  const canvas = document.createElement('canvas')
  document.body.append(img)

  // img.onload = function() {
  const width = img.width
  const height = img.height
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0)
  const imageData = ctx.getImageData(0, 0, 186, 204).data
  const typedArray = new Uint8Array(imageData.length)
  console.log(imageData)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = x * y
      const r = imageData[0 + index]
      const g = imageData[1 + index]
      const b = imageData[2 + index]
      const a = imageData[3 + index]
      console.log(`rgb(${r},${g},${b},${a})`)

      const Y = 0.257 * r + 0.504 * g + 0.098 * b + 16
      const V = 0.439 * r - 0.368 * g - 0.071 * b + 128
      const U = -(0.148 * r) - (0.291 * g) + (0.439 * b) + 128
      typedArray[index + 0] = Y
      typedArray[index + 1] = U
      typedArray[index + 2] = V
      console.log(1111111111)
      console.log(`YUV[${Y},${U},${V}]`)
    }
  }
  //   Array = typedArray
  // }
  console.log(typedArray)

  return new Cesium.TextureUniform({
    typedArray,
    width,
    height,
    pixelFormat: Cesium.PixelFormat.RGB
  })
}
async function initBuild() {
  // const imageLayer = provider(viewer, {
  //   name: '矢量底图',
  //   key: 'vec_w'
  // })
  // const imageLayer1 = provider(viewer, {
  //   name: '矢量标记',
  //   key: 'cva_w'
  // })
  // imageLayer.hue = 3
  // imageLayer.contrast = -1.2
  // imageLayer1.hue = 3
  // imageLayer1.contrast = -1.2
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
  // const customShader = new Cesium.CustomShader({
  //   lightingModel: Cesium.LightingModel.UNLIT,
  //   fragmentShaderText: `
  //       void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
  //       float _baseHeight = 0.0; // 物体的基础高度，需要修改成一个合适的建筑基础高度
  //       float _heightRange = 60.0; // 高亮的范围(_baseHeight ~ _baseHeight + _      heightRange) 默认是 0-60米
  //       float _glowRange = 300.0; // 光环的移动范围(高度)
  //       float vtxf_height = fsInput.attributes.positionMC.y-_baseHeight;
  //       float vtxf_a11 = fract(czm_frameNumber / 120.0) * 3.14159265 * 2.0;
  //       float vtxf_a12 = vtxf_height / _heightRange + sin(vtxf_a11) * 0.1;
  //       material.diffuse*= vec3(vtxf_a12, vtxf_a12, vtxf_a12);
  //       float vtxf_a13 = fract(czm_frameNumber / 360.0);
  //       float vtxf_h = clamp(vtxf_height / _glowRange, 0.0, 1.0);
  //       vtxf_a13 = abs(vtxf_a13 - 0.5) * 2.0;
  //       float vtxf_diff = step(0.005, abs(vtxf_h - vtxf_a13));
  //       material.diffuse += material.diffuse * (1.0 - vtxf_diff);
  //       }
  //       `
  // })
  // tilesets.customShader = customShader
  console.log(tilesets)
  let contents
  tilesets.tileLoad.addEventListener(function(title) {
    const content = title.content
    contents = content
    console.log(contents)
    const featuresLength = content.featuresLength
    console.log('要素数量为：')
    console.log(featuresLength)
    console.log('第一个要素为：')
    const feature = content.getFeature(0)
    console.log(feature.content)
    const Cesium3DTileBatchTable = new Cesium.Cesium3DTileBatchTable(content, featuresLength)
    console.log(Cesium3DTileBatchTable)

    // console.log(Cesium3DTileBatchTable.getGlslComputeSt(feature.batchTable))
    Cesium3DTileBatchTable.setColor(0, Cesium.Color.RED.withAlpha(0.4))
    Cesium3DTileBatchTable.update(tilesets, viewer.scene.frameState)
    const color = Cesium3DTileBatchTable.getColor(0, {})
    console.log(color)
    Cesium3DTileBatchTable.destroy()
  })
  console.log(viewer.scene)
}

onMounted(() => {
})

</script>

<style scoped>

</style>
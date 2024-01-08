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
    key: 'vec_w',
  })
  const imageLayer1 = provider(viewer, {
    name: '矢量标记',
    key: 'cva_w',
  })
  imageLayer.hue = 3
  imageLayer.contrast = -1.2
  imageLayer1.hue = 3
  imageLayer1.contrast = -1.2
  makeGradientTexture()
}

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
      const U = -(0.148 * r) - 0.291 * g + 0.439 * b + 128
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
    pixelFormat: Cesium.PixelFormat.RGB,
  })
}

onMounted(() => {})
</script>

<style scoped></style>

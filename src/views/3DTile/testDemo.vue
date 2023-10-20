<template>
  <div>
    <l-map></l-map>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import lMap from '@/components/map.vue'

async function initBuild() {
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
  const url = '/img/222.png'
  const img = new Image()
  img.src = url + '?' + new Date().getTime()
  const canvas = document.createElement('canvas')
  img.onload = function() {
    const width = img.width
    const height = img.height
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0)
    const imageData = ctx.getImageData(0, 0, width, height).data
    const typedArray = new Uint8Array(imageData.length)
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = x * y
        const r = imageData[0 + index]
        const g = imageData[1 + index]
        const b = imageData[2 + index]
        // const a = imageData[3 + index]
        // console.log(`rgb(${r},${g},${b},${a})`)

        const Y = (0.257 * r + 0.504 * g + 0.098 * b + 16).toFixed(1)
        const V = (0.439 * r - 0.368 * g - 0.071 * b + 128).toFixed(1)
        const U = (-(0.148 * r) - (0.291 * g) + (0.439 * b) + 128).toFixed(1)
        typedArray[index + 0] = Y
        typedArray[index + 1] = U
        typedArray[index + 2] = V
      }
    }
    const text = new Cesium.TextureUniform({
      typedArray,
      // url: '/img/222.png',
      width: 186,
      height: 204,
      pixelFormat: Cesium.PixelFormat.RGB
    })
    console.log(text)
    const gradientShader = new Cesium.CustomShader({
      lightingModel: Cesium.LightingModel.UNLIT,
      uniforms: {
        u_gradient: {
          type: Cesium.UniformType.FLOAT,
          value: text
        }
      },
      varyings: {
        v_selectedColor: Cesium.VaryingType.VEC3
      },
      fragmentShaderText: `
                            void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material){
                                material.diffuse += texture(u_gradient, fsInput.attributes.texCoord_0).rgb;
                            }
                          `
    })
    tilesets.customShader = gradientShader
  }
}

onMounted(() => {
  initBuild()
})

</script>

<style scoped>

</style>
<template>
  <div>

  </div>
</template>

<script setup>
import { nextTick, onMounted } from 'vue'

async function initBuild() {
  const tilesets = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
    url: 'http://172.16.8.133:18098/Tileset/yx/tileset.json',
    // url: 'http://101.43.97.106:8080/sysu_noise/sysu_noise_3dtiles/tileset.json',
    show: true,
    skipLevelOfDetail: true,
    baseScreenSpaceError: 1024,
    skipScreenSpaceErrorFactor: 16,
    skipLevels: 1,
    immediatelyLoadDesiredLevelOfDetail: false,
    loadSiblings: false,
    cullWithChildrenBounds: true
  }))
  tilesets.readyPromise.then(function(tileset) {
    tileset.style = new Cesium.Cesium3DTileStyle({
      defines: {
        // eslint-disable-next-line no-template-curly-in-string
        material: '${feature["building:Height"]}'
      },
      color: {
        // eslint-disable-next-line no-template-curly-in-string
        conditions: [
          // eslint-disable-next-line no-undef, no-template-curly-in-string
          ['true', 'rgb(33, 150, 243)']

          // // eslint-disable-next-line no-template-curly-in-string
          // ['${Height} >= 30', 'rgba(45, 0, 75, 0.5)'],
          // eslint-disable-next-line no-template-curly-in-string
          // ['${Height} == 33', 'rgb(102, 71, 151)'],
          // // eslint-disable-next-line no-template-curly-in-string
          // ['${Height} >= 10', 'rgb(170, 162, 204)']
        ]

      }
    })
    viewer.flyTo(tileset)
  })
  // const customShader = new Cesium.CustomShader({
  //   lightingModel: Cesium.LightingModel.UNLIT,
  //   fragmentShaderText: `
  //       void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {

  //       float _baseHeight = 0.0; // 物体的基础高度，需要修改成一个合适的建筑基础高度
  //       float _heightRange = 30.0; // 高亮的范围(_baseHeight ~ _baseHeight + _      heightRange) 默认是 0-60米
  //       float _glowRange = 60.0; // 光环的移动范围(高度)
  //       float vtxf_height = fsInput.attributes.positionMC.y-_baseHeight;
  //       float vtxf_a11 = fract(czm_frameNumber / 120.0) * 3.14159265 * 10.0;
  //       float vtxf_a12 = vtxf_height / _heightRange + sin(vtxf_a11) * 0.1;
  //       material.diffuse*= vec3(vtxf_a12, vtxf_a12, vtxf_a12);
  //       float vtxf_a13 = fract(czm_frameNumber / 360.0);
  //       float vtxf_h = clamp(vtxf_height / _glowRange, 0.5, 1.0);
  //       vtxf_a13 = abs(vtxf_a13 - 0.5) * 2.0;
  //       float vtxf_diff = step(0.005, abs(vtxf_h - vtxf_a13));
  //       material.diffuse += material.diffuse * (1.0 - vtxf_diff);
  //       }
  //       `
  // })
  const customShader = new Cesium.CustomShader({
    // lightingModel: Cesium.LightingModel.UNLIT,
    //  lightingModel: Cesium.LightingModel.PBR,
    // 设置变量，由顶点着色器传递给片元着色器
    varyings: {
      v_normalMC: Cesium.VaryingType.VEC3,
      v_st: Cesium.VaryingType.VEC3
    },
    // 外部传给顶点着色器或者片元着色器
    uniforms: {
      u_texture: {
        value: new Cesium.TextureUniform({
          url: '/img/Building.png'
        }),
        type: Cesium.UniformType.SAMPLER_2D
      },
      u_texture1: {
        value: new Cesium.TextureUniform({
          url: '/img/sec3_bg2.png.png'
        }),
        type: Cesium.UniformType.SAMPLER_2D
      }
    },
    // 贴纹理
    // 顶点着色器
    // 将法向量从顶点着色器设置变量传给片元着色器
    vertexShaderText: `
            void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
                  v_normalMC = vsInput.attributes.normalMC;
                  v_st = vsInput.attributes.positionMC ;
            }`,
    // 片元着色器
    fragmentShaderText: `
           void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
              vec3 positionMC = fsInput.attributes.positionMC;
              //这里是设置要贴图的图片的尺寸，设置小了会重复
              float width = 10000.0;
              float height = 10000.0;
              vec3 rgb;
              //这是是设置了屋顶的颜色，当和法向量平行时，就是屋顶，这里设置0.95，相当于垂直，建筑物四周开始贴图
              if (dot(vec3(0.0, 1.0, 0.0), v_normalMC) > 0.95) {
                material.diffuse = vec3(1.0, 0.0, 0.0);
              } else {
                float textureX = 0.0;
                float dotYAxis = dot(vec3(0.0, 0.0, 1.0), v_normalMC);
                // cos(45deg) 约等于 0.71，这里是建筑物四周的向量与法向量会大于四十五度夹角
                if (dotYAxis > 0.71 || dotYAxis < -0.71) {
                //x代表的是前后面
                  textureX = mod(positionMC.x, width) / width;
                } else {
                //z代表的是左右面
                  textureX = mod(positionMC.z, width) / width;
                }
                float textureY = mod(positionMC.y, height) / height;
                //我这里是根据建筑物高度贴了两张不同的图片
                // if (positionMC.y < 30.0) {
                   rgb = texture(u_texture, vec2(textureX, textureY)).rgb;
                // }
                // else {
                  //  rgb = texture(u_texture1, vec2(textureX, textureY)).rgb;
                // }
                material.diffuse = rgb;
              }
          }`
  })

  tilesets.customShader = customShader

  viewer.scene.imageryLayers.addImageryProvider(
    new Cesium.ImageryProvider({
      defaultAlpha: 1.0,
      defaultColor: new Cesium.Color(0.0, 0.0, 0.0, 0.0),
      getPixelData: function(x, y, level, frameState) {
        // 在这里实现你的颜色渐变逻辑
        const color = computeGradientColor(x, y, level, frameState)
        const pixelData = new Uint8Array([color.red * 255, color.green * 255, color.blue * 255, color.alpha * 255])
        return pixelData
      }
    })
  )
  console.log(tilesets)
  // varying vec4 v_positionEC;
  //   varying vec3 v_normalEC;
  // void main() {
  //     float l = sqrt(pow(v_positionEC.x,2.0) + pow(v_positionEC.y,2.0) + pow(v_positionEC.z,2.0));
  //     float cy3 = fract((abs(l - 100000.0))/200000.0);

  //     float cr = (56.0/255.0) + ((187.0/255.0) - (56.0/255.0))*cy3;
  //     float cg = (139.0/255.0) + ((186.0/255.0) - (139.0/255.0))*cy3;
  //     float cb = (255.0/255.0) + ((236.0/255.0) - (255.0/255.0))*cy3;

  //     gl_FragColor = vec4(cr, cg, cb, 1.0);

// void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
//         float _baseHeight = 0.0; // 物体的基础高度，需要修改成一个合适的建筑基础高度
//         float _heightRange = 30.0; // 高亮的范围(_baseHeight ~ _baseHeight + _      heightRange) 默认是 0-60米
//         float _glowRange = 60.0; // 光环的移动范围(高度)
//         float vtxf_height = fsInput.attributes.positionMC.y-_baseHeight;
//         float vtxf_a11 = fract(czm_frameNumber / 120.0) * 3.14159265 * 2.0;
//         float vtxf_a12 = vtxf_height / _heightRange + sin(vtxf_a11) * 0.1;
//         material.diffuse*= vec3(vtxf_a12, vtxf_a12, vtxf_a12);
//         float vtxf_a13 = fract(czm_frameNumber / 360.0);
//         float vtxf_h = clamp(vtxf_height / _glowRange, 0.5, 1.0);
//         vtxf_a13 = abs(vtxf_a13 - 0.5) * 2.0;
//         float vtxf_diff = step(0.005, abs(vtxf_h - vtxf_a13));
//         material.diffuse += material.diffuse * (1.0 - vtxf_diff);
//         }
}
function computeGradientColor(x, y, level, frameState) {
  // 在这里实现你的颜色渐变逻辑
  // 这里简单返回一个渐变色
  const t = frameState.time / 1000.0 // 获取时间，单位是秒
  const red = Math.sin(t) * 0.5 + 0.5
  const green = Math.cos(t) * 0.5 + 0.5
  const blue = Math.sin(t + Math.PI) * 0.5 + 0.5
  return new Cesium.Color(red, green, blue, 1.0)
}
onMounted(() => {
  nextTick(() => {
    initBuild()
  })
})

</script>

<style scoped>

</style>
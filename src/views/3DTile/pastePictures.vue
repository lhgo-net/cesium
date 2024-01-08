<template>
  <l-map @ready="ready"></l-map>
</template>

<script setup>
import lMap from '@/components/map.vue'
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

  const tilesets = viewer.scene.primitives.add(await Cesium.Cesium3DTileset.fromIonAssetId(2315873))
  tilesets.readyPromise.then(function (tileset) {
    viewer.flyTo(tileset)
  })
  const customShader = new Cesium.CustomShader({
    // lightingModel: Cesium.LightingModel.UNLIT,
    //  lightingModel: Cesium.LightingModel.PBR,
    // 设置变量，由顶点着色器传递给片元着色器
    varyings: {
      v_normalMC: Cesium.VaryingType.VEC3,
      v_st: Cesium.VaryingType.VEC3,
    },
    // 外部传给顶点着色器或者片元着色器
    uniforms: {
      u_texture: {
        value: new Cesium.TextureUniform({
          url: '/img/buildbuild.png',
        }),
        type: Cesium.UniformType.SAMPLER_2D,
      },
      u_texture1: {
        value: new Cesium.TextureUniform({
          url: '/img/333.png',
        }),
        type: Cesium.UniformType.SAMPLER_2D,
      },
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
          // void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
          //   vec3 positionMC = fsInput.attributes.positionMC;
          //   float width = 75.0;
          //   float height = 150.0;
          //   if (dot(vec3(0.0, 0.0, 1.0), v_normalMC) > 0.95) {
          //     material.diffuse = vec3(0.079, 0.107, 0.111);
          //   } else {
          //     float textureX = 0.0;
          //     float dotYAxis = dot(vec3(0.0, 1.0, 0.0), v_normalMC);
          //     // cos(45deg) 约等于 0.71
          //     if (dotYAxis > 0.71 || dotYAxis < -0.71) {
          //       textureX = mod(positionMC.x, width) / width;
          //     } else {
          //       textureX = mod(positionMC.z, width) / width;
          //     }

          //     float textureY = mod(positionMC.y, height) / height;
          //     vec3 rgb = texture(u_texture, vec2(textureX, textureY)).rgb;
          //     material.diffuse = rgb;
          //   }
          // }

           void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
              vec3 positionMC = fsInput.attributes.positionMC;
              //这里是设置要贴图的图片的尺寸，设置小了会重复
              float width = 75.0;
              float height = 75.0;
              vec3 rgb;
              //这是是设置了屋顶的颜色，当和法向量平行时，就是屋顶，这里设置0.95，相当于垂直，建筑物四周开始贴图
              if (dot(vec3(0.0, 1.0, 0.0), v_normalMC) > 0.95) {
                material.diffuse = vec3(0.079, 0.107, 0.111);
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
                //    rgb = texture(u_texture1, vec2(textureX, textureY)).rgb;
                // }
                material.diffuse = rgb;
              }
          }
          `,
  })
  tilesets.customShader = customShader
}
onMounted(() => {})
</script>

<style scoped></style>

<template>
  <div class="conainer-map" id="map"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import { Base } from '@lh/cesium'
import pic from '@/assets/image/pic.jpg'

const { init, modifyMap, ImageryLayerConfig, addImageryLayer } = Base

function terrain() {
  viewer.terrainProvider = Cesium.createWorldTerrain()
}

onMounted(async () => {
  const { viewer } = await init('map')
  addImageryLayer(viewer, ImageryLayerConfig.gaode_ver.type, ImageryLayerConfig.gaode_ver.options)
  modifyMap(viewer, true, [10, 200, 100])
  // const tileset = add3Dtiles(viewer, '/tiles/guangzhou/tileset.json')
  const tileset = viewer.scene.primitives.add(await Cesium.createOsmBuildingsAsync())
  viewer.camera.setView({
    destination: {
      x: -2852928.497690295,
      y: 4652428.954517055,
      z: 3291891.0380489714
    },
    orientation: {
      heading: Cesium.Math.toRadians(212.20287149232163),
      pitch: Cesium.Math.toRadians(-11.215466997379062),
      roll: Cesium.Math.toRadians(0.004033823235683256)
    }
  })
  // viewer.zoomTo(tileset)
  const customShader = new Cesium.CustomShader({
    uniforms: {
      u_envTexture: {
        value: new Cesium.TextureUniform({
          url: pic
        }),
        type: Cesium.UniformType.SAMPLER_2D
      },
      u_envTexture2: {
        value: new Cesium.TextureUniform({
          url: pic
        }),
        type: Cesium.UniformType.SAMPLER_2D
      },
      u_isDark: {
        value: true,
        type: Cesium.UniformType.BOOL
      }
    },
    lightingModel: Cesium.LightingModel.UNLIT,
    fragmentShaderText: `
                            void fragmentMain(FragmentInput fsInput,inout czm_modelMaterial material) {
                                vec3 positionMC = fsInput.attributes.positionMC;
                                vec3 positionEC = fsInput.attributes.positionEC;
                                vec3 normalEC = fsInput.attributes.normalEC;
                                vec3 posToCamera = normalize(-positionEC); 
                                vec3 coord = normalize(vec3(czm_inverseViewRotation * reflect(posToCamera, normalEC)));
                                float ambientCoefficient = 0.3;
                                float diffuseCoefficient = max(0.0, dot(normalEC, czm_sunDirectionEC) * 1.0);
                                if(u_isDark){

                                    // dark
                                    vec4 darkRefColor = texture(u_envTexture2, vec2(coord.x, (coord.z - coord.y) / 2.0));
                                    material.diffuse = mix(mix(vec3(0.3), vec3(0.1,0.2,0.4),clamp(positionMC.z / 200., 0.0, 1.0)) , darkRefColor.rgb ,0.3);
                                    material.diffuse *= 0.2;
                                    // 注意shader中写浮点数是 一定要带小数点 否则会报错 比如0需要写成0.0 1要写成1.0
                                    float _baseHeight = 0.0; // 物体的基础高度，需要修改成一个合适的建筑基础高度
                                    float _heightRange = 20.0; // 高亮的范围(_baseHeight ~ _baseHeight + _heightRange)
                                    float _glowRange = 300.0; // 光环的移动范围(高度)
                                    // 建筑基础色
                                    float czm_height = positionMC.z - _baseHeight;
                                    float czm_a11 = fract(czm_frameNumber / 120.0) * 3.14159265 * 2.0;
                                    float czm_a12 = czm_height / _heightRange + sin(czm_a11) * 0.1;
        
                                    float times = czm_frameNumber / 60.0;
                                    material.diffuse *= vec3(czm_a12);// 渐变
                                    // 动态光环
                                    float time = fract(czm_frameNumber / 360.0);
                                    time = abs(time - 0.5) * 2.0;
                                    float czm_h = clamp(czm_height / _glowRange, 0.0, 1.0);
                                    float czm_diff = step(0.005, abs(czm_h - time));
                                    material.diffuse += material.diffuse * (1.0 - czm_diff);
                                } else {

                                    // day
                                    vec4 dayRefColor = texture(u_envTexture, vec2(coord.x, (coord.z - coord.y) / 3.0));
                                    material.diffuse = mix(mix(vec3(0.000), vec3(0.5),clamp(positionMC.z / 300., 0.0, 1.0)) , dayRefColor.rgb ,0.3);
                                    material.diffuse *= min(diffuseCoefficient + ambientCoefficient, 1.0);
                                }
                                material.alpha = 1.0;
                            }
                             `
  })
  // tileset.style = new Cesium.Cesium3DTileStyle({
  //   color: {
  //     conditions: [['true', "color('rgb(51, 153, 255)',1)"]]
  //   }
  // })
  tileset.customShader = customShader
  // tileset.then((tiles) => {
  //   tiles.style = new Cesium.Cesium3DTileStyle({
  //     color: {
  //       conditions: [['true', "color('rgb(51, 153, 255)',1)"]]
  //     }
  //   })

  //   tiles.customShader = customShader
  // })
})
</script>

<style scoped>
.conainer-map {
  position: relative;
}
.btn {
  position: absolute;
  z-index: 10;
}
</style>

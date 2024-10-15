<template>
  <div class="conainer-map" id="map"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import { Base } from 'lhcesium'

const { init, modifyMap, ImageryLayerConfig, addImageryLayer } = Base


onMounted(async () => {
  const { viewer } = await init('map')
  addImageryLayer(viewer, ImageryLayerConfig.gaode_ver.type, ImageryLayerConfig.gaode_ver.options)
  modifyMap(viewer, true, [0, 255, 255])
  // const tileset = add3Dtiles(viewer, '/tiles/guangzhou/tileset.json')
  const tileset = viewer.scene.primitives.add(await Cesium.Cesium3DTileset.fromIonAssetId(2675733))
  viewer.zoomTo(tileset)
  const customShader = new Cesium.CustomShader({
    lightingModel: Cesium.LightingModel.UNLIT,
    fragmentShaderText: `
        void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        float _baseHeight = 0.0; // 物体的基础高度，需要修改成一个合适的建筑基础高度
        float _heightRange = 150.0; // 高亮的范围(_baseHeight ~ _baseHeight + _      heightRange) 默认是 0-60米
        float _glowRange = 600.0; // 光环的移动范围(高度)
        float vtxf_height = fsInput.attributes.positionMC.z-_baseHeight;
        float vtxf_a11 = fract(czm_frameNumber / 120.0) * 3.14159265 * 2.0;
        float vtxf_a12 = vtxf_height / _heightRange + sin(vtxf_a11) * 0.1;
        material.diffuse*= vec3(vtxf_a12, vtxf_a12, vtxf_a12);
        float vtxf_a13 = fract(czm_frameNumber / 360.0);
        float vtxf_h = clamp(vtxf_height / _glowRange, 0.0, 1.0);
        vtxf_a13 = abs(vtxf_a13 - 0.5) * 2.0;
        float vtxf_diff = step(0.005, abs(vtxf_h - vtxf_a13));
        material.diffuse += material.diffuse + (1.0 - vtxf_diff);
    }
        `
  })
  tileset.style = new Cesium.Cesium3DTileStyle({
    color: {
      conditions: [['true', "color('rgb(51, 153, 255)',1)"]]
    }
  })
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

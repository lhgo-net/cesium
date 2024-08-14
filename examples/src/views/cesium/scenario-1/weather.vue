<template>
  <div class="weather-container">
    <header
      style="
        color: white;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      "
    >
      <div style="width: 100%; display: flex; justify-content: space-between">
        <dv-decoration-3 style="width: 250px; height: 20px" />
        <dv-decoration-3 style="width: 250px; height: 20px" />
      </div>
      <dv-decoration-7 style="height: 30px"
        ><h2>气象数据系统</h2></dv-decoration-7
      >
      <div style="width: 100%; display: flex; justify-content: space-between">
        <dv-decoration-3 style="width: 250px; height: 20px" />
        <dv-decoration-3 style="width: 250px; height: 20px" />
      </div>
      <dv-decoration-2 style="height: 5px" />
    </header>
    <div class="container">
      <div class="left">
        <dv-border-box-12 :dur="5" :color="color">
          <div
            style="
              background-image: linear-gradient(
                to right,
                rgba(0, 0, 0, 0.8),
                transparent
              );
            "
          >
            <Tree :data="cityData" @checkCity="handlerSelect"></Tree>
          </div>
        </dv-border-box-12>
      </div>
      <div class="main">
        <div class="top">
          <div class="map">
            <dv-border-box-12 style="padding: 10px">
              <div id="map" style="height: 100%"></div>
            </dv-border-box-12>
          </div>
          <div class="map-right">
            <dv-border-box-12 :dur="5" :color="color" style="padding: 15px">
              <div
                style="
                  background-image: linear-gradient(
                    to left,
                    rgba(0, 0, 0, 0.8),
                    transparent
                  );
                  height: 100%;
                "
              >
                <dv-scroll-board :config="config" style="width: 560px" />
              </div>
            </dv-border-box-12>
          </div>
        </div>
        <div class="bottom">
          <dv-border-box-12 :color="color">
            <bottom></bottom>
          </dv-border-box-12>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import list from "./list.vue";
import bottom from "./buttom.vue";
import { ref, renderSlot } from "vue";
import Tree from "@/components/tool/tree/index.vue";
import cityData from "@/assets/json/area-full.json";
import { onMounted } from "vue";
import axios from "axios";

import pic from '@/assets/image/pic.jpg'


import { Map } from "@/cesium/index";
import { Base, Entity } from "lhcesium";

const { init, ImageryLayerConfig, addImageryLayer, modifyMap, wfsGet } = Base;
const { polygonGradient } = Entity;
const color = ref([]);

const address = ref();
const config = ref({
  header: ["气象预警"],
  data: [],
  // index: true,
  rowNum: 15,
  // columnWidth: [0],
  align: ["left"],
  oddRowBGC: "rgba(0,0,0,0)",
  evenRowBGC: "rgba(0,0,0,0)",
});

let v;
const handlerSelect = async (item) => {
  const data = await wfsGet(
    "/geoserver/china/wfs",
    "qvxian",
    `name='${item.name}'`
  );
  polygonGradient(v, data);
};

onMounted(async () => {
  const { viewer } = await init("map", { showSkyAtmosphere: false });
  v = viewer;
  viewer.scene.fog.enabled = false;
  const tileset = viewer.scene.primitives.add(
    await Cesium.createOsmBuildingsAsync()
  );
  const customShader = new Cesium.CustomShader({
    uniforms: {
      u_envTexture: {
        value: new Cesium.TextureUniform({
          url: pic,
        }),
        type: Cesium.UniformType.SAMPLER_2D,
      },
      u_envTexture2: {
        value: new Cesium.TextureUniform({
          url: pic,
        }),
        type: Cesium.UniformType.SAMPLER_2D,
      },
      u_isDark: {
        value: true,
        type: Cesium.UniformType.BOOL,
      },
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
                             `,
  });
  tileset.customShader = customShader;

  addImageryLayer(
    viewer,
    ImageryLayerConfig.gaode_ver.type,
    ImageryLayerConfig.gaode_ver.options
  );
  modifyMap(viewer, true, [255, 255, 255]);
  axios.get("apiIP/api/index?ip&type=0").then((res) => {
    const arr = res.data.address.split(" ");
    const city = arr.filter((city) => city.endsWith("市"));
    address.value = { name: city };
    console.log(address.value);
    handlerSelect({ name: "贞丰县" });
  });
  axios
    .get("/weather", {
      params: { url: "https://weather.cma.cn/api/map/alarm?adcode=52" },
    })
    .then((res) => {
      console.log(res.data.data);
      config.value.data = res.data.data.map((item) => [item.title]);
      console.log(config);
    });
});
</script>

<style scoped lang="scss">
.weather-container {
  background-image: url("/bg.jpg");
  background-size: cover;
  height: 100%;
}
.container {
  height: calc(100vh - 68px);
  display: flex;
  gap: 10px;
  padding: 10px;
}

.left {
  flex: 2;
}
.main {
  flex: 10;
  .top {
    height: 70vh;
    display: flex;
    gap: 10px;
    .map {
      flex: 10;
    }
    .map-right {
      flex: 4;
    }
  }
  .bottom {
    height: 22.5vh;
    margin-top: 10px;
  }
}
</style>

<style>
.bottom .border-box-content {
  padding: 15px;
}
.left .border-box-content {
  padding: 15px;
  overflow: auto !important;
}
/* 自定义滚动条的宽度和高度 */
.left .border-box-content::-webkit-scrollbar {
  width: 5px;
  height: 12px;
}

/* 自定义滚动条轨道（背景）的样式 */
.left .border-box-content::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 6px;
}

/* 自定义滚动条的滑块（前景）的样式 */
.left .border-box-content::-webkit-scrollbar-thumb {
  background: linear-gradient(to top, #7acaec, transparent);
  border-radius: 6px;
}

/* 当鼠标悬停在滑块上时，改变滑块的颜色 */
.left .border-box-content::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.7);
}
</style>

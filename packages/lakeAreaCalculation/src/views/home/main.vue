<template>
  <div>
    <div class="top">
      <img src="../../assets//images//title_bg.png" alt="" />
      <h1 class="title_text">塔里木河流域河流湖泊信息系统</h1>
      <div
        style="
          width: 100vw;
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: space-between;
        "
      >
        <dv-decoration3 style="width: 250px; height: 30px" />
        <dv-decoration3 style="width: 250px; height: 30px" />
      </div>
    </div>
    <div class="left">
      <div demo-bg>
        <dv-border-box1 :titleWidth="130">
          <div style="padding: 1rem">
            <span class="text-h5">影像加载</span>
            <dv-decoration-9 style="height: 150px">
              <div color-green font-600 class="content" bg="~ dark/0">100%</div>
            </dv-decoration-9>
          </div>
        </dv-border-box1>
      </div>
      <div>
        <dv-border-box1 :titleWidth="130">
          <div class="content">
            <span class="text-h5">水位图</span>
            <div>
              <div py10 flex="~ col" justify-center items-center>
                <div>
                  <dv-water-level-pond
                    :config="config1"
                    style="height: 200px"
                  />
                </div>
              </div>
            </div>
          </div>
        </dv-border-box1>
      </div>
      <div>
        <dv-border-box1 :titleWidth="130">
          <div class="content">
            <span class="text-h5">锥形图</span>
            <div>
              <div
                w800px
                h320px
                flex="~ col"
                justify-center
                items-center
                bg-dark
              >
                <div>
                  <dv-conical-column-chart
                    :config="config"
                    style="width: 400px; height: 200px"
                  />
                </div>
              </div>
            </div>
          </div>
        </dv-border-box1>
      </div>
    </div>
    <div class="right">
      <!-- <div>
        <dv-border-box1 :titleWidth="130">
          <div class="content">
            <span class="text-h5">隐患发现</span>

          </div>
        </dv-border-box1>
      </div> -->
      <div>
        <dv-border-box1 :titleWidth="130">
          <div class="content">
            <span class="text-h5">历史面积统计</span>
            <lineViewer></lineViewer>
          </div>
        </dv-border-box1>
      </div>
      <div style="display: inline" demo-bg>
        <dv-border-box1 :titleWidth="130">
          <div class="content">
            <span class="text-h5">动态环形图</span>

            <dv-active-ring-chart :config="right_conf" style="height: 300px" />
          </div>
        </dv-border-box1>
      </div>
    </div>
    <div class="bottom">
      <img src="../../assets//images//title_bg.png" alt="" />
      <div class="">
        <dv-decoration6
          style="width: 100%; height: 30px; position: absolute; bottom: 0"
        />
      </div>
    </div>
    <menuViewer></menuViewer>
    <div id="map" class="map"></div>
  </div>
</template>
<script setup>
import { onMounted, reactive } from "vue";
import { Base } from "@lh/cesium";

// geojon
import nmg from "../../assets/geojson/nmg.json";
import shui_nmg from "../../assets/geojson/shui-nmg.json";

// 局部组件引入
// import { dvBorderBox1 } from "@kjgl77/datav-vue3";
import lineViewer from "../../components/line.vue";
import menuViewer from "../../components/menu.vue";

const { init, ImageryLayerConfig, addImageryLayer, modifyMap } = Base;
let viewer;
const config = reactive({
  showValue: true,
  data: [
    {
      name: "2023年",
      value: 42.97,
    },
    {
      name: "2022年",
      value: 42.51,
    },
    {
      name: "2021年",
      value: 48.99,
    },
    {
      name: "2020年",
      value: 51.75,
    },
    {
      name: "2019年",
      value: 53.49,
    },
  ],
});
const config1 = reactive({
  data: [10, 33],
});
const right_config_1config = reactive({
  centerPoint: [0.48, 0.35],
  points: [
    {
      position: [0.52, 0.235],
      text: "新乡",
    },
    {
      position: [0.43, 0.29],
      text: "焦作",
    },
    {
      position: [0.59, 0.35],
      text: "开封",
    },
    {
      position: [0.53, 0.47],
      text: "许昌",
    },
    {
      position: [0.45, 0.54],
      text: "平顶山",
    },
    {
      position: [0.36, 0.38],
      text: "洛阳",
    },
    {
      position: [0.62, 0.55],
      text: "周口",
    },
    {
      position: [0.56, 0.56],
      text: "漯河",
    },
    {
      position: [0.37, 0.66],
      text: "南阳",
    },
    {
      position: [0.55, 0.81],
      text: "信阳",
    },
    {
      position: [0.55, 0.67],
      text: "驻马店",
    },
    {
      position: [0.37, 0.29],
      text: "济源",
    },
    {
      position: [0.2, 0.36],
      text: "三门峡",
    },
    {
      position: [0.76, 0.41],
      text: "商丘",
    },
    {
      position: [0.59, 0.18],
      text: "鹤壁",
    },
    {
      position: [0.68, 0.17],
      text: "濮阳",
    },
    {
      position: [0.59, 0.1],
      text: "安阳",
    },
  ],
  // centerPointImg: {
  //   url: mapCenterPoint,
  // },
  // pointsImg: {
  //   url: mapPoint,
  // },
});
const right_conf = reactive({
  lineWidth: 24,
  digitalFlopStyle: {
    fill: "pink",
  },
  data: [
    {
      name: "2023",
      value: 42.97,
    },
    {
      name: "2022",
      value: 42.51,
    },
    {
      name: "2021",
      value: 48.99,
    },
    {
      name: "2020",
      value: 51.75,
    },
    {
      name: "2019",
      value: 53.49,
    },
  ],
});

const initCanvas = (width, height) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height ? height : width;
  return [canvas, ctx];
};

const getCircleGradient = (
  width = 200,
  centerColor = "rgba(255,255,255,0)",
  edgeColor = "#BD93F9"
) => {
  const [canvas, ctx] = initCanvas(width);
  const radialGradient = ctx.createRadialGradient(
    width / 2,
    width / 2,
    0,
    width / 2,
    width / 2,
    width
  );
  radialGradient.addColorStop(0, centerColor);
  radialGradient.addColorStop(1, edgeColor);
  ctx.fillStyle = radialGradient;
  ctx.fillRect(0, 0, width, width);
  return canvas;
};

const loading = (data) => {
  let entityIds = [];
  let initRadialGradient = getCircleGradient(
    50,
    "rgba(255,255,255,0)",
    "lightblue"
  );
  let initMaterial = new Cesium.ImageMaterialProperty({
    image: initRadialGradient,
    transparent: true,
  });
  let selRadialGradient = getCircleGradient(
    50,
    "rgba(255,0,0,0.3)",
    "rgba(255,255,255,0)"
  );
  let selMaterial = new Cesium.ImageMaterialProperty({
    image: selRadialGradient,
    transparent: true,
  });
  Cesium.GeoJsonDataSource.load(data).then((datasource) => {
    viewer.dataSources.add(datasource);
    viewer.zoomTo(datasource);
    let entities = datasource.entities.values;
    for (let i = 0; i < entities.length; i++) {
      let entity = entities[i];
      entityIds.push(entity.id); // 记录entity.id
      entity.polygon.material = initMaterial; // 设置初始化径向渐变材质
      entity.polygon.extrudedHeight = 1;
      entity.polygon.outline = true;
      entity.polygon.outlineColor = Cesium.Color.LIGHTSKYBLUE;
    }
  });
  /* 点击事件 */
  let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  handler.setInputAction((e) => {
    let pick = viewer.scene.pick(e.position);
    if (Cesium.defined(pick) && pick.id) {
      let entity = pick.id;

      if (entityIds.includes(entity.id)) {
        // 清除上一次点击径向渐变材质
        let lastEntity = viewer.entities.getById("select_grid");
        if (lastEntity) {
          viewer.entities.remove(lastEntity);
        }

        // 设置本次点击径向渐变材质
        let positions = entity.polygon.hierarchy.getValue(
          Cesium.JulianDate.now()
        ).positions;
        viewer.entities.add({
          id: "select_grid",
          polygon: {
            hierarchy: positions,
            material: selMaterial,
          },
        });
      }
    } else {
      // 清除上一次点击径向渐变材质
      let lastEntity = viewer.entities.getById("select_grid");
      if (lastEntity) {
        viewer.entities.remove(lastEntity);
      }
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
};

onMounted(async () => {
  const v = await init("map");
  viewer = v.viewer;
  window.viewer = viewer;
  viewer.scene.globe.depthTestAgainstTerrain = true;
  // var mapboxLayer = new Cesium.MapboxStyleImageryProvider({
  //   username: "hklh",
  //   styleId: "clpki9oma007x01px73gmc9l6",
  //   accessToken:
  //     "pk.eyJ1IjoiaGtsaCIsImEiOiJjbDMzdHR5bTcxcTc3M2ptaGxlODEzZnlhIn0.9ZagRtR3ZH3koVr_OUBUCA",
  // });
  // viewer.imageryLayers.addImageryProvider(mapboxLayer);
  // loading(nmg);
  // loading(shui_nmg);

  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(112.686575, 40.581897, 19000),
    orientation: {
      heading: 6.283185307179581,
      pitch: -1.5688168484696687,
      roll: 0.0,
    },
  });
});
</script>

<style scoped lang="scss">
.map {
  height: 100vh;
  width: 100vw;
}
.top {
  position: absolute;
  width: 100vw;
  height: 10vh;
  top: 0;
  z-index: 1;
  color: white;
  img {
    position: absolute;
    width: 100vw;
  }
  .title_text {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
.left {
  width: 25vw;
  padding: 1rem;
  position: absolute;
  z-index: 1;
  left: 0;
  top: 7vh;
  bottom: 7vh;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(11, 36, 41));
  display: flex;
  flex-direction: column;
  div {
    flex: 1;
    color: white;
  }
}
.right {
  width: 25vw;
  padding: 1rem;
  position: absolute;
  z-index: 1;
  right: 0;
  top: 7vh;
  bottom: 7vh;
  background: linear-gradient(to left, rgba(0, 0, 0, 0.7), rgba(11, 36, 41));
  display: flex;
  flex-direction: column;
  div {
    flex: 1;
    color: white;
  }
}
.bottom {
  position: absolute;
  height: 10vh;
  width: 100vw;

  bottom: 0;
  z-index: 1;
  img {
    position: absolute;
    transform: rotateX(180deg);
  }
}

.content {
  padding: 1rem;
  width: 100%;
  height: 100%;
}
</style>

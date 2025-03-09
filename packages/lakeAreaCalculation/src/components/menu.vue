<template>
  <div class="containner">
    <div class="content_box">
      <dv-button id="home" border="Border2" color="#0968db">定位</dv-button>
      <dv-button id="img" border="Border2" color="#0968db">卫星影像</dv-button>
      <dv-button id="ver" border="Border2" color="#0968db">矢量影像</dv-button>
      <dv-button id="teer" border="Border2" color="#0968db">三维地形</dv-button>
      <dv-button id="area" border="Border2" color="#0968db">面积计算</dv-button>
    </div>
  </div>
</template>

<script setup>
import { Base, Mix } from "@lh/cesium";
import { onMounted } from "vue";

const { ImageryLayerConfig, addImageryLayer } = Base;
const { MeasureSpaceArea } = Mix;

let img = false;
let ver = false;
let teer = false;

const event = [
  {
    id: "home",
    event: () => {
      viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(
          112.686575,
          40.581897,
          19000
        ),
        orientation: {
          heading: 6.283185307179581,
          pitch: -1.5688168484696687,
          roll: 0.0,
        },
      });
    },
  },
  {
    id: "img",
    event: () => {
      img = !img;
      if (img) {
        addImageryLayer(
          viewer,
          ImageryLayerConfig.tianditu_img.type,
          ImageryLayerConfig.tianditu_img.options
        );
        addImageryLayer(
          viewer,
          ImageryLayerConfig.tianditu_label.type,
          ImageryLayerConfig.tianditu_label.options
        );
      }
    },
  },
  {
    id: "ver",
    event: () => {
      ver = !ver;
      if (ver) {
        addImageryLayer(
          viewer,
          ImageryLayerConfig.tianditu_vec.type,
          ImageryLayerConfig.tianditu_vec.options
        );
        addImageryLayer(
          viewer,
          ImageryLayerConfig.tianditu_label.type,
          ImageryLayerConfig.tianditu_label.options
        );
      }
    },
  },
  {
    id: "teer",
    event: () => {
      teer = !teer;
      if (teer) {
        viewer.scene.setTerrain(
          new Cesium.Terrain(Cesium.CesiumTerrainProvider.fromIonAssetId(3956))
        );
      }
    },
  },
  {
    id: "area",
    event: () => {
      const t = new MeasureSpaceArea(viewer);
      t.start();
      //   document.addEventListener("contextmenu", function (e) {
      //     console.log(e);
      //   });
    },
  },
];
onMounted(() => {
  event.forEach((button) => {
    let dom = document.getElementById(button.id);
    dom.addEventListener("click", button.event);
  });
});
</script>

<style scoped lang="scss">
.containner {
  width: 100vw;
  position: absolute;
  z-index: 1;
  display: flex;
  align-content: center;
  justify-content: center;
  top: 15%;
  .content_box {
    display: flex;
    align-content: center;
    justify-items: center;
    gap: 8px;
  }
}
</style>

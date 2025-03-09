<template>
  <div class="conainer-map" id="map">
    <div class="btn">
      <v-sheet>
        <v-lit>
          <v-list-item title="二维热力图 / 清除" @click="heatmap"></v-list-item>
        </v-lit>
      </v-sheet>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { Base, Mix } from "@lh/cesium";
const { init } = Base;
const { HeatMap } = Mix;

let viewer;
let handler = null;
let position = [];
let tmp = null;
let polygon = null;
function heatmap() {
  // if (polygon) {
  //   viewer.entities.remove(polygon);
  //   polygon = null;
  //   position = [];
  //   handler.removeInputAction();
  // }
  if (handler) {
    handler.removeInputAction();

    viewer.entities.removeAll();
    polygon = null;
    position = [];
  }
  handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
  handler.setInputAction(function (event) {
    // const pick = viewer.scene.pickPosition(event.position)
    const pick = viewer.camera.pickEllipsoid(
      event.position,
      viewer.scene.globe.ellipsoid
    );
    if (Cesium.defined(pick)) {
      // 将点添加进保存多边形点的数组中，鼠标停止移动的时添加的点和，点击时候添加的点，坐标一样
      position.push(pick);
      // 判断是否开始绘制动态多边形，没有的话则开始绘制
      if (tmp == null) {
        // 绘制动态多边形
        dynDrawPolygon(viewer);
      }
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  handler.setInputAction(function () {
    viewer.entities.remove(tmp);
    DrawPolygon(viewer);
  }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
  function dynDrawPolygon(viewer) {
    tmp = viewer.entities.add({
      name: "Green extruded polygon",
      polygon: {
        hierarchy: new Cesium.CallbackProperty(function () {
          return new Cesium.PolygonHierarchy(position);
        }, false),
        // extrudedHeight: 500000.0,
        clampToGround: true,
        material: Cesium.Color.DEEPSKYBLUE,
        // closeTop: false,
        // closeBottom: false,
      },
    });
  }
  function DrawPolygon(viewer) {
    const heat = new HeatMap(viewer);
    const img = heat.heatmap.getDataURL();
    polygon = viewer.entities.add({
      polygon: {
        hierarchy: position,
        clampToGround: true,
        // perPositionHeight: true,
        // extrudedHeight: propertyTime,
        material: img,
        // closeTop: false,
        // closeBottom: false,
      },
    });
  }
}

onMounted(async () => {
  const v1 = await init("map");
  viewer = v1.viewer;
});
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

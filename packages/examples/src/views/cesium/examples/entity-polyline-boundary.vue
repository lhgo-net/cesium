<template>
  <div class="conainer-map" id="map"></div>
</template>

<script setup>
import { onMounted } from "vue";
import { Base } from "@lh/cesium";

import json520102 from "../../../assets/json/520102.json";
let entityIds = [];
let viewer;

onMounted(async () => {
  const v = await Base.init("map");
  viewer = v.viewer;

  Cesium.GeoJsonDataSource.load(json520102).then((datasource) => {
    viewer.dataSources.add(datasource);
    viewer.zoomTo(datasource);
    let entities = datasource.entities.values;
    for (let i = 0; i < entities.length; i++) {
      let entity = entities[i];

      entityIds.push(entity.id); // 记录entity.id
      entity.polygon.material = new Cesium.ColorMaterialProperty(
        new Cesium.Color(255, 255, 255, 0.1)
      );
      entity.polygon.extrudedHeight = 100;
      entity.polygon.outline = true;
      entity.polygon.outlineColor = Cesium.Color.LIGHTSKYBLUE;
    }
  });
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

<template>
  <div class="conainer-map" id="map">
    <div class="btn">
      <v-sheet class="pa-2">
        <v-switch
          v-model="model"
          color="primary"
          label="包含子区域"
          indeterminate
        ></v-switch>
        <cityTree @changeCity="handlerChange"></cityTree>
      </v-sheet>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { Base } from "@lh/cesium";
import cityTree from "@/components/tool/citySelect/index.vue";

const model = ref(false);
let viewer;

const handlerChange = (city) => {
  axios
    .get("https://geo.datav.aliyun.com/areas_v3/bound/geojson", {
      params: {
        code: `${city.adcode}${model.value ? "_full" : ""}`,
      },
    })
    .then((res) => {
      addGeoJson(res.data);
    });
};

const addGeoJson = (geo) => {
  viewer.dataSources.removeAll();
  const promise = Cesium.GeoJsonDataSource.load(geo);
  promise.then((datasource) => {
    viewer.dataSources.add(datasource);
    viewer.zoomTo(datasource);
    let entities = datasource.entities.values;
    for (let i = 0; i < entities.length; i++) {
      let entity = entities[i];

      entity.polygon.material = new Cesium.ColorMaterialProperty(
        new Cesium.Color(255, 255, 255, 0.1)
      );
      entity.polygon.extrudedHeight = 100;
      entity.polygon.outline = true;
      entity.polygon.outlineColor = Cesium.Color.LIGHTSKYBLUE;
    }
  });
};

onMounted(async () => {
  const v = await Base.init("map");
  viewer = v.viewer;
});
</script>

<style scoped>
.conainer-map {
  position: relative;
}
.btn {
  position: absolute;
  width: 200px;
  z-index: 10;
}
</style>

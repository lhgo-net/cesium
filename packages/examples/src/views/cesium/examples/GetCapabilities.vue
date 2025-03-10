<template>
  <div>
    <div class="conainer-map" id="map"></div>
    <div id="xml"></div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { Base } from "@lh/cesium";
import axios from "axios";

const { init } = Base;

onMounted(async () => {
  const { viewer } = await init("map");

  //   function parseWMSData(xmlDoc) {
  //     // 假设我们感兴趣的是第一个图层
  //     var layerName = xmlDoc
  //       .getElementsByTagName("Layer")[0]
  //       .getElementsByTagName("Name")[0].textContent;

  //     // 使用获取到的layerName初始化Cesium中的WMSImageryProvider
  //     var wmsImageryProvider = new Cesium.WebMapServiceImageryProvider({
  //       url: "https://t0.tianditu.gov.cn/img_w/wmts?request=GetCapabilities&service=wmts", // 替换为你的WMS服务地址
  //       layers: layerName,
  //       parameters: {
  //         transparent: true,
  //         format: "image/png",
  //       },
  //     });

  //     // 将WMS图层添加到Cesium Viewer中
  //     viewer.imageryLayers.addImageryProvider(wmsImageryProvider);
  //   }
  //   parseWMSData();
  // WFS 服务 URL
  const wfsUrl =
    "http://gisserver.tianditu.gov.cn/TDTService/wfs?" +
    "service=WFS&" +
    "version=1.1.0&" +
    "request=GetFeature&" +
    "typename=LRDL&" +
    "outputFormat=application/json";

  fetch(wfsUrl)
    .then((response) => response.json())
    .then((geojsonData) => {
      console.log(geojsonData)
      Cesium.GeoJsonDataSource.load(geojsonData).then((dataSource) => {
        viewer.dataSources.add(dataSource);
      });
    })
    .catch((error) => console.error("WFS 加载失败:", error));

  function displayXML(xml, container) {
    container.innerHTML = ""; // 清空容器

    function createNodeElement(node) {
      const div = document.createElement("div");
      div.style.marginLeft = "10px";

      const title = document.createElement("strong");
      title.textContent = node.nodeName + ": ";
      div.appendChild(title);

      if (node.children.length > 0) {
        const childContainer = document.createElement("div");
        Array.from(node.children).forEach((childNode) => {
          childContainer.appendChild(createNodeElement(childNode));
        });
        div.appendChild(childContainer);
      } else {
        const text = document.createTextNode(node.textContent.trim());
        div.appendChild(text);
      }

      return div;
    }

    container.appendChild(createNodeElement(xml));
  }
  axios
    .get("/td/img_w/wmts?request=GetCapabilities&service=wmts")
    .then((res) => {
      console.log(res.data);
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(res.data, "text/xml");
      displayXML(xmlDoc.documentElement, document.getElementById("xml"));
    });
});
</script>

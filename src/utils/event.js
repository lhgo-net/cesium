import { onMounted } from 'vue';
export function useEventListener(id, callback) {
  onMounted(() => {
    console.log(id)
    callback(id)
  })
}
// const providerImage = new Cesium.WebMapTileServiceImageryProvider({
//   url: `http://{s}.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=${key}`,
//   layer: "img_w",	//WMTS请求的层名称
//   style: "default",//WMTS请求的样式名称
//   format: "tiles",//MIME类型，用于从服务器检索图像
//   format: "image/jpeg",
//   tileMatrixSetID: "GoogleMapsCompatible",//	用于WMTS请求的TileMatrixSet的标识符
//   subdomains: subdomains,//天地图8个服务器
//   minimumLevel: 1,//最小层级
//   maximumLevel: 16,//最大层级
// })
// const providerLabel = new Cesium.WebMapTileServiceImageryProvider({
//   url: "http://{s}.tianditu.gov.cn/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0" +
//     "&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}" +
//     "&style=default.jpg&tk=" + key,
//   // url: TDT_CVA_W,//url地址
//   layer: "cia_w",	//WMTS请求的层名称
//   style: "default",//WMTS请求的样式名称
//   format: "tiles",//MIME类型，用于从服务器检索图像
//   tileMatrixSetID: "GoogleMapsCompatible",//	用于WMTS请求的TileMatrixSet的标识符
//   subdomains: subdomains,//天地图8个服务器
//   minimumLevel: 0,//最小层级
//   maximumLevel: 18,//最大层级
// })
// const imageryLayer = new Cesium.ImageryLayer(providerImage)
// const imageryLabel = new Cesium.ImageryLayer(providerLabel)
// viewer.imageryLayers.add(imageryLayer)
// viewer.imageryLayers.add(imageryLabel)
// console.log(viewer)
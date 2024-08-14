// // 自定义材质的
// function PolylineTrailLinkMaterialPropertyRoad(color, duration) {
//   this._definitionChanged = new Cesium.Event()
//   this._color = undefined
//   this._colorSubscription = undefined
//   this.color = color
//   this.duration = duration
//   this._time = new Date().getTime()
// }
// Object.defineProperties(PolylineTrailLinkMaterialPropertyRoad.prototype, {
//   isConstant: {
//     get: function () {
//       return false
//     }
//   },
//   definitionChanged: {
//     get: function () {
//       return this._definitionChanged
//     }
//   },
//   color: Cesium.createPropertyDescriptor('color')
// })
// PolylineTrailLinkMaterialPropertyRoad.prototype.getType = function (time) {
//   return 'PolylineTrailLink'
// }
// PolylineTrailLinkMaterialPropertyRoad.prototype.getValue = function (time, result) {
//   if (!Cesium.defined(result)) {
//     result = {}
//   }
//   result.color = Cesium.Property.getValueOrClonedDefault(
//     this._color,
//     time,
//     Cesium.Color.WHITE,
//     result.color
//   )
//   result.time = ((new Date().getTime() - this._time) % this.duration) / this.duration
//   return result
// }
// PolylineTrailLinkMaterialPropertyRoad.prototype.equals = function (other) {
//   return (
//     this === other ||
//     (other instanceof PolylineTrailLinkMaterialPropertyRoad &&
//       Property.equals(this._color, other._color))
//   )
// }
// Cesium.PolylineTrailLinkMaterialPropertyRoad = PolylineTrailLinkMaterialPropertyRoad
// Cesium.Material.PolylineTrailLinkType = 'PolylineTrailLink'
// Cesium.Material.PolylineTrailLinkImage = require('./blue6.png') //道路样式的png
// Cesium.Material.PolylineTrailLinkSource =
//   'czm_material czm_getMaterial(czm_materialInput materialInput)\n\
//                                                 {\n\
//                                                     czm_material material = czm_getDefaultMaterial(materialInput);\n\
//                                                     vec2 st = materialInput.st;\n\
//                                                     vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));\n\
//                                                     material.alpha = colorImage.a * color.a;\n\
//                                                     material.diffuse = (colorImage.rgb+color.rgb)/2.0;\n\
//                                                     return material;\n\
//                                                 }'
// Cesium.Material._materialCache.addMaterial(Cesium.Material.PolylineTrailLinkType, {
//   fabric: {
//     type: Cesium.Material.PolylineTrailLinkType,
//     uniforms: {
//       color: new Cesium.Color(1.0, 0.0, 0.0, 0.5),
//       image: Cesium.Material.PolylineTrailLinkImage,
//       time: 0,
//       constantSpeed: 300,
//       depthFailMaterial: true
//     },
//     source: Cesium.Material.PolylineTrailLinkSource
//   },
//   translucent: function (material) {
//     return true
//   }
// })

// export { PolylineTrailLinkMaterialPropertyRoad }

// // 创建流动线对象
// viewer.entities.add({
//   polyline: new Cesium.PolylineGraphics({
//     material: new Cesium.PolylineTrailLinkMaterialPropertyRoad('#0cfd11', 20000),
//     width: new Cesium.ConstantProperty(25), // 线宽
//     arcType: Cesium.ArcType.GEODESIC,
//     positions: Cesium.Cartesian3.fromDegreesArrayHeights(positions) //positions道路经过的坐标点集合
//   })
// })

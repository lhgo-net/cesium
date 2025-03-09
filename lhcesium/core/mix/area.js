import * as turf from "@turf/turf";

import * as T from "./draw";
import { Prompt } from "./prompt/prompt";

let unitFormatter = {
  m: (val, decimal = 2) => `${Number(val).toFixed(decimal)}m`,
  米: (val, decimal = 2) => `${Number(val).toFixed(decimal)}米`,

  km: (val, decimal = 2) => `${(Number(val) / 1000).toFixed(decimal)}km`,
  千米: (val, decimal = 2) => `${(Number(val) / 1000).toFixed(decimal)}千米`,

  "m²": (val, decimal = 2) => `${Number(val).toFixed(decimal)}m²`,
  平方米: (val, decimal = 2) => `${Number(val).toFixed(decimal)}平方米`,

  "km²": (val, decimal = 2) => `${(Number(val) / 1000000).toFixed(decimal)}km²`,
  平方千米: (val, decimal = 2) =>
    `${(Number(val) / 1000000).toFixed(decimal)}平方千米`,
};
function formateUnit(val, dw = "m") {
  if (!Cesium.defined(val)) return;

  return unitFormatter[dw](val);
}
function pxToCartesian3(viewer, px) {
  if (!Cesium.defined(viewer) || !Cesium.defined(px)) return;

  let cartesian,
    isOn3dtiles = false, // 点是否在3DTileset上
    picks = viewer.scene.drillPick(px);
  viewer.scene.render();
  for (let i = 0; i < picks.length; i++) {
    if (
      picks[i] &&
      picks[i].primitive &&
      picks[i].primitive instanceof Cesium.Cesium3DTileset
    ) {
      isOn3dtiles = true; // 模型上拾取坐标
      break;
    }
  }

  if (isOn3dtiles) {
    cartesian = viewer.scene.pickPosition(px);
  } else {
    let ray = viewer.camera.getPickRay(px);
    if (!Cesium.defined(ray)) return;
    cartesian = viewer.scene.globe.pick(ray, viewer.scene);
  }
  return cartesian;
}
const EntityConfig = {
  /* 1 model，point，box，cylinder，plane，ellipsoid */
  model: {
    show: true,
    uri: "",
    scale: 1.0,

    // heightReference
    // distanceDisplayCondition

    // shadows
    // imageBasedLightingFactor
    // lightColor
    // silhouetteColor
    // silhouetteSize

    // incrementallyLoadTextures
    // runAnimations
    // clampAnimations

    // color
    // colorBlendMode
    // colorBlendAmount

    // minimumPixelSize
    // maximumScale

    // nodeTransformations
    // articulations
    // clippingPlanes
    // customShader
  },
  point: {
    show: false,

    pixelSize: 6,
    outlineWidth: 2,

    color: Cesium.Color.PINK,
    outlineColor: Cesium.Color.WHITE,
    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,

    // distanceDisplayCondition
    // disableDepthTestDistance

    // scaleByDistance
    // translucencyByDistance
  },
  box: {
    show: true,
    dimensions: new Cesium.Cartesian3(100.0, 100.0, 100.0), // length width height

    fill: true,
    material: Cesium.Color.PINK,

    outline: true,
    outlineColor: Cesium.Color.WHITE,
    outlineWidth: 2,
    // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND

    // distanceDisplayCondition

    // shadows
  },
  cylinder: {
    show: true,

    length: 8.0,
    topRadius: 0,
    bottomRadius: 4.0,

    fill: true,
    material: Cesium.Color.PINK,
    outline: true,
    outlineColor: Cesium.Color.WHITE,
    outlineWidth: 2,

    slices: 4,
    numberOfVerticalLines: 4,
    // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,

    // distanceDisplayCondition

    // shadows
  },
  plane: {
    show: true,

    plane: new Cesium.Plane(Cesium.Cartesian3.UNIT_Z, 0.0),
    dimensions: new Cesium.Cartesian2(100.0, 100.0), // width height

    fill: true,
    material: Cesium.Color.PINK,
    outline: true,
    outlineColor: Cesium.Color.WHITE,
    outlineWidth: 2,

    // distanceDisplayCondition
    // shadows
  },
  ellipsoid: {
    show: true,

    radii: new Cesium.Cartesian3(5.0, 5.0, 5.0),
    // innerRadii: new Cesium.Cartesian3(60000.0, 60000.0, 60000.0),
    // minimumCone
    // maximumCone
    // minimumClock
    // maximumClock

    fill: true,
    material: Cesium.Color.PINK,

    outline: true,
    outlineColor: Cesium.Color.WHITE,
    outlineWidth: 2,

    stackPartitions: 3, // 纬向线数
    slicePartitions: 5, // 经向线数

    // heightReference

    // distanceDisplayCondition
    // subdivisions
    // shadows
  },

  /* 2 ellipse，rectangle */
  ellipse: {
    show: true,

    semiMajorAxis: 100,
    semiMinorAxis: 100,
    height: 50,
    heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
    extrudedHeight: 200,
    extrudedHeightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,

    fill: true,
    material: Cesium.Color.PINK,
    outline: true,
    outlineColor: Cesium.Color.WHITE,
    outlineWidth: 2,

    numberOfVerticalLines: 0,

    // rotation
    // stRotation

    // distanceDisplayCondition

    // zIndex
    // shadows
    // classificationType
    // granularity
  },
  rectangle: {
    show: true,
    coordinates: Cesium.Rectangle.fromDegrees(-92.0, 20.0, -86.0, 27.0),

    height: 100,
    heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
    extrudedHeight: 20000,
    extrudedHeightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,

    fill: true,
    material: Cesium.Color.PINK,
    outline: true,
    outlineColor: Cesium.Color.WHITE,
    outlineWidth: 2,

    // rotation
    // stRotation

    // distanceDisplayCondition

    // zIndex
    // shadows
    // classificationType
    // granularity
  },

  /* 3
   * polyline polylineVolume corridor polygon wall
   * path tileset
   */
  /**
   * PolylineGraphics的ArcType属性
   */
  polyline: {
    // positions,
    show: true,
    material: new Cesium.PolylineOutlineMaterialProperty({
      color: Cesium.Color.GOLD,
      outlineWidth: 1,
      outlineColor: Cesium.Color.BLACK,
    }),
    // 箭头
    // material:new Cesium.PolylineArrowMaterialProperty(Cesium.Color.GOLD),
    disableDepthTestDistance: Number.POSITIVE_INFINITY,
    width: 3, // 箭头 6
    clampToGround: false,
  },
  polygon: {},

  /* 4 label billboard */
  label: {
    text: "",
    font: "18px Helvetica",
    fillColor: Cesium.Color.WHITE,
    outlineColor: Cesium.Color.BLACK,
    outlineWidth: 2,
    disableDepthTestDistance: Number.POSITIVE_INFINITY,
    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
    pixelOffset: new Cesium.Cartesian2(0, -20),
  },
};
function addEntity(viewer, config = {}) {
  if (!Cesium.defined(viewer) || !Cesium.defined(config)) return;

  let entity = viewer.entities.add(config);

  return [entity.id, entity];
}
function getAreaCenter(positions) {
  if (!positions || positions.length < 1) return;
  let cartographics = [];
  let turfPoints = [];
  for (let i = 0; i < positions.length; i++) {
    let cartesian3 = positions[i];
    let cartographic = Cesium.Cartographic.fromCartesian(cartesian3);
    cartographics.push([
      Cesium.Math.toDegrees(cartographic.longitude),
      Cesium.Math.toDegrees(cartographic.latitude),
    ]);
    turfPoints.push(
      turf.point([
        Cesium.Math.toDegrees(cartographic.longitude),
        Cesium.Math.toDegrees(cartographic.latitude),
      ])
    );
  }
  if (!cartographics.length) return;
  cartographics = cartographics.concat([cartographics[0]]);
  let polygon = turf.polygon([cartographics]);
  let area = turf.area(polygon);
  // 获取当前范围的中心点
  let features = turf.featureCollection(turfPoints);
  let turfCenter = turf.center(features);
  let center = turfCenter.geometry.coordinates;

  return [area, Cesium.Cartesian3.fromDegrees(center[0], center[1])];
}
class Length extends T.DrawLine {
  constructor(viewer) {
    super(viewer);
  }
}

class MeasureSpaceArea {
  constructor(viewer) {
    this.viewer = viewer;
    this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.canvas);
    this.prompt = null;
    this.promptStyle = {
      show: true,
      offset: {
        x: 20,
        y: 20,
      },
    };
    this.polylineClampToGround = !!this.viewer.terrainProvider.availability; // 有地形则贴地

    this.controlPoints = [];
    this.positions = [];
    this.movePush = false;
    this.polyline = null;
    this.polygon = null;
    this.floatLabel = null;

    this.state = "";
  }

  start() {
    this.state = "start";

    if (this.promptStyle.show)
      this.prompt = new Prompt(this.viewer, this.promptStyle);

    this.handler.setInputAction((evt) => {
      let cartesian = pxToCartesian3(this.viewer, evt.position);
      if (!cartesian) return;

      if (this.movePush) {
        this.positions.pop();
        this.movePush = false;
      }

      let config = {
        position: cartesian.clone(),
        point: { ...EntityConfig.point },
      };
      let [, point] = addEntity(this.viewer, config);
      // let [, point] = addPoint(this.viewer, cartesian.clone())
      this.controlPoints.push(point);
      this.positions.push(cartesian);
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    this.handler.setInputAction((evt) => {
      if (this.positions.length < 1)
        return this.prompt.update(evt.endPosition, "单击开始绘制");
      let str =
        this.positions.length == 2
          ? "单击开始绘制"
          : "双击结束，右键取消上一步";
      this.prompt.update(evt.endPosition, str);

      let cartesian = pxToCartesian3(this.viewer, evt.endPosition);
      if (!cartesian) return;
      if (!this.movePush) {
        this.positions.push(cartesian);
        this.movePush = true;
      } else {
        this.positions[this.positions.length - 1] = cartesian;
      }

      if (this.positions.length == 2) {
        if (!this.polyline) {
          let positionsCallbackProperty = new Cesium.CallbackProperty(
            () => this.positions.concat([this.positions[0]]),
            false
          );
          let config = {
            polyline: {
              ...EntityConfig.polyline,
              positions: positionsCallbackProperty,
              clampToGround: this.polylineClampToGround,
            },
          };
          [, this.polyline] = addEntity(this.viewer, config);
          // ;[, this.polyline] = addPolyline(
          //   this.viewer,
          //   positionsCallbackProperty,
          //   this.polylineClampToGround
          // )
        }
      }
      if (this.positions.length == 3) {
        if (!this.polygon) {
          let hierarchyCallbackProperty = new Cesium.CallbackProperty(
            () => new Cesium.PolygonHierarchy(this.positions),
            false
          );
          let config = {
            polygon: new Cesium.PolygonGraphics({
              hierarchy: hierarchyCallbackProperty,
              material: Cesium.Color.WHITE.withAlpha(0.6),
              fill: true,
            }),
          };
          [, this.polygon] = addEntity(this.viewer, config);
        }

        let config = {
          position: cartesian,
          label: EntityConfig.label,
        };
        if (!this.floatLabel)
          [, this.floatLabel] = addEntity(this.viewer, config);
        // if (!this.floatLabel) [, this.floatLabel] = addLabel(this.viewer, cartesian)
      }

      if (this.polygon) this.updateText();
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    this.handler.setInputAction((evt) => {
      if (!this.polyline && !this.polygon) return;

      this.positions.splice(this.positions.length - 2, 1);
      this.viewer.entities.remove(this.controlPoints.pop());

      if (this.positions.length == 1) {
        if (this.polyline)
          this.viewer.entities.remove(this.polyline) && (this.polyline = null);

        this.prompt.update(evt.endPosition, "单击开始测量");
        this.positions = [];
        this.movePush = false;
      }

      if (this.positions.length == 2) {
        if (this.polygon) {
          this.viewer.entities.remove(this.polygon) && (this.polygon = null);
          if (this.polyline) this.polyline.show = true;
        }
        this.floatLabel.show = false;
      }

      if (this.positions.length > 2) this.updateText();
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

    this.handler.setInputAction(() => {
      if (!this.polygon) return;

      // 移除最后一个
      this.positions.pop();
      this.viewer.entities.remove(this.controlPoints.pop());

      this.movePush = false;
      this.viewer.scene.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
      this.viewer.trackedEntity = undefined;
      this.updateText();
      this.end();
    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  }

  end() {
    this.state = "end";

    if (this.handler) this.handler.destroy();
    if (this.prompt) this.prompt.destroy() && (this.prompt = null);
  }

  destroy() {
    this.state = "destroy";

    if (this.polyline)
      this.viewer.entities.remove(this.polyline) && (this.polyline = null);

    if (this.polygon)
      this.viewer.entities.remove(this.polygon) && (this.polygon = null);

    if (this.floatLabel)
      this.viewer.entities.remove(this.floatLabel) && (this.floatLabel = null);

    for (let i = 0; i < this.controlPoints.length; i++) {
      this.viewer.entities.remove(this.controlPoints[i]);
    }
    this.controlPoints = [];

    /* 控制插件 */
    if (this.handler) this.handler.destroy();
    if (this.prompt) this.prompt.destroy() && (this.prompt = null);
  }

  updateText() {
    let [area, center] = getAreaCenter(this.positions);
    this.floatLabel.label.text = `面积：${formateUnit(area, "平方米")}`;
    this.floatLabel.show = true;
    if (center) this.floatLabel.position.setValue(center);
  }
}

export { Length, MeasureSpaceArea };

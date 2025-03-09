import { FlowRoad } from "./flowRoad";
import * as Dynamic from "./Dynamic";
import * as cluster from "./cluster";
import * as Line from "./line";

import { getCircleGradient } from "../util/canvas/index";

function polygonGradient(viewer,Feature) {
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
  Cesium.GeoJsonDataSource.load(Feature).then((datasource) => {
    viewer.dataSources.add(datasource);
    viewer.zoomTo(datasource);
    let entities = datasource.entities.values;
    for (let i = 0; i < entities.length; i++) {
      let entity = entities[i];
      entityIds.push(entity.id); // 记录entity.id
      entity.polygon.material = initMaterial; // 设置初始化径向渐变材质
      entity.polygon.extrudedHeight = 100;
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
}
export const Entity = {
  FlowRoad,
  polygonGradient,
  ...Dynamic,
  ...cluster,
  ...Line,
};

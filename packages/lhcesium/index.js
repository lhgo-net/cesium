import * as Cesium from "./libs/CesiumUnminified";

import { Base } from "./core/base";
import { Utils } from "./core/util";
import { Mix } from "./core/mix";
import { Entity } from "./core/entity";
// import { Tiles } from './core/tiles'

const mount = () => {
  window.Cesium = Cesium;
  console.log(Cesium);
};
export { mount, Base, Utils, Mix, Entity };

/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.118.2
 *
 * Copyright 2011-2022 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/main/LICENSE.md for full licensing details.
 */

import {
  EllipseGeometry_default
} from "./chunk-SBHPKUCO.js";
import "./chunk-UWJGWLEK.js";
import "./chunk-PCXC3OUA.js";
import "./chunk-5WD46ZLG.js";
import "./chunk-J66ALX2F.js";
import "./chunk-FJAJPZM5.js";
import "./chunk-WOP6XSYC.js";
import "./chunk-DVZ7WJU7.js";
import "./chunk-M3F6NQBE.js";
import "./chunk-FEGRX6GH.js";
import "./chunk-SHUTHHKI.js";
import "./chunk-JWG6GIA6.js";
import "./chunk-Y7XSNRJ3.js";
import "./chunk-4HV3KTSK.js";
import "./chunk-TUET7NH2.js";
import "./chunk-YMXDMYQZ.js";
import {
  Cartesian3_default,
  Ellipsoid_default
} from "./chunk-7IW6PHX4.js";
import "./chunk-NXXDKKKU.js";
import "./chunk-YGCM7RLG.js";
import "./chunk-AOZ4FZEA.js";
import "./chunk-T4GD266U.js";
import "./chunk-NLRR4M7V.js";
import {
  defined_default
} from "./chunk-WRTTFWHA.js";

// packages/engine/Source/Workers/createEllipseGeometry.js
function createEllipseGeometry(ellipseGeometry, offset) {
  if (defined_default(offset)) {
    ellipseGeometry = EllipseGeometry_default.unpack(ellipseGeometry, offset);
  }
  ellipseGeometry._center = Cartesian3_default.clone(ellipseGeometry._center);
  ellipseGeometry._ellipsoid = Ellipsoid_default.clone(ellipseGeometry._ellipsoid);
  return EllipseGeometry_default.createGeometry(ellipseGeometry);
}
var createEllipseGeometry_default = createEllipseGeometry;
export {
  createEllipseGeometry_default as default
};

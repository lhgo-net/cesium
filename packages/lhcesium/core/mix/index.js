import * as draw from "./draw.js";
import * as Weather from "./weather.js";
import * as Road from "./road.js";
import * as Area from "./area.js";
import * as heatmap from "./heatmap.js";
import * as popup from "./popup.js";
import * as Windy from "./wind/Windy.js";

export const Mix = {
  ...draw,
  ...Weather,
  ...Road,
  ...Area,
  ...heatmap,
  ...popup,
  ...Windy,
};

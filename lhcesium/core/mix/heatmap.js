import {heatmap} from "../../libs/heatmap/heatmap.js";
class HeatMap {
  constructor(viewer, config) {
    this.viewer = viewer;
    this.height = 500;
    this.width = 800;
    const dom = document.createElement("div");
    dom.setAttribute("style", `width:${this.width}px;height:${this.height}px`);
    document.body.appendChild(dom);
    this.config = config || {
      container: dom,
      maxOpacity: 0.5,
      radius: 50,
      blur: 0.75,
    };
    this.heatmap = heatmap().create(this.config);
    this.rander();
  }
  rander() {
    const points = [];
    let max = 0;
    let len = 300;
    while (len > 0) {
      len--;
      const val = Math.floor(Math.random() * 100);
      max = Math.max(max, val);
      const point = {
        x: Math.floor(Math.random() * 1000),
        y: Math.floor(Math.random() * 1000),
        value: val,
      };
      points.push(point);
    }

    const data = {
      max: max,
      data: points,
    };
    this.heatmap.setData(data);
  }
}
export { HeatMap };

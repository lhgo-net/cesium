import { lineFlowMaterialProperty } from "./MaterialProperty/lineFlowMaterialProperty";

import gy from '../../assets/json/贵州省.json'
const myCesium = lineFlowMaterialProperty(Cesium);

export class Line {
  constructor() {
    this.dataSource = new Cesium.CustomDataSource("myEntity");
    this.dataSources = new Cesium.CustomDataSource("dataSources");
    // return {
    //   lineFlowInit:this.lineFlowInit,
    //   parabola:this.parabola
    // }
  }
  parabola(viewer, center = [106.713478, 26.578343], position = [[107.053287, 26.778993]],color) {
    this.dataSource.entities.removeAll();
    this.parabolaFlowInit(viewer, center, position,color, 1);
  }

  /**
   * @description: 抛物飞线效果初始化
   * @param {*} viewer
   * @param {*} _num :每条线上的飞线数量
   * @return {*}
   */
  parabolaFlowInit(viewer, _center, _positions, _color, _num) {
    _positions.forEach((item) => {
      const _siglePositions = parabola(_center, item, 5000);
      // 创建飞线
      for (let i = 0; i < _num; i++) {
        const entity1 = new Cesium.Entity({
          polyline: {
            positions: _siglePositions,
            material: new myCesium.LineFlowMaterialProperty({
              color: _color,
              speed: 15 * Math.random(),
              percent: 0.1,
              gradient: 0.01,
            }),
          },
        });

        this.dataSources.entities.add(entity1);
      }
      const entity2 = new Cesium.Entity({
        polyline: {
          positions: _siglePositions,
          material: new Cesium.Color(1.0, 1.0, 0.0, 0.2),
        },
      });
      this.dataSources.entities.add(entity2);
    });
    viewer.dataSources.add(this.dataSources);
    viewer.flyTo(this.dataSources);

    /**
     * @description: 抛物线构造函数（参考开源代码）
     * @param {*}
     * @return {*}
     */
    function parabola(startPosition, endPosition, height = 0, count = 50) {
      // 方程 y=-(4h/L^2)*x^2+h h:顶点高度 L：横纵间距较大者
      const result = [];
      height = Math.max(+height, 100);
      count = Math.max(+count, 50);
      const diffLon = Math.abs(startPosition[0] - endPosition[0]);
      const diffLat = Math.abs(startPosition[1] - endPosition[1]);
      const L = Math.max(diffLon, diffLat);
      let dlt = L / count;
      if (diffLon > diffLat) {
        // base on lon
        const delLat = (endPosition[1] - startPosition[1]) / count;
        if (startPosition[0] - endPosition[0] > 0) {
          dlt = -dlt;
        }
        for (let i = 0; i < count; i++) {
          const h =
            height -
            (Math.pow(-0.5 * L + Math.abs(dlt) * i, 2) * 4 * height) /
              Math.pow(L, 2);
          const lon = startPosition[0] + dlt * i;
          const lat = startPosition[1] + delLat * i;
          // eslint-disable-next-line new-cap
          const point = new Cesium.Cartesian3.fromDegrees(lon, lat, h);
          result.push(point);
        }
      } else {
        // base on lat
        const delLon = (endPosition[0] - startPosition[0]) / count;
        if (startPosition[1] - endPosition[1] > 0) {
          dlt = -dlt;
        }
        for (let i = 0; i < count; i++) {
          const h =
            height -
            (Math.pow(-0.5 * L + Math.abs(dlt) * i, 2) * 4 * height) /
              Math.pow(L, 2);
          const lon = startPosition[0] + delLon * i;
          const lat = startPosition[1] + dlt * i;
          // eslint-disable-next-line new-cap
          const point = new Cesium.Cartesian3.fromDegrees(lon, lat, h);
          result.push(point);
        }
      }
      return result;
    }
  }
  // 飞线
  generateRandomPosition(position, num) {
    const list = [];
    for (let i = 0; i < num; i++) {
      // random产生的随机数范围是0-1，需要加上正负模拟
      const lon = position[0] + Math.random() * 0.04 * (i % 2 === 0 ? 1 : -1);
      const lat = position[1] + Math.random() * 0.04 * (i % 2 === 0 ? 1 : -1);
      list.push([lon, lat]);
    }
    return list;
  }
  lineFlowInit(viewer, _center, _num) {
    console.log(this);
    const _positions = this.generateRandomPosition(_center, _num);
    _positions.forEach((item, index) => {
      // 经纬度
      const startLon = item[0];
      const startLat = item[1];

      // eslint-disable-next-line new-cap, no-undef
      const startPoint = new myCesium.Cartesian3.fromDegrees(
        startLon,
        startLat,
        0
      );

      // 随机高度
      const height = 5000 * Math.random();
      // eslint-disable-next-line new-cap, no-undef
      const endPoint = new myCesium.Cartesian3.fromDegrees(
        startLon,
        startLat,
        height
      );
      const linePositions = [];
      linePositions.push(startPoint);
      linePositions.push(endPoint);
      const entity = new Cesium.Entity({
        name: "polyline" + index,
        polyline: {
          positions: linePositions,
          // eslint-disable-next-line no-undef, no-undef
          material: new myCesium.LineFlowMaterialProperty({
            // eslint-disable-next-line no-undef
            color: new myCesium.Color(1.0, 0.0, 0.0, 1.0),
            speed: 10 * Math.random(),
            percent: 0.2,
            gradient: 0.05,
          }),
        },
      });
      this.dataSources.entities.add(entity);
    });
    viewer.dataSources.add(this.dataSources);
    viewer.flyTo(this.dataSources);
  }
  mask(viewer) {
    viewer.scene.skyAtmosphere = undefined;

    let point = [];
    const pointHeight = [];
    for (let i = 0; i < gy.features[0].geometry.coordinates[0][0].length; i++) {
      point = point.concat(gy.features[0].geometry.coordinates[0][0][i]);
    }
    for (let i = 0; i < gy.features[0].geometry.coordinates[0].length; i++) {
      const item = gy.features[0].geometry.coordinates[0][i];
      for (let l = 0; l < item.length; l++) {
        pointHeight.push(item[l][0]);
        pointHeight.push(item[l][1]);
        pointHeight.push(0);
      }
    }
    const hole = Cesium.Cartesian3.fromDegreesArray(point);
    const dataSource = new Cesium.CustomDataSource("inverseShade");
    viewer.dataSources.add(dataSource);
    dataSource.entities.add({
      polygon: {
        // 获取指定属性（positions，holes（图形内需要挖空的区域））
        hierarchy: {
          // 左下左上右上右下
          // 对应经纬度[0,60],[0,-60],[180,-60],[180,60],[0,60]
          positions: [
            {
              x: 3197104.586923899,
              y: 0.5580000157243585,
              z: 5500477.1339386385,
            },
            {
              x: 3197104.586923899,
              y: 0.5580000157243585,
              z: -5500477.1339386385,
            },
            {
              x: -3197104.5869239476,
              y: 3.915323898915733,
              z: -5500477.1339386385,
            },
            {
              x: -3197104.5869239476,
              y: 3.915323898915733,
              z: 5500477.1339386385,
            },
            {
              x: 3197104.586923899,
              y: 0.5580000157243585,
              z: 5500477.1339386385,
            },
          ],
          holes: [{ positions: hole }],
        },
        // 填充的颜色，withAlpha透明度
        material: Cesium.Color.BLACK.withAlpha(0.8),
        // 是否被提供的材质填充
        fill: true,
        // 是否显示
        show: true,
        // 顺序,仅当`clampToGround`为true并且支持地形上的折线时才有效。
        zIndex: 10,
      },
    });
    viewer.zoomTo(viewer.entities);
  }
  trackPlayback(viewer) {
    const dataSource = new Cesium.CustomDataSource("redCard");
    const lujing = [
      [113.3843422, 23.1539674],
      [113.387509, 23.1542347],
      [113.388345, 23.1543002],
      [113.3890733, 23.1543577],
      [113.3895529, 23.1543806],
      [113.3899338, 23.1543845],
      [113.3902557, 23.1543807],
      [113.3906046, 23.15436],
      [113.3909418, 23.1543225],
      [113.3912771, 23.1542724],
      [113.3916729, 23.1541932],
      [113.3920729, 23.1540968],
      [113.3922405, 23.154048],
      [113.3925398, 23.1539609],
      [113.3930145, 23.1537804],
      [113.3933828, 23.1536232],
      [113.3937306, 23.153454],
      [113.3941956, 23.1531846],
      [113.3945335, 23.1529656],
      [113.3950321, 23.1525945],
      [113.3952958, 23.1523647],
      [113.3957323, 23.1519319],
      [113.3960895, 23.1515215],
      [113.3965296, 23.1509512],
      [113.3970031, 23.1501069],
      [113.397203, 23.1496492],
      [113.3973647, 23.1491585],
    ];

    dataSource.entities.add({
      name: "line",
      polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray(lujing.flat()),
        material: Cesium.Color.RED.withAlpha(0.1),
        width: 2,
      },
    });
    const property = new Cesium.SampledPositionProperty();
    const startTime = new Date();
    const timeSamp = startTime.getTime();
    let stopTime;
    lujing.forEach((item, index) => {
      const time = new Date(timeSamp + index * 5000);
      stopTime = time;
      console.log(stopTime);
      const position = Cesium.Cartesian3.fromDegrees(item[0], item[1]);
      property.addSample(Cesium.JulianDate.fromDate(time), position);
    });
    property.setInterpolationOptions({
      interpolationDegree: 0.00001,
      interpolationAlgorithm: Cesium.LagrangepolynomialApproxmation,
    });
    viewer.entities.add({
      availability: new Cesium.TimeIntervalCollection([
        new Cesium.TimeInterval({
          start: Cesium.JulianDate.fromDate(startTime),
          stop: Cesium.JulianDate.fromDate(new Date(stopTime)),
        }),
      ]),
      position: property,
      path: {
        leadTime: 0,
        resolution: 1,
        material: new Cesium.PolylineGlowMaterialProperty({
          glowPower: 0.1,
          color: Cesium.Color.GREEN,
        }),
        width: 10,
      },
      model: {
        uri: "/models/redCard.glb",
        scale: 4.5,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      },
    });
    viewer.clock.currentTime = Cesium.JulianDate.fromDate(startTime);
    viewer.clock.stopTime = Cesium.JulianDate.fromDate(new Date(stopTime));
    viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP;
    viewer.clock.shouldAnimate = true;
    viewer.dataSources.add(dataSource);
    viewer.zoomTo(dataSource);
  }
}

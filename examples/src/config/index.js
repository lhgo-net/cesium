export const menuItem = [
  {
    name: "Hello World",
    value: "init-earth",
  },
  {
    name: "旋转地球",
    value: "earth-rotation",
  },
  {
    name: "罗盘",
    value: "navigation",
  },
  {
    name: "layer-天地图影像",
    value: "layer",
  },
  {
    name: "layer-高德矢量",
    value: "layer-gaode",
  },
  {
    name: "geoserver-自定义",
    value: "layer-custom",
  },
  {
    name: "popup-弹窗跟随",
    value: "popup",
  },
  {
    name: "鹰眼地图",
    value: "eagle-eye",
  },
  {
    name: "2D/3D",
    value: "map-2-3",
  },
  {
    name: "热力图",
    value: "heat",
  },
  {
    name: "矢量建筑",
    value: "verBuild",
  },
  {
    name: "淹没分析",
    value: "inundationAnalysis",
  },
  {
    name: "entities-draw-绘制",
    value: "entities-draw",
  },
  {
    name: "entities-points-计算两点距离",
    value: "entities-points-length",
  },
  {
    name: "entities-wall-遮罩",
    value: "entities-wall",
  },
  {
    name: "entities-ellipse-扩散圆",
    value: "entities-ellipse",
  },
  {
    name: "entities-billboard-聚合",
    value: "entities-billboard-cluster",
  },
  {
    name: "polyline-边界线",
    value: "entity-polyline-boundary",
  },
  {
    name: "polyline-全国边界线",
    value: "entity-polyline-china-boundary",
  },
  {
    name: "polyline-飞线",
    value: "entity-polyline-fly",
  },
  {
    name: "polyline-抛物线",
    value: "entity-polyline-parabola",
  },
  {
    name: "polyline-轨迹线",
    value: "entity-polyline-trackPlayback",
  },
  {
    name: "polyline-路网",
    value: "entity-polyline-road",
  },
  {
    name: "polygon-多边形渐变",
    value: "entity-polygon-gradient",
  },
  {
    name: "primitive-渐变墙",
    value: "primitive-wall-bloom",
  },
  {
    name: "后处理-天气效果",
    value: "weather",
  },
  {
    name: "tileset-倾斜摄影-大雁塔",
    value: "tileset-dayanta",
  },
  {
    name: "tileset-建筑白膜",
    value: "tileset-build-white",
  },
  {
    name: "tileset-建筑渐变",
    value: "tileset-build-gradient",
  },
  {
    name: "tileset-反光",
    value: "tileset-build-reflective",
  },
  {
    name: "leatlet",
    value: "gis-map",
  },
];

export const Tree = [
  {
    title: "Hello World",
    path: "/examples/init-earth",
    routerName: "cesium",
    component: () => import("../views/cesium/examples/init-earth.vue"),
  },
  {
    title: "旋转地球",
    path: "/examples/earth-rotation",
    routerName: "cesium",
    component: () => import("../views/cesium/examples/earth-rotation.vue"),
  },
  {
    title: "罗盘",
    path: "/examples/navigation",
    routerName: "cesium",
    component: () => import("../views/cesium/examples/navigation.vue"),
  },
  {
    title: "场景应用",
    children: [
      {
        title: "气象",
        path: "/scene/weather",
        routerName: "scene",
        component: () => import("../views/cesium/scenario-1/index.vue"),
      },
      {
        title: "天河区人流量",
        path: "/scene/people",
        routerName: "scene",
        component: () => import("../views/cesium/scenario-2/index.vue"),
      },
    ],
  },
  {
    title: "主题",
    children: [
      {
        title: "科技蓝",
        path: "/examples/blue",
        routerName: "cesium",
        component: () => import("../views/cesium/examples/them-blue.vue"),
      },
      {
        title: "暗黑",
        path: "/examples/black",
        routerName: "cesium",
        component: () => import("../views/cesium/examples/them-black.vue"),
      },
    ],
  },
  {
    title: "图层",
    children: [
      {
        title: "天地图",
        path: "/examples/layer",
        routerName: "cesium",
        component: () => import("../views/cesium/examples/layer.vue"),
      },
      {
        title: "高德",
        path: "/examples/layer-gaode",
        routerName: "cesium",
        component: () => import("../views/cesium/examples/layer-gaode.vue"),
      },
      {
        title: "geoserver-自定义",
        path: "/examples/layer-custom",
        routerName: "cesium",
        component: () => import("../views/cesium/examples/layer-custom.vue"),
      },
    ],
  },

  {
    title: "popup-弹窗跟随",
    path: "/examples/popup",
    routerName: "cesium",
    component: () => import("../views/cesium/examples/popup.vue"),
  },
  {
    title: "鹰眼地图",
    path: "/examples/eagle-eye",
    routerName: "cesium",
    component: () => import("../views/cesium/examples/eagle-eye.vue"),
  },
  {
    title: "2D/3D",
    path: "/examples/map-2-3",
    routerName: "cesium",
    component: () => import("../views/cesium/examples/map-2-3.vue"),
  },
  {
    title: "热力图",
    path: "/examples/heat",
    routerName: "cesium",
    component: () => import("../views/cesium/examples/heat.vue"),
  },
  {
    title: "矢量建筑",
    path: "/examples/verBuild",
    routerName: "cesium",
    component: () => import("../views/cesium/examples/verBuild.vue"),
  },
  {
    title: "淹没分析",
    path: "/examples/inundationAnalysis",
    routerName: "cesium",
    component: () => import("../views/cesium/examples/inundationAnalysis.vue"),
  },
  {
    title: "实体",
    children: [
      {
        title: "entities-draw-绘制",
        path: "/examples/entities-draw",
        routerName: "cesium",
        component: () => import("../views/cesium/examples/entities-draw.vue"),
      },
      {
        title: "entities-points-计算两点距离",
        path: "/examples/entities-points-length",
        routerName: "cesium",
        component: () =>
          import("../views/cesium/examples/entities-points-length.vue"),
      },
      {
        title: "entities-wall-遮罩",
        path: "/examples/entities-wall",
        routerName: "cesium",
        component: () => import("../views/cesium/examples/entities-wall.vue"),
      },
      {
        title: "entities-ellipse-扩散圆",
        path: "/examples/entities-ellipse",
        routerName: "cesium",
        component: () =>
          import("../views/cesium/examples/entities-ellipse.vue"),
      },
      {
        title: "entities-billboard-聚合",
        path: "/examples/entities-billboard-cluster",
        routerName: "cesium",
        component: () =>
          import("../views/cesium/examples/entities-billboard-cluster.vue"),
      },
      {
        title: "polyline-边界线",
        path: "/examples/entity-polyline-boundary",
        routerName: "cesium",
        component: () =>
          import("../views/cesium/examples/entity-polyline-boundary.vue"),
      },
      {
        title: "polyline-全国边界线",
        path: "/examples/entity-polyline-china-boundary",
        routerName: "cesium",
        component: () =>
          import("../views/cesium/examples/entity-polyline-china-boundary.vue"),
      },
      {
        title: "polyline-飞线",
        path: "/examples/entity-polyline-fly",
        routerName: "cesium",
        component: () =>
          import("../views/cesium/examples/entity-polyline-fly.vue"),
      },
      {
        title: "polyline-抛物线",
        path: "/examples/entity-polyline-parabola",
        routerName: "cesium",
        component: () =>
          import("../views/cesium/examples/entity-polyline-parabola.vue"),
      },
      {
        title: "polyline-轨迹线",
        path: "/examples/entity-polyline-trackPlayback",
        routerName: "cesium",
        component: () =>
          import("../views/cesium/examples/entity-polyline-trackPlayback.vue"),
      },
      {
        title: "polyline-路网",
        path: "/examples/entity-polyline-road",
        routerName: "cesium",
        component: () =>
          import("../views/cesium/examples/entity-polyline-road.vue"),
      },
      {
        title: "polygon-多边形渐变",
        path: "/examples/entity-polygon-gradient",
        routerName: "cesium",
        component: () =>
          import("../views/cesium/examples/entity-polygon-gradient.vue"),
      },
    ],
  },
  {
    title: "primitive",
    children: [
      {
        title: "primitive-渐变墙",
        path: "/examples/primitive-wall-bloom",
        routerName: "cesium",
        component: () =>
          import("../views/cesium/examples/primitive-wall-bloom.vue"),
      },
    ],
  },

  {
    title: "后处理",
    children: [
      {
        title: "雨天",
        path: "/examples/rain",
        routerName: "cesium",
        component: () => import("../views/cesium/examples/weather-rain.vue"),
      },
      {
        title: "雪天",
        path: "/examples/snow",
        routerName: "cesium",
        component: () => import("../views/cesium/examples/weather-snow.vue"),
      },
      {
        title: "雾气",
        path: "/examples/weather-fog",
        routerName: "cesium",
        component: () => import("../views/cesium/examples/weather-fog.vue"),
      },
    ],
  },
  {
    title: "3D-tileset",
    children: [
      {
        title: "tileset-倾斜摄影-大雁塔",
        path: "/examples/tileset-dayanta",
        routerName: "cesium",
        component: () => import("../views/cesium/examples/tileset-dayanta.vue"),
      },
      {
        title: "tileset-建筑白膜",
        path: "/examples/tileset-build-white",
        routerName: "cesium",
        component: () =>
          import("../views/cesium/examples/tileset-build-white.vue"),
      },
      {
        title: "tileset-建筑渐变",
        path: "/examples/tileset-build-gradient",
        routerName: "cesium",
        component: () =>
          import("../views/cesium/examples/tileset-build-gradient.vue"),
      },
      {
        title: "tileset-反光",
        path: "/examples/tileset-build-reflective",
        routerName: "cesium",
        component: () =>
          import("../views/cesium/examples/tileset-build-reflective.vue"),
      },
    ],
  },

  {
    title: "leatlet",
    path: "/examples/gis-map",
    routerName: "cesium",
    component: () => import("../views/cesium/examples/gis-map.vue"),
  },
];

export const caselibs = [
  {
    name: "应用场景-1",
    value: "scenario-1",
    path: "/scenario-1",
  },
  {
    name: "应用场景-2",
    value: "scenario-2",
    path: "/scenario-2",
  },
];

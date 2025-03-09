import * as Cesium from "../../libs/Cesium/1.119";
import "../../libs/Cesium/1.119/Widgets/widgets.css";

window.Cesium = Cesium;
const ViewerConfig = {
  /* 右上 */
  geocoder: false,
  // 搜索按钮
  homeButton: false,
  // 主页按钮
  sceneModePicker: false,
  // 3d/2d切换按钮
  baseLayerPicker: false,
  // 图层选择按钮
  navigationHelpButton: false,
  // 帮助按钮
  /* 右下 */
  fullscreenButton: false,
  // 全屏按钮
  /* 选择 */
  selectionIndicator: false,
  // 选择指示器
  infoBox: false,
  /* 左下 */
  animation: false,
  // 仪表控件
  timeline: false,
  // 时间轴控件
  /* 选配 */
  // skyAtmosphere: false,
  // ! 分辨率
  useBrowserRecommendedResolution: false,
  // false的时候使用window.devicePixelRatio
  // Cesium.FeatureDetection
  // 解决模糊
  // function updateResolutionScale(viewer) {
  //   // 判断是否支持图像渲染像素化处理
  //   if (Cesium.FeatureDetection.supportsImageRenderingPixelated()) {
  //     viewer.resolutionScale = window.devicePixelRatio
  //   }
  // }
  // updateResolutionScale(viewer);
  // scene3DOnly: true, // 设置为true, 之前导致过ripple颜色变黑
  shadows: false,
  /* 数据 */
  // dataSources:new Cesium.DataSourceCollection(), // 需要进行可视化的数据源合集
  // imageryProviderViewModels: imageryViewModels,
  // selectedImageryProviderViewModel: imageryViewModels[0], // 图层选择按钮内容配置
  // terrainProviderViewModels
  // selectedTerrainProviderViewModel
  // terrainProvider: new Cesium.CesiumTerrainProvider({
  //   url: Cesium.IonResource.fromAssetId(1),
  //   requestVertexNormals: true, //增加光照效果
  //   requestWaterMask: true, //增加水面特效
  // }), // 默认new EllipsoidTerrainProvider()
  // terrain
  // A terrain object which handles asynchronous terrain provider. Can only specify if options.terrainProvider is undefined.
  // terrainShadows: Cesium.ShadowMode.DISABLED,
  /* 性能 */
  // scene3DOnly: true, // When true, each geometry instance will only be rendered in 3D to save GPU memory
  // useBrowserRecommendedResolution: false,
  // useDefaultRenderLoop: true, // True if this widget should control the render loop, false otherwise.
  // targetFrameRate
  // The target frame rate when using the default render loop.
  // Gets or sets the target frame rate of the widget when useDefaultRenderLoop is true.
  // If undefined, the browser's requestAnimationFrame implementation determines the frame rate.
  // If defined, this value must be greater than 0. A value higher than the underlying requestAnimationFrame implementation will have no effect.
  // requestRenderMode: true, // 请求渲染模式
  // maximumRenderTimeChange
  // If requestRenderMode is true, this value defines the maximum change in simulation time allowed before a render is requested.
  /* 选配-时间 */
  // clockViewModel
  // The clock view model to use to control current time.
  // automaticallyTrackDataSourceClocks:true,
  // If true, this widget will automatically track the clock settings of newly added DataSources, updating if the DataSource's clock changes. Set this to false if you want to configure the clock independently.
  /* 选配-投影 */
  // projectionPicker: false, // button switching between perspective and orthographic projections
  // sceneMode: Cesium.SceneMode.SCENE2D, // 初始场景模式
  // mapProjection:new Cesium.WebMercatorProjection(), // The map projection to use in 2D and Columbus View modes.
  // mapMode2D
  // Determines if the 2D map is rotatable or can be scrolled infinitely in the horizontal direction.
  /* 选配-其他 */
  // creditContainer
  // creditViewport
  // blurActiveElementOnCanvasFocus
  // depthPlaneEllipsoidOffset
  // orderIndependentTranslucency
};

const TokenConfig = {
  tianditu: "3b84cd1b17e647232cea604dc844bc98",
  cesium:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2MzkyYmExMC0yOWVlLTRiZGMtODA3Zi0wNmVmMWMwYmE3MTkiLCJpZCI6Njc4NTksImlhdCI6MTY5MDc3MDYxNH0.3GxeJqpZtejB_ueQ3W7M-WunBkyVl3p3OkvN-7-WZms",
};
const init = (id, customConfig = {}, showGlobe = true) =>
  new Promise((resolve) => {
    let viewerConfig = { ...ViewerConfig, ...customConfig };
    Cesium.Ion.defaultAccessToken = TokenConfig.cesium;
    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
      90,
      -20,
      110,
      90
    );

    const viewer = new Cesium.Viewer(id, viewerConfig);
    window.viewer = viewer;
    viewer.cesiumWidget.creditContainer.style.display = "none";
    viewer.scene.backgroundColor = Cesium.Color.TRANSPARENT;
    viewer.scene.sun.show = false;
    viewer.scene.moon.show = false;
    if (!showGlobe) {
      viewer.scene.globe.show = false;
    }
    viewer.scene.backgroundColor = Cesium.Color.TRANSPARENT;
    window.addEventListener("beforeunload", (event) => {
      viewer.destroy();
    });
    let firstRenderScene = true;
    viewer.scene.postRender.addEventListener((scene, time) => {
      if (firstRenderScene) {
        firstRenderScene = false;
        resolve({ viewer, time });
      }
    });
  });

class GlobeRotate {
  constructor(viewer) {
    this.viewer = viewer;
  }

  // 根据国际天体参考系计算旋转矩阵
  _icrf() {
    if (this.viewer.scene.mode !== Cesium.SceneMode.SCENE3D) {
      return true;
    }
    let icrfToFixed = Cesium.Transforms.computeIcrfToFixedMatrix(
      this.viewer.clock.currentTime
    );
    if (icrfToFixed) {
      let camera = this.viewer.camera;
      let offset = Cesium.Cartesian3.clone(camera.position);
      let transform = Cesium.Matrix4.fromRotationTranslation(icrfToFixed);
      // 偏移相机，否则会场景旋转而地球不转
      camera.lookAtTransform(transform, offset);
    }
  }

  // 绑定事件
  _bindEvent() {
    // 转动的速度设置
    this.viewer.clock.multiplier = 15 * 1000;
    // 初始化为单位矩阵
    this.viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
    this.viewer.scene.postUpdate.addEventListener(this._icrf, this);
  }

  // 解除绑定
  _unbindEvent() {
    this.viewer.clock.multiplier = 1;
    this.viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
    this.viewer.scene.postUpdate.removeEventListener(this._icrf, this);
  }

  // 开始旋转
  start() {
    this.viewer.clock.shouldAnimate = true;
    this._unbindEvent();
    this._bindEvent();
    return this;
  }

  // 停止旋转
  stop() {
    this._unbindEvent();
    return this;
  }
}

const wfsGet = (url, layerName, cql) => {
  const param = {
    url: url,
    queryParameters: {
      service: "WFS",
      version: "1.0.0",
      request: "GetFeature",
      typeName: layerName,
      outputFormat: "application/json",
    },
  };
  if (cql) param.queryParameters.CQL_FILTER = cql;
  const resource = new Cesium.Resource(param);
  return resource.fetch().then((data) => {
    return JSON.parse(data);
  });
};

export { ViewerConfig, init, TokenConfig, GlobeRotate, wfsGet };

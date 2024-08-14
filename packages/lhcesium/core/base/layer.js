import { TokenConfig } from './init'
const ImageryLayerConfig = {
  // 天地图 矢量图
  tianditu_vec: {
    type: 'UrlTemplateImageryProvider',
    options: {
      url: `http://{s}.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=${TokenConfig.tianditu}`,
      subdomains: ['00', 't1', 't2', 't3', 't4', 't5', 't6', 't7']
    }
  },
  // 天地图 影像
  tianditu_img: {
    type: 'WebMapTileServiceImageryProvider',
    options: {
      url:
        'http://{s}.tianditu.gov.cn/img_c/wmts?service=wmts&request=GetTile&version=1.0.0' +
        '&LAYER=img&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}' +
        '&style=default&format=tiles&tk=' +
        TokenConfig.tianditu,
      layer: 'tdtCva',
      style: 'default',
      format: 'tiles',
      tileMatrixSetID: 'c',
      subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
      tilingScheme: new Cesium.GeographicTilingScheme(),
      // maximumLevel必加 tileMatrixLabels 保持一致
      maximumLevel: 18,
      tileMatrixLabels: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18'
      ],
      show: false
    }
  },
  // 标注图层-地名
  tianditu_label: {
    type: 'UrlTemplateImageryProvider',
    options: {
      url: `http://{s}.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=${TokenConfig.tianditu}`,
      subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7']
    }
  },
  gaode_ver: {
    type: 'UrlTemplateImageryProvider',
    options: {
      url: `http://webrd{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}`,
      subdomains: ['01', '02', '03', '04']
    }
  }
}

const addImageryLayer = (viewer, type, options) => {
  let layer
  if (type === 'ArcGisMapServerImageryProvider') {
    let { url, token } = options
    layer = Cesium.ImageryLayer.fromProviderAsync(Cesium[type].fromUrl(url, { token }))
  } else {
    layer = new Cesium.ImageryLayer(new Cesium[type](options))
  }
  viewer.imageryLayers.add(layer)
  return layer
}

const modifyMap = (viewer, boolen = true, rgb = [0, 50, 100]) => {
  // 获取地图影像图层
  let baseLayer = viewer.imageryLayers.get(0)
  //设置2个变量，用来判断是否进行颜色的翻转和过滤
  baseLayer.invertColor = boolen

  baseLayer.filterRGB = rgb //[255,255,255] = > [0,50,100]
  //   更改底图着色器的代码
  const baseFragmentShader = viewer.scene.globe._surfaceShaderSet.baseFragmentShaderSource.sources
  // console.log(baseFragmentShader);

  // 循环修改着色器
  for (let i = 0; i < baseFragmentShader.length; i++) {
    // console.log(baseFragmentShader[i]);
    const strS = 'color = czm_saturation(color, textureSaturation);\n#endif\n'
    let strT = 'color = czm_saturation(color, textureSaturation);\n#endif\n'
    if (baseLayer.invertColor) {
      strT += `
          color.r = 1.0 - color.r;
          color.g = 1.0 - color.g;
          color.b = 1.0 - color.b;
        `
    }
    if (baseLayer.filterRGB) {
      strT += `
          color.r = color.r*${baseLayer.filterRGB[0]}.0/255.0;
          color.g = color.g*${baseLayer.filterRGB[1]}.0/255.0;
          color.b = color.b*${baseLayer.filterRGB[2]}.0/255.0;
        `
    }

    baseFragmentShader[i] = baseFragmentShader[i].replace(strS, strT)
  }
}

export { ImageryLayerConfig, addImageryLayer, modifyMap }

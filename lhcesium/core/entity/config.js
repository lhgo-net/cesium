
/* 分类：点要素和线要素（包含折线和轮廓线，各种几何体要素外围轮廓线，只能通过Primitive方式构建） */

export const EntityConfig = {
  /* 1 model，point，box，cylinder，plane，ellipsoid */
  model: {
    show: true,
    uri: '',
    scale: 1.0

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

    color: Cesium.Color.RED,
    outlineColor: Cesium.Color.WHITE,
    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND

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
    outlineWidth: 2
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
    numberOfVerticalLines: 4
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
    outlineWidth: 2

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
    slicePartitions: 5 // 经向线数

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

    numberOfVerticalLines: 0

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
    outlineWidth: 2

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
      outlineColor: Cesium.Color.BLACK
    }),
    // 箭头
    // material:new Cesium.PolylineArrowMaterialProperty(Cesium.Color.GOLD),
    disableDepthTestDistance: Number.POSITIVE_INFINITY,
    width: 3, // 箭头 6
    clampToGround: false
  },
  polygon: {},

  /* 4 label billboard */
  label: {
    text: '',
    font: '18px Helvetica',
    fillColor: Cesium.Color.WHITE,
    outlineColor: Cesium.Color.BLACK,
    outlineWidth: 2,
    disableDepthTestDistance: Number.POSITIVE_INFINITY,
    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
    pixelOffset: new Cesium.Cartesian2(0, -20)
  }
}

export function addEntity(viewer, config = {}) {
  if (!Cesium.defined(viewer) || !Cesium.defined(config)) return

  let entity = viewer.entities.add(config)

  return [entity.id, entity]
}

export const addPOI = (viewer, opt) => {
  const { image, text, lon, lat } = opt

  const position = Cesium.Cartesian3.fromDegrees(lon, lat, 0)
  const imageSize = 32

  const entity = new Cesium.Entity({
    position,
    label: {
      text,
      font: '12px Helvetica',
      showBackground: true,
      backgroundPadding: new Cesium.Cartesian2(8, 6),
      translucencyByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e6, 0.0),
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      disableDepthTestDistance: Number.POSITIVE_INFINITY
    },
    billboard: {
      image,
      width: imageSize,
      height: imageSize,
      pixelOffset: new Cesium.Cartesian2(0.0, -imageSize),
      translucencyByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e6, 0.0),
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      disableDepthTestDistance: Number.POSITIVE_INFINITY
    }
  })
  return viewer.entities.add(entity)
}

/**
 * 与PolylineFlowMaterialProperty.js类似
 * 区别: 传入颜色, 实际色为图片色和传入色混合
 */
import source from './glsl/PolylineFlowColorMaterialProperty.glsl'
class PolylineFlowColorMaterialProperty {
  constructor(options) {
    Object.defineProperties(this, {
      isConstant: {
        get: function () {
          return Cesium.Property.isConstant(this._image)
        }
      },
      definitionChanged: {
        get: function () {
          return this._definitionChanged
        }
      },

      image: Cesium.createPropertyDescriptor('image'),
      color: Cesium.createPropertyDescriptor('color'),
      duration: Cesium.createPropertyDescriptor('duration')
    })

    options = Cesium.defaultValue(options, Cesium.defaultValue.EMPTY_OBJECT)

    this._definitionChanged = new Cesium.Event()

    this._image = undefined
    this._imageSubscription = undefined
    this._color = undefined
    this._colorSubscription = undefined
    this._duration = undefined
    this._durationSubscription = undefined

    this.image = options.image
    this.color = options.color
    this.duration = options.duration

    this._time = performance.now()
  }

  getType(time) {
    return 'PolylineFlowColor'
  }

  getValue(time, result) {
    if (!Cesium.defined(result)) {
      result = {}
    }

    result.image = Cesium.Property.getValueOrUndefined(this._image, time)
    result.color = Cesium.Property.getValueOrClonedDefault(
      this._color,
      time,
      Cesium.Color.WHITE,
      result.color
    )
    result.duration = Cesium.Property.getValueOrDefault(this._duration, time, 1000)

    result.time = ((performance.now() - this._time) % this.duration) / this.duration

    return result
  }

  equals(other) {
    return (
      this === other ||
      (other instanceof PolylineFlowColorMaterialProperty &&
        Cesium.Property.equals(this._image, other._image) &&
        Cesium.Property.equals(this._color, other._color) &&
        Cesium.Property.equals(this._duration, other._duration))
    )
  }
}

/**
 * 将PolylineFlowColorMaterialProperty添加到Cesium.Material._materialCache中，类别是PolylineFlow
 * addMaterial函数中的第二个参数就是Material.option内容
 */
Cesium.Material._materialCache.addMaterial('PolylineFlowColor', {
  fabric: {
    type: 'PolylineFlowColor',
    uniforms: {
      color: Cesium.Color.WHITE,
      image: '',
      time: 0
    },
    source: source
  },
  translucent: function () {
    return true
  }
})

export default PolylineFlowColorMaterialProperty

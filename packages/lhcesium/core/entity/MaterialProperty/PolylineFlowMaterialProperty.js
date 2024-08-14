
/**
 * 与PolylineFlowColorMaterialProperty.js类似
 * 区别: 不传入颜色, 实际色为图片色和传入色混合
 */

// import source from './glsl/PolylineFlowMaterialProperty.glsl'
class PolylineFlowMaterialProperty {
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
      duration: Cesium.createPropertyDescriptor('duration')
    })

    this._definitionChanged = new Cesium.Event()

    this._image = undefined
    this._imageSubscription = undefined
    this._duration = undefined
    this._durationSubscription = undefined

    this.image = options.image
    this.duration = options.duration

    this._time = performance.now()
  }

  getType(time) {
    return 'PolylineFlow'
  }

  getValue(time, result) {
    if (!Cesium.defined(result)) {
      result = {}
    }

    result.image = Cesium.Property.getValueOrUndefined(this._image, time)
    result.duration = Cesium.Property.getValueOrDefault(this._duration, time, 1000)

    result.time = ((performance.now() - this._time) % this.duration) / this.duration

    return result
  }

  equals(other) {
    return (
      this === other ||
      (other instanceof PolylineFlowMaterialProperty &&
        Cesium.Property.equals(this._image, other._image) &&
        Cesium.Property.equals(this._rgbMultiple, other._rgbMultiple) &&
        Cesium.Property.equals(this._duration, other._duration))
    )
  }
}

Cesium.Material._materialCache.addMaterial('PolylineFlow', {
  fabric: {
    type: 'PolylineFlow',
    uniforms: {
      image: '',
      time: 0
    },
    source: `
    czm_material czm_getMaterial(czm_materialInput materialInput) {
    czm_material material = czm_getDefaultMaterial(materialInput);
    vec2 st = materialInput.st;
    vec4 colorImage = texture(image, vec2(fract(st.s - time), st.t));
    material.alpha = colorImage.a;
    material.diffuse = colorImage.rgb;
    return material;
}
    `
  },
  translucent: function () {
    return true
  }
})

export default PolylineFlowMaterialProperty

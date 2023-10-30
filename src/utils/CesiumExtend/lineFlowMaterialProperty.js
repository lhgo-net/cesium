export function lineFlowMaterialProperty() {
  const myCesium = { ...Cesium }
  class LineFlowMaterialProperty {
    constructor(options) {
      this._definitionChanged = new myCesium.Event()
      this._color = undefined
      this._speed = undefined
      this._percent = undefined
      this._gradient = undefined
      this.color = options.color
      this.speed = options.speed
      this.percent = options.percent
      this.gradient = options.gradient
    };

    get isConstant() {
      return false
    }

    get definitionChanged() {
      return this._definitionChanged
    }

    getType(time) {
      return myCesium.Material.LineFlowMaterialType
    }

    getValue(time, result) {
      if (!myCesium.defined(result)) {
        result = {}
      }

      result.color = myCesium.Property.getValueOrDefault(this._color, time, myCesium.Color.RED, result.color)
      result.speed = myCesium.Property.getValueOrDefault(this._speed, time, 5.0, result.speed)
      result.percent = myCesium.Property.getValueOrDefault(this._percent, time, 0.1, result.percent)
      result.gradient = myCesium.Property.getValueOrDefault(this._gradient, time, 0.01, result.gradient)
      return result
    }

    equals(other) {
      return (this === other ||
                (other instanceof LineFlowMaterialProperty &&
                    myCesium.Property.equals(this._color, other._color) &&
                    myCesium.Property.equals(this._speed, other._speed) &&
                    myCesium.Property.equals(this._percent, other._percent) &&
                    myCesium.Property.equals(this._gradient, other._gradient))
      )
    }
  }
  Object.defineProperties(LineFlowMaterialProperty.prototype, {
    color: myCesium.createPropertyDescriptor('color'),
    speed: myCesium.createPropertyDescriptor('speed'),
    percent: myCesium.createPropertyDescriptor('percent'),
    gradient: myCesium.createPropertyDescriptor('gradient')
  })
  // eslint-disable-next-line no-import-assign
  myCesium.LineFlowMaterialProperty = LineFlowMaterialProperty
  myCesium.Material.LineFlowMaterialProperty = 'LineFlowMaterialProperty'
  myCesium.Material.LineFlowMaterialType = 'LineFlowMaterialType'
  myCesium.Material.LineFlowMaterialSource =
        `
        uniform vec4 color;
        uniform float speed;
        uniform float percent;
        uniform float gradient;
        
        czm_material czm_getMaterial(czm_materialInput materialInput){
          czm_material material = czm_getDefaultMaterial(materialInput);
          vec2 st = materialInput.st;
          float t =fract(czm_frameNumber * speed / 1000.0);
          t *= (1.0 + percent);
          float alpha = smoothstep(t- percent, t, st.s) * step(-t, -st.s);
          alpha += gradient;
          material.diffuse = color.rgb;
          material.alpha = alpha;
          return material;
        }
        `

  myCesium.Material._materialCache.addMaterial(myCesium.Material.LineFlowMaterialType, {
    fabric: {
      type: myCesium.Material.LineFlowMaterialType,
      uniforms: {
        color: new myCesium.Color(1.0, 0.0, 0.0, 1.0),
        speed: 10.0,
        percent: 0.1,
        gradient: 0.01
      },
      source: myCesium.Material.LineFlowMaterialSource
    },
    translucent: function(material) {
      return true
    }
  })
  return myCesium
}

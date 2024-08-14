import img from '../../assets/image/red-gradient.png'

function DynamicEllipse(
  viewer,
  position,
  opt = {
    minR: 20,
    maxR: 400,
    image: img
  }
) {
  let minR = opt.minR
  let maxR = opt.maxR
  let deviationR = 10
  let minR1 = opt.minR
  let r1 = minR
  function changeR() {
    minR += deviationR //deviationR为每次圆增加的大小
    if (minR >= maxR) {
      minR = r1
    }
    return minR
  }

  function changeR1() {
    minR1 += deviationR //deviationR为每次圆增加的大小
    if (minR1 >= maxR) {
      minR1 = r1
    }
    return minR1
  }
  function color() {
    let x = 1 - minR / maxR
    return Cesium.Color.BLUE.withAlpha(x)
  }
  let entitys = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(...position),
    name: 'ellipse on surface with outline',
    ellipse: {
      semiMinorAxis: new Cesium.CallbackProperty(changeR, false),
      semiMajorAxis: new Cesium.CallbackProperty(changeR1, false),
      material: new Cesium.ImageMaterialProperty({
        image: opt.image,
        repeat: new Cesium.Cartesian2(1.0, 1.0),
        transparent: true
        // color: new Cesium.CallbackProperty(color, false)
      }),
      outlineColor: Cesium.Color.RED
    }
  })
  return entitys
}

export { DynamicEllipse }

// 线性渐变 canvas
export function getColorRamp(startColor, endColor) {
  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 100
  const ctx = canvas.getContext('2d')
  const gradient = ctx.createLinearGradient(0, 0, 100, 100)
  gradient.addColorStop(0, startColor)
  gradient.addColorStop(0.5, endColor)
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 100, 100)
  return canvas
}
// 数组拍平
export function flat(arr) {
  return [].concat(...arr.map((x) => (Array.isArray(x) ? flat(x) : x)))
}

export function toWG84(point, viewer) {
  const ellipsoid = viewer.scene.globe.ellipsoid
  // eslint-disable-next-line new-cap
  const cartesian3 = new Cesium.Cartesian3(point.x, point.y, point.z)
  // eslint-disable-next-line new-cap
  const cartographic = ellipsoid.cartesianToCartographic(cartesian3)
  const lat = Cesium.Math.toDegrees(cartographic.latitude)
  const lng = Cesium.Math.toDegrees(cartographic.longitude)
  const height = cartographic.height
  return {
    lat,
    lng,
    height,
  }
}

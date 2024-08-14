function initCanvas(width, height) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = width
  canvas.height = height ? height : width
  return [canvas, ctx]
}
function getCircleGradient(
  width = 200,
  centerColor = 'rgba(255,255,255,0)',
  edgeColor = '#BD93F9'
) {
  const [canvas, ctx] = initCanvas(width)
  const radialGradient = ctx.createRadialGradient(
    width / 2,
    width / 2,
    0,
    width / 2,
    width / 2,
    width
  )
  radialGradient.addColorStop(0, centerColor)
  radialGradient.addColorStop(1, edgeColor)
  ctx.fillStyle = radialGradient
  ctx.fillRect(0, 0, width, width)
  return canvas
}
function generateID() {
  return (
    /* @__PURE__ */ new Date().getTime().toString(36) +
    '-' +
    Math.random().toString(36).substring(2, 8)
  )
}
function downloadImg(uri, fileName) {
  let dlLink = document.createElement('a')
  dlLink.download = fileName
  let evt = document.createEvent('HTMLEvents')
  evt.initEvent('click', true, true)
  dlLink.href = uri
  document.body.appendChild(dlLink)
  dlLink.click()
  document.body.removeChild(dlLink)
}
function base64ToBlob(base64) {
  let parts = base64.split(';base64,')
  let contentType = parts[0].split(':')[1]
  let raw = window.atob(parts[1])
  let rawLength = raw.length
  let uInt8Array = new Uint8Array(rawLength)
  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i)
  }
  return new Blob([uInt8Array], { type: contentType })
}
function screenShot(viewer) {
  let name = `${generateID()}.png`
  viewer.render()
  let viewerCanvas = viewer.scene.canvas
  let viewerBase64 = viewerCanvas.toDataURL('image/png')
  let blob = base64ToBlob(viewerBase64)
  let uri = URL.createObjectURL(blob)
  downloadImg(uri, name)
}

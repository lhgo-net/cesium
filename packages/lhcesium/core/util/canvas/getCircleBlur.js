import { initCanvas } from './init'
export function getCircleBlur(width = 200, color = { r: 139, g: 233, b: 253 }) {
  const [canvas, ctx] = initCanvas(width)

  // 绘制圆形
  const centerX = canvas.width / 2
  const centerY = canvas.height / 2
  const radius = width * 0.375

  // 使用渐变填充颜色
  const gradient = ctx.createRadialGradient(
    centerX,
    centerY,
    radius * 0.2,
    centerX,
    centerY,
    radius
  )
  const { r, g, b } = color
  gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.8)`) // 实色颜色
  gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`) // 透明颜色
  ctx.fillStyle = gradient

  // 开启虚化效果
  ctx.filter = 'blur(10px)'

  // 绘制圆形路径并填充
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
  ctx.closePath()
  ctx.fill()

  return canvas
}

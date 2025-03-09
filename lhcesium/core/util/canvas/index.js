function initCanvas(width, height) {
  // 创建画布和上下文
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  // 设置画布大小
  canvas.width = width;
  canvas.height = height ? height : width;

  return [canvas, ctx];
}

function getCircleGradient(
  width = 200,
  centerColor = "rgba(255,255,255,0)",
  edgeColor = "#BD93F9"
) {
  const [canvas, ctx] = initCanvas(width);
  const radialGradient = ctx.createRadialGradient(
    width / 2,
    width / 2,
    0,
    width / 2,
    width / 2,
    width
  );
  radialGradient.addColorStop(0, centerColor);
  radialGradient.addColorStop(1, edgeColor);
  ctx.fillStyle = radialGradient;
  ctx.fillRect(0, 0, width, width);
  return canvas;
}
export { initCanvas,getCircleGradient }
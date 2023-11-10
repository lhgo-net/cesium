<template>
  <div>
    <l-map @ready="ready"></l-map>
  </div>
</template>

<script setup>
import { Noise } from './index'
function ready(viewer) {
  // 创建一个Canvas元素
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512

  // 获取Canvas的2D上下文
  const ctx = canvas.getContext('2d')

  // 创建Perlin噪声对象
  const noise = Noise(Math.random())

  // 遍历Canvas的每个像素，生成噪声数据并绘制到Canvas上
  for (let x = 0; x < canvas.width; x++) {
    for (let y = 0; y < canvas.height; y++) {
      const value = Math.floor((noise.perlin2(x / 100, y / 100) + 1) * 128) // 使用Perlin噪声计算值（此处以灰度值表示）
      ctx.fillStyle = `rgb(${value},${value},${value})` // 设置颜色
      ctx.fillRect(x, y, 1, 1) // 绘制像素
    }
  }

  // 创建Cesium材质并显示Canvas内容
  const imageryProvider = new Cesium.CanvasImageryProvider({
    canvas,
    maximumLevel: 0
  })

  // 将噪声地图显示在Cesium Viewer中
  viewer.imageryLayers.addImageryProvider(imageryProvider)
}
</script>
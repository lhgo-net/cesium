<template>
	<div class="container"></div>
</template>

<script setup>
import { onMounted, onUnmounted, reactive } from 'vue'
import { provider } from '@/utils/ceisum.map'

const data = reactive({
	terrain: null,
	imageLayer: null,
	annotation: null
})

onMounted(() => {
	imageLayer()
	terrain()
})
onUnmounted(() => {
	console.log('onUnmounted')
})
function remove() {
	viewer.imageryLayers.removeAll()
}

function terrain() {
	data.terrain = viewer.terrainProvider = Cesium.createWorldTerrain({
		requestWaterMask: true, // 请求水体效果所需要的海岸线数据
		requestVertexNormals: true // 请求地形照明数据
	})
}
function imageLayer() {
	data.imageLayer = provider(viewer, {
		name: '影像底图',
		key: 'img_w'
	})
	data.annotation = provider(viewer, {
		name: '影像注记',
		key: 'cia_w'
	})
}
</script>

<style scoped>
.container {
	position: absolute;
	z-index: 1000;
}
</style>

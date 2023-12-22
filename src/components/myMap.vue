<template>
	<div id="map">
		<slot></slot>
	</div>
</template>

<script setup>
import { onMounted, defineEmits } from 'vue';
import { map } from '@/utils/ceisum.map';

const emit = defineEmits([]);

onMounted(() => {
	const viewer = map('map');
	emit('ready', viewer);
});
</script>

<style>
#map {
	height: 100%;
	width: 100%;
}
</style>

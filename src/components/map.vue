<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import { map } from '@/utils/ceisum.map'

onMounted(() => {
  window.viewer = map('map')
})

</script>

<style>
#map{
    height: 100vh;
    width: 100vw;
}
</style>
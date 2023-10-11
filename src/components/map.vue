<template>
  <div id="map">
    <slot></slot>
  </div>
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
    height: 100%;
    width: 100%;
}
</style>
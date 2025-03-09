<template>
    <div class="conainer-map" id="map">
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  import { Base } from '@lh/cesium'
  const { init } = Base

  
  
  onMounted(async () => {
    const v1 = await init('map')

  })
  </script>
  <style scoped>
  .conainer-map {
    position: relative;
  }
  .btn {
    position: absolute;
    z-index: 10;
  }
  </style>
  
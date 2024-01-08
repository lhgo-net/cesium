<template>
  <div></div>
</template>

<script setup>
import { onMounted } from 'vue'
import Three from '@/utils/three/index'

onMounted(() => {
  const a = new Three()
  console.log(a)
})
</script>

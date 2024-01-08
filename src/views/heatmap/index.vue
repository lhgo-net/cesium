<template>
  <l-map @ready="ready"> </l-map>
</template>

<script setup>
function ready(viewer) {
  console.log(viewer)
}
</script>

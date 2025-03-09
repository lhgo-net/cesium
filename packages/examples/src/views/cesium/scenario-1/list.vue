<template>
  <div>fsdaf</div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const store = ref()

const query = (adcode) => {
  console.log(11)
  axios.get('api/map/alarm', { params: { adcode } }).then((res) => {
    console.log(res)
  })
}
onMounted(() => {
  query(50)
})
</script>

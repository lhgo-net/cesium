<template>
  <div class="list">
    <v-list density="compact">
      <Tree :data="tree" />
    </v-list>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, toRaw } from 'vue'

const props = defineProps(['data'])

// 直接使用props.data，无需额外ref，因为props是响应式的
const tree = props.data

const emits = defineEmits(['changeCity'])

// 如果handlerChange有具体用途，保留之；否则可移除
const handlerChange = (item) => {
  item = toRaw(item)
  item.districts = []
  emits('changeCity', item)
}

// 如果onMounted内无特殊逻辑，也可省略
// onMounted(() => {
//   console.log(tree)
// })
</script>

<style scoped>
</style>

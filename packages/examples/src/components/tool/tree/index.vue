<template>
  <div>
    <v-list density="compact" color="white" base-color="white" bg-color="transparent">
      <Tree :data="tree" @changeCity="handlerChange" />
    </v-list>
  </div>
</template>

<script setup>
import Tree from './Tree.vue'
import { defineProps, defineEmits, toRaw } from 'vue'

const props = defineProps(['data'])

// 直接使用props.data，无需额外ref，因为props是响应式的
const tree = props.data

const emits = defineEmits(['checkCity'])

// 如果handlerChange有具体用途，保留之；否则可移除
const handlerChange = (item) => {
  item = toRaw(item)
  item.districts = []
  emits('checkCity', item)
}

// 如果onMounted内无特殊逻辑，也可省略
// onMounted(() => {
//   console.log(tree)
// })
</script>

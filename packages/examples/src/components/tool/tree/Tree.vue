<template>
  <template v-for="item in tree" :key="item.name">
    <v-list-group
      v-if="item.districts && item.districts.length > 0"
      :value="item.name"
      @click.stop="handlerChange(item)"
    >
      <template v-slot:activator="{ props }">
        <v-list-item v-bind="props" :title="item.name"></v-list-item>
      </template>
      <Tree :data="item.districts" @changeCity="emitHandler" />
    </v-list-group>
    <v-list-item
      v-else
      :title="item.name"
      @click.stop="handlerChange(item)"
    ></v-list-item>
  </template>
</template>

<script setup>
import { defineProps, defineEmits, toRaw } from "vue";

const props = defineProps(["data"]);

// 直接使用props.data，无需额外ref，因为props是响应式的
const tree = props.data;

const emits = defineEmits(["changeCity"]);

// 如果handlerChange有具体用途，保留之；否则可移除
const handlerChange = (item) => {
  item = toRaw(item);
  item.districts = [];

  emits("changeCity", item);
};

const emitHandler = (item) => {
  emits("changeCity", item);
};

// 如果onMounted内无特殊逻辑，也可省略
// onMounted(() => {
//   console.log(tree)
// })
</script>

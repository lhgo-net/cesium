<template>
  <div>
    <v-menu :location="location" class="cursor-pointer">
      <template v-slot:activator="{ props }">
        <v-text-field v-bind="props" v-model="value.name" variant="outlined" density="compact" placeholder="选择行政区"></v-text-field>
      </template>

      <v-list height="400px">
        <v-list-item v-for="(item, index) in treeData" :key="item + index">
          <template v-if="item.districts && item.districts.length > 0">
            <v-menu :location="location" open-on-hover flat class="cursor-pointer">
              <template v-slot:activator="{ props }">
                <v-list-item-title v-bind="props" @click="handlerCity(item)">
                  {{ item.name }}
                </v-list-item-title>
              </template>

              <v-list height="400px">
                <v-list-item v-for="(k, l) in item.districts" :key="k + l">
                  <template v-if="k.districts && k.districts.length > 0">
                    <v-menu :location="location" open-on-hover class="cursor-pointer">
                      <template v-slot:activator="{ props }">
                        <v-list-item-title v-bind="props" @click="handlerCity(k)">
                          {{ k.name }}
                        </v-list-item-title>
                      </template>

                      <v-list height="400px">
                        <v-list-item v-for="(j, k) in k.districts" :key="j + k">
                          <template v-if="j.districts && j.districts.length > 0"> </template>
                          <v-list-item-title v-else @click="handlerCity(j)">
                            {{ j.name }}
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </template>
                  <v-list-item-title v-else @click="handlerCity(k)">{{ k.name }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
          <v-list-item-title v-else @click="handlerCity(item)">{{ item.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup>
import { ref, defineEmits,toRaw } from 'vue'
import tree from './china-area/area-full.json'

let value = ref('')
const treeData = ref(tree)
const location = ref('end')
const emits = defineEmits(['changeCity'])

const handlerCity = (item) => {
  item = toRaw(item)
  value.value = item
  item.districts = []
  emits('changeCity', item)
}
</script>

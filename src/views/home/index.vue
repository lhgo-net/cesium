<template>
  <v-sheet class="mx-auto pa-2" color="grey-lighten-4">
    <div v-for="items in data" :key="items.name">
      <div class="title">{{ items.name }}</div>
      <div style="display: flex; text-align: center; flex-wrap: wrap; gap: 20px 20px">
        <v-card v-for="item in items.children" :key="item.name" variant="tonal" width="300px" @click="toRoute(item)">
          <v-img
            :src="item.img || 'https://cdn.vuetifyjs.com/images/cards/house.jpg'"
            class="align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
            cover
          ></v-img>
          <v-card-actions>{{ item.name }}</v-card-actions>
        </v-card>
      </div>
    </div>
  </v-sheet>
</template>

<script setup>
import { reactive, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import { menu } from '../../router/menu'
const data = reactive(menu)

const router = useRouter()

function toRoute(item) {
  const obj = toRaw(item)
  const href = router.resolve({ ...obj })
  console.log(href)
  window.open(href.href, '_blank')
}
</script>

<style scoped>
.title {
  padding: 20px 0;
  font-size: 18px;
  font-weight: 1000;
}
</style>

<template>
  <div>
    <v-app-bar color="#46556c" flat>
      <template v-slot:prepend>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-app-bar-nav-icon v-bind="props"></v-app-bar-nav-icon>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in tree"
              :key="item.value + index"
              :value="item.value"
              @click="handlerToRoute(item)"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <v-app-bar-title>cesium功能合集</v-app-bar-title>
    </v-app-bar>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const tree = [
  {
    title: '应用场景-1',
    value: 'scenario-1',
    path: '/scenario-1',
  },
    {
    title: '应用场景-1',
    value: 'scenario-1',
    path: '/scenario-1',
  }
]

const handlerToRoute = (item) => {
  const pathHerf = router.resolve({
    path: item.value,
    query: {}
  })
  return window.open(pathHerf.href, '_blank')
}
</script>

<style scoped></style>

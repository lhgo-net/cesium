<template>
  <div class="app-container">
    <l-header></l-header>
    <router-view></router-view>
    <l-map></l-map>
    <l-nav>
      <div style="color: white; text-align: center">
        <ul>
          <li v-for="(item, index) in navList" :key="item.title + index" @click="onClick(item)">{{ item.title }}</li>
        </ul>
      </div>
    </l-nav>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import lMap from '@/components/map.vue'
import lHeader from '@/components/header.vue'
// import lSider from '@/components/sider.vue'
import lNav from '@/components/nav.vue'
// import lLine from '@/components/chart/chart.vue'

const router = useRouter()
// const route = useRoute()
const navList = reactive([
  {
    path: 'terrain',
    title: '地形观测'
  },
  {
    path: 'build',
    title: '矢量建筑模型'
  },
  {
    path: 'fly',
    title: '模拟走行'
  },
  {
    path: 'highlight',
    title: '3D突出城市'
  },
  {
    path: 'ThreeDimensionalNavigation',
    title: '立体走行'
  }
])

onMounted(async () => {})

function onClick(item) {
  router.push(item.path)
}
</script>

<style scoped lang="less">
.app-container {
  position: relative;
}

.chart-container {
  height: 30vh;
}
ul {
  margin: 0;
  padding: 0;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  li {
    list-style: none;
    padding: 5px;
  }

}
/* .right-container,.left-container{
    position: absolute;
    top: 64px;
} */
</style>

<template>
  <div class="app-container">
    <v-system-bar>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>
    <v-navigation-drawer>
      <v-sheet color="grey-lighten-4" class="pa-4">
        <!-- <v-avatar class="mb-4" color="grey-darken-1" size="64"></v-avatar>

        <div>john@google.com</div> -->
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="(item, index) in navList"
          :key="item.title + index"
          :title="item.title"
          @click="onClick(item)"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <l-map>
          <router-view></router-view>
        </l-map>
      </v-container>
    </v-main>
    <!-- <l-header></l-header>
    <l-map>
      <router-view></router-view>
    </l-map>
    <l-nav>
      <div style="color: white; text-align: center">
        <ul>
          <li v-for="(item, index) in navList" :key="item.title + index" @click="onClick(item)">{{ item.title }}</li>
        </ul>
      </div>
    </l-nav> -->
  </div>
</template>

<script setup>
import { onMounted, reactive, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import lMap from '@/components/map.vue'
// import lHeader from '@/components/header.vue'
// import lSider from '@/components/sider.vue'
// import lNav from '@/components/nav.vue'
// import lLine from '@/components/chart/chart.vue'
import { pop } from '@/utils/event'

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
  // {
  //   path: 'fly',
  //   title: '模拟走行'
  // },
  {
    path: 'highlight',
    title: '3D突出城市'
  },
  {
    path: 'vecBuild',
    title: '突出城市矢量建筑'
  },
  {
    path: 'vecBuild1',
    title: '突出城市矢量建筑1'
  }
  // {
  //   path: 'ThreeDimensionalNavigation',
  //   title: '立体走行'
  // }
])

onMounted(async () => {})

function onClick(item) {
  router.push(item.path)
}
nextTick(() => {
  pop()
})
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

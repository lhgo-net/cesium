<template>
  <div class="app-container">
    <v-system-bar height="50">
      <v-avatar color="info">LH</v-avatar>
      <v-chip v-for="tag in version"
        :key="tag"
      >{{ tag }}</v-chip>
      <v-spacer></v-spacer>
    </v-system-bar>
    <v-navigation-drawer>

      <v-divider></v-divider>
      <v-list :items="navList" density :return-object="true" @click:select="onClick"></v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </div>
</template>

<script setup>
import { onMounted, reactive, nextTick, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import { pop } from '@/utils/event'
import { version } from '@/config/app.js'

const router = useRouter()
// const route = useRoute()
const navList = reactive([
  {
    path: 'terrain',
    title: '地形观测',
    value: '1'
  },
  {
    path: 'highlight',
    title: '3D突出城市',
    value: '2'
  },
  { type: 'divider' },
  {
    type: 'subheader',
    title: '影像图层'
  },
  {
    path: 'tianDitu',
    title: '天地图'
  },
  { type: 'divider' },
  {
    type: 'subheader',
    title: '3DTile'
  },
  {
    path: 'gradient',
    title: '渐变效果',
    value: '5'
  },
  {
    path: 'pastePictures',
    title: '贴图',
    value: '6'
  }
])

onMounted(async () => {})

function onClick(item) {
  const obj = toRaw(item.id)
  router.push(obj.path)
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

<template>
  <div>
    <v-navigation-drawer color="#10172a" location="left" permanent>
      <v-card color="transparent" flat>
        <v-card-text>
          <v-list>
            <!-- <v-list-group>
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="mdi-account-circle"
                  title="案列"
                ></v-list-item>
              </template>
              <v-list-item
                v-for="item in caseLibs"
                :key="item.value"
                :title="item.name"
                :value="item.name"
                @click="handlerToRoute(item)"
              ></v-list-item>
            </v-list-group> -->

            <v-list-item
              v-for="item in treeData"
              :key="item.value"
              :title="item.name"
              :value="item.value"
              @click="handlerChange(item)"
            ></v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-navigation-drawer>
    <v-main>
      <component :is="componentChange"></component>
    </v-main>
  </div>
</template>

<script>
import initEarth from '@/components/cesium/init-earth.vue'

export default {
  components: {
    initEarth
  }
}
</script>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { menuItem, caselibs } from '@/config'

const treeData = ref(menuItem)
const caseLibs = ref(caselibs)
const router = useRouter()

let componentChange = ref('init-earth')

const handlerToRoute = (item) => {
  const pathHerf = router.resolve({
    path: item.value,
    query: {}
  })
  return window.open(pathHerf.href, '_blank')
}
function handlerChange(item) {
  document.title = item.name
  componentChange.value = item.value
}
</script>

<style>
.v-navigation-drawer__content {
  overflow: auto !important;
}
/* 自定义滚动条的宽度和高度 */
.v-navigation-drawer__content::-webkit-scrollbar {
  width: 5px;
  /* height: 12px; */
}

/* 自定义滚动条轨道（背景）的样式 */
/* .v-navigation-drawer__content::-webkit-scrollbar-track {
  background: white;
  border-radius: 6px;
} */

/* 自定义滚动条的滑块（前景）的样式 */
.v-navigation-drawer__content::-webkit-scrollbar-thumb {
  background: linear-gradient(to top, #46556c, #10172a);
  border-radius: 6px;
}

/* 当鼠标悬停在滑块上时，改变滑块的颜色 */
.v-navigation-drawer__content::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.7);
}
</style>

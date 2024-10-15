<template>
  <div>
    <v-app-bar color="#46556c" flat>
      <template v-slot:prepend>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-app-bar-nav-icon v-bind="props"></v-app-bar-nav-icon>
          </template>
        </v-menu>
      </template>
      <v-app-bar-title>lhgo webGIS系统</v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer color="#10172a" location="left" permanent>
      <v-treeview
        v-model="active"
        :items="Tree"
        item-value="path"
        item-title="title"
        @click:select="select"
        return-object
      ></v-treeview>
    </v-navigation-drawer>
    <v-main>
      <router-view></router-view>
    </v-main>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { Tree } from "@/config";
import { ref } from "vue";

const router = useRouter();
const active = ref({})

const handlerToRoute = (item) => {
  console.log(item)
  const pathHerf = router.resolve({
    path: item.value,
    query: {},
  });
  // return window.open(pathHerf.href, "_blank");
};
function select(item) {
  router.push(item.id);
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

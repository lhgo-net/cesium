<template>
  <div class="app-container">
    <v-navigation-drawer>
      <div class="d-flex px-2 my-2">
        <v-list-item title="三维GIS" subtitle="LH"></v-list-item>

        <!-- <v-btn
          class="ms-2"
          rounded
          variant="flat"
          icon="mdi-chevron-double-left"
        ></v-btn> -->
      </div>

      <v-divider></v-divider>
      <v-list :items="navList" :return-object="true" @click:select="onClick"></v-list>
      <!-- <v-list>
        <div v-for="item in navList" :key="item.text">
          <v-list-group v-if="item.children && item.children.length > 0" :value="item.text">
            <template v-slot:activator="{ props }">
              <v-list-item v-for="itemChildren in item.children" :key="itemChildren.text" :title="itemChildren.text" :value="itemChildren.text"></v-list-item>
            </template>
          </v-list-group>
          <v-list-item v-else :title="item.text" :value="item.text" @click:select="onClick"></v-list-item>
        </div>
      </v-list> -->
    </v-navigation-drawer>
    <v-system-bar height="50">
      <v-avatar color="info">LH</v-avatar>
      <v-chip v-for="tag in version" :key="tag">{{ tag }}</v-chip>
      <v-spacer></v-spacer>
    </v-system-bar>
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </div>
</template>

<script setup>
import { onMounted, reactive, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import { version } from '@/config/app.js'
import { library } from '@/config/library.js'
// import { useMenuStore } from '@/store/index.js'

const router = useRouter()
// const route = useRoute()
// const store = useMenuStore()
const navList = reactive([...library])

<<<<<<< HEAD
onMounted(async () => {
  // console.log(toRaw(store))
})
=======
onMounted(async () => {})
>>>>>>> dev

function onClick(item) {
  const obj = toRaw(item.id)
  router.push(obj.path)
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

// import { defineStore } from 'pinia'
// import { ref } from 'vue'

// export const useMenuStore = defineStore('menu', () => {
//   const menuList = ref([])
//   function setMenuList(menus) {
//     menuList.value = menus
//   }

//   return { menuList, setMenuList }
// })
// store/index.js
import { defineStore } from 'pinia'

export const useMenuStore = defineStore('route', {
  state: () => ({
    dynamicRoutes: [] // Store your dynamic routes here
  }),
  actions: {
    setDynamicRoutes(routes) {
      this.dynamicRoutes = routes
    }
  }
})

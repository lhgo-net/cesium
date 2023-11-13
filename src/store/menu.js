import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMenuStore = defineStore('menu', () => {
  const menuList = ref([])
  function setMenuList(menus) {
    menuList.value = menus
  }

  return { menuList, setMenuList }
})
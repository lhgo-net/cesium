import { createRouter, createWebHistory } from 'vue-router'
// import { toRaw } from 'vue'
// import { useMenuStore } from '../store/menu'
// import { menu } from './menu'
// const modles = import.meta.glob('/src/views/**/**.vue')

// function dynamic(menu) {
//   if (!menu || !menu.length) {
//     return '无效数据'
//   }
//   console.log(modles)
//   menu.forEach(item => {
//     const filePath = `/src/views/${item.component}.vue`
//     try {
//       const modulePath = modles[filePath]
//       const component = modulePath
//       if (item.children && item.children.length) {
//         dynamic(item.children)
//       }
//       const route = {
//         name: item.name,
//         path: item.path,
//         component,
//         meta: {
//           titel: item.name
//         }
//       }
//       router.addRoute(route)
//     } catch (error) {
//       console.log('页面导入时错误：', error)
//     }
//   })
// }
const routes = [
  { path: '/', redirect: 'index' },
  { path: '/:catchAll(.*)', redirect: '/404' },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/404.vue'),
    meta: {
      title: '404'
    }
  },
  {
    path: '/',
    component: () => import('@/views/index.vue'),
    children: [
      {
        path: 'index',
        name: '案列',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '案列'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// router.beforeEach((to, from, next) => {
//   document.title = `${to.meta.title || to.name} | LH`

//   const useMenu = toRaw(useMenuStore())
//   useMenu.setMenuList(menu)
//   console.log(useMenu)
//   console.log(menu)
//   // dynamic(menu)
//   next()
// })
export default router

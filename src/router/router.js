import { createRouter, createWebHistory } from 'vue-router'
// import { toRaw } from 'vue'
import { useMenuStore } from '../store/menu'
import { menus } from './menu'

const modules = import.meta.glob('/src/views/**/**.vue')

export function dynamic(menu) {
  if (!menu || !menu.length) {
    return '无效数据'
  }

  const routesToAdd = []

  for (const item of menu) {
    const filePath = `/src/views/${item.component}.vue`
    try {
      const modulePath = modules[filePath]
      const component = modulePath

      const route = {
        name: item.name,
        path: item.path,
        component,
        meta: {
          title: item.name,
          requireAuth: true
        }
      }

      if (item.children && item.children.length) {
        const childRoutes = dynamic(item.children)
        route.children = childRoutes
      }

      routesToAdd.push(route)
    } catch (error) {
      console.log('页面导入时错误：', error)
    }
  }

  return routesToAdd
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: 'index' },
    { path: '/:catchAll(.*)', redirect: '/404' },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/404/404.vue'),
      meta: {
        title: '404',
        requireAuth: true
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
            title: '案列',
            requireAuth: true
          }
        }
      ]
    }
  ]
})
// const newRouter = createRouter()
// router.matcher = newRouter.matcher

router.beforeEach(async (to, from, next) => {
  document.title = `${to.meta.title || to.name} | LH`

  const routeStore = useMenuStore()

  // Ensure dynamic routes are available
  if (!routeStore.dynamicRoutes.length) {
    // Implement your dynamic route fetching logic
    const dynamicRoutes = dynamic(menus)
    routeStore.setDynamicRoutes(dynamicRoutes)
    dynamicRoutes.forEach(item => {
      if (item.children && item.children.length) {
        item.children.forEach(route => {
          router.addRoute(route)
          // router.replace(router.currentRoute.value.fullPath)
        })
      } else {
        router.addRoute(item)
      }
    })
    next({ ...to, replace: true })
  } else {
    next()
  }

  // const useMenu = toRaw(useMenuStore())
  // useMenu.setMenuList(menu)

  // const dynamicRoutes = await dynamic(menu)
  // console.log(dynamicRoutes)
  // console.log(to)
  // console.log(router)

  // // 清空现有路由
  // router.getRoutes().forEach(route => {
  //   router.removeRoute(route.name)
  // })
  // if (to.meta.requireAuth) {
  //   // 添加新的动态路由
  //   dynamicRoutes.forEach(item => {
  //     if (item.children && item.children.length) {
  //       item.children.forEach(route => {
  //         router.addRoute(route)
  //         router.replace(router.currentRoute.value.fullPath)
  //       })
  //     } else {
  //       router.addRoute(item)
  //     }
  //   })
  //   next()
  // } else {
  //   next('/index')
  // }

  console.log(router.getRoutes())
})

export default router

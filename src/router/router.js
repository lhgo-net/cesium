import { createRouter, createWebHistory } from 'vue-router'
// import { toRaw } from 'vue'
// import { useMenuStore } from '../store/menu'
import { menus } from './menu'

const modules = import.meta.glob('/src/views/**/**.vue')

export function dynamic(menu) {
  if (!menu || !menu.length) {
    return '无效数据'
  }

  const routesToAdd = []
  for (let i = 0; i < menu.length; i++) {
    const item = menu[i]
    if (item.children && item.children.length > 0) {
      routesToAdd.push(...dynamic(item.children))
    } else {
      const filePath = `/src/views/${item.component}.vue`
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
      routesToAdd.push(route)
    }
  }

  return routesToAdd
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '', redirect: 'index' },
    { path: '/:catchAll(.*)', redirect: '/404' },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/404/404.vue'),
      meta: {
        title: '404',
<<<<<<< HEAD
        requireAuth: true
      }
=======
      },
>>>>>>> dev
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
<<<<<<< HEAD
            requireAuth: true
          }
        }
      ]
    }
  ]
=======
          },
        },
      ],
    },
  ],
>>>>>>> dev
})
let registerRouteFresh = true
router.beforeEach(async (to, from, next) => {
  document.title = `${to.meta.title || to.name} | LH`

  // const routeStore = useMenuStore()
  console.log(router.getRoutes())
  if (registerRouteFresh) {
    const dynamicRoutes = await dynamic(menus)
    console.log(dynamicRoutes)
    // routeStore.setDynamicRoutes(dynamicRoutes)
    dynamicRoutes.forEach(async item => {
      await router.addRoute(item)
    })
    next()
    registerRouteFresh = false
  } else {
    next()
  }
  console.log(router.getRoutes())
})

export default router

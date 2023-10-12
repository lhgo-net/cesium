import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/index.vue'),
      children: [
        {
          path: 'terrain',
          name: 'terrain',
          component: () => import('@/views/terrain/index.vue')
        },
        {
          path: 'highlight',
          name: 'highlight',
          component: () => import('@/views/highlight/index.vue')
        },
        {
          path: 'vecBuild',
          name: 'vecBuild',
          component: () => import('@/views/vecBuild/index.vue')
        },
        {
          path: 'gradient',
          name: 'gradient',
          component: () => import('@/views/3DTile/gradient.vue')
        },
        {
          path: 'pastePictures',
          name: 'pastePictures',
          component: () => import('@/views/3DTile/pastePictures.vue')
        },
        {
          path: 'tianDitu',
          name: 'tianDitu',
          component: () => import('@/views/tianDitu/index.vue')
        }
      ]
    }
  ]
})
export default router

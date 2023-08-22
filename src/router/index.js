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
          path: 'build',
          name: 'build',
          component: () => import('@/views/build/index.vue')
        },
        {
          path: 'fly',
          name: 'fly',
          component: () => import('@/views/fly/index.vue')
        },
        {
          path: 'highlight',
          name: 'highlight',
          component: () => import('@/views/highlight/index.vue')
        }
      ]
    }
  ]
})
export default router

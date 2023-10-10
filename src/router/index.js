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
        },
        {
          path: 'ThreeDimensionalNavigation',
          name: 'ThreeDimensionalNavigation',
          component: () => import('@/views/ThreeDimensionalNavigation/index.vue')
        },
        {
          path: 'vecBuild',
          name: 'vecBuild',
          component: () => import('@/views/vecBuild/index.vue')
        }
      ]
    },
    {
      path: '/linechart',
      name: 'linechart',
      component: () => import('@/views/linechart/lineChart.vue')
    }
  ]
})
export default router

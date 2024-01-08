import { createRouter, createWebHistory } from 'vue-router'

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
      },
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
          },
        },
      ],
    },
  ],
})
export default router

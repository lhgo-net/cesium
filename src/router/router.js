import { createRouter, createWebHistory } from 'vue-router'
// import { menu } from './menu'
// import dynamic from './dynamic'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: 'index' },
    { path: '/:catchAll(.*)', redirect: '/404' },
    { path: '/404', component: () => import('@/views/404/404.vue') },
    {
      path: '/',
      component: () => import('@/views/index.vue'),
      children: [
        {
          path: 'index',
          component: () => import('@/views/home/index.vue')
        }
      ]
    }
  ]
})
export default router

import { createRouter, createWebHistory } from 'vue-router'

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

router.beforeEach(async (to) => {
  if (to.meta.title) { // 判断是否有标题
    document.title = to.meta.title
  }
})
export default router

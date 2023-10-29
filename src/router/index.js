import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: 'index' },
    {
      path: '/',
      name: 'contanner',
      component: () => import('@/views/index.vue'),
      children: [
        {
          path: 'index',
          name: 'index',
          component: () => import('@/views/home/index.vue'),
          meta: {
            title: '介绍'
          }
        },
        {
          path: 'terrain',
          name: 'terrain',
          component: () => import('@/views/terrain/index.vue'),
          meta: {
            title: '地形观测'
          }
        },
        {
          path: 'highlight',
          name: 'highlight',
          component: () => import('@/views/highlight/index.vue'),
          meta: {
            title: '3D突出城市'
          }
        },
        {
          path: 'vecBuild',
          name: 'vecBuild',
          component: () => import('@/views/vecBuild/index.vue'),
          meta: {
            title: '测试DEMO'
          }
        },
        // 3DTile
        {
          path: 'gradient',
          name: 'gradient',
          component: () => import('@/views/3DTile/gradient.vue'),
          meta: {
            title: '渐变效果'
          }
        },
        {
          path: 'pastePictures',
          name: 'pastePictures',
          component: () => import('@/views/3DTile/pastePictures.vue'),
          meta: {
            title: '贴图'
          }
        },
        {
          path: 'testDemo',
          name: 'testDemo',
          component: () => import('@/views/3DTile/testDemo.vue'),
          meta: {
            title: '测试DEMO'
          }
        },
        // 影像
        {
          path: 'tianDitu',
          name: 'tianDitu',
          component: () => import('@/views/layer/tianDitu.vue'),
          meta: {
            title: '天地图'
          }
        },
        // 实体
        {
          path: 'trackPlayback',
          name: 'trackPlayback',
          component: () => import('@/views/entity/trackPlayback.vue'),
          meta: {
            title: '轨迹回放'
          }
        },
        {
          path: 'flyLine',
          name: 'flyLine',
          component: () => import('@/views/entity/flyLine.vue'),
          meta: {
            title: '飞线'
          }
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

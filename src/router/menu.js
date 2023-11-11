export const menu = [
  {
    name: '地形观测',
    path: '/terrain',
    component: 'home/index'
  },
  {
    name: '随机颜色',
    path: '/randomColor',
    component: '3DTile/randomColor'
  },
  {
    name: 'indexs',
    path: '/indexs',
    component: 'home/index'
  }
]

// [
//     { path: '/', redirect: 'index' },
//     {
//       path: '/',
//       name: 'contanner',
//       component: () => import('@/views/index.vue'),
//       children: [
//         {
//           path: 'index',
//           name: 'index',
//           component: () => import('@/views/home/index.vue'),
//           meta: {
//             title: '介绍'
//           }
//         },
//         {
//           path: 'terrain',
//           name: 'terrain',
//           component: () => import('@/views/terrain/index.vue'),
//           meta: {
//             title: '地形观测'
//           }
//         },
//         {
//           path: 'highlight',
//           name: 'highlight',
//           component: () => import('@/views/highlight/index.vue'),
//           meta: {
//             title: '3D突出城市'
//           }
//         },
//         {
//           path: 'vecBuild',
//           name: 'vecBuild',
//           component: () => import('@/views/vecBuild/index.vue'),
//           meta: {
//             title: '测试DEMO'
//           }
//         },
//         // 3DTile
//         {
//           path: 'gradient',
//           name: 'gradient',
//           component: () => import('@/views/3DTile/gradient.vue'),
//           meta: {
//             title: '渐变效果'
//           }
//         },
//         {
//           path: 'pastePictures',
//           name: 'pastePictures',
//           component: () => import('@/views/3DTile/pastePictures.vue'),
//           meta: {
//             title: '贴图'
//           }
//         },
//         {
//           path: 'noise',
//           name: 'noise',
//           component: () => import('@/views/3DTile/noise.vue'),
//           meta: {
//             title: '噪声'
//           }
//         },
//         {
//           path: 'testDemo',
//           name: 'testDemo',
//           component: () => import('@/views/3DTile/testDemo.vue'),
//           meta: {
//             title: '测试DEMO'
//           }
//         },
//         {
//           path: 'randomColor',
//           name: '随机颜色',
//           component: () => import('@/views/3DTile/randomColor.vue')
//         },
//         // 影像
//         {
//           path: 'tianDitu',
//           name: 'tianDitu',
//           component: () => import('@/views/layer/tianDitu.vue'),
//           meta: {
//             title: '天地图'
//           }
//         },
//         // 实体
//         {
//           path: 'trackPlayback',
//           name: 'trackPlayback',
//           component: () => import('@/views/entity/trackPlayback.vue'),
//           meta: {
//             title: '轨迹回放'
//           }
//         },
//         {
//           path: 'flyLine',
//           name: 'flyLine',
//           component: () => import('@/views/entity/flyLine.vue'),
//           meta: {
//             title: '飞线'
//           }
//         }
//       ]
//     }
//   ]
<<<<<<< HEAD
export const menus = [
=======
export const menu = [
  // {
  //   name: '工具',
  //   children: [
  //     {
  //       name: '工具',
  //       path: '/gisTool',
  //       component: 'tool/index',
  //       img: '/img/layer.png',
  //       meta: {
  //         title: '工具'
  //       }
  //     }
  //   ]
  // },
  {
    name: 'three',
    children: [
      {
        name: 'three',
        path: '/three',
        component: 'three/index',
        img: '/img/layer.png',
        meta: {
          title: 'three',
        },
      },
    ],
  },
>>>>>>> dev
  {
    name: '影像图层',
    children: [
      {
        name: '图层',
        path: '/layer',
        component: 'layer/index',
        img: '/img/layer.png',
        meta: {
          title: '介绍',
        },
      },
      {
        name: '工具',
        path: '/gisTool',
        component: 'tool/index',
        img: '/img/layer.png',
        meta: {
          title: '工具',
        },
      },
      {
        name: '热力图',
        path: '/heatmap',
        component: 'heatmap/index',
        img: '/img/layer.png',
        meta: {
          title: '热力图',
        },
      },
    ],
  },
  {
    name: '实体',
    children: [
      {
        name: '轨迹回放',
        path: '/trackPlayback',
        component: 'entity/trackPlayback',
        meta: {
          title: '轨迹回放',
        },
      },
      {
        name: '垂直飞线',
        path: '/verticalFlyingLines',
        component: 'entity/verticalFlyingLines',
        img: '/img/verticalFlyingLines.png',
        meta: {
          title: '垂直飞线',
        },
      },
      {
        name: '抛物线',
        path: '/parabolicLines',
        component: 'entity/parabolicLines',
        img: '/img/parabolicLines.png',
        meta: {
          title: '抛物线',
        },
      },
      {
        name: '遮罩',
        path: '/mask',
        component: 'entity/mask',
        img: '/img/mask.png',
        meta: {
          title: '遮罩',
        },
      },
    ],
  },
  {
    name: '3DTile',
    children: [
      {
        name: '渐变效果',
        path: '/gradient',
        component: '3DTile/gradient',
        img: '/img/gradient.png',
        meta: {
          title: '渐变效果',
        },
      },
      {
        name: '贴图',
        path: '/pastePictures',
        component: '3DTile/pastePictures',
        img: '/img/pastePictures.png',
        meta: {
          title: '贴图',
        },
      },
      {
        name: '噪声',
        path: '/noise',
        component: '3DTile/noise',
        meta: {
          title: '噪声',
        },
      },
      {
        name: '随机颜色',
        path: '/randomColor',
        component: '3DTile/randomColor',
        img: '/img/randomColor.png',
        meta: {
          title: '随机颜色',
        },
      },
    ],
  },
  {
    name: '场景',
    children: [
      {
        name: '水系',
        path: '/water',
        component: 'scenario/index',
        img: '/img/water.png',
        meta: {
          title: '水系',
        },
      },
    ],
  },
  {
    name: '其他',
    children: [
      {
        name: '地形观测',
        path: '/terrain',
        component: 'terrain/index',
        meta: {
          title: '地形观测',
        },
      },
      {
        name: '3D突出城市',
        path: '/highlight',
        component: 'highlight/index',
        meta: {
          title: '3D突出城市',
        },
      },
      {
        name: '地形',
        path: '/terrain/city',
        component: 'terrain/city/index',
        meta: {
          title: '地形',
        },
      },
    ],
  },
]

// export const menus = {
//   name: '随机颜色',
//   path: '/randomColor',
//   component: '3DTile/randomColor',
//   img: '/img/randomColor.png',
//   meta: {
//     title: '随机颜色'
//   }
// }

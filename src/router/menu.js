export const menu = [
  {
    name: '影像图层',
    children: [
      {
        name: '天地图',
        path: '/tianDitu',
        component: 'layer/tianDiTu',
        meta: {
          title: '介绍'
        }
      }
    ]
  },
  {
    name: '实体',
    children: [
      {
        name: '轨迹回放',
        path: '/trackPlayback',
        component: 'entity/trackPlayback',
        meta: {
          title: '轨迹回放'
        }
      },
      {
        name: '飞线',
        path: '/flyLine',
        component: 'entity/flyLine',
        meta: {
          title: '飞线'
        }
      }
    ]
  },
  {
    name: '3DTile',
    children: [
      {
        name: '渐变效果',
        path: '/gradient',
        component: '3DTile/gradient',
        meta: {
          title: '渐变效果'
        }
      },
      {
        name: '贴图',
        path: '/pastePictures',
        component: '3DTile/pastePictures',
        meta: {
          title: '贴图'
        }
      },
      {
        name: '噪声',
        path: '/noise',
        component: '3DTile/noise',
        meta: {
          title: '噪声'
        }
      },
      {
        name: '随机颜色',
        path: '/randomColor',
        component: '3DTile/randomColor',
        meta: {
          title: '随机颜色'
        }
      }
    ]
  },
  {
    name: '其他',
    children: [
      {
        name: '地形观测',
        path: '/terrain',
        component: 'terrain/index',
        meta: {
          title: '地形观测'
        }
      },
      {
        name: '3D突出城市',
        path: '/highlight',
        component: 'highlight/index',
        meta: {
          title: '3D突出城市'
        }
      }
    ]
  }
]

export const library = [
  {
    value: 0,
    path: 'index',
    title: '介绍'
  },
  // 影像图层
  {
    value: 1,
    title: '影像图层',
    children: [
      {
        value: 0,
        path: 'tianDitu',
        title: '天地图'
      }
    ]
  },
  // 实体
  {
    value: 2,
    title: '实体',
    children: [
      {
        value: 0,
        path: 'trackPlayback',
        title: '轨迹回放'
      },
      {
        value: 1,
        path: 'flyLine',
        title: '飞线'
      }
    ]
  },
  // 3DTile
  {
    value: 3,
    title: '3DTile',
    children: [
      {
        value: 0,
        path: 'gradient',
        title: '渐变效果'
      },
      {
        value: 1,
        path: 'pastePictures',
        title: '贴图'
      },
      {
        value: 2,
        path: 'noise',
        title: '噪声'
      },
      {
        value: 3,
        path: 'randomColor',
        title: '随机颜色'
      }
    ]
  },
  // 其他
  {
    value: 4,
    title: '其他',
    children: [
      {
        value: 0,
        path: 'terrain',
        title: '地形观测'
      },
      {
        value: 1,
        path: 'highlight',
        title: '3D突出城市'
      },
      {
        value: 2,
        path: 'testDemo',
        title: '测试demo'
      }
    ]
  }
]

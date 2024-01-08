import Mock from 'mockjs'

export function mockGuizhouPoint() {
  return new Promise((resolve, reject) => {
    //  [106.125092, 26.183396, 107.279166, 27.357802]
    const data = Mock.mock({
      'data|100-500': [
        {
          'lat|106.125092-107.279166': 0,
          'lon|26.183396-27.357802': 0,
          'value|0-300': 0,
        },
      ],
    })
    resolve(data)
  })
}

export async function clustering() {
  const dataSource = new Cesium.CustomDataSource('myData')
  mockGuizhouPoint().then((res) => {
    console.log(res)
    for (let i = 0; i < res.data.length; i++) {
      const item = res.data[i]
      dataSource.entities.add({
        position: Cesium.Cartesian3.fromDegrees(item['lat.279166'], item['lon.357802']),
        point: {
          show: true,
          pixelSize: 10,
          depthTestAgainstTerrain: true,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          color: Cesium.Color.RED,
        },
        label: {
          text: item.value.toString(),
          font: 'bold 15px Microsoft YaHei',
          // 竖直对齐方式
          verticalOrigin: Cesium.VerticalOrigin.CENTER,
          // 水平对齐方式
          horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
          // 偏移量
          // pixelOffset: new Cesium.Cartesian2(15, 0),
        },
      })
    }
    dataSource.clustering.enabled = true
    dataSource.clustering.pixelRange = 60
    dataSource.clustering.minimumClusterSize = 2
    dataSource.entities.values.forEach((entity) => {})
    dataSource.clustering.clusterEvent.addEventListener(function (clusteredEntities, cluster) {
      // 关闭自带的显示聚合数量的标签
      cluster.label.show = false
      cluster.billboard.show = true
      cluster.billboard.verticalOrigin = Cesium.VerticalOrigin.BOTTOM
      cluster.billboard.width = 72
      cluster.billboard.height = 72
      if (clusteredEntities.length > 1000) {
        cluster.billboard.image = combineIconAndLabel('/img/aqi-g0.png', 20, 30)
      }
      if (clusteredEntities.length > 2000) {
        cluster.billboard.image = combineIconAndLabel('/img/aqi-g1.png', 20, 30)
      }
      if (clusteredEntities.length > 3000) {
        cluster.billboard.image = combineIconAndLabel('/img/aqi-g2.png', 20, 30)
      }
      if (clusteredEntities.length > 4000) {
        cluster.billboard.image = combineIconAndLabel('/img/aqi-g3.png', 20, 30)
      }
      if (clusteredEntities.length > 5000) {
        cluster.billboard.image = combineIconAndLabel('/img/aqi-g4.png', 20, 30)
      } else {
        cluster.billboard.image = combineIconAndLabel('/img/aqi-g5.png', 20, 30)
      }
    })
    viewer && viewer.dataSources.add(dataSource)
  })
  viewer.zoomTo(viewer.entities)
}

export function combineIconAndLabel(url, label, size) {
  // 创建画布对象
  const canvas = document.createElement('canvas')
  canvas.width = size * 4
  canvas.height = size * 4
  const ctx = canvas.getContext('2d')

  const promise = new Cesium.Resource.FetchImage(url).then((image) => {
    // 异常判断
    try {
      ctx.drawImage(image, 0, 0)
    } catch (e) {
      console.log(e)
    }

    // 渲染字体
    // font属性设置顺序：font-style, font-variant, font-weight, font-size, line-height, font-family
    ctx.fillStyle = Cesium.Color.WHITE.toCssColorString()
    ctx.font = 'bold 20px Microsoft YaHei'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(label, size / 2, size / 2)

    return canvas
  })
  return promise
}

export function pop() {
  const handle = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
  handle.setInputAction(function (click) {
    // console.log(pick)
    const pick = viewer.scene.pickPosition(click.position)
    const cartographic = Cesium.Cartographic.fromCartesian(pick)
    const lon = Cesium.Math.toDegrees(cartographic.longitude)
    const lat = Cesium.Math.toDegrees(cartographic.latitude)
    console.log(click)
    console.log(pick)
    console.log(cartographic)
    console.log(lon, lat)

    const div = document.createElement('div')
    div.innerHTML = '弹窗里需要填充点内容，支持html字符串'
    viewer.container.append(div)
    viewer.scene.postRender.addEventListener((a) => {
      div.style.cssText = `
        position:absolute;
        left:0;
        top:0;
        height:100px;
        width:100px;
        background:rgba(0,0,0,0.7);
        color:white;
        transform:translate3d(${Math.round(click.position.x)}px,${Math.round(click.position.y)}px, 0);
    `
    })
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
}

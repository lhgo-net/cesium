import gz from '@/assets/json/广州市.json'
import guizhou from '@/assets/json/贵阳市.json'
import { flat, getColorRamp } from './utils'
import Mock from 'mockjs'
import * as turf from '@turf/turf'

export function flyLine() {
  const lineArr = flat(gz.features[0].geometry.coordinates[0]) //所有点位
  const arr = [...lineArr]
  const isConstant = true;
  const startTime = Cesium.JulianDate.now();
  viewer.clock.shouldAnimate = true;
  console.log(viewer.clockViewModel)
  viewer.entities.add({
    polyline: {
      positions: new Cesium.CallbackProperty(function (time, result) {
        // if (length == 0) {
        //   lineArr = [...arr]
        //   console.log('over')
        // }
        const diff = 10 * Cesium.JulianDate.secondsDifference(time, startTime)
        if (diff > 50) {
          // console.log(diff)
          // console.log(Cesium.ClockRange.CLAMPED)

          return Cesium.Cartesian3.fromDegreesArray([parseFloat(lineArr.splice(0, 1)), parseFloat(lineArr.splice(0, 1)), parseFloat(lineArr.splice(0, 1)), parseFloat(lineArr.splice(0, 1))]);
        }
      }, isConstant),
      width: 5,
      material: Cesium.Color.RED,
    },
  });
  viewer.zoomTo(viewer.entities)
}

export function mockGuizhouPoint() {

  return new Promise((resolve, reject) => {
    //  [106.125092, 26.183396, 107.279166, 27.357802]
    const data = Mock.mock({
      'data|100-500': [
        {
          'lat|106.125092-107.279166': 0,
          'lon|26.183396-27.357802': 0,
          'value|0-300': 0,
        }
      ]
    })
    resolve(data)
  })
}

export async function dataSource() {
  const dataSource = new Cesium.CustomDataSource('myData');
  mockGuizhouPoint().then(res => {
    console.log(res)
    for (let i = 0;i < res.data.length;i++) {
      const item = res.data[i]
      dataSource.entities.add({
        position: Cesium.Cartesian3.fromDegrees(item['lat.279166'], item['lon.357802']),
        point: {
          show: true,
          pixelSize: 10,
          depthTestAgainstTerrain: true,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          color: Cesium.Color.RED
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
        }
      })
    }
    dataSource.clustering.enabled = true
    dataSource.clustering.pixelRange = 60
    dataSource.clustering.minimumClusterSize = 2
    dataSource.entities.values.forEach(entity => {
      // entity.position._value.z += 50.0;
      // 使用大小为64*64的icon，缩小展示poi
      // entity.billboard = {
      //   image: '/img/icon-favo.png',
      //   width: 32,
      //   height: 32,
      // };
      // console.log(entity)
      // entity.label = {
      //   text: 'POI',
      //   font: 'bold 15px Microsoft YaHei',
      //   // 竖直对齐方式
      //   verticalOrigin: Cesium.VerticalOrigin.CENTER,
      //   // 水平对齐方式
      //   horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
      //   // 偏移量
      //   pixelOffset: new Cesium.Cartesian2(15, 0),
      // }
    })
    dataSource.clustering.clusterEvent.addEventListener(function (clusteredEntities, cluster) {
      // 关闭自带的显示聚合数量的标签
      cluster.label.show = false;
      cluster.billboard.show = true;
      cluster.billboard.verticalOrigin = Cesium.VerticalOrigin.BOTTOM;
      cluster.billboard.width = 72;
      cluster.billboard.height = 72;
      if (clusteredEntities.length > 1000) {
        cluster.billboard.image = combineIconAndLabel('/img/aqi-g0.png',20,30)
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
    viewer && viewer.dataSources.add(dataSource);
  })
  viewer.zoomTo(viewer.entities)
}

export function combineIconAndLabel(url, label, size) {
  // 创建画布对象
  let canvas = document.createElement('canvas');
  canvas.width = size * 4;
  canvas.height = size * 4;
  let ctx = canvas.getContext("2d");

  let promise = new Cesium.Resource.fetchImage(url).then(image => {
    // 异常判断
    try {
      ctx.drawImage(image, 0, 0);
    } catch (e) {
      console.log(e);
    }

    // 渲染字体
    // font属性设置顺序：font-style, font-variant, font-weight, font-size, line-height, font-family
    ctx.fillStyle = Cesium.Color.WHITE.toCssColorString();
    ctx.font = 'bold 20px Microsoft YaHei';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, size / 2, size / 2);

    return canvas;
  });
  return promise
}

export function anlie1() {
  const lineArr = flat(guizhou.features[0].geometry.coordinates[0])
  // const box = turf.bbox(guizhou.features[0])
  // console.log(box)
  // mockGuizhouPoint().then(res => {
  //   console.log(res)
  // })
  const minimumHeights = []
  const length = lineArr.length / 2
  for (let index = 0; index < length; index++) {
    minimumHeights.push(10000)
  }
  const wall = viewer.entities.add({
    name: 'wall',
    wall: {
      positions: Cesium.Cartesian3.fromDegreesArray(lineArr),
      minimumHeights: minimumHeights,
      material: getColorRamp('rgb(15,93,180)', 'rgba(52,192,214,0.5)')
    }
  })
}

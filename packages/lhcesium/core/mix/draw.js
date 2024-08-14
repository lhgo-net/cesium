import { EntityConfig, addEntity } from '../entity/config'

class Draw {
  constructor(viewer) {
    this.v = viewer
    this.depthTestAgainstTerrain = null

    this.activePoints = [] // 绘线，面坐标
    this.entitiesArr = [] // 界面实体
    this.callbackProperty = new Cesium.CallbackProperty(() => this.activePoints, false)
    // this.handlerEvent();
  }

  handlerEvent() {
    this.depthTestAgainstTerrain = this.v.scene.globe.depthTestAgainstTerrain
    this.v.scene.globe.depthTestAgainstTerrain = true // 开启地形深度检测
    let handler = new Cesium.ScreenSpaceEventHandler(this.v.canvas)

    handler.setInputAction((event) => {
      let position = this.v.scene.pickPosition(event.position) // pickPosition只在开启地形深度检测，且不使用默认地形时是准确的。
      if (Cesium.defined(position)) {
        if (this.activePoints.length === 0) {
          let config = {
            position,
            point: {
              ...EntityConfig.point,
              heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
              show: true
            }
          }
          let [, activePoint] = addEntity(this.v, config)
          this.entitiesArr.push(activePoint) // 记录活动点
          this.activePoints.push(position) // 记录线上第一个点位
          let [, activeLine] = this.addShape(this.callbackProperty)
          this.entitiesArr.push(activeLine)
        }
        this.activePoints.push(position) // 用于更新的点位
        let config = {
          position,
          point: {
            ...EntityConfig.point,
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            show: true
          }
        }
        let [, point] = addEntity(this.v, config)
        this.entitiesArr.push(point) // 记录第一个点
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

    handler.setInputAction((event) => {
      if (Cesium.defined(this.entitiesArr[0])) {
        let newPosition = this.v.scene.pickPosition(event.endPosition)
        if (Cesium.defined(newPosition)) {
          this.entitiesArr[0].position.setValue(newPosition)
          this.activePoints.pop()
          this.activePoints.push(newPosition)
        }
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)

    handler.setInputAction(() => {
      handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
      handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE)
      this.terminateShape(handler)
    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK) //双击鼠标事件结束
  }

  terminateShape(handler) {
    //   console.log(this.v.entities.values); // 活动点没有清除，最后一下以为打了一个点实际打了两个点

    //   console.log(this.activePoints); // 应该是三个 实际有5个 多余 倒数第二个是重复点 倒数第三个是活动点
    this.activePoints.splice(-3, 2)

    if (this.activePoints.length) {
      this.v.entities.remove(this.entitiesArr[1]) // 清除之前的
      ;[, this.entitiesArr[1]] = this.addShape(this.activePoints) // 绘制最终的
    }

    //   console.log(this.entitiesArr); // 应该是四个 实际六个 多余 第一个活动点 倒数第一个是重复点
    let activePoint = this.entitiesArr.shift()
    this.v.entities.remove(activePoint)
    let repeatPoint = this.entitiesArr.pop()
    this.v.entities.remove(repeatPoint)

    // console.log('this.v.entities.values', this.v.entities.values)
    // console.log('this.activePoints', this.activePoints) // 距离地球很远的时候，线段的中间点可能与实体点的点位有较大偏差，反之较小偏差
    // console.log('this.entitiesArr', this.entitiesArr)

    this.v.scene.globe.depthTestAgainstTerrain = this.depthTestAgainstTerrain
    handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
  }

  clear() {
    this.entitiesArr.forEach((entity) => {
      this.v.entities.remove(entity)
    })
    this.activePoints = []
    this.entitiesArr = []
  }
}

class DrawLine extends Draw {
  constructor(viewer) {
    super(viewer)
    this.handlerEvent()
  }

  addShape(positions) {
    let config = {
      polyline: {
        ...EntityConfig.polyline,
        clampToGround: true,
        positions
      }
    }
    return addEntity(this.v, config)
  }
}

class DrawCircle extends Draw {
  constructor(viewer) {
    super(viewer)
    this.handlerEvent()
  }

  addShape(positionData) {
    // 当positionData为数组时绘制最终图，如果为function则绘制动态图
    let value =
      typeof positionData.getValue === 'function' ? positionData.getValue(0) : positionData

    // 半径 两点间距离
    let dynamicRadius = new Cesium.CallbackProperty(() => {
      let r = Cesium.Cartesian3.distance(value[0], value[value.length - 1])
      return r ? r : r + 1
    }, false)

    let config = {
      position: this.activePoints[0],
      ellipse: {
        semiMinorAxis: dynamicRadius,
        semiMajorAxis: dynamicRadius,
        material: EntityConfig.ellipse.material
      }
    }

    return addEntity(this.v, config)
  }
}

class DrawRect extends Draw {
  constructor(viewer) {
    super(viewer)
    this.handlerEvent()
  }

  addShape(positionData) {
    // 当positionData为数组时绘制最终图，如果为function则绘制动态图
    let arr = typeof positionData.getValue === 'function' ? positionData.getValue(0) : positionData

    let coordinatesCallbackProperty = new Cesium.CallbackProperty(
      () => Cesium.Rectangle.fromCartesianArray(arr),
      false
    )
    let config = {
      rectangle: {
        coordinates: coordinatesCallbackProperty,
        material: EntityConfig.rectangle.material
      }
    }
    return addEntity(this.v, config)
  }
}

class DrawPolygon extends Draw {
  constructor(viewer) {
    super(viewer)
    this.callbackProperty = new Cesium.CallbackProperty(
      () => new Cesium.PolygonHierarchy(this.activePoints),
      false
    )
    this.handlerEvent()
  }

  addShape(positionData) {
    let config = {
      polygon: new Cesium.PolygonGraphics({
        hierarchy: positionData,
        material: Cesium.Color.WHITE.withAlpha(0.6),
        fill: true
      })
    }
    return addEntity(this.v, config)
  }
}

export { Draw, DrawLine, DrawCircle, DrawRect, DrawPolygon }

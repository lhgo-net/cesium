import PolylineFlowMaterialProperty from './MaterialProperty/PolylineFlowMaterialProperty'

export class FlowRoad {
  constructor(viewer, opt = {}) {
    this.viewer = viewer
    this.opt = {
      show: true,
      geojson: '/266000_MultiLineString.json',
      polyline: {
        clampToGround: true,
        width: new Cesium.ConstantProperty(2),
        material: {
          image: './assert/trail_green_yellow.png',
          duration: 1000
        }
      },
      ...opt
    }

    this.dataSource

    this.state = 'init'
  }

  draw() {
    let { show, geojson, polyline } = this.opt
    let material = new PolylineFlowMaterialProperty(polyline.material)

    let dataSourcePromise = Cesium.GeoJsonDataSource.load(geojson)
    dataSourcePromise.then((dataSource) => {
      dataSource.show = show
      this.viewer.dataSources.add(dataSource)
      this.dataSource = dataSource

      const entities = dataSource.entities.values
      for (let i = 0; i < entities.length; i++) {
        let entity = entities[i]
        entity.polyline.width = polyline.width
        entity.polyline.clampToGround = polyline.clampToGround

        entity.polyline.material = material
      }
      this.state = 'draw'
    })
  }

  flyTo() {
    if (this.dataSource) this.viewer.flyTo(this.dataSource)
  }

  hide() {
    this.changeShow(this.dataSource, false)
  }

  show() {
    this.changeShow(this.dataSource, true)
  }

  changeShow(dataSource, bool) {
    if (this.opt.show != bool) {
      dataSource.show = bool
      this.opt.show = bool
    }
  }

  clear() {
    this.viewer.dataSources.remove(this.dataSource)
    this.dataSource = undefined

    this.state = 'clear'
  }
}

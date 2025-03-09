import {initCanvas} from '../util/canvas/index'
import positionImage from '../../assets/image/position.png'
import blue from '../../assets/image/blue.png'
import green from '../../assets/image/green.png'
import red from '../../assets/image/red.png'
import yellow from '../../assets/image/yellow.png'
function Cluster(viewer, dataList) {
  const customData = new Cesium.CustomDataSource()
  dataList.forEach((item) => {
    customData.entities.add({
      position: Cesium.Cartesian3.fromDegrees(...item),
      billboard: {
        image: positionImage,
        scale: 0.2,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        disableDepthTestDistance: Number.POSITIVE_INFINITY
      }
    })
  })

  const dataSourcePromise = viewer.dataSources.add(customData)
  dataSourcePromise.then((dataSource) => {
    const pixelRange = 15
    const minimumClusterSize = 3
    const enabled = true

    dataSource.clustering.enabled = enabled
    dataSource.clustering.pixelRange = pixelRange
    dataSource.clustering.minimumClusterSize = minimumClusterSize

    dataSource.clustering.clusterEvent.addEventListener((clusteredEntities, cluster) => {
      cluster.label.show = false
      cluster.billboard.show = true
      cluster.billboard.id = cluster.label.id
      cluster.billboard.verticalOrigin = Cesium.VerticalOrigin.BOTTOM
      if (clusteredEntities.length >= 200) {
        cluster.billboard.image = imgAndText(red, '200+', 50)
      } else if (clusteredEntities.length >= 150) {
        cluster.billboard.image = imgAndText(yellow, '150+', 50)
      } else if (clusteredEntities.length >= 100) {
        cluster.billboard.image = imgAndText(green, '100+', 50)
      } else if (clusteredEntities.length >= 50) {
        cluster.billboard.image = imgAndText(blue, '50+', 50)
      }
    })
  })
}

async function imgAndText(url, text, size) {
  const [canvas, ctx] = initCanvas(size, size)
  console.log(canvas.width)
  const img = await new Cesium.Resource.fetchImage(url)
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

  ctx.fillStyle = Cesium.Color.WHITE.toCssColorString()
  ctx.font = 'bold 12px Microsoft YaHei'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, size / 2, size / 2)
  return canvas
}

export { Cluster }

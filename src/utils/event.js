import gz from '@/assets/json/广州市.json'
import { flat } from './utils'

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
        // if (lineArr.length == 0) {
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
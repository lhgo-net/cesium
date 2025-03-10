export class Camera {
  constructor(viewer) {
    this.viewer = viewer;
  }
  // 视角固定
  viewerFixed(
    _position = [115.0, 35.0, 10000.0],
    coordinates = [104.82, 26.58, 105.47, 26.21]
  ) {
    // 获取相机实例
    const camera = this.viewer.scene.camera;
    camera.setView({
      // 设置目标位置（经度、纬度、高度）
      destination: Cesium.Cartesian3.fromDegrees(..._position),
      orientation: {
        // 方向（航向角、俯仰角、翻滚角）
        heading: Cesium.Math.toRadians(90.0), // 航向角
        pitch: Cesium.Math.toRadians(-90.0), // 俯仰角
        roll: 0.0, // 翻滚角
      },
    });
    // 设置相机变化事件监听器
    camera.changed.addEventListener(function () {
      // 获取相机当前位置的经纬度和高度
      const position = camera.positionCartographic;
      const longitude = Cesium.Math.toDegrees(position.longitude);
      const latitude = Cesium.Math.toDegrees(position.latitude);
      if (
        longitude < coordinates[0] ||
        longitude > coordinates[3] ||
        latitude < coordinates[1] ||
        latitude > coordinates[4]
      ) {
        // 如果超出范围，将视图重置到指定位置
        camera.setView({
          destination: Cesium.Cartesian3.fromDegrees(..._position),
        });
      }
    });
  }
  /**
   * 使相机围绕指定的地理坐标点旋转。
   * @param {Number} lon - 旋转中心点的经度。
   * @param {Number} lat - 旋转中心点的纬度。
   * @param {Number} height - 相机距离旋转中心点的高度（米）。
   * @param {Number} speed - 旋转速度（度/秒）。
   */
  rotate(viewer, lon, lat, height) {
    var position = Cesium.Cartesian3.fromDegrees(lon, lat, height);
    var pitch = Cesium.Math.toRadians(-30);
    var angle = 360 / 30;
    var distance = 5000;
    var startTime = Cesium.JulianDate.fromDate(new Date());

    viewer.clock.startTime = startTime.clone();
    viewer.clock.currentTime = startTime.clone();
    viewer.clock.clockRange = Cesium.ClockRange.CLAMPED;
    viewer.clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK;
    var initialHeading = viewer.camera.heading;

    var Exection = function TimeExecution() {
      var delTime = Cesium.JulianDate.secondsDifference(
        viewer.clock.currentTime,
        viewer.clock.startTime
      );
      var heading = Cesium.Math.toRadians(delTime * angle) + initialHeading;
      viewer.scene.camera.setView({
        destination: position,
        orientation: {
          heading: heading,
          pitch: pitch,
        },
      });
      viewer.scene.camera.moveBackward(distance);

      if (
        Cesium.JulianDate.compare(
          viewer.clock.currentTime,
          viewer.clock.stopTime
        ) >= 0
      ) {
        viewer.clock.onTick.removeEventListener(Exection);
      }
    };

    viewer.clock.onTick.addEventListener(Exection);
  }

  //   rotate(viewer, lon, lat, height) {
  //     // 将经度、纬度和高度转换为笛卡尔坐标，作为旋转中心点
  //     var center = Cesium.Cartesian3.fromDegrees(lon, lat, height);

  //     // 设置相机的初始视图
  //     viewer.camera.setView({
  //       destination: center,
  //       orientation: {
  //         heading: 0.0,
  //         pitch: Cesium.Math.toRadians(-30.0), // 俯视角度
  //         roll: 0.0,
  //       },
  //     });

  //     // 旋转速度（每秒旋转角度），根据需要调整
  //     var rotateSpeed = Cesium.Math.toRadians(12); // 每秒旋转12度

  //     // 使用 Cesium 的时钟事件实现持续旋转
  //     viewer.clock.onTick.addEventListener(function (clock) {
  //       // 计算自上次更新以来的时间差（秒）
  //       var deltaTime = viewer.clock.deltaTime / 1000.0;

  //       // 更新相机的航向角
  //       var heading = viewer.camera.heading + rotateSpeed * deltaTime;

  //       // 计算新的相机位置
  //       var offset = new Cesium.HeadingPitchRange(
  //         heading,
  //         Cesium.Math.toRadians(-30.0),
  //         5000.0
  //       );
  //       viewer.camera.lookAt(center, offset);
  //     });
  //   }
}

export default { Camera };

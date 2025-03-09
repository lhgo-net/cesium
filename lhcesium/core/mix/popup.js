function popup(viewer, div, position) {
  const scene = viewer.scene;
  viewer.container.append(div);
  scene.postRender.addEventListener(() => {
    let windowCoord = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
      scene,
      Cesium.Cartesian3.fromDegrees(...position, 0)
    );
    let x = windowCoord.x + div.offsetWidth;
    let y = windowCoord.y - div.offsetHeight + 50;
    div.style.position = 'absolute'
    div.style.transform = `translate3d(${Math.round(x)}px,${Math.round(y)}px, 0)`

  });
}

export { popup };

function generateID() {
  return (
    new Date().getTime().toString(36) +
    "-" +
    Math.random().toString(36).substring(2, 8)
  );
}
export class Prompt {
  constructor(viewer, opt = {}) {
    this.viewer = viewer;
    this.opt = {};
    this.promptDiv = null;
    this.postRenderListener = null;

    this.init(opt);
  }

  init(opt) {
    let type = [1, 2].includes(opt.type) ? opt.type : 1; // 1位置变化提示框 / 2固定坐标提示框
    let isType2 = type == 2;
    let partialOpt = isType2
      ? {
          anchor: true, // 显隐锚点
          closeBtn: true, // 显隐关闭
          offset: { x: 0, y: -20 }, // x横坐标偏移 y纵坐标偏移 单位像素
        }
      : {
          anchor: false,
          closeBtn: false,
          offset: { x: 10, y: 10 },
        };
    let defaultOpt = {
      id: generateID(),
      type,
      content: "", // 弹窗内容
      show: true, // 显隐
      ...partialOpt,
      // className:"",
      // position: cartesian3 || {x:...,y:...} // 弹窗坐标，2固定坐标提示框生效，1位置变化提示框可不设
      // success:()=>{}, // 创建弹窗成功的回调
      // close:(e)=>{}, // 关闭弹窗时的回调
    };
    this.opt = { ...defaultOpt, ...opt };

    const anchorHtml = this.opt.anchor
      ? `<div class="prompt-anchor-container"><div class="prompt-anchor"></div></div>`
      : "";
    const closeHtml = this.opt.closeBtn
      ? `<a class="prompt-close" id="prompt-close-${this.opt.id}">x</a>`
      : ""; // 1位置变化提示框，默认不显示关闭按钮
    const promptConenet = `
    <!-- 文本内容 -->
    <div class="prompt-content-container">
        <div class="prompt-content" id="prompt-content-${this.opt.id}">
            ${this.opt.content}
        </div>
    </div>
    <!-- 锚Html -->
    ${anchorHtml}
    <!-- 关闭Html -->
    ${closeHtml}
    `;
    this.promptDiv = document.createElement("div");
    this.promptDiv.className = `prompt-container ${this.opt.className}`;
    this.promptDiv.id = `prompt-container-${this.opt.id}`;
    this.promptDiv.innerHTML = promptConenet;
    this.viewer.cesiumWidget.container.appendChild(this.promptDiv);
    const clsBtn = document.getElementById(`prompt-close-${this.opt.id}`);
    if (clsBtn)
      clsBtn.addEventListener("click", (e) => {
        this.setVisible(false);
        if (this.opt.close) this.opt.close(e);
      });

    if (type == 2) this.setPostRenderListener(); // 2固定坐标提示框，绑定实时定位。地球背面时，隐藏。
    if (this.opt.show == false) this.setVisible(false);
    if (this.opt.success) this.opt.success();
  }

  update(px, html) {
    if (px instanceof Cesium.Cartesian3) {
      this.opt.position = px.clone();
      px = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
        this.viewer.scene,
        px
      );
    }
    if (px) this.setPromptPositionByPX(px);
    if (html)
      document.getElementById(`prompt-content-${this.opt.id}`).innerHTML = html;
  }

  destroy() {
    if (this.postRenderListener)
      this.viewer.scene.postRender.removeEventListener(
        this.postRenderListener
      ) && (this.postRenderListener = null);

    if (this.promptDiv)
      this.viewer.cesiumWidget.container.removeChild(this.promptDiv) &&
        (this.promptDiv = null);
  }

  setPostRenderListener() {
    this.postRenderListener = () => {
      if (!this.opt.show && this.promptDiv)
        return (this.promptDiv.style.display = "none");
      if (!this.opt.position) return;

      let position;
      if (this.opt.position instanceof Cesium.Cartesian3) {
        position = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
          this.viewer.scene,
          this.opt.position
        );
        if (!position) return;

        const occluder = new Cesium.EllipsoidalOccluder(
          this.viewer.scene.globe.ellipsoid,
          this.viewer.scene.camera.position
        );
        const res = occluder.isPointVisible(this.opt.position); // 当前点位是否可见 是否在地球背面
        if (this.promptDiv)
          this.promptDiv.style.display = res ? "block" : "none";
      } else {
        position = this.opt.position;
      }
      this.setPromptPositionByPX({
        x: position.x,
        y: position.y,
      });
    };
    this.viewer.scene.postRender.addEventListener(this.postRenderListener);
  }

  setPromptPositionByPX(px) {
    if (!px) return;

    if (this.opt.type == 1) {
      this.promptDiv.style.left =
        Number(px.x) + Number(this.opt.offset.x || 0) + "px";
      this.promptDiv.style.top =
        Number(px.y) + Number(this.opt.offset.y || 0) + "px";
    } else {
      this.promptDiv.style.left =
        Number(px.x) +
        Number(this.opt.offset.x || 0) -
        Number(this.promptDiv.offsetWidth) / 2 +
        "px";
      this.promptDiv.style.top =
        Number(px.y) +
        Number(this.opt.offset.y || 0) -
        Number(this.promptDiv.offsetHeight) +
        "px";
    }
  }

  setVisible(isShow) {
    let isin = this.isInView(this.opt.position);
    if (isin && isShow) {
      this.opt.show = true;
      if (this.promptDiv) this.promptDiv.style.display = "block";
    } else {
      this.opt.show = false;
      if (this.promptDiv) this.promptDiv.style.display = "none";
    }
  }

  // 判断是否在当前视野内
  isInView() {
    if (!this.opt.position) return false;

    let px =
      this.opt.position instanceof Cesium.Cartesian2
        ? this.opt.position
        : Cesium.SceneTransforms.wgs84ToWindowCoordinates(
            this.viewer.scene,
            this.opt.position
          );
    const occluder = new Cesium.EllipsoidalOccluder(
      this.viewer.scene.globe.ellipsoid,
      this.viewer.scene.camera.position
    );
    const res = occluder.isPointVisible(this.opt.position); // 是否在地球背面
    let isin = false;
    if (!px) return isin;

    let { offsetWidth, offsetHeight, offsetLeft, offsetTop } =
      this.viewer.container;
    if (
      px.x > offsetLeft &&
      px.x < offsetLeft + offsetWidth &&
      px.y > offsetTop &&
      px.y < offsetTop + offsetHeight
    )
      isin = true;

    return res && isin;
  }
}

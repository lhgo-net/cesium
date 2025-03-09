<template>
  <div class="conainer-map" id="map"></div>
</template>

<script setup>
import { onMounted } from "vue";
import { Base } from "@lh/cesium";

const { init } = Base;
let viewer;
const flowLineWallImage =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAAgCAMAAABTlTDXAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURf////cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC/cLC02VhhwAAAD/dFJOUwABAgMEBQYHCAkKCwwNDg8QERITFBUWFxgZGhscHR4fICEiIyQlJicoKSorLC0uLzAxMjM0NTY3ODk6Ozw9Pj9AQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVpbXF1eX2BhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ent8fX5/gIGCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam5ydnp+goaKjpKWmp6ipqqusra6vsLGys7S1tre4ubq7vL2+v8DBwsPExcbHyMnKy8zNzs/Q0dLT1NXW19jZ2tvc3d7f4OHi4+Tl5ufo6err7O3u7/Dx8vP09fb3+Pn6+/z9/usI2TUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKcSURBVHhe7dIHNxUAAAbQV5G9k7032SMrI4QiopQoEYlIJBKJSCQSURERKdpRhIys7L333jMrWu9vdM53f8Ml/P1D9JvoF9HW1tbm5uZPoo2NjfX19bW1tdXV1ZWVlR8/lpeXl5aWFhcXFxbm5+fn5mZnZ2dmpqenp6YmJycmJsbHx8ZGR0dHRoaHh4YGBwcHBvr7+/p6e3t6uru7ujo7Ozra29vaWltbWpqbm5oaGxsa6uvr6mpra2qqq6uqvldWVlSUl5eVlZZ+KykpLi4qKiz8WlCQn5+X9yU3Nyfn8+dP2dlZWR8/fnj//t27t2/evH79KjMzI+Plixfp6c/T0lJTn6WkJCc/TUpKTHySkBAf//jRo4dxcbGxD2JioqPvR0Xdi4yMiLgbHn4nLCw09HZIyK3g4KCgm4GBAQE3/P2v+/n5+l7z8bnq7e3ldcXT87KHh7v7JTe3i66uLi4XnJ2dnM47Op5zcLC3P2tnZ2t7xsbm9OlT1tZWVictLU+cOG5hcezYUXNzM7MjpqYmJoeNjY2MDh06aGhoYKCvf0BPT1dXR2e/traWlqamhsY+dXU1NVVVFRVl5b1KSoqKCgry8nJysrIyMtLSUlKSknv2SEiIi4uJiYqKiAgLCwkJCgoI8PPz8fHy8vDwcHNzcXFycnBwsLOzsbGysrKw7N7NzMy8axcTExMjIwMDAz09HR0dLS0tDQ0NNTUVFRUlJSUFBQU5OTkZGdlOIlJSUhISkh1E24m2EREICIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACPAfBCAQ/gEwE9HyKCw2VwAAAABJRU5ErkJggg==";

const addBloomWallPrimitive = (viewer, opt = {}) => {
  let {
    positions,
    height = 75,
    color = new Cesium.Color.fromCssColorString("rgba(255, 255, 0, 1)"),
    speed = 0.5,
    image = flowLineWallImage,
  } = opt;
  if (!positions) return;
  let material = new Cesium.Material({
    fabric: {
      uniforms: {
        color,
        speed,
        image,
      },
      source: `
      czm_material czm_getMaterial(czm_materialInput materialInput) {
        czm_material material = czm_getDefaultMaterial(materialInput);
        vec2 st = materialInput.st;
        vec4 colorImage = texture(image, vec2(fract((st.t - speed * czm_frameNumber * 0.005)), st.t));
        vec4 fragColor;
        fragColor.rgb = color.rgb / 1.0;
        fragColor = czm_gammaCorrect(fragColor);
        material.alpha = colorImage.a;
        // material.alpha = colorImage.a * color.a;
        material.diffuse = color.rgb;
        // material.diffuse = (colorImage.rgb + color.rgb) / 2.0;
        material.emission = fragColor.rgb;
        return material;
    }
      `,
    },
    translucent: function () {
      return true;
    },
  });
  let wallInstance = new Cesium.GeometryInstance({
    geometry: Cesium.WallGeometry.fromConstantHeights({
      positions: Cesium.Cartesian3.fromDegreesArray(positions),
      maximumHeight: height,
    }),
  });
  let primitive = new Cesium.Primitive({
    geometryInstances: [wallInstance],
    appearance: new Cesium.MaterialAppearance({
      material,
    }),
  });
  viewer.scene.primitives.add(primitive);
  return primitive;
};
function flyHome(viewer, options = {}) {
  options = {
    center: [116.38889583805896, 39.911103086820084, 0],
    offset: {
      heading: 0,
      pitch: -45,
      range: 25e3,
    },
    duration: 0,
    ...options,
  };
  let center2 = Cesium.Cartesian3.fromDegrees(...options.center);
  let bounding = new Cesium.BoundingSphere(center2, 1);
  viewer.camera.flyToBoundingSphere(bounding, {
    offset: {
      heading: Cesium.Math.toRadians(options.offset.heading),
      pitch: Cesium.Math.toRadians(options.offset.pitch),
      range: options.offset.range,
    },
    duration: options.duration,
  });
}
onMounted(async () => {
  const v = await init("map");
  viewer = v.viewer;
  flyHome(viewer, {
    center: [116.3025, 39.9, 0],
    offset: {
      heading: 0,
      pitch: -80,
      range: 2500,
    },
  });
  addBloomWallPrimitive(viewer, {
    color: Cesium.Color.DARKSEAGREEN,
    positions: [
      116.288, 39.9, 116.293, 39.9, 116.293, 39.895, 116.288, 39.895, 116.288,
      39.9,
    ],
    speed: 0,
  });
});
</script>
<style scoped>
.conainer-map {
  position: relative;
}
.btn {
  position: absolute;
  z-index: 10;
}
</style>

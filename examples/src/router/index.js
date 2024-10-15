import { createRouter, createWebHistory } from "vue-router";
import CesiumView from "../views/cesium/indexView.vue";
import scenario from "../views/cesium/scenario-1/index.vue";
import scenario2 from "../views/cesium/scenario-2/index.vue";
import PhotoCapture from "../views/PhotoCapture.vue";
import { Tree } from "../config";

const dymRuter = (tree) => {
  const routes = [];

  // 检查 tree 是否为有效的数组
  if (!Array.isArray(tree)) {
    return routes; // 返回空数组，防止报错
  }

  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];

    if (node && node.children && Array.isArray(node.children)) {
      // 递归调用并将子树的结果合并到 routes
      routes.push(...dymRuter(node.children));
    } else {
      // 如果没有 children，添加到 routes
      routes.push(node);
    }
  }

  return routes;
};
const routes = dymRuter(Tree);
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_path),
  routes: [
    { path: "/", redirect: "/examples/init-earth" },
    {
      path: "/",
      name: "cesium",
      path: "/examples/",
      component: CesiumView,
      children: [],
    },
    {
      path: "/scene",
      name: "scene",
    },
    {
      path: "/scenario-2",
      name: "scenario-2",
      component: scenario2,
    },
    {
      path: "/PhotoCapture",
      name: "PhotoCapture",
      component: PhotoCapture,
    },
  ],
});

routes.forEach((item) => {
  router.addRoute(item.routerName, item);
  router.replace(router.currentRoute.value.fullPath);
});
export default router;

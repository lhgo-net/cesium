import { createRouter, createWebHistory } from "vue-router";
import loginIiew from '../views/user/login.vue'
import homeViewer from '../views/home/main.vue'
import demoViewer from '../views/home/demo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_path),
  routes: [
    { path: "/", redirect: "/login" },
    {
      name: "login",
      path: "/login",
      component: loginIiew,
    },
    {
      name: "home",
      path: "/home",
      component: homeViewer,
    },
    {
      name: "demo",
      path: "/demo",
      component: demoViewer,
    }
  ],
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.name !== 'login' && !token) {
    next({ name: 'login' })
  } else {
    next()
  }
})
export default router;

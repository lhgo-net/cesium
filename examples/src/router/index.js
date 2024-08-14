import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CesiumView from '../views/cesium/indexView.vue'
import scenario from '../views/cesium/scenario-1/weather.vue'
import scenario2 from '../views/cesium/scenario-2/scenario-2.vue'
import PhotoCapture from '../views/PhotoCapture.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: HomeView,
      children: [
        {
          path: '/',
          name: 'cesium',
          component: CesiumView
        }
      ]
    },
    {
      path: '/w',
      name: 'weather',
      component: scenario
    },
    {
      path: '/scenario-2',
      name: 'scenario-2',
      component: scenario2
    },
    {
      path: '/PhotoCapture',
      name: 'PhotoCapture',
      component: PhotoCapture
    }
  ]
})

export default router

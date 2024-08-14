import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import datav from '@kjgl77/datav-vue3'

import { install } from './plugins'
import './assets/main.css'
// import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'

// 将 Cesium 设置为全局对象

const app = createApp(App) 

app.use(createPinia())
app.use(router)
app.use(datav)
install(app)
// window.Cesium = Cesium


const components = import.meta.glob('./components/cesium/*.vue')

for (const path in components) {
  components[path]().then((mod) => {
    const componentName = path
      .split('/')
      .pop()
      .replace(/\.\w+$/, '')
    app.component(componentName, mod.default)
  })
}

app.mount('#app')

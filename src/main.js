import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import { menus } from './router/menu.js'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import * as Cesium from 'cesium'
import router from './router/index.js'
import { dynamic } from './router/router.js'
import { useMenuStore } from './store/menu.js'
import lMap from '@/components/map.vue'

window.Cesium = Cesium

const vuetify = createVuetify({
  components,
  directives,
  defaults: {},
  icons: {
    defaultSet: 'mdi'
  }
})
const pinia = createPinia()
const app = createApp(App)

app.component('lMap', lMap)

app.use(pinia)
app.use(router)
app.use(vuetify)
const routeStore = useMenuStore(pinia)
// const dynamicRoutes = fetchDynamicRoutes() // Implement your dynamic route fetching logic
routeStore.setDynamicRoutes(dynamic(menus))
app.mount('#app')

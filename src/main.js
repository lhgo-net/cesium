import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import * as Cesium from 'cesium'

import router from './router/index.js'

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
app.mount('#app')

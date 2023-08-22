import {
  createApp
} from 'vue'
import App from './App.vue'

import 'vuetify/styles'
import {
  createVuetify
} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

import router from './router/index.js'

const myCustomLightTheme = {
  dark: false,
  colors: {
    background: '#6200EE',
    surface: '#018786',
    primary: '#6200EE',
    'primary-darken-1': '#3700B3',
    secondary: '#03DAC6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
}
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark'
  },
  defaults: {

    // VSheet: {
    //   style: [{ coloo: '#ffffff', backgroundColor:'rgba(42, 42, 42, 0.8)'}]
    // },
    // vSelect: [{ color: '#ffffff', border: '2px solid #ffffff', backgroundColor:'#ffffff'}]
  },
  icons: {
    defaultSet: 'mdi',
  }
})
createApp(App).use(router).use(vuetify).mount('#app')
import { createApp } from 'vue'
import App from './App.vue'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  // defaults: {
  //   VSheet: {
  //     style: [{ border: '2px solid #ce836a', backgroundColor:'#0dbc79'}]
  //   }
  // }
})
createApp(App).use(vuetify).mount('#app')

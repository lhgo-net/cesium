import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { admin } from 'lhadmin'

const app = createApp(App)

app.use(admin)
app.use(createPinia())
app.use(router)

app.mount('#app')

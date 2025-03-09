import { createApp } from "vue";
import App from "./App.vue";
import DataVVue3  from '@kjgl77/datav-vue3';

import router from "./router";
import { install } from "./plugins";

const app = createApp(App);
app.use(DataVVue3);

install(app);

app.use(router);
app.mount("#app");

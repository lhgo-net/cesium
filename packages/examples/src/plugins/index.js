import { createVuetify } from "vuetify";
import { VTreeview } from "vuetify/labs/VTreeview";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components: {
    ...components,
    VTreeview,
  },
  directives,
  icons: {
    defaultSet: "mdi",
  },
  defaults: {},
});

export const install = (app) => {
  app.use(vuetify);
};

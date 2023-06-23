import { createApp } from "vue";
import App from "./App.vue";

import 'vue-toast-notification/dist/theme-sugar.css';

import BootstrapVue3 from "bootstrap-vue-3";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";

const app = createApp(App)
  .use(BootstrapVue3)
  .mount("#app");


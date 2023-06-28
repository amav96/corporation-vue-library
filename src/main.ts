import { createApp } from "vue";
import App from "./App.vue";

// import 'vue-toast-notification/dist/theme-sugar.css';
import 'assets/scss/index.scss'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import BootstrapVueNext from 'bootstrap-vue-next'

const app = createApp(App)
  .use(BootstrapVueNext)
  .mount("#app");


import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "tippy.js/dist/tippy.css";
import "vue-select/dist/vue-select.css";

import "./assets/base.css";

createApp(App).use(store).use(router).mount("#app");

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./assets/tailwind.css";

Vue.config.productionTip = false;

import "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-scss.min";
import "prismjs/plugins/autolinker/prism-autolinker.min";
import "prismjs/plugins/autolinker/prism-autolinker.css";

import "./assets/main.css";

import Prism from "vue-prism-component";
Vue.component("prism", Prism);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

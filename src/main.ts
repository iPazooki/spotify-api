import Vue from "vue";
import { BootstrapVue, ButtonPlugin, IconsPlugin } from "bootstrap-vue";
import buildDependencyContainer from "@/app.container";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

buildDependencyContainer();

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(ButtonPlugin)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
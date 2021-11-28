import Vue from "vue";
import buildDependencyContainer from "@/app.container";
import App from "./App.vue";
import router from "./router";
import store from "./store";

buildDependencyContainer();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// element-ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

// icon
import "@/assets/fonts/iconfont.css";

Vue.config.productionTip = false;

Vue.use(ElementUI);

// $bus
Vue.prototype.$bus = new Vue();

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

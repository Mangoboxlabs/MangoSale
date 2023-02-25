import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.min.css';
import ElementUI from 'element-ui';
import Antd from 'ant-design-vue';
import './theme/index.css';
import {eventBus} from "./utils/eventBus"
import "animate.css"
Vue.config.productionTip = false
Vue.prototype.$eventBus = eventBus
Vue.use(ElementUI);
Vue.use(Antd);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

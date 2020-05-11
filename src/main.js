import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import toast from './components/toast'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'


Vue.use(toast)
Vue.use(ElementUI);
Vue.prototype.$bus = new Vue();
FastClick.attach(document.body)
Vue.config.productionTip = false;

Vue.use(VueLazyLoad, {
  loading: require('./assets/img/default.png')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

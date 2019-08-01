import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import axios from 'axios';
import KHeader from "./components/Header.vue";
import interceptor from "@/http-interceptor";
import {createAPI} from 'cube-ui';
import Notice from './components/Notice.vue';
import notice from '@/service/notice';

Vue.config.productionTip = false

//全局引入
Vue.component('k-header',KHeader)

Vue.prototype.$http=axios;
Vue.prototype.$notice=notice;

//创建$createNotice API
createAPI(Vue,Notice,true);//参数三表示单例模式，全局只加一个

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

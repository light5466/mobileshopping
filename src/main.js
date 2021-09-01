import Vue from 'vue';
import App from './App.vue';
// 引入路由
import router from './router';
// 引入vuex
import store from './store';
// 引入axios
import api from './network/api';
Vue.prototype.$http = api  //挂载

// 引入过滤器
import filters from './utils/filter';
// 挨个绑定
for (let key in filters) {
  Vue.filter(key,filters[key])
}


// 引入vant ui组件库
import Vant from 'vant';
import 'vant/lib/index.css';
import { Lazyload } from 'vant';
Vue.use(Vant);
// 使用懒加载
Vue.use(Lazyload, {
  preLoad: 1,   //比例大小
  error: require('assets/img/error.jpg'),  //错误时加载的模块
  loading: require('assets/img/loading.jpg'),  //加载时加载的图片
  lazyComponent: true,  //是否能懒加载模块
  attempt: 1  //尝试次数
})



// 配置开发者模式
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

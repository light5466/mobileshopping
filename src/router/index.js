/* eslint-disable */

import Vue from 'vue';
import VueRouter from 'vue-router';
const home = () => import('views/Home.vue')
const buycar = () => import('views/Buycar.vue')
const mine = () => import('views/Mine.vue')
// const goodsDetail = () => import('views/GoodsDetail.vue')
// import goodsDetail from 'views/GoodsDetail.vue'

Vue.use(VueRouter);

const routes = [
  {
    path:'/', redirect:'/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: home,
    meta:{
      isShow : true,
      activeIndex : 0
    }
  },
  {
    path: '/buycar',
    name: 'Buycar',
    component: buycar,
    meta:{
      activeIndex : 1
    }
  },
  {
    path: '/mine',
    name: 'Mine',
    component: mine,
    meta:{
      isShow : true,
      activeIndex : 2
    }
  },
  // {
  //   path: '/goodsDetail',
  //   name: 'GoodsDetail',
  //   component: goodsDetail
  // }

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

/* eslint-enable */
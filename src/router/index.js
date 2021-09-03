/* eslint-disable */

import Vue from 'vue';
import VueRouter from 'vue-router';
const home = () => import('views/Home.vue')
const buycar = () => import('views/Buycar.vue')
const mine = () => import('views/Mine.vue')
const details = () => import('views/Details.vue')
// import goodsDetail from 'views/GoodsDetail.vue'
const search = () => import('views/Search.vue')
const location = () => import('views/Location.vue')
const login = () => import('views/Login.vue')
const myorder = () => import('views/Myorder.vue')
const myaddress = () => import('views/Myaddress.vue')
const mylikes = () => import('views/Mylikes.vue')
const mysetting = () => import('views/Mysetting.vue')
const updateimg = () => import('views/Updateimg.vue')
const updatepayp = () => import('views/Updatepayp.vue')
const updatenick = () => import('views/Updatenick.vue')
const updateloginp = () => import('views/Updateloginp.vue')
const updateaddress = () => import('views/Updateaddress.vue')
const orderdetail = () => import('views/Orderdetail.vue')


Vue.use(VueRouter);

const routes = [
  {
    path:'/', redirect:'/home'
  },
  // 首页
  {
    path: '/home',
    name: 'Home',
    component: home,
    meta:{
      showId : true,
      activeIndex : 0
    }
  },
  // 购物车
  {
    path: '/buycar',
    name: 'Buycar',
    component: buycar,
    meta:{
      activeIndex : 1
    }
  },
  // 我的
  {
    path: '/mine',
    name: 'Mine',
    component: mine,
    meta:{
      showId : true,
      activeIndex : 2
    }
  },
  // 详情页
  {
    path: '/details',
    name: 'Details',
    component: details,
    meta:{
      activeIndex : 0
    }
  },
  // 首页搜索页面
  {
    path: '/search',
    name: 'Search',
    component: search,
    meta:{
      activeIndex : 0
    }
  },
  // 首页选择定位
  {
    path: '/location',
    name: 'Location',
    component: location,
    meta:{
      activeIndex : 0
    }
  },
  // 登录页面
  {
    path: '/login',
    name: 'Login',
    component: login,
  },
  // 我的订单
  {
    path: '/myorder',
    name: 'myorder',
    component: myorder,
  },
  // 我的收获地址、
  {
    path: '/myaddress',
    name: 'Myaddress',
    component: myaddress,
  },
  // 用户设置
  {
    path: '/mysetting',
    name: 'Mysetting',
    component: mysetting,
  },
  // 我的收藏
  {
    path: '/mylikes',
    name: 'Mylikes',
    component: mylikes,
  },
  // 修改用户昵称、
  {
    path: '/updatenick',
    name: 'Updatenick',
    component: updatenick,
  },
  // 修改登录密码
  {
    path: '/updateloginp',
    name: 'Updateloginp',
    component: updateloginp,
  },
  // 修改登录密码
  {
    path: '/updatepayp',
    name: 'Updatepayp',
    component: updatepayp,
  },
  // 修改用户头像
  {
    path: '/updateimg',
    name: 'Updateimg',
    component: updateimg,
  },
  // 修改或添加收货地址
  {
    path: '/updateaddress',
    name: 'Updateaddress',
    component: updateaddress,
  },
  // 订单详情
  {
    path: '/orderdetail',
    name: 'Orderdetail',
    component: orderdetail,
  },
  
  

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

/* eslint-enable */
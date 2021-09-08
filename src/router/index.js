/* eslint-disable */

import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';

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
const orderok = () => import('views/Orderok.vue')
const addrescheck = () => import('views/Addrescheck.vue')
const success = () => import('views/Success.vue')

//解决跳转重定向报错的问题
const originalReplace = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalReplace.call(this, location).catch(err => err)
}

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
      activeIndex : 1,
      islogin:true
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
    meta:{
      islogin:true
    }
  },
  // 我的收获地址、
  {
    path: '/myaddress',
    name: 'Myaddress',
    component: myaddress,
    meta:{
      islogin:true
    }
  },
  // 用户设置
  {
    path: '/mysetting',
    name: 'Mysetting',
    component: mysetting,
    meta:{
      islogin:true
    }
  },
  // 我的收藏
  {
    path: '/mylikes',
    name: 'Mylikes',
    component: mylikes,
    meta:{
      islogin:true
    }
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
  // 确认订单
  {
    path: '/orderok',
    name: 'Orderok',
    component: orderok,
    meta:{
      islogin:true
    }
  },
  // addresscheck选择收获地址
  {
    path: '/addrescheck',
    name: 'Addrescheck',
    component: addrescheck,
  },
  // 成功页面
  {
    path: '/success',
    name: 'Success',
    component: success,
  },
  
  

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if(to.meta.islogin) {
    // 需要登录
    setTimeout(() => {
      if(store.getters.isLogin) {
          next('/login')
      }else {
        next()
      }
    }, 200);
  }else {
    next()
  }
})

export default router;

/* eslint-enable */
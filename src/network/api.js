import httpRequest from './request';

import Vue from 'vue';
import { VueJsonp } from 'vue-jsonp'    // 网上很多博客引用不加{}，会报错
Vue.use(VueJsonp)

export default {
    // home页面请求后台数据
    getPage(currentPage) {
        return httpRequest.request({
            url: '/product/pagination', 
            method: 'get', 
            params: { page:currentPage, size: 10 }
        })
    },
    // 搜索请求
    getSearch(key) {
        return httpRequest.request({
            url: '/product/pagination', 
            method: 'get', 
            params: { page:1, size: 10,key:key }
        })
    },
    // 请求商品详情
    getGoodsDetails(gid) {
        return httpRequest.request({
            url: '/product', 
            method: 'get', 
            params: { id:gid }
        })
    },
    // 获取城市列表
    getCitys(){
        return httpRequest.request({
            url: '/data/city', 
            method: 'get', 
        })
    },
    // 请求地址
    getLocation() {
        // console.dir(Vue.prototype.$jsonp)
        return Vue.prototype.$jsonp('http://api.map.baidu.com/geocoder/v2/?ak=C93b5178d7a8ebdb830b9b557abce78b&callback=renderReverse&location=22.62,114.07&output=json&pois=0')
    },
    // 登录请求
    toLogiin(username,password) {
        return httpRequest.request({
            url:'/user/signin',
            method:'post',
            data: {
                name: username,
                password: password
            }
        })
    },
    // 获取用户信息
    getUserInfo() {
        return httpRequest.request({
            url:'/user/info',
            method:'get',
            // 需要登录
        })
    },
    // 注销
    getSignOut() {
        return httpRequest.request({
            url:'/user/signout',
            method:'get',
            // 需要登录
        })
    },
    // /user/avatar 获取用户头像
    setAvatar(data) {
        return httpRequest.request({
            url:'/user/avatar',
            method:'post',
            data:{
                // 需要修改
                avatar:data
            }
            // 需要登录
        })
    },
    // 新增收获地址
    addAddress(obj) {
        return httpRequest.request({
            url:'/user_address/create',
            method:'post',
            data:{
                name:obj.name,
                province:obj.province, 
                city: obj.city,
                country:obj.country,
                detail: obj.detail,
                mobile: obj.mobile,
                code:obj.code,
                default:obj.default || 0,
            }
            // 需要登录
        })
    },
    // 修改收货地址
    updateAddress(obj) {
        return httpRequest.request({
            url:'/user_address/update?id='+obj.id,
            method:'post',
            data:{
                name:obj.name,
                province:obj.province, 
                city: obj.city,
                country:obj.country,
                detail: obj.detail,
                mobile: obj.mobile,
                code:obj.code,
                default:obj.default || 0,
            }
            // 需要登录 需要传递一个收货地址id
        })
    },
    // 删除用户收获地址
    deleteAddress(id) {
        return httpRequest.request({
            url:'/user_address/delete',
            method:'get',
            params:{
                id : id
            }
            // 需要登录 需要传递一个收货地址id
        })
    },
    // 获取地区列表
    getArea() {
        return httpRequest.request({
            url: '/data/area', 
            method: 'get', 
        })
    },
    // 获取收藏列表、
    getLikes() {
        return httpRequest.request({
            url: '/product_like/all', 
            method: 'get', 
        })
    },
    // 修改用户基本信息
    updateSetting(name) {
        return httpRequest.request({
            url: '/user/setting', 
            method: 'post',
            data:{
                nickname: name
            } 
        })
    },
    // 修改用户登录密码
    updatePassword(oldp,newp) {
        return httpRequest.request({
            url: '/user/updatePassword', 
            method: 'post',
            data:{
                password:oldp,
                newPassword:newp
            } 
        })
    },
    // 修改用户支付密码
    updatePayPassword(oldp,newp) {
        return httpRequest.request({
            url: '/user/updatePayPassword', 
            method: 'post',
            data:{
                password:oldp,
                newPassword:newp
            } 
        })
    },

    // 点击收藏
    addLikes(id) {
        return httpRequest.request({
            url: '/product_like/create', 
            method: 'post',
            data:{
                product_id:id
            } 
        })
    },
    // 取消收藏
    deleteLikes(id) {
        return httpRequest.request({
            url: '/product_like/delete', 
            method: 'get',
            params:{
                product_id:id
            } 
        })
    },
    // 获取商品分类列表
    getCategory(){
        return httpRequest.request({
            url: '/category/all', 
            method: 'get'
        })
    },

    // 购物车相关
    // 获取购物车列表
    getCarList() {
        return httpRequest.request({
            url: '/cart/all', 
            method: 'get'
        })
    },
    // 批量更新购物车
    updateCarLists(cart,id,count) {
        return httpRequest.request({
            url: '/cart/cacheUpdate', 
            method: 'post',
            data:{
                cart:cart, //购物车数组数组里面对象：
                product_id:id,     //商品id
                count:count    //购买数量
            } 
        })
    },
     // 单个商品更新购物车
     updateCarList(id,count=1,checked=1) {
        return httpRequest.request({
            url: '/cart/update', 
            method: 'post',
            data:{
                product_id:id,    //商品id
                count:count,      //:购买数量，如果不传，数量就默认加1，
                checked:checked      //：1选中 0 不选中
            } 
        })
    },
    // 删除购物车商品
    deleteCarList(id) {
        return httpRequest.request({
            url: '/cart/delete', 
            method: 'get',
            params:{
                product_id:id,    //商品id
            } 
        })
    },

    // 订单接口相关
    // 付款   ?????
    payOrder(password,id) {
        return httpRequest.request({
            url: '/order/pay?order_id='+id, 
            method: 'post',
            data:{
                pay_password:password   //:支付密码
            } 
        })
    },
    // 获取订单
    getOrder(id) {
        return httpRequest.request({
            url: '/order', 
            method: 'get',
            params:{
                id:id,    //商品id
            } 
        })
    },
    // 下单
    addOrder(obj,aid) {
        return httpRequest.request({
            url: '/order/create', 
            method: 'post',
            data:{
                orderProductList:obj,      //：订单商品列表列表里面的对象格式如下：
                //{"product_id":37364,"name":"黑鲨游戏手机 2","price":2699,"cover":"/www4/upload/1566020597689.webp","count":1}
                user_address_id:aid      //：用户收货地址id
            } 
        })
    },
    // 订单分页与搜索
    getOrderPage(page=1) {
        return httpRequest.request({
            url: '/order/pagination', 
            method: 'get',
            params:{
                page:page,     //：当前第几页，默认为1
                size:10         //：每页显示商品数量，默认为10
            } 
        })
    }

}
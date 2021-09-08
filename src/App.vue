<template>
  <div id="app">
    <!-- 路由插槽 -->
    <router-view/>

    <!-- 底部tabbar栏 -->
    <van-tabbar v-model="activeIndex" active-color="#0ef8e1" inactive-color="#000" v-show='showId' class="tab">
      <van-tabbar-item icon="star" to='/home'>精选</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart" to='/buycar'>购物车</van-tabbar-item>
      <van-tabbar-item icon="manager" to='/mine'>我的</van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  name : 'App',
  data() {
    return {
     
    }
  },
  created() {
    // 请求地址信息
    this.$http.getLocation().then(data => {
      this.changeCitym(data.result.addressComponent.city)
    })
     // 请求用户信息
    this.$http.getUserInfo().then(data => {
      // console.log(data)
      if (data.data.errcode == 90101) return
      this.changeUserInfom(data.data.data)
    })
  },
  methods: {
       ...mapActions(['changeCitym','changeUserInfom']),
  },
  computed:{

    // 设置点击tabbar的序列号
    activeIndex:{
      get(){
        return +this.$route.meta.activeIndex
      },
      set(newValue){

      }
    },
    // 获取显示属性
    showId() {
      return this.$route.meta.showId
    }
  }
}
</script>

<style lang="less">
@import 'assets/css/base.css';
  .tab{
    border-top: 1px solid rgba(222,222,222,.6);
  }
  .main button.van-button--danger{
            background-color: #0ef8e1;
            border: none;
        }
</style>

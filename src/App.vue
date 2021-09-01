<template>
  <div id="app">
    <!-- 路由插槽 -->
    <router-view/>

    <!-- 底部tabbar栏 -->
    <van-tabbar v-model="activeIndex" active-color="#0ef8e1" inactive-color="#000" v-show='activeIndex != 1' class="tab">
      <van-tabbar-item icon="star" to='/home'>精选</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart" to='/buycar'>购物车</van-tabbar-item>
      <van-tabbar-item icon="manager" to='/mine'>我的</van-tabbar-item>
    </van-tabbar>
    
  </div>
</template>

<script>
export default {
  name : 'App',
  data() {
    return {
     
    }
  },
  methods: {
    
  },
  created() {
    
  },
  computed:{

    // 设置点击tabbar的序列号
    activeIndex:{
      get(){
        return +this.$route.meta.activeIndex
      },
      set(newValue){

      }
    }
  }
}
</script>

<style lang="less">
@import 'assets/css/base.css';
  .tab{
    border-top: 1px solid rgba(222,222,222,.6);
  }
</style>

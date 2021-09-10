<template>
  <div class="mine">
    <!-- 头部区域 -->
    <div class="header">
      <template v-if="JSON.stringify(userInfo) != '{}'">
        <div class="myImg">
          <img v-lazy="'http://192.168.0.8:8360'+userInfo.avatar" alt="" class="userImg1">
        </div>
        <a href="#" class="login" >{{userInfo.nickname}}</a>
      </template>
      <template v-else>
        <div class="myImg">
          <img src="~assets/img/error.jpg" alt="" class="userImg1" @click="toLogin">
        </div>
        <a href="#" class="login" @click.prevent="toLogin">LOGIN</a>
      </template>

    </div>

    <!-- 控制区域 -->
    <van-grid>
      <van-grid-item icon="column" text="待付款" />
      <van-grid-item icon="label" text="待收货" />
      <van-grid-item icon="todo-list" text="已发货"/>
      <van-grid-item icon="gift-card" text="已完成" />
    </van-grid>

    <div class="nav">
      <van-cell icon="balance-list" title="我的订单" is-link to="/myorder" />
      <van-cell icon="like" title="我的收藏" is-link to="/mylikes" />
      <van-cell icon="coupon" title="收货地址" is-link to="/myaddress" />
      <van-cell icon="graphic" title="用户设置" is-link to="/mysetting" />
    </div>

  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name : 'Mine',
  data() {
    return {
      
    }
  },
  created() {
  },
  methods: {
    toLogin() {
      this.$router.push('/login')
    }
  },
  computed: {
    // 取出数据
    ...mapState(['userInfo'])
  }
}
</script>

<style lang='less' scoped>
.mine {
  /* 头部区域 */
  .header {
      width: 100%;
      height: 100px;
      background-color: #0ef8e1;
      line-height: 100px;
      position: relative;
      .myImg {
          position: absolute;
          top: 20px;
          left: 20px;
          width: 60px;
          height: 60px;
          text-align: center;
          line-height: 60px;
          border-radius: 50%;
          border: 1px solid #eee;
      }
      .myImg img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
      }
      .login {
          position: absolute;
          left: 100px;
          color: #fff;
          font-size: 20px;
          color: rgba(111, 111, 111, .8);
          font-weight: 700;
      }
  }
  .nav {
    margin-top: 16px;
  }


}
</style>
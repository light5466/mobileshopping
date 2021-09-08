<template>
  <div class="login">
      <!-- 头部 -->
        <van-nav-bar title="登录/注册" :fixed='true' @click-left='$router.back()'>
        <template #left >
            <van-icon name="arrow-left" color='#0ef8e1' size="20" />
            <span style="color:#0ef8e1">返回</span>
        </template>
        </van-nav-bar>
      <!-- 登录表单 -->
      <div class="loginList">
          <h3>用户登录</h3>
        <van-form @submit="onSubmit">
            <van-field
                v-model="username"
                name="username"
                label="用户名"
                placeholder="请输入用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="password"
                label="密码"
                placeholder="请输入密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit" style="backgroundColor:#0ef8e1;border:none">登录</van-button>
            </div>
            </van-form>
        </div>

  </div>
</template>

<script>
import {mapActions} from 'vuex';
export default {
    name: 'Login',
    data() {
        return {
           username: '',
           password: '', 
        }
    },
    methods: {
        ...mapActions(['changeUserInfom']),
        // 提交登录
        onSubmit(values) {
            // console.log('submit', values);
            this.$http.toLogiin(values.username,values.password).then(data => {
                if(data.data.errcode == 90102) {
                    this.$toast(data.data.errmsg)
                }
                if(data.data.errcode == 0) {
                    // console.log(data.data)
                    // 保存token
                sessionStorage.setItem('token',data.data.data.token)
                    // 保存至vuex
                    this.changeUserInfom(data.data.data)
                    this.$router.push('/mine')
                }

            })
        },
    },
}
</script>

<style lang='less' scoped>
    .login{
        .loginList {
            margin-top: 50px;
            h3{
                text-align: center;
                line-height: 100px;
                font-size: 30px;
                color: rgba(111, 111, 111, .5);
                font-weight: 600;
                text-shadow: 2px 3px 2px rgba(73, 250, 235, 0.5);
            }
        }
    }
</style>
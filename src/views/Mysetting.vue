<template>
  <div class="setting">
                  <!-- 头部 -->
        <van-nav-bar title="用户设置" :fixed='true' @click-left='$router.back()'>
        <template #left >
            <van-icon name="arrow-left" color='#0ef8e1' size="20" />
            <span style="color:#0ef8e1">返回</span>
        </template>
        </van-nav-bar>

        <main class="main">
            <p class="titles">基本信息</p>
            <van-cell icon='manager' title="修改昵称" is-link to="/updatenick"/>
            <van-cell icon='photograph' title="修改头像" is-link to="/updateimg"/>
            <p class="titles">安全信息</p>
            <van-cell icon='youzan-shield' title="修改登录密码" is-link to="/updateloginp"/>
            <van-cell icon='card' title="修改支付密码" is-link to="/updatepayp"/>

            <div class="bc">
                <van-button round type="danger" block @click="signOut">退出登录</van-button>
            </div>
            
        </main>

  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
    name : 'Mysetting',
    data() {
        return {
            
        }
    },
    methods: {
        ...mapMutations(['changeUserInfo']),
        signOut(){
            sessionStorage.removeItem("token")
            this.changeUserInfo({})
            this.$router.push('/mine')
            // this.$http.getSignOut().then(data => {
            //     console.log(data)
                
            // })  
        },
    },
}
</script>

<style lang='less' scoped>
    .main{
        margin-top: 46px;
        height: calc(100vh - 46px);
        overflow: scroll;
        .titles{
            color: #999;
            font-size: 14px;
            padding-left: 10px;
            line-height: 30px;
        }
        .bc {
            width: 100vw;
            margin-top: 50px;
        }
    }
</style>
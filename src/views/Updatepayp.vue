<template>
  <div class="updatepayp">
                  <!-- 头部 -->
        <van-nav-bar title="修改支付密码" :fixed='true' @click-left='$router.back()'>
        <template #left >
            <van-icon name="arrow-left" color='#0ef8e1' size="20" />
            <span style="color:#0ef8e1">返回</span>
        </template>
        </van-nav-bar>

        <main class="main">
             <h3>UPDATE PAY PASSWORD</h3>
        <van-form @submit="onSubmit">
            <van-field
                v-model="oldPassword"
                name="oldPassword"
                label="旧密码"
                placeholder="请输入旧密码"
                :rules="[{ required: true, message: '请填写旧密码' }]"
            />
            <van-field
                v-model="newPassword"
                type="password"
                name="newPassword"
                label="新密码"
                placeholder="请输入新密码"
                :rules="[{ required: true, message: '请填写新密码' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit" style="backgroundColor:#0ef8e1;border:none">确认修改</van-button>
            </div>
            </van-form>
        </main>

  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
    name : 'Updatepayp',
    data() {
        return {
            oldPassword:'',
            newPassword:''
        }
    },
    methods: {
         ...mapActions(['changeUserInfom']),
        onSubmit() {
            if(this.oldPassword == this.newPassword) {
                this.$toast('新密码不能和旧密码相同')
                this.newPassword = ''
            }
            if(this.oldPassword != this.userInfo.pay_password) {
                this.$toast('原始密码输入错误')
                this.newPassword = this.oldPassword = ''
            }else {  
                this.$http.updatePayPassword(this.oldPassword,this.newPassword).then ()
                // 请求用户信息 修改vuex中的数据
                this.$http.getUserInfo().then(data => {
                    this.changeUserInfom(data.data.data)
                    this.$toast('修改成功')
                })
                this.newPassword = this.oldPassword = ''
                
            }
        }
    },
    computed:{
        ...mapState(['userInfo'])
    }
}
</script>

<style lang='less' scoped>
    .main{
        margin-top: 46px;
        height: calc(100vh - 46px);
        overflow: scroll;
        h3{
            text-align: center;
            line-height: 100px;
            font-size: 22px;
            color: rgba(111, 111, 111, .5);
            font-weight: 600;
            text-shadow: 2px 3px 2px rgba(73, 250, 235, 0.5);
        }
    }
</style>
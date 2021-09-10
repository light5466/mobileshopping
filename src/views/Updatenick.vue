<template>
  <div class="updatenick">
                  <!-- 头部 -->
        <van-nav-bar title="修改昵称" :fixed='true' @click-left='$router.back()'>
        <template #left >
            <van-icon name="arrow-left" color='#0ef8e1' size="20" />
            <span style="color:#0ef8e1">返回</span>
        </template>
        </van-nav-bar>

        <main class="main">
            <h3>UPDATE NICKNAME</h3>
            <van-form @submit="onSubmit">
                <van-field
                    v-model="newName"
                    name="新昵称"
                    label="新昵称"
                    placeholder="请输入新昵称"
                    :rules="[{ required: true, message: '请填写新昵称' }]"
                />
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit" style="backgroundColor:#0ef8e1;border:none">确认修改</van-button>
                </div>
            </van-form>
        </main>

  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name : 'Updatenick',
    data() {
        return {
            newName:''
        }
    },
    methods: {
        ...mapActions(['changeUserInfom']),
        onSubmit() {
            this.$http.updateSetting(this.newName).then (data => {  
                this.newName = ''
                  // 请求用户信息 修改vuex中的数据
                this.$http.getUserInfo().then(data => {
                    this.changeUserInfom(data.data.data)
                    this.$toast('修改成功！')
                    this.$router.replace('/mine')
                })
            })
        }
    },
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
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
            <h3>UPDATE AVATAR</h3>
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
export default {
    name : 'Updatenick',
    data() {
        return {
            newName:''
        }
    },
    methods: {
        onSubmit() {
            console.log('name')
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
        }
    }
</style>
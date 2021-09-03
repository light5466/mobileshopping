<template>
  <div class="orderdetail">
                <!-- 头部 -->
        <van-nav-bar title="订单详情" :fixed='true' @click-left='$router.back()'>
        <template #left >
            <van-icon name="arrow-left" color='#0ef8e1' size="20" />
            <span style="color:#0ef8e1">返回</span>
        </template>
        </van-nav-bar>

        <main class="main">
            <!-- 步骤七 -->
            <van-steps :active="active">
                <van-step>未付款</van-step>
                <van-step>已付款</van-step>
                <van-step>已发货</van-step>
                <van-step>已完成</van-step>
            </van-steps>

            <!-- 地址栏 -->
            <van-cell title="姓名：123333333333" label="详细地址" />

            <!-- 订单商品 -->
            <van-row>
                <van-col span="6">
                    <img src="~assets/img/error.jpg" style="width:80px; height:80px; padding:8px" alt="">
                </van-col>
                <van-col span="18">
                    <van-cell title="商品名称" value='X3' label="描述信息232423423423423423432432423" @click="toDetail()"/>
                </van-col>
            </van-row>

        </main>

  </div>
</template>

<script>
export default {
    name : 'Orderdetail',
    data() {
        return {
            active:1,
        }
    },
    methods: {
        toDetail(){
            console.log('去详情页')
        }
    },
}
</script>

<style lang='less' scoped>
    .main{
        margin-top: 46px;
        height: calc(100vh - 46px);
        overflow: scroll;

    }
</style>
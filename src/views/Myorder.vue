<template>
  <div class="order">
                  <!-- 头部 -->
        <van-nav-bar title="我的订单" :fixed='true' @click-left='$router.back()'>
        <template #left >
            <van-icon name="arrow-left" color='#0ef8e1' size="20" />
            <span style="color:#0ef8e1">返回</span>
        </template>
        </van-nav-bar>

        <main class="main">
            <van-cell title="订单号" is-link @click="toOrderInfo()" />
            <van-row>
                <van-col span="6">
                    <img src="~assets/img/error.jpg" style="width:80px; height:80px; padding:8px" alt="">
                </van-col>
                <van-col span="18">
                    <van-cell title="商品名称" is-link label="描述信息232423423423423423432432423" @click="toDetail()"/>
                </van-col>
            </van-row>
            <van-row>
                <van-col span="6">
                    <img src="~assets/img/error.jpg" style="width:80px; height:80px; padding:8px" alt="">
                </van-col>
                <van-col span="18">
                    <van-cell title="商品名称" is-link label="描述信息232423423423423423432432423" @click="toDetail()"/>
                </van-col>
            </van-row>
            
        </main>
        
  </div>
</template>

<script>
export default {
    name : 'Myorder',
    data() {
        return {
            
        }
    },
    methods: {
        //跳转订单详情
        toOrderInfo() {
            this.$router.push({
                path:'/orderdetail',
                // query:{order}
            })
            console.log('123')
        },
        // 点击跳转至详情
        toDetail() {
            console.log('详情页')
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
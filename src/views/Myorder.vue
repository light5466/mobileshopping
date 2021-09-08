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
            <div v-for="item in lists" :key="item.id">
                <van-cell :title="'订单号:'+item.id" is-link @click="toOrderInfo(item.id)" />
                <van-row v-for="info in item.orderProducts" :key="info.id">
                    <van-col span="6">
                        <img v-lazy="info.cover" style="width:80px; height:80px; padding:8px" alt="">
                    </van-col>
                    <van-col span="18">
                        <van-cell :title="info.name.split(' ')[0]" is-link :label="info.name" @click="toDetail(info.id)"/>
                    </van-col>
                </van-row>
            </div>

        </main>
        
  </div>
</template>

<script>
export default {
    name : 'Myorder',
    data() {
        return {
            lists:[],
        }
    },
    created() {
        // 获取订单详情
        this.getOrder()
    },
    methods: {
        // 获取订单详情
        getOrder(){
            this.$http.getOrderPage().then (data => {
                // 渲染
                // console.log(data.data.data.data)
                this.lists = data.data.data.data
            })
        },
        //跳转订单详情
        toOrderInfo(did) {
            this.$router.push({
                path:'/orderdetail',
                query:{orderid:did}
            })
        },
        // 点击跳转至详情
        toDetail(id) {
            this.$router.push({
                path:'/details',
                query:{gid:id}
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
    }
</style>
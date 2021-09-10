<template>
  <div class="order">
                  <!-- 头部 -->
        <van-nav-bar title="我的订单" :fixed='true' @click-left="$router.push('/mine')">
        <template #left >
            <van-icon name="arrow-left" color='#0ef8e1' size="20" />
            <span style="color:#0ef8e1">返回</span>
        </template>
        </van-nav-bar>

        <main class="main">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <div v-if="lists.length > 0">
                    <div v-for="item in lists" :key="item.id" class="items" v-show="item.orderProducts.length > 0">
                        <van-cell :title="'订单号:'+item.id" is-link @click="toOrderInfo(item.id)" :value="item.order_status==0?'未支付':'已支付'"/>
                        <van-row v-for="info in item.orderProducts" :key="info.id">
                            <van-col span="6">
                                <img v-lazy="info.cover" style="width:80px; height:80px; padding:8px" alt="">
                            </van-col>
                            <van-col span="18">
                                <van-cell :title="info.name.split(' ')[0]" is-link :label="info.name" @click="toDetail(info.id)"/>
                            </van-col>
                        </van-row>
                    </div>
                </div>
                <div class="error" v-else>
                    订单列表为空哦<br>
                    <h3 @click="toG">去购买一些商品吧</h3>
                </div>
            </van-pull-refresh>
        </main>
        
  </div>
</template>

<script>
export default {
    name : 'Myorder',
    data() {
        return {
            lists:[],
            isLoading: false,
        }
    },
    created() {
        // 获取订单详情
        this.getOrder()
    },
    methods: {
        // 下拉刷新
        onRefresh() {
            setTimeout(() => {
                this.$toast('刷新成功');
                this.isLoading = false;
            }, 1000);
        },
        toG() {
            this.$router.replace('/home')
        },
        // 获取订单详情
        getOrder(){
            this.$http.getOrderPage().then (data => {
                // 渲染
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
        .items{
            margin-top: 8px;
        }
        .error{
            text-align: center;
            padding-top: 100px;
            h3 {
                color: #0ef8e1;
                font-size: 20px;
            }
        }
    }
</style>
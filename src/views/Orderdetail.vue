<template>
  <div class="orderdetail">
                <!-- 头部 -->
        <van-nav-bar title="订单详情" :fixed='true' @click-left="$router.push('/myorder')">
        <template #left >
            <van-icon name="arrow-left" color='#0ef8e1' size="20" />
            <span style="color:#0ef8e1">返回</span>
        </template>
        </van-nav-bar>

        <main class="main">
            <!-- 步骤七 -->
            <van-steps :active="status">
                <van-step>未付款</van-step>
                <van-step>已付款</van-step>
                <van-step>已发货</van-step>
                <van-step>已完成</van-step>
            </van-steps>

            <van-cell :title="addr.name +' '+addr.mobile" 
            :label="addr.province+' '+addr.city+' '+addr.country+' '+addr.detail" />

            <!-- 订单商品 -->
            <van-row v-for="item in orderinfo" :key="item.id">
                <van-col span="6">
                    <img v-lazy="item.cover" style="width:80px; height:80px; padding:8px" alt="#">
                </van-col>
                <van-col span="18">
                    <van-cell :title="item.name.substring(0,6)" :value="'X'+item.count" :label="item.name" />
                </van-col>
            </van-row>

        </main>

        <!-- 结尾款项 -->
        <footer>
            <div class="fleft">
                <span>合计：</span><span style="color:red">{{totalPriceD | priceFilter}}</span>
            </div>
            <button class="fright" @click="topay" v-if="status == 0">付款</button>
            <button class="fright1" v-else>请等待发货</button>
        </footer>

        <!-- 支付密码框 -->
        <pay-keyword :cid='cid' ref="passw"></pay-keyword>

  </div>
</template>

<script>
import PayKeyword from '../components/PayKeyword.vue';
export default {
    name : 'Orderdetail',
    data() {
        return {
            orderinfo:[],
            cid:'',
            addr:{},
            status:''
        }
    },
    components:{
        PayKeyword
    },
    created() {
        this.getOrder()
    },
    methods: {
        async getOrder(){
            let {data} = await this.$http.getOrder(this.$route.query.orderid)
            if(data.errcode != 0 ) {
                this.$toast(data.errmsg)
                this.$router.replace('myorder')
                return 
            }
            data.data.orderProducts.forEach((item,index) => {
                item.id = index
            })
            this.orderinfo = data.data.orderProducts
            this.addr = data.data.userAddress
            this.status = data.data.order_status

        },
        // 付款
        topay() {
            this.cid = this.$route.query.orderid
            // 偏方弹出密码框
            this.$refs.passw.show = true
        }
    },
    computed:{
        totalPriceD: {
            get(){
                return this.orderinfo.reduce((pre,item) => {
                    return pre + item.count*item.price
                },0)
            },
            set(newValue){

            }
        }
    }
}
</script>

<style lang='less' scoped>
    .main{
        margin-top: 46px;
        height: calc(100vh - 46px);
        overflow: scroll;

    }
    footer{
        width: 100vw;
        height: 50px;
        position: fixed;
        bottom: 0px;
        left: 0px;
        border-top: 1px solid #eee;
        .fleft {
            float: left;
            line-height: 50px;
            margin-left: 20px;
            font-size: 16px;
        }
        .fright {
            float: right;
            margin-right: 20px;
            width: 80px;
            height: 40px;
            border: none;
            margin-top: 5px;
            line-height: 40px;
            text-align: center;
            color: #555;
            background-color: #0ef8e1;
            border-radius: 8px;
        }
        .fright1 {
            float: right;
            margin-right: 20px;
            width: 90px;
            height: 40px;
            border: none;
            margin-top: 5px;
            line-height: 40px;
            text-align: center;
            color: #eee;
            background-color: #999;
            border-radius: 8px;
        }
    }

</style>
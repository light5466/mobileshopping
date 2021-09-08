<template>
  <div class="orderok">
                <!-- 头部 -->
        <van-nav-bar title="订单确认" :fixed='true' @click-left="$router.back()">
        <template #left >
            <van-icon name="arrow-left" color='#0ef8e1' size="20" />
            <span style="color:#0ef8e1">返回</span>
        </template>
        </van-nav-bar>

        <main class="main">

            <!-- 地址栏 -->   
            <div class="cona" v-if="isA">
                <van-cell :title="getAddr[0].name+':'+getAddr[0].mobile" :label="getAddr[0].province+getAddr[0].city+getAddr[0].country+getAddr[0].detail" is-link @click="checkAdd"/>
            </div>
            <div class="error" v-else>
                <van-cell title="请选择收获地址" is-link @click="checkAdd"/>
            </div>

            <!-- 订单商品 -->
            <van-row v-for="item in lists" :key="item.id">
                <van-col span="6">
                    <img v-lazy="item.cover" style="width:80px; height:80px; padding:8px" alt="">
                </van-col>
                <van-col span="18">
                    <van-cell :title="item.name.split(' ')[0]" :value="'X'+item.count" :label="'￥'+item.price+'.00'" />
                </van-col>
            </van-row>
    
            <!-- 结尾款项 -->
            <van-submit-bar :price="totalPrice" button-text="提交订单" @submit="onSubmit" >
                <template #default>
                共计：<span>{{totalCouunt}}</span>件
                </template>
            </van-submit-bar>

        </main>

        <!-- 支付密码框 -->
        <pay-keyword :cid='cid' ></pay-keyword>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import PayKeyword from '../components/PayKeyword.vue'

export default {
  
    name : 'Orderok',
    data() {
        return {
            lists:[],
            cid:'',

        }
    },
    components: { PayKeyword },
    created() {
        this.lists = JSON.parse(sessionStorage.getItem('cars'))
    },
    methods: {
        // 选择地址
        checkAdd() {
             this.$router.push({
                 path:'/addrescheck'
             })
        },
        // 付款
        onSubmit() {
            if(!this.$route.query.id) return this.$toast('请选择收获地址')
            // 发送创建订单请求，然后弹出密码框 输入密码  跳转成功或者订单详情
            this.$http.addOrder(this.lists,this.$route.query.id).then(data => {
                console.log(data)
                this.cid = data.data.data.id
                // 订单出错说明
                if(data.data.errcode != 0) return this.$toast(data.data.errmsg)
                // 下单创建成功说明
                // 偏方弹出密码框
                this.$children[this.$children.length - 1].show = true
            })
        }
    },
    computed:{
        ...mapState(['userInfo']),
        // 获取地址
        getAddr(){
            if(this.$route.query.id) {
                return this.userInfo.addressList.filter(item => {
                    return this.$route.query.id == item.id
                })
            }
        },
        // 计算总件数
        totalCouunt(){
        return this.lists.reduce((p,item) => {
            return p + item.count
        },0)
        },
        // 计算总价格
        totalPrice() {
        return this.lists.reduce((p,item) => {
            return p + item.count*item.price*100
        },0)
        },

        isA() {
            return this.$route.query.id ? true :false
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
        }
    }

</style>
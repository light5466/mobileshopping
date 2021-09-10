<template>
  <div class="address">
            <!-- 头部 -->
        <van-nav-bar title="收货地址" :fixed='true' @click-left="$router.push('/mine')">
        <template #left >
            <van-icon name="arrow-left" color='#0ef8e1' size="20" />
            <span style="color:#0ef8e1">返回</span>
        </template>
        </van-nav-bar>

        <main class="main">
            <div class="error" v-show="!list.length">
                地址信息为空！马上编辑一个吧
            </div>
            <van-address-list
            :disabled-list="list"
            @add="onAdd"
            @edit-disabled="onEdit"
            />
        </main>

  </div>
</template>

<script>
import {mapState } from 'vuex'
export default {
    name : 'Myaddress',
    data() {
        return {
            // chosenAddressId:'1',
            list: [],
        }
    },
    created() {
        this.getList(this.userInfo.addressList)
        
    },
    methods: {
        // 解析地址信息
        getList(list) {
            if(!list) return
            list.forEach((item) => {
                let listItem = {}
                listItem.id = item.id
                listItem.name = item.name
                listItem.tel = item.mobile
                listItem.address = item.province + item.city + item.country + item.detail

                this.list.push(listItem)
            })   
        },
        onAdd() {
            this.$router.push({
                path:'/updateaddress',
                query:{ids:0}
            })
        },
        onEdit(item) {
            this.$router.push({
                path:'/updateaddress',
                query:{ids:item.id}
            })
        },
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
        .van-address-item__address, .van-address-item__name{
            color: #000;
        }
        .van-button--danger{
            background-color: #0ef8e1;
            border: none;
        }
        .error{
            text-align: center;
            padding-top: 100px;
        }
        
    }
</style>
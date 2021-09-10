<template>
  <div class="addresscheck">
            <!-- 头部 -->
        <van-nav-bar title="请选择收货地址" :fixed='true' @click-left='$router.back()'>
        <template #left >
            <van-icon name="arrow-left" color='#0ef8e1' size="20" />
            <span style="color:#0ef8e1">返回</span>
        </template>
        </van-nav-bar>

        <main class="main">
            <van-address-list
            v-model="chosenAddressId"
            :list="list"
            @add="onAdd"
            @edit="onEdit"
            @select="selectA"
            />
        </main>

  </div>
</template>


<script>
import {mapState } from 'vuex'
export default {
    name : 'Addresscheck',
    data() {
        return {
            chosenAddressId:'1',
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
        // 点击添加
        onAdd() {
            this.$router.push({
                path:'/updateaddress',
                query:{ids:0}
            })
        },
        // 点击编辑
        onEdit(item) {
            this.$router.push({
                path:'/updateaddress',
                query:{ids:item.id}
            })
        },
        // 点击选择跳转回去渲染
        selectA(item) {
            this.$router.push({
                path:'/orderok',
                query:{id:item.id}
            })
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
        .van-address-item__address, .van-address-item__name{
            color: #000;
        }
        .van-button--danger{
            background-color: #0ef8e1;
            border: none;
        }
        
    }
</style>
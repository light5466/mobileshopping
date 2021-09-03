<template>
  <div class="address">
            <!-- 头部 -->
        <van-nav-bar title="收货地址" :fixed='true' @click-left='$router.back()'>
        <template #left >
            <van-icon name="arrow-left" color='#0ef8e1' size="20" />
            <span style="color:#0ef8e1">返回</span>
        </template>
        </van-nav-bar>

        <main class="main">
            <van-address-list
            :disabled-list="list"
            @add="onAdd"
            @edit-disabled="onEdit"
            />
        </main>

  </div>
</template>

<script>
export default {
    name : 'Myaddress',
    data() {
        return {
            // chosenAddressId:'1',
            list: [
                {
                id: '1',
                name: '张三',
                tel: '13000000000',
                address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
                isDefault: true,
                },
                {
                id: '2',
                name: '李四',
                tel: '1310000000',
                address: '浙江省杭州市拱墅区莫干山路 50 号',
                },
            ],
        }
    },
    methods: {
        onAdd() {
            this.$toast('新增地址');
            this.$router.push({
                path:'/updateaddress',
                query:{ids:0}
            })
        },
        onEdit(ids) {
            this.$toast('编辑地址:');
            this.$router.push({
                path:'/updateaddress',
                query:{ids:ids}
            })
        },
    },
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
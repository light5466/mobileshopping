<template>
  <div class="Updateaddress">
                  <!-- 头部 -->
        <van-nav-bar title="收货地址" :fixed='true' @click-left='$router.back()'>
        <template #left >
            <van-icon name="arrow-left" color='#0ef8e1' size="20" />
            <span style="color:#0ef8e1">返回</span>
        </template>
        </van-nav-bar>

        <main class="main">
            <h3>ADDRESS</h3>
            <van-form @submit="onSubmit">
                <!-- 输入任意文本 -->
                <van-field v-model="text" label="姓名" placeholder="请输入姓名"/>
                <!-- 输入手机号，调起手机号键盘 -->
                <van-field v-model="tel" type="tel" label="电话" placeholder="请输入手机号码"/>
                <!-- <van-picker show-toolbar title="标题" :columns="columns" /> -->
                <van-field
                readonly
                clickable
                label="地区"
                :value="addressc"
                placeholder="选择省/市/区"
                @click="showPicker = true"
                />
                <van-popup v-model="showPicker" round position="bottom">
                <van-picker
                    show-toolbar
                    :columns="columns"
                    @cancel="showPicker = false"
                    @confirm="onConfirm"
                />
                </van-popup>
                <van-field v-model="address" label="详细地址" placeholder="街道小区门牌号"/>
                <van-cell title="设置为默认收货地址" >
                <template #right-icon>
                    <van-switch v-model="switchChecked" size="20" />
                </template>
                </van-cell>

                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit" style="backgroundColor:#0ef8e1;border:none">确认</van-button>
                </div>
            </van-form>

            
        </main>

  </div>
</template>

<script>
export default {
    name : 'Updateaddress',
    data() {
        return {
            text:'',
            tel:'',
            showPicker:false,
            addressc:'',
            address:'',
            switchChecked:false,
            columns: [
                        {
                        text: '浙江',
                        children: [
                            {
                            text: '杭州',
                            children: [{ text: '西湖区' }, { text: '余杭区' }],
                            },
                            {
                            text: '温州',
                            children: [{ text: '鹿城区' }, { text: '瓯海区' }],
                            },
                        ],
                        },
                        {
                        text: '福建',
                        children: [
                            {
                            text: '福州',
                            children: [{ text: '鼓楼区' }, { text: '台江区' }],
                            },
                            {
                            text: '厦门',
                            children: [{ text: '思明区' }, { text: '海沧区' }],
                            },
                        ],
                        },
                    ],

        }
    },
    methods: {
        // 点击编辑完成
        onSubmit() {
            console.log('编辑完成')
        },
        // 选中之后
        onConfirm(value) {
            this.addressc = value;
            console.log(this.addressc)
            this.showPicker = false;
        },
    },
}
</script>

<style lang='less' scoped>
    .main{
        margin-top: 46px;
        height: calc(100vh - 46px);
        overflow: scroll;
        .van-switch--on{
            background-color: #0ef8e1;
        }
        h3{
            text-align: center;
            line-height: 100px;
            font-size: 22px;
            color: rgba(111, 111, 111, .5);
            font-weight: 600;
        }
    }
</style>
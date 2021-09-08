<template>
  <div class="pass">
      <van-overlay :show="show" @click="showfail" z-index='999'>

            <div class="block" > 
                <div class="inputb">
                    <van-nav-bar title="支付" @click-left='showfail'>
                        <template #left >
                            <van-icon name="clear" color='#0ef8e1' size="20" />
                        </template>
                    </van-nav-bar>
                </div>
                <!-- 密码输入框 -->
                <div class="inputp">
                    <van-password-input
                    :value="value"
                    />
                </div>
                <!-- 数字键盘 -->
                <div class="keyword">
                     <!-- <van-number-keyboard
                    v-model="value"
                    :show="true"
                    :focus="inputok"
                    />  -->
                    <van-number-keyboard
                    :show="true"
                    @input="onInput"
                    />
                </div>   
            </div>
      </van-overlay>
  </div>
</template>

<script>
export default {
    name:'Paykeyword',
    data() {
        return {
            value:'',
            show:false
        }
    },
    props:['cid'],
    created() {
        
    },
    methods: {
        // 提交
        onInput(key) {
            this.value += String(key)
            if(this.value.length == 6) {
                this.show = false
                // 发送请求
                this.$http.payOrder(this.value,this.cid).then(data => {
                    console.log(data)
                    // 下单出错
                    if(data.data.errcode != 0) {
                        this.$toast(data.data.errmsg)
                        this.value = ''
                        return 
                    }
                    // 成功则跳转成功页面
                    this.$router.push('/success')
                    this.value = ''
                })
            } 
        },
        showfail(){
            // 未支付，跳转至订单详情
            this.show = false
            this.$router.push({
                path:'/orderdetail',
                query:{id:this.cid}
            })
        }
    },
    computed:{
        
    }
}
</script>

<style lang='less' scoped>
.pass {
    width: 100vw;
    height: 100vh;
}
  .block {
      position: relative;
      height: 60vh;
      background-color: #fff;
      .inputp {
          margin-top: 2vh;
          width: 100vw;
      }
      .inputb{
          width: 100vw;
          margin-top: 45vh;
      }
  }
</style>
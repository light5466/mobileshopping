<template>
  <div class="buycar">
              <!-- 头部 -->
        <van-nav-bar title="购物车" :fixed='true' @click-left='$router.back()'>
        <template #left >
            <van-icon name="arrow-left" color='#0ef8e1' size="20" />
            <span style="color:#0ef8e1">返回</span>
        </template>
        </van-nav-bar>

        <!-- 展示内容 -->
        <main class="main">
          <div class="content" v-if="cars.length">
            <div class="carItem" v-for="item in cars" :key='item.product_id'>
                <van-checkbox v-model="item.checked" @change="changeChecked(item.checked,item.product_id)"></van-checkbox>
                <van-card
                :desc="'￥'+item.price"
                :title="item.name"
                :thumb="item.cover"
                @click="toDetails(item.product_id)"
              > 
                <template #num>
                  <van-stepper v-model="item.count" @change="changeCount(item.product_id,item.count)"/>
                  <van-button type="warning" size="small" @click="dels(item.product_id)">删除</van-button>
                </template>
              </van-card>
            </div>
            
            
              
          </div>

          <div class="error" @click="$router.push('/home')" v-else>
            <van-icon name="shop" size='70px' color='#aee'/>
            <h3>购物车没有商品</h3>
          </div>

          <van-submit-bar :price="totalPrice" button-text="提交订单" @submit="onSubmit" :disabled="!isflag" >
            <template #default>
              共计：<span>{{totalCouunt}}</span>件
            </template>
          </van-submit-bar>
        </main>

  </div>
</template>

<script>
export default {
  name : 'Buycar',
  data() {
    return {
      cars:[],
    }
  },
  created() {
    this.$http.getCarList().then(data => {
      if (!data.data.data) return 
      this.cars = data.data.data
    })
  },
  methods: {
    // 跳转去详情页
    toDetails(id){
      this.$router.push({
        path:'/details',
        query:{gid:id}
      })
    },
    onSubmit(){
      // console.log(this.cars)
      let carList = this.cars.filter(item => {
        if (item.checked) {
          let {product_id:id,name,price,cover,count} = item
          return {id,name,price,cover,count}
        }
      })
      sessionStorage.setItem('cars',JSON.stringify(carList))
      this.$router.push('/orderok')
    },
    // 点击删除
    dels(ids) {
      this.$dialog.confirm({
        title: '是否确认删除',
      })
        .then(() => {
          // // 服务器删除
          this.$http.deleteCarList(ids)
          // 本地删除
          this.cars = this.cars.filter(item => {
            return item.product_id != ids
          })
          this.$toast('删除成功')
        })
        .catch(() => {

        }); 
    },
    changeCount(ids,count) {
      // // 服务器修改
      this.$http.updateCarList(ids,count)
    },
    changeChecked(flag,ids){
      this.$http.updateCarList(ids,+flag)
    }
  },
  computed:{
    // 计算总件数
    totalCouunt(){
      return this.cars.reduce((p,item) => {
        return item.checked ? p + item.count : p
      },0)
    },
    // 计算总价格
    totalPrice() {
      return this.cars.reduce((p,item) => {
        return item.checked ? p + item.count*item.price*100 : p
      },0)
    },
    // 提交订单
    isflag() {
      // if(this.cars)
      return this.cars.reduce((p,item) => {
        return item.checked ? p + 1 : p
      },0)
    }
  }
}
</script>

<style lang='less' scoped>
    .main{
        margin-top: 46px;
        height: calc(100vh - 96px);
        overflow: scroll;
        .error {
          display: flex;
          margin-top: 80px;
          flex-direction: column;
          align-items: center;
          color: #aaa;
          h3 {
            font-size: 20px;
          }
        }
        .carItem {
          display: flex;
          border-bottom: 1px solid rgba(222, 222, 222, .7);
          .van-checkbox {
            width: 6vw;
            padding:0px 4px ;
          }
          .van-card{
            flex: 1;
          }
        }
          
    }

</style>